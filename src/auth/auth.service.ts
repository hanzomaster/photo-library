import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { comparePassword } from '../utils/bcrypt'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.userService.findOneByEmail(email)
		if (user && comparePassword(pass, user.password)) {
			const { password, ...result } = user
			return Promise.resolve(result)
		}
		return null
	}

	async login(user: User) {
		const payload = { email: user.email, sub: user.id }
		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}
