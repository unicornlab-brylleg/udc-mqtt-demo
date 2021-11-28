import { connect, Client } from "mqtt";
export class MqttHandler {
  client: Client;
  constructor() {
    this.client = connect(
      `mqtt://${process.env.REACT_APP_MQTT_HOST}:${process.env.REACT_APP_MQTT_HOST_WS_PORT}`
    );
    this.client.on("connect", () => {
      console.log("connected from handler class");
    });
    this.client.on("error", () => {
      console.log("error");
    });
  }
  subToTopic(topic: string) {
    console.log("subscribing to topic");
    this.client.subscribe(topic);
  }

  onTopicPublished(passedTopic: string, callback: Function) {
    console.log("subscribing to topic");
    this.client.on("message", (topic: string, message: string) => {
      if (topic === passedTopic) {
        callback(message.toString());
      }
    });
  }
}
