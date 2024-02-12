import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

export default function (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(" ")[1]; // Bearer jlkjbhaognlagnoahp.lkjhaopo.jadofhjoa
        if (!token) {
            return res.status(403).json({ message: "Необходима авторизация" });
        }
        const decodedData = jwt.verify(token, secretKey); // в этот объект будет помещен payload, который мы засовывали в токен
        req.user = decodedData;
        next();
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: error });
    }
}
