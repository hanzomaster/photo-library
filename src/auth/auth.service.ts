import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { comparePassword } from '../utils/bcrypt'

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UsersService,
		private readonly jwtService: JwtService,
	) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userService.findOneByName(username)
		if (user && comparePassword(pass, user.password)) {
			const { password, ...result } = user
			return Promise.resolve(result)
		}
		return null
	}

	async login(user: any) {
		const payload = { name: user.username, sub: user.id }
		return {
			access_token: this.jwtService.sign(payload),
		}
	}
}
