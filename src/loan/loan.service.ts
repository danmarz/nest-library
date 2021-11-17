import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { BookService } from 'src/book/book.service'
import { UserService } from 'src/user/user.service'
import { getConnection, Repository } from 'typeorm'
import { Loan } from './entities/loan.entity'

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan) private loanRepository: Repository<Loan>,
    private bookService: BookService,
    private userService: UserService,
  ) {}

  async create(loanDTO): Promise<Loan> {
    const loan = new Loan()
    const book = await this.bookService.findOne(loanDTO.bookId)
    console.log(loanDTO);
    console.log(book)
    console.log(loan)
    const user = await this.userService.findOne(loanDTO.userId)
    let newLoan: Loan
    try {
      if (!book.available) throw new Error('Book Not Available for Loan')
      book.available = false
      // console.log(loan);
      // loan.book = book
      // loan.user = user
      Object.assign(loan, loanDTO)

      await getConnection().transaction(async (manager) => {
        newLoan = await manager.save(loan)
        await manager.save(book)
      })
      return newLoan
    } catch (error) {
      throw error
    }

    // return `This action adds a new loan ${loanDTO}`
  }

  findAll(): Promise<Loan[]> {
    return getConnection()
      .getRepository(Loan)
      .find({ relations: ['book', 'user'] })
  }

  async findOne(id): Promise<Loan> {
    return await this.loanRepository.findOne(id, { relations: ['book'] })
  }

  async update(id): Promise<Loan> {
    const loan = await this.findOne(id)
    console.log(loan)
    const book = await this.bookService.findOne(loan.id)
    // const user = await this.userService.findOne(loanDto.userId)
    let newLoan: Loan

    try {
      if (book.available) return

      book.available = true
      loan.returnDate = new Date()

      await getConnection().transaction(async (manager) => {
        newLoan = await manager.save(loan)
        await manager.save(book)
      })

      return newLoan
    } catch (error) {
      throw error
    }
  }
  // findAll() {
  //   return `This action returns all loan`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} loan`;
  // }

  // update(id: number, updateLoanDto: UpdateLoanDto) {
  //   return `This action updates a #${id} loan`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} loan`;
  // }
}
