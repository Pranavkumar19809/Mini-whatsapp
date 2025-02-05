const express=require('express')
const app=express()
const mongoose =require("mongoose")
const path=require("path")
const methodOverride=require('method-override')
const Chat=require("./models/chat.js")

app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))
app.use(methodOverride("_method"))
main().then(()=>{console.log("connection succesful")})
.catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');

  
}

app.get("/chats",async(req,res)=>{
  let chats= await Chat.find()
  //console.log(chats);
  res.render("index.ejs",{chats})
})
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs")
})
app.get("/",(req,res)=>{
    res.send("root working success")
})
app.post("/chats",(req,res)=>{
  let {from,msg,to}=req.body
  let newchat= new Chat({
    from:from,
    msg:msg,
    to:to,
    created_at: new Date()
  })
  newchat.save().then((res)=>{
    console.log(res)
  }).catch((err)=>{
    console.log(err)
  })
  res.redirect("/chats")
})
app.get("/chats/:id/edit",async(req,res)=>{
  let {id}=req.params
  let chat= await Chat.findById(id)
  res.render("edit.ejs",{chat})
})
app.put("/chats/:id",async(req,res)=>{
  let {id}=req.params
  let {msg:newmsg}=req.body
  let updateChat=await Chat.findByIdAndUpdate(id,
    {msg:newmsg},{runValidators:true,new:true}
  )
  res.redirect("/chats")
})
app.delete("/chats/:id",async(req,res)=>{
  let {id}=req.params
  let k=await Chat.findByIdAndDelete(id)
  console.log(k)

  res.redirect("/chats")
})
app.listen(8080,()=>{
    console.log("app is listening")
})