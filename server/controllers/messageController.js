import Message from "../models/message.js";

export const addMessage = async (req, res, next) => {
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
