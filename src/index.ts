import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;
const prisma = new PrismaClient();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/creates", async (req: Request, res: Response) => {
  const { firstName, lastName, email } = req.body;
  const user = await prisma.user.create({
    data: { firstName, lastName, email },
  });
  res.json(user);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
