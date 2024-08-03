// import { Router } from "express";
// import {
//   createUser,
//   followUser,
//   getAllUsers,
//   unFollowUser,
// } from "../controllers/userController";

// const userRoutes: Router = Router();
// userRoutes.post("/users/create", createUser);
// userRoutes.get("/users", getAllUsers);
// userRoutes.post("/users/:userId/follow", followUser);
// userRoutes.post("/users/:userId/unfollow", unFollowUser);

// export default userRoutes;

import { Router } from "express";
import { createPost, deletePost, getAllPosts, likePost, updatePost, unLikePost, searchPosts } from "../controllers/postController";
const postRoutes: Router = Router();

postRoutes.post("/posts/create", createPost);
postRoutes.patch("/posts/:postId/update", updatePost);
postRoutes.delete("/posts/:postId/delete", deletePost);
postRoutes.post("/posts/:postId/like", likePost);
postRoutes.post("/posts/:postId/unlike", unLikePost);
postRoutes.get("/:userId/posts/", getAllPosts);
postRoutes.get("/posts/search", searchPosts);

export default postRoutes;
