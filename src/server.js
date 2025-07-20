import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import path from 'path';
import exphbs from 'express-handlebars';
import mongoose from 'mongoose';

import ProductRouters from './routers/products.rutas.js';
import cartRouters from './routers/carts.rutas.js';
import viewsRouter from './routers/views.router.js';
import ProductManager from './services/ProductManager.js';

const manager = new ProductManager();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ✅ Puerto blindado
const PORT = process.env.PORT || 8080;

// 🧼 Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve('public')));

// 🎨 Handlebars configurado correctamente
app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    layoutsDir: path.resolve('src/views/layouts') // CORREGIDO
}));
app.set('view engine', 'handlebars');
app.set('views', path.resolve('src/views')); // CORREGIDO

// 🧭 Rutas
app.use('/api/products', ProductRouters);
app.use('/api/carts', cartRouters);
app.use('/', viewsRouter);

// 🔌 WebSocket
io.on('connection', async socket => {
    console.log('🟢 Cliente conectado via WebSocket');

    const products = await manager.getProducts();
    socket.emit('updateProducts', products);

    socket.on('newProduct', async data => {
        await manager.addProduct(data);
        const updatedProducts = await manager.getProducts();
        io.emit('updateProducts', updatedProducts);
    });
});

// 🛢️ MongoDB y arranque
mongoose.connect('mongodb://localhost:27017/ecommerce')
    .then(() => {
        console.log('✅ Conectado a MongoDB');

        server.listen(PORT, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('❌ Error al conectar a MongoDB:', err);
    });
