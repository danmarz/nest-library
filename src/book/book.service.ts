import { Injectable } from '@nestjs/common'
import { Book } from './interface/book.class'
import { Book as Entity } from './entity/book.entity'
import { BookDto } from './dto/book.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

const books:Array<Book> = [
  {
    id: 1,
    title: "El enigma de la habitación 622",
    genre: "Ficción contemporánea",
    description: "Vuelve el «principito de la literatura negra contemporánea, el niño mimado de la industria literaria» (GQ): el nuevo thriller de Joël Dicker es su novela más personal. ",
    author: "Joël Dicker",
    publisher: "Alfaguara",
    pages: 624,
    image_url: "https://images-na.ssl-images-amazon.com/images/I/41KiZbwOhhL._SX315_BO1,204,203,200_.jpg"
  },
  {
    id: 2,
    title: "El enigma de la habitación 622",
    genre: "Ficción contemporánea",
    description: "Vuelve el «principito de la literatura negra contemporánea, el niño mimado de la industria literaria» (GQ): el nuevo thriller de Joël Dicker es su novela más personal. ",
    author: "Joël Dicker",
    publisher: "Alfaguara",
    pages: 624,
    image_url: "https://images-na.ssl-images-amazon.com/images/I/41KiZbwOhhL._SX315_BO1,204,203,200_.jpg"
  },]

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Entity) private bookRepository: Repository<Entity>
  ){}

  findAll(params): any {
  }
  findBook(bookId:string){
    //  return `findBook funciona con bookId:${bookId}`;
    return books.find(element => element.id === +bookId)
  }
  createBook(newBook: BookDto): Book{
    const book = new Book()
    book.id = 99
    book.author = newBook.author
    book.description = newBook.description
    book.genre = newBook.genre
    book.pages = +newBook.pages
    book.publisher = newBook.publisher
    book.title = newBook.title

    books.push(book)

    return book
  }
  deleteBook(bookId:string){
    const index = books.findIndex(element => element.id === +bookId)
    // return `deleteBook funciona con bookId:${bookId}`;
    return  books.splice(index,1)[0]
    
  }
  updateBook(bookId:string, newBook:BookDto){
    const index = books.findIndex(element => element.id === +bookId)
    const book = new Book()
    book.id = +bookId
    book.author = newBook.author
    book.description = newBook.description
    book.genre = newBook.genre
    book.pages = +newBook.pages
    book.publisher = newBook.publisher
    book.title = newBook.title
    // return `deleteBook funciona con bookId:${bookId}`;
    return books.splice(index,1,book)[0]

    // return newBook;
  }
}
