import { Injectable } from "@nestjs/common";
import { ChatRepository } from "./chat.repository";

@Injectable()
export class ChatService {
  constructor(private readonly repo: ChatRepository) {}

  // ---------- EXISTING APIs ----------
  createUser(dto: { name: string; phone: string }) {
    return this.repo.createUser(dto);
  }

  createConversation(userA: string, userB: string) {
    return this.repo.createConversation(userA, userB);
  }

  createGroup(name: string, creatorId: string) {
    return this.repo.createGroup(name, creatorId);
  }

  addMemberToGroup(groupId: string, userId: string) {
    return this.repo.addMemberToGroup(groupId, userId);
  }

  // ---------- REQUIRED FOR GATEWAY ----------
  async savePrivateMessage(
    conversationId: string,
    senderId: string,
    content: string,
  ) {
    return this.repo.saveMessage({
      conversationId,
      senderId,
      content,
    });
  }

  async saveGroupMessage(
    groupId: string,
    senderId: string,
    content: string,
  ) {
    return this.repo.saveMessage({
      groupId,
      senderId,
      content,
    });
  }

  async startOrGetConversation(userA: string, userB: string) {
  const existing = await this.repo.findExistingConversation(userA, userB);
  if (existing) return existing;

  return this.repo.createConversation(userA, userB);
}


  async markMessageAsRead(messageId: string) {
    return this.repo.markMessageAsRead(messageId);
  }

  async getAllUsers() {
  return this.repo.getAllUsers();
}

async getUserById(id: string) {
  const user = await this.repo.getUserById(id);

  if (!user) {
    throw new Error(`User ${id} not found`);
  }

  return user;
}
async getConversationMessages(conversationId: string) {
  return this.repo.getConversationMessages(conversationId);
}

async getGroupMessages(groupId: string) {
  return this.repo.getGroupMessages(groupId);
}

}
