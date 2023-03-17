const {Server} = require("socket.io")
const {ProductManager} = require("../../controller/ProductManager")

function configureSocket(httpServer){


    const socketServer = new Server(httpServer)
    socketServer.on("connection", async (socket)=>{

        console.log("funcionando socket");
        const productos = await ProductManager.getProducts()
        socket.emit("serverLoadProd", productos )

        socket.on("clientNewProd", async data =>{
            const producto = {...data}
            const añadir = await ProductManager.save(producto)
            console.log(`se creo el producto ${añadir}`);
            socket.emit("serverNewProd", producto)
        })

        socket.on("clientDeleteProd", async (prodId) =>{
            const productos = await ProductManager.getProducts()
            const productoId = productos.filter((prod) => prod.id !== prodId);
            socket.emit("serverLoadProd", productos[productoId])

        })
    })


}

module.exports = {
    configureSocket
}