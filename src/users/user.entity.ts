import { Property } from 'src/property/property.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
    length: 70,
    nullable: true,
  })
  password: string;

  @OneToMany(() => Property, (property) => property.author)
  property: Property[];
}
