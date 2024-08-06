# Social media low-level design
Create a low-level design for social media

## Features
- Create, update user 
- follow, unfollow a user 
- create, update, delete post 
- Search post 
- Get feeds (paginated) 
- Filter posts 
- Add, update, delete comment 
- like, dislike a post 
 
## ER Diagram:
[View on Eraser![](https://app.eraser.io/workspace/2kuKfBt4MxGVd4aGdNTh/preview?elements=DD9blJLDIXio3SWmldXxZg&type=embed)](https://app.eraser.io/workspace/2kuKfBt4MxGVd4aGdNTh?elements=DD9blJLDIXio3SWmldXxZg)

## REST APIS:
- Create User: `POST /users`
- Follow User: `POST /users/:id/follow`
- Unfollow User: `POST /users/:id/unfollow`

- Create Post: `POST /posts`
- Update Post: `PUT /posts/:id`
- Delete Post: `DELETE /posts/:id`
- Get Feed: `GET /feed (Paginated)`
- Search Posts: `GET /posts/search?title=`
- Filter Posts: `GET /posts/filter?authorId=`

- Add Comment: `POST /posts/:postId/comments`
- Update Comment: `PUT /comments/:id`
- Delete Comment: `DELETE /comments/:id`

- Like Post: `POST /posts/:postId/like`
- Dislike Post: `DELETE /posts/:postId/like`
