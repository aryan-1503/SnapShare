import { createClient } from "redis";
import "dotenv/config"

// FOR PRODUCTION
const redisClient = createClient({
    url : process.env.REDIS_URL
});

// FOR DEVELOPMENT
// const redisClient = createClient();
redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect();

export const getOrSetCache = async (key, cb) => {
    try {
        const cachedData = await redisClient.get(key);
        if (cachedData !== null) {
            return JSON.parse(cachedData);
        }

        const freshData = await cb();

        await redisClient.setEx(key, 3600, JSON.stringify(freshData));

        return freshData;
    } catch (error) {
        console.error("Redis Error:", error);
        throw error;
    }
};

