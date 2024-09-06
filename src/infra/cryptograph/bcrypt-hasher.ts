import { hash, compare } from 'bcryptjs'
import { HashComparer } from '@/domain/forum/application/cryptograph/hash-comparer'
import { HashGenerator } from '@/domain/forum/application/cryptograph/hash-generator'

export class BcryptHasher implements HashGenerator, HashComparer {
  private HASH_SALT_LENGHT = 8

  async hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGHT)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash)
  }
}
