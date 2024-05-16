import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {

    async encodePassword(password:string, saltOrRound = 10) {
        let hash = await bcrypt.hash(password,saltOrRound);
        return hash;
    }

}
