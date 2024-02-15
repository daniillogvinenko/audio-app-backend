import express from "express";
import testsRouter from "./router/testsRouter.js";
import authRouter from "./router/authRouter/authRouter.js";
import songsRouter from "./router/songsRouter/songsRouter.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import playlistsRouter from "./router/playlistsRouter.js/playlistsRouter.js";
import songsInPlaylistRouter from "./router/songsInPlaylistRouter/songsInPlaylistRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.use(express.static(path.resolve(__dirname, "static")));

// чтобы пофиксить ошибку CORSа
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");

    // Pass to next layer of middleware
    next();
});

// Нужно для небольшой задержки, имитация реального апи
// app.use(async (req, res, next) => {
//     await new Promise((res) => {
//         setTimeout(res, 800);
//     });
//     next();
// });

app.use("/", testsRouter);
app.use("/", authRouter);
app.use("/", songsRouter);
app.use("/", playlistsRouter);
app.use("/", songsInPlaylistRouter);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

export default app;
