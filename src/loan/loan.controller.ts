import { Controller, Post, Body, Patch, Param, UseFilters, UseGuards } from '@nestjs/common'
import { LoanService } from './loan.service'
import { LoanDto } from './dto/loan.dto'
import { HttpExceptionFilter } from '../helper/exceptions/http-exception.filter'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

// import { UpdateLoanDto } from './dto/update-loan.dto'
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
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
