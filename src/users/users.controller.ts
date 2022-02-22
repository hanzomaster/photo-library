import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common'
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger'
import { UpdateResult } from 'typeorm'
import { AuthService } from '../auth/auth.service'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { LocalAuthGuard } from '../auth/guards/local-auth.guard'
import { Photo } from '../photos/entities/photo.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@ApiTags('users')
@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly authService: AuthService,
	) {}

	@ApiExcludeEndpoint()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	login(@Request() req): any {
		return this.authService.login(req.user)
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto): Promise<User> {
		return this.usersService.create(createUserDto)
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	findAll(): Promise<User[]> {
		return this.usersService.findAll()
	}

	@Get(':id/photos')
	findAllPhoto(@Param('id') id: number): Promise<Photo[]> {
		return this.usersService.findAllPhoto(id)
	}

	@Get(':id')
	findOne(@Param('id') id: number): Promise<User> {
		return this.usersService.findOne(id)
	}

	@Patch(':id')
	update(
		@Param('id') id: number,
		@Body() updateUserDto: UpdateUserDto,
	): Promise<UpdateResult> {
		return this.usersService.update(id, updateUserDto)
	}

	@Delete(':id')
	remove(@Param('id') id: number): Promise<User> {
		return this.usersService.remove(id)
	}
}
