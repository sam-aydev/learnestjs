import { MetaOption } from 'src/metaoptions/meta-option.entity';
import { Tag } from 'src/tags/tags.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
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
    length: 400,
    nullable: false,
  })
  description: string;

  @Column({
    type: 'numeric',
    nullable: true,
  })
  area: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  propertyStatus: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  propertyType: string;

  // @Column({
  //   type: 'array',
  //   nullable: true,
  // })
  // propertyTags?: number[];

  @OneToOne(() => MetaOption, (metaOption) => metaOption.property, {
    cascade: true,
    eager: true,
  })
  metaOptions: MetaOption;

  @ManyToOne(() => User, (user) => user.property, {
    eager: true,
  })
  author: User;

  @ManyToMany(() => Tag, (tags) => tags.property, { eager: true })
  @JoinTable()
  tags?: Tag[];
}
