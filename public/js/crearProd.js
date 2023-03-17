const socket = io();

const form = document.getElementById("#form-generator")
const title = document.getElementById("#title")
const description = document.getElementById("#description")
const price = document.getElementById("#price")
const stock = document.getElementById("#stock")



    form?.addEventListener("submit", e =>{
        e.preventDefault()
        socket.emit("clientNewProd", {
            title: title.value,
            description: description.value,
            price : price.value,
            stock : stock.value,
        })
    })




