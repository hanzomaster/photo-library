import * as bcrypt from 'bcrypt'

export const encodedPassword = (password: string): string => {
	const hashedPassword = bcrypt.hashSync(password, 10)
	return hashedPassword
}

export const comparePassword = (
	password: string,
	hashedPassword: string,
): boolean => {
	return bcrypt.compareSync(password, hashedPassword)
}
