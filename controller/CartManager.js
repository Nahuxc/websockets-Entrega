const fs = require('fs');
const path = require('path')
const filepath = path.resolve(__dirname, "../database/cart.json")
const { ProductManager } = require("../controller/ProductManager")

class Contenedor {
    constructor(path) {
        this.path = path;
        this.quantity = 0
    }

    async validateExistFile() {
        try {
            await fs.promises.stat(`${this.path}`)
        } catch (err) {
            await fs.promises.writeFile(`${this.path}`, JSON.stringify([]));
        }
    }

    async readFileFn() {
        await this.validateExistFile();
        const contenido = await fs.promises.readFile(`${this.path}`, 'utf-8');
        return JSON.parse(contenido);
    }

    async writeProducts(productos) {
        await this.validateExistFile();
        const data = JSON.stringify(productos, null, 4)
        await fs.promises.writeFile(this.path, data)
    }

    async getAllProdInCart() {
        try {
            const data = await this.readFileFn();
            return data

        } catch {
            console.log('Error al obtener todos los datos del carrito');
        }
    }

    async addProdInCart(prodId) {
        try {
            const data = await this.readFileFn()

            const productos = await ProductManager.getProducts()
            const productoId = productos.findIndex(producto => producto.id == prodId)
            const prod = productos[productoId]

            /* creo un objeto que contenga solo el id del producto asi no traigo todo el producto entero */

            const prodCart = {
                Producto: prod.id
            }

            /* añado el objeto adentro del carrito */
            
            data.push(prodCart)

            await this.writeProducts(data)

            /* devuelvo la cantidad de productos del carrito */
            return data.length;

        } catch (err) {
            throw new Error("No se pudo agregar el producto al carrito", err)
        }
    }
}

const instanciaCartApi = new Contenedor(filepath)

module.exports = {
    CartManager: instanciaCartApi
}