const mqtt = require("mqtt");
require("dotenv").config();
module.exports = class MQTTClient {
  client;
  constructor() {
    this.client = mqtt.connect(`mqtt://${process.env.MQTT_SERVER_HOST}`);
    this.client.on("connect", () => {
      console.log("MQTT Client is Connected");
    });
    this.client.on("error", (err) => {
      console.log(err);
    });
  }

  publishAdminAction(room, actionPayload) {
    console.log("============> Publishing Admin Action");
    this.client.publish(room, JSON.stringify(actionPayload));
  }
};
