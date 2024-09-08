import redis, { type RedisOptions } from 'ioredis';
import { environment } from '~/consts/environment';

let client: redis | null = null;
export const getRedisClient = async (): Promise<redis> => {
    if (client != null) return client;
    const RedisConnection: RedisOptions = {
        host: environment.redis.host,
        port: environment.redis.port,
        username: environment.redis.user,
        password: environment.redis.pass,
        tls:
            environment.redis.ssl === true
                ? {
                      servername: environment.redis.host,
                  }
                : undefined,
    };
    client = new redis(RedisConnection);
    return client;
};
