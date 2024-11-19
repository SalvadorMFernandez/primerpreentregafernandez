import { Router } from "express";
import crypto from "crypto"

constcartRouter = Router()

const carritos =[]

cartRouter.get('/:cid', (req,res) => {
    const idCarrito = req.params.cid
    const carrito = carritos.find(cart => cart.id == idCarrito)

    if(carrito) {
        res.status(200).send(carrito.products)
    } else {
        res.status(404).send({mensaje: "El carrito no existe"})
    }
})

cartRouter.post('/', (req,res) => {
    const newcart ={
        id: crypto.randomBytes(5).toString('hex'),
        products: []
    }

    carritos.push(newcart)

    res.status(200).send(`Carrito creado correctamente con el id ${newcart.id}`)
})

cartRouter.post('/:cid/products/:pid', (req,res) => {
    const idCarrito = req.params.cid
    const idproducto = req.params.pid
    const {quantity} = req.body
    const carrito = carritos.find(cart => cart.id == idCarrito)

    if(carrito) {
        const indice = carrito.products.findIndex(prod => prod.id == idProducto)
        if(indice != -1) {
            carrito.products[indice]. quantity = quantity
        } else {
            carrito.products.push({id: idProducto, quantity: quantity})
        }
        res.status(200).send("Carrito actualizado correctamente")
    } else {
        res.status(404).send({mensaje: "El carrito no existe"})
    }
})

export default cartRouter
