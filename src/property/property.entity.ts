import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  featured_img: string;
}
