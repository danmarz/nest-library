import { Injectable } from '@nestjs/common'
// import { Book } from './interface/book.class'
import { Book } from './entities/book.entity'
import { createBookDto } from './dto/book.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>
  ){}

  async findAll({order=1,limit=0}={}): Promise<Book[]> {
    const sort = order?'ASC':'DESC'
    
    return await this.bookRepository.find({order:{title:sort},take:limit})
  }

  async createBook(newBook: createBookDto): Promise<Book>{
    const book: Book = new Book()
    // Object.assign(book,newBook)
   
    book.title = newBook.title
    book.author = newBook.author
    book.pages = +newBook.pages
    book.genre = newBook.genre
    book.description = newBook.description
    book.publisher = newBook.publisher
    book.image_url = newBook.image_url
    book.available = true
    return await this.bookRepository.save(book)
  }

  async findBook(bookId): Promise<Book>{
    //  return `findBook funciona con bookId:${bookId}`;
    return await this.bookRepository.findOne(bookId)
  }
  // createBook(newBook: BookDto): Book{
  //   const book = new Book()
  //   book.id = 99
  //   book.author = newBook.author
  //   book.description = newBook.description
  //   book.genre = newBook.genre
  //   book.pages = +newBook.pages
  //   book.publisher = newBook.publisher
  //   book.title = newBook.title

  //   books.push(book)

  //   return book
  // }
  // deleteBook(bookId:string){
  //   const index = books.findIndex(element => element.id === +bookId)
  //   // return `deleteBook funciona con bookId:${bookId}`;
  //   return  books.splice(index,1)[0]
    
  // }
  // updateBook(bookId:string, newBook:BookDto){
  //   const index = books.findIndex(element => element.id === +bookId)
  //   const book = new Book()
  //   book.id = +bookId
  //   book.author = newBook.author
  //   book.description = newBook.description
  //   book.genre = newBook.genre
  //   book.pages = +newBook.pages
  //   book.publisher = newBook.publisher
  //   book.title = newBook.title
  //   // return `deleteBook funciona con bookId:${bookId}`;
  //   return books.splice(index,1,book)[0]

  //   // return newBook;
  // }
}
