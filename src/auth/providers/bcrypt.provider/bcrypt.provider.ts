import { Injectable } from '@nestjs/common';
import { HashingProvider } from '../hashing.provider/hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  public async hashPassword(data: string | Buffer): Promise<string> {
    const salt = await bcrypt.genSalt()
    return bcrypt.hash(data, salt)
  }

  comparePassword(data: string | Buffer, encrypted: string): Promise<boolean> {
    return bcrypt.compare(data, encrypted);
  }
}
