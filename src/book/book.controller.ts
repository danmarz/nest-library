import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  Req,
} from '@nestjs/common'
import { Request } from 'express'
import { BookDto } from './dto/book.dto'
import { BookService } from './book.service'
import { Book } from './entity/book.entity'
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // @Get()
  // findAll(@Query('order') order:string, @Query('limit') limit: string) {
  //   const params = [];
  //   if(order !=undefined)
  //   params.push(order);
  //   if(limit !=undefined)
  //   params.push(limit);
  //   return this.bookService.findAll(params);
  // }

  @Get()
  findAll(@Req() request: Request): Promise<Book[]> {
    return this.bookService.findAll(request.query)
  }

  // @Get(':bookId')
  // findBook(@Param('bookId') bookId: string): Book {
  //   return this.bookService.findBook(bookId)
  // }

  @Post()
  async createBook(@Body() newBook: BookDto): Promise<Book> {
    // const newBook: any = body;
    return this.bookService.createBook(newBook)
  }
  // @Delete(':bookId')
  // deleteBook(@Param('bookId') bookId: string): Book {
  //   return this.bookService.deleteBook(bookId)
  // }
  // @Put(':bookdId')
  // updateBook(@Param('bookId') bookId: string, @Body() newBook: BookDto): Book {
  //   // const newBook:any = body;
  //   return this.bookService.updateBook(bookId, newBook)
  // }
}
