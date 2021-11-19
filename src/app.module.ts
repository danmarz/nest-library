import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookModule } from './book/book.module'
import { UserModule } from './user/user.module'
import { LoanModule } from './loan/loan.module'
import { AuthModule } from './auth/auth.module';
// import { AppController } from './app.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    BookModule,
    UserModule,
    LoanModule,
    AuthModule, 
],
  // controllers: [AppController]
})
export class AppModule {}
