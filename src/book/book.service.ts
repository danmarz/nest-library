import { Injectable } from '@nestjs/common'
import { Book } from './entity/book.entity'
import { BookDto } from './dto/book.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository } from 'typeorm'

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  async findAll(params): Promise<Book[]> {
    return await this.bookRepository.find()
  }

  async createBook(newBook: BookDto): Promise<Book> {
    const book: Book = new Book()

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

  deleteBook(id: number): Promise<DeleteResult> {
    return this.bookRepository.delete(id)
  }

  async updateBook(bookId: number, newBook: BookDto): Promise<Book> {
    let toUpdate = await this.bookRepository.findOne(bookId)

    if (!toUpdate) {
      throw new Error('Book not found')
    }

    let updated = Object.assign(toUpdate, newBook)
    return this.bookRepository.save(updated)
  }
}
