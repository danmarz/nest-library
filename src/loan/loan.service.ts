import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { BookService } from '../book/book.service'
import { getConnection, Repository } from 'typeorm'

import { Loan } from './entities/loan.entity'
import { UserService } from 'src/user/user.service'
import { InjectRepository } from '@nestjs/typeorm'
import { LoanDto } from './dto/loan.dto'

// import { CreateLoanDto } from './dto/create-loan.dto';
// import { UpdateLoanDto } from './dto/update-loan.dto';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan) private loanRepository:Repository<Loan>,
    private bookService: BookService,
    private userService: UserService
  ) { }
  async create(loanDto): Promise<Loan> {
    const loan = new Loan()
    const book = await this.bookService.findBook(loanDto.bookId)
    const user = await this.userService.findOne (loanDto.userId)
    let newLoan: Loan

    try {

      if (!book.available)
        throw new Error('Book Not Available for Loan')

      book.available = false
      loan.book = book
      loan.user = user
      Object.assign(loan, loanDto)

      await getConnection().transaction(async manager => {

        newLoan = await manager.save(loan)
        await manager.save(book)
      })

      return newLoan
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }


    // return `This action adds a new loan ${loanDTO}`
  }

  // findAll() {
  //   return `This action returns all loan`;
  // }

  async findLoan(id: number, loan:LoanDto): Promise<Loan[]> {
    console.log(loan)
    // const book = new Book()
    // const user = new User()
    // book.id = loan.bookId
    // user.id = loan.userId
    
    return await this.loanRepository.find({
      where:{
        book:{id:1}, 
        // user:{id: 1},
        returnDate:null
      },
      relations:['book']
      })
  }

  async update(id, loanDto): Promise<Loan> {
    try {
    const loan = (await this.findLoan(id,loanDto))[0]
      console.log(loan)
    if(loan === undefined) throw new Error('No borrowed books')
    const book = await this.bookService.findBook(loan.book.id)
    // const user = await this.userService.findOne(loanDto.userId)
    let newLoan: Loan


      if (book.available)
        return

      book.available = true
      loan.returnDate = new Date()
      
      

      await getConnection().transaction(async manager => {

        newLoan = await manager.save(loan)
        await manager.save(book)
      })

      return newLoan
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN)
    }

  }

  // remove(id: number) {
  //   return `This action removes a #${id} loan`;
  // }
}
