// impora express
const express = require('express');
// importa las rutas
const productsRouter = require('./routes/products.rutas')
const CartsRouter = require('./routes/carts.rutas')

const app = express();// !crea la aplicacion
const PORT = 8080;//! define el puerto

app.use(express.json()); // !middleware para poder leer json en peticiones

//!defino los endpoints
app.use('/api/products', productsRouter);
app.use('/api/carts', CartsRouter);


app.listen(PORT, ()=>{
    console.log(`Servidor corriendo en  http://localhost:${PORT}`)
})