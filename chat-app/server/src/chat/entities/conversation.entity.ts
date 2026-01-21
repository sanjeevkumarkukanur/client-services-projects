import { Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity("conversations")
export class Conversation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date;
}
