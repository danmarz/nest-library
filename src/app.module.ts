import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BookController } from './book/book.controller'
import { BookService } from './book/book.service'

@Module({
  imports: [TypeOrmModule.forRoot()],
  controllers: [AppController, BookController],
  providers: [AppService, BookService],
})
export class AppModule {}
