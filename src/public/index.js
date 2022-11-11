const socketClient = io();

const chatContainer = document.getElementById("chatContainer");

socketClient.on("messagesChat",(data)=>{
    let messages = "";
    data.forEach(element=>{
        messages += `<p>Autor: ${element.author} - Mensaje: ${element.text}</p>`;
    })
    chatContainer.innerHTML = messages;
});

// Capturar el nombre del usuario
let user = "";
Swal.fire({
    title: "Bienvenido",
    text: "Ingresa tu nombre de usuario",
    input: "text",
    allowOutsideClick: false
}).then(response=>{
    user = response.value;
    document.getElementById("username").innerHTML = `Bienvenido: ${user}`;
})

// Enviar mensaje al servidor
const chatForm = document.getElementById("chatForm");

chatForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const newMessage = {
        author: user,
        text: document.getElementById("messageChat").value
    } 
    socketClient.emit("newMessage",newMessage);
});
