import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
    ){ }

    @Post()
    async createUser(@Body() dto: CreateUserDto) {
        const { password, ...response } = await this.userService.create(dto);
        return response;
    }

    findAll(): Observable<User[]> {
        return this.userService.findAll();
    }

}
