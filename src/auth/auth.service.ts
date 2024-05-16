import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '../user/bcrypt/bcrypt.service';
import { UserService } from '../user/user.service';


@Injectable()
export class AuthService {

    constructor(
        private userService: UserService,
        private bcryptService: BcryptService,
        private jwtService: JwtService,
    ){}

    async authenticatedUser(email:string, password:string) {
        let user = await this.userService.findUsername(email);
        let hash = '';

        if(user){
            hash = user.password;
        }

        let isMatch = await this.bcryptService.compare(password,hash);

        if(!isMatch){
            throw new UnauthorizedException();
        }

        const payload = {
            sub: user?.id, username: user?.email, role: user?.role
        }

        return {
            access_token: await this.jwtService.signAsync(payload)
        };

    }


}










