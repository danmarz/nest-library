import { Controller, Get, Post, Body, HttpException } from '@nestjs/common'
import { LoanService } from './loan.service'
import { CreateLoanDto } from './dto/create-loan.dto'

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async create(@Body() createLoanDto: CreateLoanDto) {
    try {
      return this.loanService.create(createLoanDto) 
    } catch (error) {
      throw new HttpException({
        error: error.message
      }, 403)
    }
  }

  @Get()
  findAll() {
    return this.loanService.findAll()
  }

  // @Get()
  // findAll() {
  //   return this.loanService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.loanService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
  //   return this.loanService.update(+id, updateLoanDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.loanService.remove(+id);
  // }
}
