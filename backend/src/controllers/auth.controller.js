import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/token.js";
import bcrypt from "bcryptjs";

export const register = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber, password, role } = req.body;

    if (!name || !email || !phoneNumber || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
        return res.status(400).json({
            success: false,
            message: "Email is already in use",
        });
    }

    const existingPhoneNumber = await User.findOne({ phoneNumber });
    if (existingPhoneNumber) {
        return res.status(400).json({
            success: false,
            message: "Phone number is already in use",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        role,
    });

    if (user) {
        generateTokenAndSetCookie(res, user._id);
        await user.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                },
            },
        });
    } else {
        return res.status(500).json({
            success: false,
            message: "User registration failed",
        });
    }
});

export const login = asyncHandler(async (req, res) => {
    const { email, phoneNumber, password, role } = req.body;

    if ((!email && !phoneNumber) || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
        });
    }

    const user = await User.findOne({ $or: [{ email }, { phoneNumber }] });

    if (!user) {
        return res.status(401).json({
            success: false,
            message: "User does not exist",
        });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (!isPasswordCorrect) {
        return res.status(401).json({
            success: false,
            message: "Password is incorrect",
        });
    }

    if (user.role !== role) {
        return res.status(401).json({
            success: false,
            message: "Access denied: Invalid role",
        });
    }

    generateTokenAndSetCookie(res, user._id);

    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data: {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
            },
        },
    });
});

export const logout = asyncHandler(async (_, res) => {
    res.clearCookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({
        success: true,
        message: "User logged out successfully",
    });
});

export const currentUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");

    return res.status(200).json({
        success: true,
        message: "Current user fetched successfully",
        data: {
            user,
        },
    });
});
