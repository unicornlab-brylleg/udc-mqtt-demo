var mosca = require("mosca");
var settings = {
  port: 1884,
};
var server = new mosca.Server(settings);
server.on("ready", function () {
  console.log(
    `Mosca server is up and running on http://localhost:${settings.port}`
  );
});
