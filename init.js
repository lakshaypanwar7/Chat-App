// This file is supposed to manage & operate all data in DB

const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

// main thread
main()
.then(() => {console.log("connection successfull");})
.catch((err) => console.log(err));
// main function
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    // new db - 'whatsapp' will be created if(doesn't exists)
}

let allChats = [
    {
        from: "Jesus",
        to: "America",
        msg: "Jai shree Ram",
        created_at: new Date(),
    },
    {
        from: "Enzo",
        to: "Ferruccio",
        msg: "Go Back to your tractors, Farmer",
        created_at: new Date(),
    },
    {
        from: "Thanos",
        to: "IronMan",
        msg: "Adhi duniya khatam",
        created_at: new Date(),
    },
    {
        from: "Pakistan",
        to: "India",
        msg: "Papa, Kashmir dedijiye",
        created_at: new Date(),
    },
];
//INSERTION
Chat.insertMany(allChats);