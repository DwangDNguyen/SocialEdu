import Notifications from "../models/notifications.js";

export const newNotification = async (req, res, next) => {
    const notification = new Notifications(req.body);
    try {
        const savedNotification = await notification.save();
        res.status(200).json(savedNotification);
    } catch (err) {
        next(err);
    }
};

export const getNotifications = async (req, res, next) => {
    try {
        const notifications = await Notifications.find({
            receiverId: req.params.id,
        });
        res.status(200).json(notifications);
    } catch (err) {
        next(err);
    }
};

