import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("groups")
export class Group {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;
}
