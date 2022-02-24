import { IsAlpha, IsAlphanumeric, IsEmail, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsAlphanumeric()
	username: string

	@MinLength(8)
	password: string

	@IsAlpha()
	firstName: string

	@IsAlpha()
	lastName: string

	@IsEmail()
	email: string
}
