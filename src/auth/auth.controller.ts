import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('login')
    signIn(@Body() dto: LoginUserDto) {
        return this.authService.authenticatedUser(dto.email, dto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req: any){
        return req.user;
    }

}
