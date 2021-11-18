import * as bcrypt from 'bcrypt'

export class Encryption {
  static async encryptPassword(password: string) {
    return await bcrypt.hash(password, 10)
  }

  static async comparePassword(incPassword: string, storedPassword: string) {
      return await bcrypt.compare(incPassword, storedPassword)
  }
}
