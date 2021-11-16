import { Injectable } from '@nestjs/common'
// import { Book } from './interface/book.class'
import { Book } from './entity/book.entity'
import { BookDto } from './dto/book.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { DeepPartial, DeleteResult, Repository } from 'typeorm'

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
    @InjectRepository(Book) private bookRepository: Repository<Book>
  ){}

  async findAll(params): Promise<Book[]> {
    return await this.bookRepository.find()
  }

  async createBook(newBook: BookDto): Promise<Book>{
    const book: Book = new Book()
    // Object.assign(book,newBook)
   
    book.title = newBook.title
    book.author = newBook.author
    book.pages = +newBook.pages
    book.genre = newBook.genre
    book.description = newBook.description
    book.publisher = newBook.publisher
    book.image_url = newBook.image_url

    return await this.bookRepository.save(book)
  }

  findBookById(id: number): Promise<Book> {
    return this.bookRepository.findOne(id)
  }
  
  deleteBook(id:number): Promise<DeleteResult>{
    return this.bookRepository.delete(id)
  }

  // updateBook(bookId:number, newBook:BookDto): Promise<DeepPartial<Book>[]>{
  //   const book: Promise<Book> = this.bookRepository.findOne(bookId)
  //   return this.bookRepository.save(book, newBook)

    async updateBook(bookId: number, newBook: BookDto): Promise<Book> { 
    let toUpdate = await this.bookRepository.findOne(bookId)
  
    if (!toUpdate) {
      throw new Error('Book not found');
    }

    let updated = Object.assign(toUpdate, newBook); 
    return this.bookRepository.save(updated); 
  }
    // const index = books.findIndex(element => element.id === +bookId)
    // const book = new Book()
    // book.id = +bookId
    // book.author = newBook.author
    // book.description = newBook.description
    // book.genre = newBook.genre
    // book.pages = +newBook.pages
    // book.publisher = newBook.publisher
    // book.title = newBook.title
    // return `deleteBook funciona con bookId:${bookId}`;
    // return books.splice(index,1,book)[0]

    // return newBook;
  // }
  // const index = books.findIndex(element => element.id === id)
  // return `deleteBook funciona con bookId:${bookId}`;
  // return  books.splice(index,1)[0]
  // findBook(bookId:string){
    //   //  return `findBook funciona con bookId:${bookId}`;
    //   return books.find(element => element.id === +bookId)
    // }
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
    
  // }
}
