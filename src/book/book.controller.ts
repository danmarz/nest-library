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
import { createBookDto } from './dto/book.dto'
import { BookService } from './book.service'
import { Book } from './entities/book.entity'
import { ApiOperation, ApiResponse } from '@nestjs/swagger'
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
  @ApiOperation({ summary: 'Obtener lista de todos los libros' })
  @ApiResponse({ status: 201, description: 'lista de libros', type: Book })
  findAll(@Req() request: Request): Promise<Book[]> {
    return this.bookService.findAll(request.query)
  }

  // @Get(':bookId')
  // findBook(@Param('bookId') bookId: string): Book {
  //   return this.bookService.findBook(bookId)
  // }

  @Post()
  async createBook(@Body() newBook: createBookDto): Promise<Book> {
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
