import * as dotenv from 'dotenv'

dotenv.config()
export const jwtConstants = {
	secret: process.env.JWT_ACCESS_SECRET,
	refreshSecret: process.env.JWT_REFRESH_SECRET,
	secretExpiration: process.env.JWT_ACCESS_SECRET_EXPIRATION,
	refreshSecretExpiration: process.env.JWT_REFRESH_SECRET_EXPIRATION,
}
