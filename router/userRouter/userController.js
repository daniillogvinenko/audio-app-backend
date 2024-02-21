import { database } from "../../db.js";

const { users } = database;

export const userController = {
    getAll: (req, res) => {
        let resItems = users;

        // pagination
        if (req.query["_limit"]) {
            const limit = +req.query["_limit"];
            const page = +req.query["_page"] || 1;
            resItems = users.slice((page - 1) * limit, (page - 1) * limit + limit);
        }

        // поиск
        if (req.query.q) {
            resItems = resItems.filter((item) => {
                let valueStartsWithQuery = false;
                // если хоть одно из полей объекта начинается со строки запроса, то этот объект подходит под поисковой запрос
                Object.values(item).forEach((value) => {
                    if (String(value).toLowerCase().startsWith(String(req.query.q).toLowerCase()))
                        valueStartsWithQuery = true;
                });
                return valueStartsWithQuery;
            });
        }

        // фильтрация (например /products?price=1500)
        Object.keys(req.query).forEach((param) => {
            if (param !== "_limit" && param !== "_page" && param !== "_sort" && param !== "q") {
                // сортировка в зависимости от того, является ли это поле массивом или нет
                if (Array.isArray(users[0][param])) {
                    resItems = resItems.filter((item) => item[param].includes(String(req.query[param])));
                } else {
                    resItems = resItems.filter((item) => String(item[param]) === String(req.query[param]));
                }
            }
        });

        res.status(200).json(resItems);
    },

    getOne: (req, res) => {
        const index = users.findIndex((item) => +item.id === +req.params.id);
        let resItem = users[index];
        if (index > -1) {
            res.status(200).json(resItem);
        } else {
            res.status(500).json({ message: `user not found` });
        }
    },

    getOneByToken: (req, res) => {
        const { id } = req.user;
        res.status(200).json({ message: "here" });
        const index = users.findIndex((item) => item.id === id);
        let resItem = users[index];
        if (index > -1) {
            res.status(200).json(resItem);
        } else {
            res.status(500).json({ message: `user not found` });
        }
    },
};
