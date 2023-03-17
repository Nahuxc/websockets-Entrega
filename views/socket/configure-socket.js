const {Server} = require("socket.io")

function configureSocket(httpServer){


    const socketServer = new Server(httpServer)
    socketServer.on("connection", (socket)=>{
        console.log("funcionando socket");
        socket.on("clientNewProd", data =>{
            console.log("clientNewProd", data);
        })
    })


}

module.exports = {
    configureSocket
}