const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));

// main thread
main()
.then(() => {console.log("connection successfull");})
.catch((err) => console.log(err));
// main function
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    // new db - 'whatsapp' will be created if(doesn't exists)
}

//INSERTION
    // Done in init.js 

// ROUTE ROUTE
app.get("/", (req, res) =>{
   return res.send("Root is Working") ;
});

//INDEX ROUTE: It will show all chats
//GET - /chats
app.get("/chats",async (req,res)=>{
    let chats = await Chat.find({});
    // Bcoz, fetching data from DB is an async operation so we use made our callback(req,res) a async callback
    // and made find() promise to await, till data is fetched
    res.render("index.ejs",{chats});
});
app.listen(8080,() => {
    console.log("Server listening on  port 8080");
});

//NEW ROUTE: A button in /chats, will redirect to a form for creating chat
//GET- /chats/new
app.get("/chats/new", (req,res) => {
    res.render( "new.ejs" );
});

//Create ROUTE: After submitting the form from '/chats/new', it will come here.
//Post- /chats
app.post("/chats", async(req,res) => {
    let {from, to, msg} = req.body;     //For parsing req.body we used <Line-10>
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        Created_at: new Date(),
    });

    //Its is a async process,
    //but bcoz its thennable(), it is converted into Promise & it works as async, therefore no need to write 'await'
    newChat.save()
    .then((res) => {
        console.log("chat was saved");
    })
    .catch(err=>console.log(err));
    res.redirect("/chats");                    

});