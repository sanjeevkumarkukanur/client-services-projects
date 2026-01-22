import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { FieldType } from '../enums/field-type.enum';
import { Section } from '../../sections/entities/section.entity';

@Entity('fields')
export class Field {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  label: string;

  // 👇 THIS IS WHERE YOUR CODE GOES
  @Column({
    type: 'enum',
    enum: FieldType,
  })
  type: FieldType;

  @Column({ type: 'json', nullable: true })
  validations?: Record<string, any>;

  @ManyToOne(() => Section, section => section.fields, {
    onDelete: 'CASCADE',
  })
  section: Section;
}
