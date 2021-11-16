import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Req,
  ParseIntPipe,
} from '@nestjs/common'
import { Request } from 'express'
import { BookDto } from './dto/book.dto'
import { BookService } from './book.service'
import { Book } from './entity/book.entity'
import { DeleteResult } from 'typeorm'
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  
  // TODO : get with queries
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

  @Get(':bookId')
  findBook(@Param('bookId', ParseIntPipe) bookId: number): Promise<Book> {
    return this.bookService.findBookById(bookId)
  }

  @Post()
  createBook(@Body() newBook: BookDto): Promise<Book> {
    return this.bookService.createBook(newBook)
  }

  @Delete(':bookId') 
  deleteBook(@Param('bookId', ParseIntPipe) bookId: number): Promise<DeleteResult> {
    return this.bookService.deleteBook(bookId)
  }

  @Put(':bookId')
  updateBook(@Param('bookId', ParseIntPipe) bookId: number, @Body() newBook: BookDto): Promise<Book> {
    return this.bookService.updateBook(bookId, newBook)
  }
}
