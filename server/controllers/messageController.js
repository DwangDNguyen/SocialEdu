import Message from "../models/message.js";
import Users from "../models/users.js";
import fs from "fs";
import crypto from "crypto";
// import CryptoJS from "crypto-js";
import NodeRSA from "node-rsa";

var key = new NodeRSA({ b: 2048 });

export const getPublicKey = async (req, res, next) => {
    try {
        const receiverUser = await Users.findById(req.params.receiverId);
        // const publicKey = fs
        //     .readFileSync(`./certificate/${receiverUser.username}_public.pem`)
        //     .toString();
        const publicKey = key.exportKey("public");
        // console.log(publicKey);
        res.status(200).json(publicKey);
    } catch (e) {
        next(e);
    }
};
export const addMessage = async (req, res, next) => {
    // const key = "fcTowm3oX869xj8gt8Rg56RgIRmtpbsg";
    // const thisMessage = req.body.text;

    // const cipher = crypto.createCipher("aes-256-cbc", key);
    // let encrypted = cipher.update(thisMessage, "utf8", "hex");
    // encrypted += cipher.final("hex");
    // const encryptedMessage = {
    //     ...req.body,
    //     text: encrypted,
    // };
    // const message = new Message(encryptedMessage);
    const message = new Message(req.body);
    const receiverUser = await Users.findById(req.body.receiverId);

    try {
        const publicKey = Buffer.from(
            fs.readFileSync(
                `./certificate/${receiverUser.username}_public.pem`,
                { encoding: "utf-8" }
            )
        );

        const encryptedData = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: "sha256",
            },

            Buffer.from(message.text)
        );
        message.text = encryptedData.toString("base64");
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        next(err);
    }
};

export const getMessage = async (req, res, next) => {
    const currentUserId = req.user.userId;
    const currentUser = await Users.findById(currentUserId);

    function decryptMessage(encryptedMessage, privateKey) {
        try {
            const decryptedData = crypto.privateDecrypt(
                {
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: "sha256",
                },
                Buffer.from(encryptedMessage, "base64")
            );
            return decryptedData.toString("utf-8");
        } catch (error) {
            console.error("Error decrypting message:", error);
            return null;
        }
    }
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId,
        });
        // const currentUserId = currentUser._id;
        if (message.length !== 0) {
            const otherMessage = message.find(
                (msg) => msg.sender === currentUserId.toString()
            );
            let otherId;
            if (otherMessage !== undefined) {
                otherId = otherMessage?.receiverId;
            } else {
                otherId = message[0]?.receiverId;
            }

            const receiverUser = await Users.findById(otherId);
            // var mssReceiver = [];
            // var mssSender = [];
            // message.forEach((message) => {
            //     const senderId = message.sender;
            //     const receiverId = message.receiverId;
            //     const encryptedText = message.text;
            //     if (currentUser._id.toString() === senderId) {
            //         mssSender.push(message);
            //     } else {
            //         mssReceiver.push(message);
            //     }
            // });

            message.forEach((message) => {
                const senderId = message.sender;
                const receiverId = message.receiverId;
                const encryptedText = message.text;
                const key =
                    currentUser._id === senderId
                        ? fs.readFileSync(
                              `./certificate/${currentUser.username}_private.pem`,
                              {
                                  encoding: "utf-8",
                              }
                          )
                        : //   .toString()
                          fs.readFileSync(
                              `./certificate/${receiverUser.username}_private.pem`,
                              {
                                  encoding: "utf-8",
                              }
                          );
                //   .toString();
                const regex =
                    /-----BEGIN PRIVATE KEY-----([\s\S]*)-----END PRIVATE KEY-----/;
                const match = key.match(regex);

                const decryptedText = decryptMessage(
                    encryptedText,
                    // match[1].trim()
                    key
                );
                // console.log(key);
                // console.log("decryptedText:" + decryptedText);
                message.text = decryptedText;
            });
            // mssSender.forEach((message) => {
            //     const senderId = message.sender;
            //     const receiverId = message.receiverId;
            //     const encryptedText = message.text;
            //     const key = fs.readFileSync(
            //         `./certificate/${receiverUser.username}_private.pem`,
            //         {
            //             encoding: "utf-8",
            //         }
            //     );

            //     const decryptedText = decryptMessage(
            //         encryptedText,
            //         // match[1].trim()
            //         key
            //     );
            //     // console.log(key);
            //     // console.log("decryptedText:" + decryptedText);
            //     message.text = decryptedText;
            // });
            // mssReceiver.forEach((message) => {
            //     const senderId = message.sender;
            //     const receiverId = message.receiverId;
            //     const encryptedText = message.text;
            //     const key = fs.readFileSync(
            //         `./certificate/${currentUser.username}_private.pem`,
            //         {
            //             encoding: "utf-8",
            //         }
            //     );

            //     const decryptedText = decryptMessage(
            //         encryptedText,
            //         // match[1].trim()
            //         key
            //     );
            //     // console.log(key);
            //     // console.log("decryptedText:" + decryptedText);
            //     message.text = decryptedText;
            // });

            res.status(200).json(message);
        } else if (message.length === 0) {
            res.status(200).json(message);
        }
    } catch (err) {
        next(err);
    }
};
