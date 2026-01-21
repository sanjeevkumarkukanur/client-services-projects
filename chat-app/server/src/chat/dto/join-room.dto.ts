import { ApiProperty } from "@nestjs/swagger";

export class JoinRoomDto {
  @ApiProperty({ example: "conv_123" })
  roomId: string;

  @ApiProperty({ example: "user_1" })
  userId: string;
}
