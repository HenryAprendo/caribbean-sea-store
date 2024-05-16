import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('login')
    signIn(@Body() dto: CreateUserDto) {
        return this.authService.authenticatedUser(dto.email, dto.password);
    }

}
