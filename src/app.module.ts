import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BookModule } from './book/book.module'
import { UserModule } from './user/user.module'
import { LoanModule } from './loan/loan.module'
import { isAvailableMiddleware } from './loan/isAvailable.middleware'

@Module({
  imports: [TypeOrmModule.forRoot(), BookModule, UserModule, LoanModule],
})
export class AppModule {}
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(isAvailableMiddleware)
//       .forRoutes({ path: 'book', method: RequestMethod.POST })
//   }
// }
