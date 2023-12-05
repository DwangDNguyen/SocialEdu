import Message from "../models/message.js";
import Users from "../models/users.js";
import fs from "fs";
import crypto from "crypto";

export const addMessage = async (req, res, next) => {
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
                // encryptedMessage
            );
            return decryptedData.toString("utf-8");
        } catch (error) {
            console.error("Error decrypting message:", error);
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
            //  Lấy thông tin người nhận
            let otherId;
            if (otherMessage !== undefined) {
                otherId = otherMessage?.receiverId;
            } else {
                otherId = message[0]?.receiverId;
            }

            const receiverUser1 = await Users.findById(otherId);
            const receiverUser2 = currentUser;

            message.forEach((message) => {
                const senderId = message.sender;
                const receiverId = message.receiverId;
                const encryptedText = message.text;
                console.log("senderId:" + senderId);
                console.log("currentUser:" + currentUser._id);
                var receiverUser;

                if (currentUser._id.toString() === senderId.toString()) {
                    receiverUser = receiverUser1;
                } else {
                    receiverUser = receiverUser2;
                }

                const keyPath = `./certificate/${receiverUser.username}_private.pem`;

                const key = fs.readFileSync(keyPath, {
                    encoding: "utf-8",
                });

                const decryptedText = decryptMessage(encryptedText, key);

                message.text = decryptedText;
            });

            res.status(200).json(message);
        } else if (message.length === 0) {
            res.status(200).json(message);
        }
    } catch (err) {
        next(err);
    }
};
