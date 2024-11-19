import express from 'express'
import { create } from 'express-handlebars'
import path from 'path'
import { __dirname } from './path.js'
import productRouter from './routes/productos.routes.js'
import cartRouter from './routes/carritos.routes.js'
import multerRouter from './routes/imagenes.routes.js'


const app = express()
const hbs = create()
const PORT = 8080


app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')




app.use('/static', express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'))
console.log(__dirname);



app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/upload', multerRouter)
const productos = [
    {nombre: "Remera", marca: "Nike", precio: 24500, stock: 10, status: true},
    {nombre: "Pantalon", marca: "Adidas", precio: 54000, stock: 17, status: true},
    {nombre: "Gorra", marca: "Champions", precio: 17000, stock: 54, status: false}
]

app.get('/', (req,res) => {
    res.render('productos', {productos})
})

app.listen(PORT, () => {
    console.log("Server on port", PORT)
})