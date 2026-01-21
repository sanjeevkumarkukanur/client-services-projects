import { ApiPropertyOptional, ApiProperty } from "@nestjs/swagger";

export class SendMessageDto {
  @ApiPropertyOptional({ example: "conv_123" })
  conversationId?: string;

  @ApiPropertyOptional({ example: "group_999" })
  groupId?: string;

  @ApiProperty({ example: "user_1" })
  senderId: string;

  @ApiProperty({ example: "Hello!" })
  content: string;
}
