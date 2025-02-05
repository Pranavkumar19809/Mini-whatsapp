const mongoose =require("mongoose")
main().then(()=>{console.log("connection succesful")})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  
}
const Chat=require("./models/chat.js")

let chats=[
    {
        from:"neha",
        to:"pk",
        msg:"hi how are u",
        created_at:new Date()
    },{
        from:"neha2",
        to:"pk2",
        msg:"hi how are u2",
        created_at:new Date()
    },
    {
        from:"neha21",
        to:"pk21",
        msg:"hi how are u21",
        created_at:new Date()
    }
]
Chat.insertMany(chats)
    
 