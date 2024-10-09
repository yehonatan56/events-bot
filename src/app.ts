import {Client} from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import fs from "fs";
const ids:string[] = []
const client = new Client({

});
client.on("ready", () => {
    console.log("Client is ready!");
});
client.on("message_create", async (message) => {

    if (message.body.includes("גמר חתימה טובה") && !ids.includes(message.from)) {
        await message.reply(fs.readFileSync("./src/answer.txt", "utf-8"));
        ids.push(message.from)

    }
});

client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

client.initialize();
