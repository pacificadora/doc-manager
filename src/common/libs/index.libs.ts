import * as bcrypt from 'bcrypt';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import * as crypto from 'crypto';

export class BcryptUtil {
    static async hashPassword(password: string, salt: string): Promise<string> {
        return await bcrypt.hash(password, salt);
    }
    static async getSalt(): Promise<string> {
        return await bcrypt.genSalt();
    }
}

export class CryptoUtil {
    static generateHash(): string {
        return crypto
            .createHash('sha256')
            .update(randomStringGenerator())
            .digest('hex');
    }
}
