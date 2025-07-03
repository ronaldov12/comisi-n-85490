const socket = io();

const form = document.getElementById('productForm');
const list = document.getElementById('productList');

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const product = Object.fromEntries(formData.entries());
    socket.emit('newProduct', product); 
    form.reset();
});

socket.on('updateProducts', products => {
    list.innerHTML = '';
    products.forEach(p => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${p.titulo}</strong> - $${p.precio}<br><em>${p.descripcion}</em>`;
        list.appendChild(li);
    });
});
