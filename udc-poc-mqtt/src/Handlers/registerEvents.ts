const functionsList = require("../eventsFunctions.json");
export async function registerEvents() {
  for (let func in functionsList) {
    console.log("registering event: " + func);
    window.addEventListener(func, () => {
      const t = require(`${functionsList[func]}`);
      t.default();
    });
  }
  window.dispatchEvent(new Event("receiveKickAction"));
}
