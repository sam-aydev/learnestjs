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
  @Column()
  lastName: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  @Column()
  email: string;

  @Column({
    type: 'varchar',
    length: 70,
    nullable: false,
  })
  @Column()
  password: string;
}
