const express = require("express");
const {Server} = require("socket.io");
const app = express();
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}`);
});
app.use(express.static(__dirname+"/public"));

// Configurar websocket
const io = new Server(server);

const messages = [
    {author: "Juan", text: "Hola que tal?"},
    {author: "Pedro", text: "Muy bien y vos?"},
    {author: "Ana", text: "Genial!"} 
]

// Detectar cada socket de un cliente que se conecte al socket del backend
io.on("connection",(socket)=>{
    socket.emit("messagesChat",messages);
    socket.on("newMessage",(data)=>{
        messages.push(data);
        socket.emit("messagesChat",messages);
    })
});

