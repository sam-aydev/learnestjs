import { Tag } from 'src/tags/tags.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 34,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 34,
    nullable: false,
  })
  slug: string;

  @Column({
    type: 'varchar',
    length: 34,
    nullable: false,
  })
  propertyStatus: string;

  @OneToOne(() => Tag)
  @JoinColumn()
  propertyTags?: Tag;

  @Column()
  metaOptions: string;
}
