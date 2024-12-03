import express from 'express'
import { create } from 'express-handlebars'
import { Server } from 'socket.io'
import path from 'path'
import { __dirname } from './path.js'
import productRouter from './routes/productos.routes.js'
import cartRouter from './routes/carrito.routes.js'
import multerRouter from './routes/imagenes.routes.js'
import { log } from 'console'


const app = express()
const hbs = create()
const PORT = 8080

const Server = app.listen(PORT, () => {
    console.log("Server on port", PORT)
})

//inicializo socket.io en el servidor 
const io = new Server(server)

app.use(express.json()) 
app.use(express.urlencoded({extended: true}))

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')




app.use('/static', express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'))
console.log(__dirname);



app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/chat', chatRouter)
app.use('/upload', multerRouter)
const productos = [
    {nombre: "Remera", marca: "Nike", precio: 24500, stock: 10, status: true},
    {nombre: "Pantalon", marca: "Adidas", precio: 54000, stock: 17, status: true},
    {nombre: "Gorra", marca: "Champions", precio: 17000, stock: 54, status: false}
]

app.get('/', (req,res) => {
    res.render('templates/productos', {productos: productos, js: 'productos.js', css: 'productos.css'})
})

// conexiones de socket.io
//socket = info que llega de la conexion
io.on('connection', ()=>{ //cuando se produzca el "apreton de manos", puedo ejecutar las siguientes funciones  
    console.log("Usuario conectado", socket.id); // id de conexion

    socket.on("mensaje", (data) => { // cuando el ususario me envia un mensaje, trabajo con esos datos
        console.log("mensaje recibido: ", data);
        //enviar mensaje
        socket.emit("respuesta", "mensaje recibido correctamente: ", data)
    })

    //detectar desconeccion
    socket.on("disconnect", () =>{
        console.log("usuario desconectado: ", socket.id);
    })
})