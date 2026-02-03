// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
// import { User } from '../../users/entities/user.entity';
// import { Section } from '../../sections/entities/section.entity';

// @Entity('pages')
// export class Page {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   title: string;

//   @ManyToOne(() => User, user => user.pages)
//   user: User;

//   @OneToMany(() => Section, section => section.page)
//   sections: Section[];
// }
