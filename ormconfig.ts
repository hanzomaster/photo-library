import * as dotenv from 'dotenv'
import { join } from 'path'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

dotenv.config()

const config: PostgresConnectionOptions = {
	type: 'postgres',
	port: +process.env.DB_PORT,
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	schema: process.env.DB_SCHEMA,
	database: process.env.DB_NAME,
	entities: [join(__dirname, '**', '*.entity.{ts,js}')],
	synchronize: true,
	logging: true,
}

export default config
