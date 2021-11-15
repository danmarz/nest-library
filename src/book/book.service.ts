import { Injectable } from '@nestjs/common'

@Injectable()
export class BookService {
  findAll(): any {
    return 'findAll funcionando'
  }
}
