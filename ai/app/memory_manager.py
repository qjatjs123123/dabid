import redis
import os

redis_client = redis.StrictRedis(
    host=os.getenv("REDIS_HOST"),
    port=os.getenv("REDIS_PORT"),
    db=0,
    password=os.getenv("REDIS_PASSWORD"),
    charset="utf-8"
)

class MemoryManager:

    def clear(self, id):
        redis_client.delete(f"context:{id}")

    def add(self, id, message):
        redis_client.rpush(f"context:{id}", message)

    def list(self, id):
        return redis_client.lrange(f"context:{id}", 0, -1)