import { Book } from "../../book/entities/book.entity"
import { User } from "../../user/entities/user.entity"
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Loan {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Book, book => book.id)
    @JoinColumn()
    book: Book

    @ManyToOne(() => User, user => user.id)
    @JoinColumn()
    user:User

    @CreateDateColumn({type: 'datetime'})
    loanDate: Date

    @Column({type: 'datetime', nullable:true})
    returnDate: Date
}
