import { Property } from 'src/property/property.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 40,
    unique: true,
  })
  label: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 512,
  })
  slug?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 512,
  })
  description?: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 40,
  })
  featuredImgUrl?: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 40,
  })
  schema: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
