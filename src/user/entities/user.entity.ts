import { Encryption } from '../../helper/utils/encyption.helper'
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  photo: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await Encryption.encryptPassword(this.password) // hashed password
  }
}
