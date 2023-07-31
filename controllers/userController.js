const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../token/authToken");

const registerUser = asyncHandler(async (req, res) => {
    const {fname,lname,email,password,pic} = req.body


    const userExists = await User.findOne({email})
    try {
        if (userExists) {
            res.status(400);
            console.error("Already registered");
        }
            const user = await User.create({
                fname,
                lname,
                email,
                password,
                pic
            });
            if (!user) {
                res.json({ message: "Error occurred while saving the user" });
            }
            res.json({ message: "User created successfully...", user });
    } catch (error) {
        res.json({ message: "Error occurred ", error });
        console.log(error);
    }
});
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            fname: user.fname,
            lname: user.lname,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        const error = new Error("Invalid email or password");
        throw error;
    }
});
const editUser = asyncHandler(async (req, res) => {
    const userId = req.params.id;
    const { fname, lname, email } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fname, lname, email },
            { new: true }
        );

        if (updatedUser) {
            res.json({
                _id: updatedUser._id,
                fname: updatedUser.fname,
                lname: updatedUser.lname,
                email: updatedUser.email,
                token: generateToken(updatedUser._id),
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
});
const getAllUser = async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
        console.log(user.length);
    } catch (error) {
        res.status(400).json({ error });
    }
};

const getAdminUser = async (req, res) => {
    try {
        const admin = await User.find({ isAdmin: true });
        res.json(admin);
    } catch (error) {
        console.error("Error:", error);
    }
};
const checkEmail = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });
        res.json(user);
    } catch (error) {
        res.json({ error });
    }
};

module.exports = {
    registerUser,
    loginUser,
    editUser,
    getAllUser,
    getAdminUser,
    checkEmail,
};
