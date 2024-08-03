import { Router } from "express";
import { createUser, followUser, getAllUsers, unFollowUser } from "../controllers/userController";

const userRoutes: Router = Router();
userRoutes.post("/users/create", createUser);
userRoutes.get("/users/", getAllUsers);
userRoutes.post("/users/:followingId/follow", followUser);
userRoutes.post("/users/:userId/unfollow", unFollowUser);

export default userRoutes;
