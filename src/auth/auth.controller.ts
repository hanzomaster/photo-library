import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { ApiExcludeController } from '@nestjs/swagger'
import { CreateUserDto } from '../users/dto/create-user.dto'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiExcludeController()
@Controller('auth')
export class AuthController {
	constructor(
		private readonly usersService: UsersService,

		private readonly authService: AuthService,
	) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Req() req): any {
		return this.authService.login(req.user)
	}

	@Post('register')
	register(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.create(createUserDto)
	}
}
