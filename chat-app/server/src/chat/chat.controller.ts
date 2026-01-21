import { Controller, Post, Body, Get, Param } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { CreateConversationDto } from "./dto/create-conversation.dto";
import { CreateGroupDto } from "./dto/create-group.dto";
import { AddMemberDto } from "./dto/add-member.dto";
import { StartChatDto } from "./dto/chat.dto";

@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  // ---- USER ----
  @Post("user")
  createUser(@Body() dto: CreateUserDto) {
    return this.chatService.createUser(dto);
  }

  // ---- CONVERSATION ----
  @Post("conversation")
  createConversation(@Body() dto: CreateConversationDto) {
    return this.chatService.createConversation(dto.userA, dto.userB);
  }

  // ---- GROUP ----
  @Post("group")
  createGroup(@Body() dto: CreateGroupDto) {
    return this.chatService.createGroup(dto.name, dto.creatorId);
  }

  @Post("group/add-member")
  addMember(@Body() dto: AddMemberDto) {
    return this.chatService.addMemberToGroup(dto.groupId, dto.userId);
  }
   // GET /chat/users
  @Get("users")
  async getAllUsers() {
    return this.chatService.getAllUsers();
  }

  // GET /chat/users/:id
  @Get("users/:id")
  async getUserById(@Param("id") id: string) {
    return this.chatService.getUserById(id);
  }
  @Post("start-chat")
  async startChat(@Body() dto: StartChatDto) {
    return this.chatService.startOrGetConversation(
      dto.userA,
      dto.userB,
    );
  }
  // GET /chat/conversation/:id/messages
  @Get("conversation/:id/messages")
  async getConversationMessages(@Param("id") id: string) {
    return this.chatService.getConversationMessages(id);
  }

  // GET /chat/group/:id/messages
  @Get("group/:id/messages")
  async getGroupMessages(@Param("id") id: string) {
    return this.chatService.getGroupMessages(id);
  }

  
}
