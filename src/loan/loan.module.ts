import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LoanService } from './loan.service'
import { LoanController } from './loan.controller'
import { BookModule } from 'src/book/book.module'
import { Loan } from './entities/loan.entity'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([Loan]) , BookModule, UserModule],
  controllers: [LoanController],
  providers: [LoanService],
})
export class LoanModule {}
