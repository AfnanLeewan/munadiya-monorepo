import { registerAs } from '@nestjs/config'
import { plainToInstance } from 'class-transformer'
import {
  IsNumber,
  IsOptional,
  IsString,
  validateOrReject,
} from 'class-validator'

export class RedisConfig {
  @IsString()
  REDIS_URL: string

  @IsNumber()
  REDIS_DEFAULT_PORT: number

  @IsNumber()
  REDIS_CACHE_TTL: number

  @IsNumber()
  REDIS_MAX_RETRIES_PER_REQUEST: number

  @IsNumber()
  REDIS_DEFAULT_REMOVE_ON_COMPLETE: number

  @IsNumber()
  REDIS_DEFAULT_REMOVE_ON_FAIL: number

  @IsNumber()
  REDIS_DEFAULT_ATTEMPTS: number

  @IsString()
  @IsOptional()
  REDIS_PASSWORD: string
}

export const REDIS_CONFIG_KEY = 'redisConfig'

export default registerAs<RedisConfig>(REDIS_CONFIG_KEY, async () => {
  try {
    const configuration = plainToInstance(RedisConfig, {
      REDIS_URL: process.env.REDIS_URL,
      REDIS_DEFAULT_PORT: 6379,
      REDIS_CACHE_TTL: parseInt(process.env.REDIS_CACHE_TTL, 10),
      REDIS_MAX_RETRIES_PER_REQUEST: parseInt(
        process.env.REDIS_MAX_RETRIES_PER_REQUEST,
        10,
      ),
      REDIS_DEFAULT_REMOVE_ON_COMPLETE: parseInt(
        process.env.REDIS_DEFAULT_REMOVE_ON_COMPLETE,
        10,
      ),
      REDIS_DEFAULT_REMOVE_ON_FAIL: parseInt(
        process.env.REDIS_DEFAULT_REMOVE_ON_FAIL,
        10,
      ),
      REDIS_DEFAULT_ATTEMPTS: parseInt(process.env.REDIS_DEFAULT_ATTEMPTS, 10),
      REDIS_PASSWORD: process.env.REDIS_PASSWORD,
    })

    await validateOrReject(configuration)

    return configuration
  } catch (error) {
    throw new Error(error.toString())
  }
})
