import { database } from "../../db.js";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { secretKey } from "../../config.js";

const { users } = database;

const generateAccessToken = (id) => {
    const payload = { id };

    return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

export const authController = {
    getAll: async (req, res) => {
        try {
            res.status(200).json(users);
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "error" });
        }
    },

    getOne: (req, res) => {
        const index = users.findIndex((item) => String(item.id) === String(req.params.id));
        let resItem = users[index];
        if (index > -1) {
            res.status(200).json(resItem);
        } else {
            res.status(500).json({ message: `user is not found` });
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;

            // проверка существования юзера
            const user = users.find((user) => user.username === username);
            if (!user) {
                return res.status(400).json({ message: `Пользователь ${username} не найден` });
            }

            // проверка пароля
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({ message: "Неверный пароль" });
            }

            return res.status(200).json({ id: user.id, username: user.username, playlists: user.playlists });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "login error" });
        }
    },

    registration: async (req, res) => {
        try {
            const { username, password } = req.body;

            const candidate = users.find((user) => user.username === username);
            if (candidate) {
                return res.status(400).json({ message: "Пользователь с таким именем уже существует" });
            }

            // хэширование пароля (чтобы не хранить его в бд в обычном виде)
            const hashPassword = bcrypt.hashSync(password, 7);

            const newUser = {
                id: v4(),
                username,
                password: hashPassword,
                email: "",
                addresses: [],
                cart: [],
            };

            users.push(newUser);
            return res.status(200).json({ message: "successful registration" });
        } catch (error) {
            console.log(error);
            res.status(400).json({ message: "registration error" });
        }
    },
};
