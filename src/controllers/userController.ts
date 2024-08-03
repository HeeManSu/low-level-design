import { NextFunction, Request, Response } from "express";
import { string, z } from "zod";
import { CreateUserData } from "../interfaces/user";
import userService from "../services/userService";
import ErrorHandlerClass from "../utils/errorClass";
import { User } from "@prisma/client";
import prisma from "../config/prisma-client";
import { stat } from "fs";

const createUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
});

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: CreateUserData = createUserSchema.parse(req.body);

    const newUser = await userService.createUserDb(body);
    res.status(201).json({
      message: "New User Created",
      user: newUser,
    });
  } catch (error) {
    next(new ErrorHandlerClass("Unable to create user", 500));
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers: User[] = await userService.getAllUsersDb();

    res.status(201).json({
      message: "All users fetched",
      users: allUsers,
    });
  } catch (error) {
    next(new ErrorHandlerClass("Unable to fetch all users", 500));
  }
};

export const followUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { followingId } = req.params;
    const { followerId } = req.body;

    if (!followingId || !followerId) {
      throw new Error("followingId or followerId not found");
    }

    const userToFollow = await userService.findUserFromIdDb(followingId);

    if (!userToFollow) {
      return next(new ErrorHandlerClass("User to follow not found", 404));
    }

    const follow = await userService.followUserDB(followingId, followerId);

    // Fetch the updated user data with followers and following
    const updatedUser = await userService.getUserWithFollowersAndFollowing(
      followerId
    );
    res.status(201).json({
      message: "User followed successfully",
      follow,
      user: updatedUser,
    });
  } catch (error) {
    next(new ErrorHandlerClass("Unable to follow a user", 500));
  }
};
export const unFollowUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.params;
    const { unFollowerId } = req.body;

    if (!userId || !unFollowerId) {
      throw new Error("userId or unFollowerId not found");
    }

    const userToUnFollow = userService.findUserFromIdDb(userId);

    if (!userToUnFollow) {
      return next(new ErrorHandlerClass("User to follow not found", 404));
    }

    const unfollow = await userService.unFollowUserDb(unFollowerId);

    res.status(201).json({
      message: "User unfollowed successfully",
      unfollow,
    });
  } catch (error) {
    console.log(error);
    next(new ErrorHandlerClass("Unable to follow a user", 500));
  }
};
