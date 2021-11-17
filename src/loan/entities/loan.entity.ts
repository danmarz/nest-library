import { Book } from 'src/book/entity/book.entity'
import { User } from 'src/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne((type) => Book, (book) => book.id)
  @JoinColumn()
  book: number

  @OneToOne((type) => User, (user) => user.id)
  @JoinColumn()
  user: number

  @CreateDateColumn({ type: 'datetime' })
  loanDate: Date

  @Column({ type: 'datetime', nullable: true })
  returnDate: Date
}
