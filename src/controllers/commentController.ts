import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import prisma from "../config/prisma-client";

const createCommentSchema = z.object({
  postId: z.string().uuid(),
  content: z.string(),
  authorId: z.string().uuid(),
});

const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = createCommentSchema.parse(req.body);

  const newComment = await prisma.commet.create({
    data: {
      postId: body.postId,
      content: body.content,
      authorId: body.authorId,
    },
  });

  res.status(201).json({
    message: "New Comment Created",
    comment: newComment,
  });
};
