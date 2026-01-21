import { Module } from "@nestjs/common";
import { ChatService } from "./chat.service";
import { ChatController } from "./chat.controller";
import { ChatRepository } from "./chat.repository";
import { ChatGateway } from "./chat.gateway";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [ChatService, ChatRepository, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
