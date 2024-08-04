const Users = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Cart = require('../models/Cart');

let refreshTokens = [];

const authController = {
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            const user = await Users.findOne({ where: { phoneNumber: req.body.phoneNumber } });
            if (user) {
                return res.status(400).json({ message: "Phone number already exists" });
            }
            const newUser = await Users.create({
                name: req.body.name,
                phoneNumber: req.body.phoneNumber,
                password: hashedPassword,
                admin: false
            });
    
            await Cart.create({
                UserId: newUser.id
            });
            res.status(201).json(newUser);
        } catch (err) {
            console.log(err); // In ra lỗi chi tiết
            res.status(500).json({ message: err.message });
        }
    },    

    login: async (req, res) => {
        try {
            const user = await Users.findOne({ where: { phoneNumber: req.body.phoneNumber } });
            if (!user) {
                return res.status(400).json({ message: "Phone number is wrong" });
            }
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
                return res.status(400).json({ message: "Password is wrong" });
            }
            const accessToken = authController.generateAccessToken(user);
            const refreshToken = authController.generateRefreshToken(user);
            refreshTokens.push(refreshToken);
            const decodedAccessToken = jwt.decode(accessToken);
            const expiredTime = decodedAccessToken.exp * 1000;
            const { password, ...other } = user.dataValues;
            res.status(200).json({ ...other, accessToken, refreshToken, expiredTime });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    logout: async (req, res) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({ message: "Refresh token is required" });
        }

        if (!refreshTokens.includes(refreshToken)) {
            return res.status(400).json({ message: "Refresh token is not valid" });
        }

        try {
            // Xóa refresh token khỏi danh sách token hợp lệ
            refreshTokens = refreshTokens.filter(token => token !== refreshToken);

            res.status(200).json({ message: "Logged out successfully" });
        } catch (err) {
            console.error(err); // In ra lỗi chi tiết
            res.status(500).json({ message: "An error occurred during logout" });
        }
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
        const refreshToken = req.body.refreshToken;
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
