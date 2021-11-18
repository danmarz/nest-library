import { Module } from '@nestjs/common'
import { LoanService } from './loan.service'
import { LoanController } from './loan.controller'
import { BookModule } from 'src/book/book.module'
import { UserModule } from 'src/user/user.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Loan } from './entities/loan.entity'

@Module({
  imports:[BookModule, UserModule, TypeOrmModule.forFeature([Loan])],
  controllers: [LoanController],
  providers: [LoanService]
})
export class LoanModule {}
