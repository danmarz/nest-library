import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpCode, HttpStatus, Put, UseFilters } from '@nestjs/common'
import { LoanService } from './loan.service'
import { LoanDto } from './dto/loan.dto'
import { HttpExceptionFilter } from '../helper/http-exception.filter'

// import { UpdateLoanDto } from './dto/update-loan.dto'
@UseFilters(new HttpExceptionFilter())
@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post()
  async create(@Body() loanDto: LoanDto) {
      return await this.loanService.create(LoanDto)
  }

  @Patch(':loanId')
  async update(@Param('loanId') loanId: number, @Body() loanDto: LoanDto){
    return await this.loanService.update(loanId,loanDto)
  }

}
