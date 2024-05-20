import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Repository } from 'typeorm';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { BcryptService } from './bcrypt/bcrypt.service';
import { Observable, from } from 'rxjs';


@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private bcryptService: BcryptService,
    ){ }

    async create(dto: CreateUserDto) {
        const email = dto.email;
        let user = await this.userRepository.findOneBy({ email });

        if(user && user.email === email) {
            throw new ExceptionsHandler();
        }

        let password = dto.password;
        let hash = await this.bcryptService.encodePassword(password);

        return this.userRepository.save({
            ...dto,
            password: hash
        });
    }

    findOne(id:number): Observable<User|null> {
        return from(this.userRepository.findOneBy({id}));
    }

    findAll(): Observable<User[]> {
        return from(this.userRepository.find());
    }

    findUsername(email:string) {
        return this.userRepository.findOneBy({ email });
    }

}
