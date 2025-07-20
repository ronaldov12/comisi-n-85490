import mongoose from 'mongoose';

// define la estructura del producto 
const productSchema = new mongoose.Schema({
    title: String,          // nombre del producto
    description: String,    // descripcion 
    price: Number,          // precio en moneda local
    code: String,           // codigo identificador
    stock: Number,          // cantidad disponible
    category: String,       // categoría del producto 
    status: {               // estado de disponibilidad
        type: Boolean,
        default: true         // Por defecto siempre está activo
    },
    thumbnails: [String]    // array de url de imagenes 
});

// crea y exporta el modelo para usarlo en otras partes del programa
export const ProductModel = mongoose.model("Product", productSchema);
