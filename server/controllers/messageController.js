import Message from "../models/message.js";
import crypto from "crypto";

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
    try {
        const savedMessage = await message.save();
        res.status(200).json(savedMessage);
    } catch (err) {
        next(err);
    }
};

export const getMessage = async (req, res, next) => {
    try {
        const message = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(message);
    } catch (err) {
        next(err);
    }
};
