import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookModule } from './book/book.module'
import { UserModule } from './user/user.module'
import { LoanModule } from './loan/loan.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BookModule,
    UserModule,
    LoanModule, 
]
})
export class AppModule {}
