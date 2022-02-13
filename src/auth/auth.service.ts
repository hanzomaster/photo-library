import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { comparePassword } from '../utils/bcrypt'

@Injectable()
export class AuthService {
	constructor(private readonly userService: UsersService) {}

	async validateUser(username: string, pass: string): Promise<any> {
		const user = await this.userService.findOneByName(username)

		if (user && comparePassword(pass, user.password)) {
			const { password, username, ...result } = user
			return Promise.resolve(result)
		}
		return null
	}
}
