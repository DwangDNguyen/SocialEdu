import User from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
// const generateAccessToken = (user) => {
//     return jwt.sign(
//         { userId: user._id, email: user.email },
//         process.env.JWT_SECRET,
//         {
//             expiresIn: "1d",
//         }
//     );
// };

// const generateRefreshToken = (user) => {
//     return jwt.sign(
//         { userId: user._id, email: user.email },
//         "myRefreshSecretKey"
//     );
// };
// let refreshTokens = [];
// export async function refreshToken(req, res) {
//     const refreshToken = req.body.token;
//     if (!refreshToken) return res.status(401).json("you are not authenticated");
//     if (!refreshTokens.includes(refreshToken)) {
//         return res.status(403).json("Refresh token is not valid!");
//     }
//     jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
//         err && console.log(err);
//         refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

//         const newAccessToken = generateAccessToken(user);
//         const newRefreshToken = generateRefreshToken(user);

//         refreshTokens.push(newRefreshToken);

//         res.status(200).json({
//             accessToken: newAccessToken,
//             refreshToken: newRefreshToken,
//         });
//     });
// }
export async function verifyUser(req, res, next) {
    try {
        const { email } = req.method == "GET" ? req.query : req.body;

        let exist = User.findOne({ email });
        if (!exist) {
            return res.status(404).json({ err: "Can't find User" });
        }
        next();
    } catch (err) {
        res.status(500).json(err);
    }
}

export async function register(req, res) {
    try {
        const {
            username,
            email,
            avatar,
            password,
            phone,
            confirmPassword,
            otp,
        } = req.body;

        const existUsername = new Promise((resolve, reject) => {
            User.findOne({ username }, function (err, user) {
                if (err) reject(new Error(err));
                if (user)
                    reject({
                        key: "username",
                        error: "Username already exists",
                    });

                resolve();
            });
        });

        const existEmail = new Promise((resolve, reject) => {
            User.findOne({ email }, function (err, email) {
                if (err) reject(new Error(err));
                if (email)
                    reject({
                        key: "email",
                        error: "Email already exists",
                    });

                resolve();
            });
        });

        Promise.all([existUsername, existEmail])
            .then(() => {
                if (
                    password &&
                    confirmPassword === password &&
                    parseInt(req.app.locals.OTP) === parseInt(otp)
                ) {
                    bcrypt
                        .hash(password, 10)
                        .then((hashedPassword) => {
                            const newUser = new User({
                                username,
                                email,
                                phone,
                                password: hashedPassword,
                                avatar: avatar || "",
                            });
                            newUser
                                .save()
                                .then((result) => res.status(201).json(result))
                                .catch((err) => res.status(500).json(err));
                        })
                        .catch((err) => {
                            return res.status(500).json(err);
                        });
                }
            })
            .catch((err) => {
                return res.status(500).json(err);
            });
    } catch (err) {
        return res.status(500).json(err);
    }
}
export async function login(req, res, next) {
    const { email } = req.body;

    if (req.body.email == "" || req.body.password == "")
        res.status(400).json("All Fields Are Required!");
    try {
        let user = await User.findOne({
            email: email,
        });
        // console.log(user);
        if (!user) {
            next({ error: "Username not Found" });
        }

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (validPassword === false) {
            return next({ error: "Password does not match." });
        }

        // const accessToken = generateAccessToken(user);
        // const refreshToken = generateRefreshToken(user);
        // refreshTokens.push(refreshToken);
        const token = jwt.sign(
            { userId: user._id, email: user.email, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );
        console.log(req.body.password);
        console.log(user.password);
        console.log(validPassword);
        user.token = token;
        const { password, ...userInfo } = Object.assign({}, user.toJSON());
        req.user = { userId: user._id, ...userInfo };
        // console.log("accessToken: " + accessToken);
        // console.log("refreshToken: " + refreshToken);

        // res.cookie("access_token", token, {
        //     httpOnly: true,
        //  })
        console.log(req.user);
        return res
            .cookie("access_token", token, {
                httpOnly: true,
                sameSite: "none",
                secure: true,
            })
            .status(200)
            .json({
                ...userInfo,
                // accessToken: accessToken,
                // refreshToken: refreshToken,
                token: token,
            });
    } catch (error) {
        next(error);
    }
}
export async function generateOtp(req, res, next) {
    try {
        console.log(req.body.email);
        req.app.locals.OTP = await otpGenerator.generate(6, {
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false,
        });
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Generate OTP",
                link: "https://mailgen.js/",
            },
        });
        let response = {
            body: {
                intro: `Your OTP is ${req.app.locals.OTP}`,
                name: req.body.email,
            },
        };
        let mail = MailGenerator.generate(response);
        let message = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: "Generate OTP",
            html: mail,
        };

        transporter
            .sendMail(message)
            .then(() => {
                return res.status(200).json({
                    message: "OTP sent successfully",
                });
            })
            .catch((err) => {
                return res.status(500).json({ err });
            });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to send OTP" });
    }
}
