import * as mqtt from "mqtt";
export const mqttConnectionHandler = async (stateSetter: any) => {
  var client = mqtt.connect("mqtt://20.124.99.194:9001");
  client.on("connect", function () {
    console.log("MQTT:Connected");
    stateSetter(client);
    client.publish("topic", "hello from admin");
  });
};
