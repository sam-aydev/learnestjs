import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 40,
  })
  label: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 40,
  })
  slug: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 40,
  })
  description?: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 40,
  })
  featuredImgUrl: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 40,
  })
  schema: string;

  @CreateDateColumn()
  createdDate: Date;


  @UpdateDateColumn()
  updatedDate: Date

  
}
