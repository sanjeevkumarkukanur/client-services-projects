import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ChatRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private get prisma() {
    return this.prismaService.prisma;
  }

  // ---- USER ----
  async createUser(data: { name: string; phone: string }) {
    return this.prisma.user.create({ data });
  }

  // ---- CONVERSATION ----
  // async createConversation(userA: string, userB: string) {
  //   // 1️⃣ Validate users exist FIRST
  //   const users = await this.prisma.user.findMany({
  //     where: { id: { in: [userA, userB] } },
  //   });

  //   if (users.length !== 2) {
  //     throw new Error(`One or both users do not exist: ${userA}, ${userB}`);
  //   }

  //   // 2️⃣ Create conversation in a transaction
  //   return this.prisma.$transaction(async (tx) => {
  //     const conv = await tx.conversation.create({ data: {} });

  //     await tx.conversationMember.createMany({
  //       data: [
  //         { conversationId: conv.id, userId: userA },
  //         { conversationId: conv.id, userId: userB },
  //       ],
  //     });

  //     return conv;
  //   });
  // }

  // ---- GROUP ----
  async createGroup(name: string, creatorId: string) {
    const group = await this.prisma.group.create({
      data: { name },
    });

    await this.prisma.groupMember.create({
      data: { groupId: group.id, userId: creatorId },
    });

    return group;
  }

  async addMemberToGroup(groupId: string, userId: string) {
    return this.prisma.groupMember.create({
      data: { groupId, userId },
    });
  }
  async markMessageAsRead(messageId: string) {
    return this.prismaService.prisma.message.update({
      where: { id: messageId },
      data: { isRead: true },
    });
  }

  async saveMessage(data: {
    content: string;
    senderId: string;
    conversationId?: string;
    groupId?: string;
  }) {
    // ✅ Check if sender exists
    const sender = await this.prisma.user.findUnique({
      where: { id: data.senderId },
    });

    console.log(data.senderId);
    if (!sender) {
      throw new Error(`User ${data.senderId} does not exist`);
    }

    return this.prisma.message.create({ data });
  }

  // ---- CHECK EXISTING CONVERSATION ----
async findExistingConversation(userA: string, userB: string) {
  return this.prisma.conversation.findFirst({
    where: {
      AND: [
        { members: { some: { userId: userA } } },
        { members: { some: { userId: userB } } },
      ],
    },
    include: { members: true },
  });
}

// ---- CREATE NEW CONVERSATION (SAFE) ----
async createConversation(userA: string, userB: string) {
  const users = await this.prisma.user.findMany({
    where: { id: { in: [userA, userB] } },
  });

  if (users.length !== 2) {
    throw new Error("One or both users do not exist");
  }

  return this.prisma.$transaction(async (tx) => {
    const conv = await tx.conversation.create({ data: {} });

    await tx.conversationMember.createMany({
      data: [
        { conversationId: conv.id, userId: userA },
        { conversationId: conv.id, userId: userB },
      ],
    });

    return conv;
  });
}

async getAllUsers() {
  return this.prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });
}

// get single user by id
async getUserById(id: string) {
  return this.prisma.user.findUnique({
    where: { id },
  });
}

// ---- GET PRIVATE (1–1) MESSAGES ----
async getConversationMessages(conversationId: string) {
  
  return this.prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: { id: true, name: true },
      },
    },
  });
}

// ---- GET GROUP MESSAGES ----
async getGroupMessages(groupId: string) {
  return this.prisma.message.findMany({
    where: { groupId },
    orderBy: { createdAt: "asc" },
    include: {
      sender: {
        select: { id: true, name: true },
      },
    },
  });
}


}
