import mongoose from "mongoose";

const EventsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: [true, "Please write a title for your event"],
    },
    start: {
        type: Date,
        required: [true, "Please insert start of your event"],
        min: [new Date(), "can't be before now!"],
    },
    end: {
        type: Date,
        min: [
            function () {
                const date = new Date(this.start);
                const validDate = new Date(
                    date.setMinutes(date.getMinutes() + 5)
                );
                return validDate;
            },
            "Event End must be at least 5 minute a head of event time",
        ],
        default: function () {
            const date = new Date(this.start);
            return date.setDate(date.getDate() + 1);
        },
    },
    describe: { type: String, required: true },
});

export default mongoose.model("Events", EventsSchema);
