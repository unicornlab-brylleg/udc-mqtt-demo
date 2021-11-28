# UDC-SOCKET-MQTT

## run instructions:

- start the socket server:
  `cd udc-services-controller`
  `yarn`
  `yarn start `
- start web app
  `cd udc-poc-mqtt`
  `yarn`
  `yarn start`

## Login Creds

for an Admin:
email: k@gmail.com
pass: k
for an enduser:
email: k@gmail.com
pass: p

yes same email different pass. bc im lazy

=> basically the structure right now is that the socket server connects to the broker hosted on a VM if the user wants to publish a message it would be done through socket.

- the app is connected to the vm to get the messages
