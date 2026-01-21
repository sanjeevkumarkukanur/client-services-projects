import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: { origin: '*' },
  namespace: '/chat', // good practice
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chat: ChatService) {}

  /**
   * -------------------------
   * CONNECTION / ONLINE STATUS
   * -------------------------
   */

  handleConnection(client: Socket) {
    console.log('Connected:', client.id);

    // broadcast user online
    this.server.emit('user_online', {
      socketId: client.id,
    });
  }

  handleDisconnect(client: Socket) {
    console.log('Disconnected:', client.id);

    // broadcast user offline
    this.server.emit('user_offline', {
      socketId: client.id,
    });
  }

  /**
   * -------------------------
   * JOIN ROOMS
   * -------------------------
   */

  @SubscribeMessage('join_private_chat')
  joinPrivate(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.conversationId);
  }

  @SubscribeMessage('join_group')
  joinGroup(
    @MessageBody() data: { groupId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(data.groupId);
  }

  /**
   * -------------------------
   * SEND MESSAGES
   * -------------------------
   */

@SubscribeMessage("private_message")
async privateMessage(
  @MessageBody()
  data: { conversationId: string; senderId: string; content: string },
) {
  if (!data.conversationId) {
    throw new Error("conversationId is required");
  }

  const saved = await this.chat.savePrivateMessage(
    data.conversationId,
    data.senderId,
    data.content,
  );

  this.server
    .to(data.conversationId)
    .emit("receive_private_message", saved);
}


  @SubscribeMessage('group_message')
  async groupMessage(
    @MessageBody()
    data: {
      groupId: string;
      senderId: string;
      content: string;
    },
  ) {
    const saved = await this.chat.saveGroupMessage(
      data.groupId,
      data.senderId,
      data.content,
    );

    this.server.to(data.groupId).emit('receive_group_message', saved);
  }

  /**
   * -------------------------
   * TYPING INDICATOR
   * -------------------------
   */

  @SubscribeMessage('typing')
  typing(
    @MessageBody()
    data: {
      roomId: string;
      userId: string;
    },
  ) {
    this.server.to(data.roomId).emit('user_typing', {
      userId: data.userId,
    });
  }

  @SubscribeMessage('stop_typing')
  stopTyping(
    @MessageBody()
    data: {
      roomId: string;
      userId: string;
    },
  ) {
    this.server.to(data.roomId).emit('user_stop_typing', {
      userId: data.userId,
    });
  }

  /**
   * -------------------------
   * READ RECEIPTS
   * -------------------------
   */

  @SubscribeMessage('mark_read')
  async markRead(
    @MessageBody()
    data: {
      messageId: string;
    },
  ) {
    await this.chat.markMessageAsRead(data.messageId);

    this.server.emit('message_read', {
      messageId: data.messageId,
    });
  }
}
