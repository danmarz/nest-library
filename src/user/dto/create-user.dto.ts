import { PartialType } from "@nestjs/mapped-types";
import { LoginUserDto } from "./login-user.dto";
import { IsNotEmpty } from 'class-validator'

export class CreateUserDto extends PartialType(LoginUserDto){
    // @IsNotEmpty()
    readonly photo: string
}
