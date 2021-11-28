const redis = require("redis");
module.exports = class redisClient {
  client;
  constructor() {
    this.initRedisClient();
  }
  initRedisClient = async () => {
    try {
      let t = redis.createClient({
        host: "localhost",
        port: 6379,
        password: "",
      });
      console.log("redis client created");
      this.redisClient = t;
    } catch (err) {
      console.log(err);
    }
  };

  addUserToSessionList(sessionId, userId) {
    try {
      this.redisClient.sadd(sessionId, userId);
      console.log("added user to session list");
    } catch (err) {
      console.log(err);
    }
  }
};
