import {
	IsAlpha,
	IsAlphanumeric,
	IsEmail,
	IsNotEmpty,
	IsString,
	MinLength,
} from 'class-validator'

export class CreateUserDto {
	@IsAlphanumeric()
	@IsNotEmpty()
	username: string

	@IsString()
	@MinLength(8)
	@IsNotEmpty()
	password: string

	@IsAlpha()
	@IsNotEmpty()
	@MinLength(3)
	firstName: string

	@IsAlpha()
	@IsNotEmpty()
	lastName: string

	@IsNotEmpty()
	@IsEmail()
	email: string
}
