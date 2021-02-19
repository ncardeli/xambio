import * as admin from "firebase-admin";
import logger from "../logging/logger";
import { Cache } from "./cache";

// This class implements a Cache
class FirebaseRtdbCache implements Cache {
  constructor(ttlSeconds: number) {
    logger.info("Cache initialization", { ttlSeconds });
    this.ttlMilliseconds = ttlSeconds * 1000;
  }

  private ttlMilliseconds: number;

  async get(key: string, storeFunction: () => Promise<any>): Promise<any> {
    const ref = admin.database().ref(`__cache/${key}`);
    const snapshot = await ref.once("value");
    if (snapshot.exists()) {
      const cacheEntry = snapshot.val();
      if (cacheEntry.timestamp + this.ttlMilliseconds >= this.now()) {
        logger.info("Cache hit", { key });
        return cacheEntry.value;
      }
    }

    logger.info("Cache miss", { key });

    const result = await storeFunction();

    logger.info("Cache set", { key });
    await ref.set({ timestamp: this.now(), value: result });

    return result;
  }

  flush() {
    const ref = admin.database().ref(`__cache`);
    ref.set({});
  }

  private now(): number {
    return new Date().getTime();
  }
}

export default FirebaseRtdbCache;
