// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
// import { Page } from '../../pages/entities/page.entity';
// import { Field } from 'src/fields/entities/field-type.enum';

// @Entity('sections')
// export class Section {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column()
//   title: string;

//   @ManyToOne(() => Page, page => page.sections)
//   page: Page;

//   @OneToMany(() => Field, field => field.section)
//   fields: Field[];
// }
