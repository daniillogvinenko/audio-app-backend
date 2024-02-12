import { Router } from "express";

const testsRouter = new Router();

testsRouter.get("/tests", (req, res) => {
    res.status(200).json({ message: "TESTS" });
});

export default testsRouter;
