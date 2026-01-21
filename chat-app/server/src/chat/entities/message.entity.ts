import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("messages")
export class Message {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  conversationId: string | null;

  @Column({ nullable: true })
  groupId: string | null;

  @Column()
  senderId: string;

  @Column("text")
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
