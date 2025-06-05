//! importacion 
const fs = require('fs');
const path = require('path');
const {v4: uuidv4} = require('uuid') //? genera ids unicos

class CartManager{
    constructor(){
        this.filepath  = path.join(__dirname, '../data/carts.json');
            if(!fs.existsSync(this.filepath)){
                fs.writeFileSync(this.filepath, JSON.stringify([], null,2))
                //! si el archivo no existe se crea un array vacio
            }
    }

    async getCart(){
        try{   
        const data = await fs.promises.readFile(this.filepath, 'utf-8'); //? lee el contenido del archivo como texto
        const carts = JSON.parse(data); //? convierte el texto en un array de carritos
        return carts; //! devuelve el array con los carritos encontrados
        }catch(error){
            console.error('error al leer los carros')
            return [];
        }
    }

    async createCart(){
        const carts = await this.getCart(); //! convierte el json en array 
        const newCart = {
            id: uuidv4(),
            products:[] // *inicializa un array vacio
        };

        carts.push(newCart);
        await fs.promises.writeFile(this.filepath, JSON.stringify(carts, null, 2)); //? guarda el array actualizado
        return newCart;
    }

    async getCartById(id){
        try{
            const carts = await this.getCart();
            return carts.find(c => c.id === id)
        } catch (error) {
            console.error('Error al encontrar el carrito:', error);
            return null;
        }
    }
        
    async addProductToCart(cid, pid){
        try{
            const carts  = await this.getCart();
            const cart = carts.find(c => c.id === cid);
                if(!carts)return null;
                const productInCart = cart.products.find(p => p.product === pid);
                if(productInCart){
                    productInCart.quantity++;
                }else{
                    cart.products.push({product: pid, quantity: 1}); 
                }
            await fs.promises.writeFile(this.filepath, JSON.stringify(carts, null, 2));
            return cart;
        }catch(error){
            console.error('error al agregar al carrito', error);
            return null;
        }
    }
        }module.exports = CartManager;

