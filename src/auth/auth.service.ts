import { Injectable } from '@nestjs/common'
import { Encryption } from 'src/helper/utils/encyption.helper'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    // const user = await this.userService.findOne(null, email)
    const user = await this.userService.findOne(email)

    if (user && Encryption.comparePassword(password, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}


