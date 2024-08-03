import { Follow, Prisma, User } from "@prisma/client";
import { CreateUserData } from "../interfaces/user";
import ErrorHandlerClass from "../utils/errorClass";
import { transaction } from "../utils/transaction";
import prisma from "../config/prisma-client";

class UserService {
  async createUserDb(createUserData: CreateUserData): Promise<User> {
    const { name, email } = createUserData;

    if (!email) {
      throw new ErrorHandlerClass("Email not found", 404);
    }

    const newUser = await transaction(async (trx: Prisma.TransactionClient) => {
      const user = await trx.user.create({
        data: {
          name,
          email,
        },
      });
      return user;
    });
    return newUser;
  }

  async getAllUsersDb(): Promise<User[]> {
    return await prisma.user.findMany({
      include: {
        posts: true,
        likes: true,
        commet: true,
        follower: true,
        following: true,
      },
    });
  }

  async findUserFromIdDb(userId: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) {
      return null;
    }

    return user;
  }

  async followUserDB(userId: string, followerId: string): Promise<Follow> {
    return await prisma.follow.create({
      data: {
        followerId,
        followingId: userId,
      },
    });
  }

  async unFollowUserDb(unFollowerId: string): Promise<Follow> {
    return await prisma.follow.delete({
      where: {
        id: unFollowerId,
      },
    });
  }
}

export default new UserService();
