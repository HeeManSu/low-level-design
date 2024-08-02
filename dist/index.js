"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const port = 3000;
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
app.get("/", async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
});
app.post("/users", async (req, res) => {
    const { firstName, lastName, email } = req.body;
    const user = await prisma.user.create({
        data: { firstName, lastName, email },
    });
    res.json(user);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
