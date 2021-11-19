import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Encryption } from 'src/helper/utils/encyption.helper'
import { UserService } from 'src/user/user.service'
import { LoginDto } from './login/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email)
    if (!user) throw new UnauthorizedException()
    const isValidPassword = await Encryption.comparePassword(
      password,
      user.password,
    )

    if (user && isValidPassword) {
      const { password, photo, ...result } = user
      return result
    }
    return null
  }

  async login(user: LoginDto) {
    const payload = { email: user.email }
    const result = await this.validateUser(payload.email, user.password)
    if (result) {
      return { access_token: this.jwtService.sign(payload) }
    }
  }
}
