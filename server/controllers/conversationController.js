import Conversation from "../models/conversation.js";

export const newConversation = async (req, res, next) => {
    const conversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await conversation.save();
        res.status(200).json(savedConversation);
    } catch (err) {
        next(err);
    }
};

export const getConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        next(err);
    }
};

export const getConversationTwoUsers = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOne({
            members: { $all: [req.params.userId, req.params.receiverId] },
        });
        res.status(200).json(conversation);
    } catch (err) {
        next(err);
    }
};
export const getOneConversation = async (req, res, next) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        res.status(200).json(conversation);
    } catch (err) {
        next(err);
    }
};

// export const deleteConversation = async (req, res, next) => {
//     try {
//         const deletedConversation = await Conversation.deleteMany({
//             members: {
//                 $in: [null, null],
//             },
//         });
//         res.status(200).json(deletedConversation);
//     } catch (err) {
//         next(err);
//     }
// };
