import { IsUUID } from "class-validator";

export class CreateConversationDto {
  @IsUUID()
  userA: string;

  @IsUUID()
  userB: string;
}