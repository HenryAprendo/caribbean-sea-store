import { IsString, isString } from 'class-validator';
import { Role } from '../../core/enum/roles.enum';

export class CreateUserDto {

    @IsString()
    email: string;

    @IsString()
    password: string;

    role: Role;

}