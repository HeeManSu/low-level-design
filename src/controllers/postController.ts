import { Post, Prisma } from "@prisma/client";
import assert from "assert";
import { NextFunction, Request, Response } from "express";
import { transaction } from "../utils/transaction";
import ErrorHandlerClass from "../utils/errorClass";
import prisma from "../config/prisma-client";

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, authorId } = req.body as Post;

    assert(title, "Title is required");
    assert(content, "Content is required");
    assert(authorId, "AuthorId is required");

    const newPost: Post = await transaction(
      async (trx: Prisma.TransactionClient) => {
        const post = await trx.post.create({
          data: {
            title,
            content,
            authorId: authorId,
          },
          include: {
            likes: true,
            comments: true,
            _count: {
              select: { likes: true, comments: true },
            },
          },
        });
        return post;
      }
    );

    res.status(201).json({
      message: "New Post Created",
      post: newPost,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandlerClass("Unable to create post", 500));
  }
};

export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { title, content } = req.body as Post;

    assert(postId, "PostId is required");

    const data: Partial<Post> = {};
    if (title) {
      data.title = title;
    }
    if (content) {
      data.content = content;
    }

    const updatedPost: Post = await transaction(
      async (trx: Prisma.TransactionClient) => {
        return await trx.post.update({
          where: { postId },
          data: {
            ...data,
            updatedAt: new Date(),
          },
          include: {
            likes: true,
            comments: true,
            _count: {
              select: { likes: true, comments: true },
            },
          },
        });
      }
    );

    res.status(201).json({
      message: "Post Updated",
      post: updatedPost,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorHandlerClass("Unable to update post", 500));
  }
};

export const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    assert(postId, "PostId is required");

    const deletedPost: Post = await transaction(
      async (trx: Prisma.TransactionClient) => {
        return await trx.post.delete({
          where: { postId },
        });
      }
    );

    res.status(201).json({
      message: " Post deleted",
      post: deletedPost,
    });
  } catch (error) {
    return next(new ErrorHandlerClass("Unable to delete post", 500));
  }
};

export const likePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!postId || !userId) {
      return next(new ErrorHandlerClass("PostId or UserId not found", 404));
    }


    const likedPost: Post = await transaction(
      async (trx: Prisma.TransactionClient) => {
        return await trx.like.create({
          data: {
            postId,
            userId,
          },
          include: {
            user: true,
          },
        });
      }
    );

    res.status(201).json({
      message: "Post liked",
      post: likedPost,
    });
  } catch (error) {
    return next(new ErrorHandlerClass("Unable to like post", 500));
  }
};

export const unLikePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;

    if (!postId || !userId) {
      return next(new ErrorHandlerClass("PostId or UserId not found", 404));
    }

    const unLikedPost: Post = await transaction(
      async (trx: Prisma.TransactionClient) => {
        const like = await trx.like.deleteMany({
          where: {
            postId,
            userId,
          },
        });
      }
    );

    res.status(201).json({
      message: "Post unliked",
      post: unLikedPost,
    });
  } catch (error) {
    return next(new ErrorHandlerClass("Unable to unlike post", 500));
  }
};

export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allPosts: Post[] = await transaction(
      async (trx: Prisma.TransactionClient) => {
        const posts = await trx.post.findMany({
          include: {
            likes: true,
            comments: true,
            _count: {
              select: { likes: true, comments: true },
            },
          },
        });
        return posts;
      }
    );

    res.status(201).json({
      message: "All posts fetched",
      posts: allPosts,
    });
  } catch (error) {
    return next(new ErrorHandlerClass("Unable to get all post", 500));
  }
};
