import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    code: { type: String, unique: true, required: true },
    stock: Number,
    category: String,
    status: { type: Boolean, default: true }
});

// aplicas el plugin justo despues de definir el esquema
productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model('Product', productSchema);
