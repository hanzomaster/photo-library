import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	UseGuards,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { UpdateResult } from 'typeorm'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { Photo } from '../photos/entities/photo.entity'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@ApiTags('users')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

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
