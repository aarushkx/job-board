import mongoose, { Schema } from "mongoose";

const jobSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        requirements: {
            type: String,
            required: true,
        },
        salary: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
        jobType: {
            type: String,
            required: true,
        },
        position: {
            type: String,
            required: true,
        },
        company: {
            type: Schema.Types.ObjectId,
            ref: "Company",
            required: true,
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        applicants: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;
