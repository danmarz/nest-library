import { Test, TestingModule } from '@nestjs/testing'
import { LoanController } from '../src/loan/loan.controller'
import { LoanService } from '../src/loan/loan.service'

describe('LoanController', () => {
  let controller: LoanController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoanController],
      providers: [LoanService],
    }).compile()

    controller = module.get<LoanController>(LoanController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
