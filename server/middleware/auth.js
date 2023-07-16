import jwt from "jsonwebtoken";

// export default async function Auth(req, res, next) {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         const decodedToken = await jwt.verify(token, process.env.JWT_SEC);
//         req.user = decodedToken
//     } catch (error) {
//         res.status(401).json(error);
//     }
// }

export const verifyToken = (req, res, next) => {
    // const token = req.cookies.access_token;

    const token = req.headers.authorization.split(" ")[1];
    // console.log(req.cookies.access_token);
    // console.log(req.headers.authorization);
    // console.log(token);
    if (!token) return next(res.status(401).json("You are not authenticated!"));
    try {
        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return next(res.status(403).json("Token is not valid!"));
            const currentTime = Math.floor(Date.now() / 1000);
            if (user.exp < currentTime) {
                console.log("Token has expired");
            } else {
                console.log(
                    `Token is still valid, will expire in ${
                        user.exp - currentTime
                    } seconds`
                );
            }
            req.user = user;
            next();
        });

        // req.user = decodedToken;
        // next();
    } catch (err) {
        return res.status(500).send({ message: err.message });
    }
};

export const isAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin || req.user.id === req.params.id) {
            next();
        } else {
            res.status(403).json("You are not an admin!");
        }
    });
};

export function localVariables(req, res, next) {
    req.app.locals = {
        OTP: null,
    };
    next();
}
