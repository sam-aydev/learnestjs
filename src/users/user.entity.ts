import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: false,
  })
  password: string;
}
