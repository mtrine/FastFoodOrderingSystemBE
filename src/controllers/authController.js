const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let refreshTokens = [];

const authController = {
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = await Users.findOne({ where: { phoneNumber: req.body.phoneNumber } });
            if(user){
                return res.status(400).json({ message: "Phone number already exists" });
            }
            const newUser = await Users.create({
                Name: req.body.Name,
                phoneNumber: req.body.phoneNumber,
                password: hashedPassword,
                admin: req.body.admin
            });

            res.status(201).json(newUser);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    
    login: async (req, res) => {
        try {
            const user = await Users.findOne({ where: { phoneNumber: req.body.phoneNumber } });
            if (!user) {
                return res.status(400).json({ message: "Cannot find user" });
            }
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
                return res.status(400).json({ message: "Password is wrong" });
            }
            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            const { password, ...other } = user.dataValues;
            res.status(200).json({ ...other, accessToken, refreshToken });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    logout: async (req, res) => {
        const refreshToken = req.body.token;
        refreshTokens = refreshTokens.filter(token => token !== refreshToken);
        res.status(200).json({ message: "Logged out" });
    },

    generateAccessToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "30s"
        });
    },
    
    generateRefreshToken: (user) => {
        return jwt.sign({
            id: user.id,
            admin: user.admin,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: "365d"
        });
    },

    refreshToken: async (req, res) => {
        const refreshToken = req.body.token;
        if (!refreshToken) {
            return res.status(400).json({ message: "User not authenticated" });
        }
        if (!refreshTokens.includes(refreshToken)) {
            return res.status(400).json({ message: "Refresh token is not valid" });
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(400).json({ message: err.message });
            }
            refreshTokens = refreshTokens.filter(token => token !== refreshToken);
            const newAccessToken = authController.generateAccessToken(user);
            const newRefreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.status(200).json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
        });
    },
};
module.exports = authController;