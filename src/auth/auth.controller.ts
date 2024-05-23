import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LoginUserDto } from '../user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { Roles } from '../core/decorator/roles.decorator';
import { Role } from '../core/enum/roles.enum';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
    ){}

    @Post('login')
    signIn(@Body() dto: LoginUserDto) {
        return this.authService.authenticatedUser(dto.email, dto.password);
    }

    @UseGuards(AuthGuard,RolesGuard)
    @Roles(Role.Customer,Role.Admin)
    @Get('profile')
    getProfile(@Request() req: any){
        return req.user;
    }

}
