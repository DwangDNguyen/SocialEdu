import express from "express";
import handleError from "../utils/eventErrors.js";
const router = express.Router();
import Event from "../models/events.js";
import { verifyToken } from "../middleware/auth.js";
import cron from "node-cron";
import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import moment from "moment";

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
                const task = cron.schedule(
                    moment(req.body.start).format("mm HH DD MM *"),
                    async () => {
                        try {
                            const userEmail = req.user.email;

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
                                    name: "Event Notification",
                                    link: "https://mailgen.js/",
                                },
                            });
                            let response = {
                                body: {
                                    intro: `Your event ${event.title} is about to start. Come to see it!`,
                                    name: req.user.email,
                                },
                            };
                            let mail = MailGenerator.generate(response);
                            let message = {
                                from: process.env.EMAIL,
                                to: req.user.email,
                                subject: "Event Notification",
                                html: mail,
                            };

                            transporter
                                .sendMail(message)
                                .then(() => {
                                    console.log("Email sent to", userEmail);
                                })
                                .catch((err) => {
                                    // return res.status(500).json({ err });
                                    console.log(err);
                                });

                            console.log("Email sent to", userEmail);
                        } catch (error) {
                            console.error("Failed to send email:", error);
                        }
                    }
                );
                console.log(new Date(req.body.start));
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
