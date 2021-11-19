import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginUserDto } from './dto/login-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { Encryption } from 'src/helper/utils/encyption.helper'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User()
    Object.assign(user, createUserDto)

    return await this.userRepository.save(user)
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: number) {
    return await this.userRepository.findOne(id)
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ email: email })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const dbUser = await this.userRepository.findOne(id)
    const newPassword = await Encryption.encryptPassword(updateUserDto.password)

    Object.assign(dbUser, updateUserDto)
    dbUser.password = newPassword
    return await this.userRepository.save(dbUser)
  }

  async remove(id: number) {
    const dbUser = await this.userRepository.findOne(id)

    if (dbUser) {
      return this.userRepository.delete(dbUser)
    } else throw new BadRequestException('User does not exist.')
  }
}
