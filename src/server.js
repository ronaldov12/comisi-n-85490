const express = require('express');
const { Server } = require('socket.io');
const http = require('http');
const exphbs = require('express-handlebars');
const ProductRouters = require('./routers/products.rutas');
const cartRouters = require('./routers/carts.rutas');
const viewsRouter = require('./routers/views.router.js');

const ProductManager = require('./services/ProductManager');
const manager = new ProductManager();


const app = express();
const server = http.createServer(app)
const io = new Server(server)
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use('/api/products', ProductRouters);
app.use('/api/carts', cartRouters);
app.use('/', viewsRouter);

io.on('connection', async socket => {
    console.log('Cliente conectado via WebSocket');
    //Envia la lista de productos al nuevo cliente
    const products = await manager.getProducts();
    socket.emit('updateProducts', products);
    // Escuchar producto nuevo enviado desde el cliente
    socket.on('newProduct', async data => {
        await manager.addProduct(data);
        const updateProducts = await manager.getProducts();
        io.emit('updateProducts', updateProducts);//lo envia a todos
    });
});
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});