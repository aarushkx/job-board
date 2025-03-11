import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: Number,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            required: true,
            default: "user",
        },
        profile: {
            bio: { type: String },
            skills: { type: [String] },
            experience: { type: String },
            education: { type: String },
            resume: { type: String },
            resumeName: { type: String },
            company: { type: Schema.Types.ObjectId, ref: "Company" },
            profilePhoto: { type: String, default: "" },
            coverPhoto: { type: String, default: "" },
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
