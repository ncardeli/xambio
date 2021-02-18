const NodeCache = require("node-cache");
const logger = require("../../logging/logger");

class Cache {
  constructor(ttlSeconds) {
    logger.info("Cache initialization", { ttlSeconds });
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false
    });
  }

  async get(key, storeFunction) {
    const value = this.cache.get(key);
    if (value) {
      logger.info("Cache hit", { key });
      return value;
    }

    logger.info("Cache miss", { key });

    const result = await storeFunction();

    logger.info("Cache set", { key });
    this.cache.set(key, result);

    return result;
  }

  flush() {
    this.cache.flushAll();
  }
}

module.exports = Cache;
