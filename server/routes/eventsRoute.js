import express from "express";
import handleError from "../utils/eventErrors.js";
const router = express.Router();
import Event from "../models/events.js";
import { verifyToken } from "../middleware/auth.js";

router.get("/:userId", async (req, res) => {
    const events = await Event.find({ userId: req.params.userId });

    try {
        res.status(200).json(events);
    } catch (err) {
        handleError(err, res);
    }
});
router.get("/:id/show", async (req, res) => {
    const id = req.params.id;
    const event = await Event.findById(id);

    try {
        res.status(200).json(event);
    } catch (err) {
        handleError(err, res);
    }
});
router.post("/", verifyToken, async (req, res) => {
    // const newEvent = await new Event({ ...req.body, userId: req.user.id });
    console.log(req.user);
    const newEvent = await new Event({ ...req.body, userId: req.user.userId });

    try {
        newEvent.save((err, event) => {
            if (err) {
                handleError(err, res);
            } else {
                res.status(200).json(event);
            }
        });
    } catch (err) {
        handleError(err, res);
    }
});

router.put("/:id/update", async (req, res) => {
    const id = req.params.id;
    try {
        const event = await Event.findOne({ _id: id });
        if (event) {
            Object.assign(event, req.body);
            event.save((err, event) => {
                if (err) {
                    handleError(err, res);
                } else {
                    res.status(200).json(event);
                }
            });
        }
        if (!event) {
            res.status(404).json({ error: "event is not found" });
        }
    } catch (err) {
        console.log(err);
        handleError(err, res);
    }
});

router.delete("/:id/delete", async (req, res) => {
    const id = req.params.id;
    try {
        await Event.findByIdAndRemove(id);
        res.status(200).json("Event has been deleted");
    } catch (err) {
        handleError(err, res);
    }
});

export default router;
