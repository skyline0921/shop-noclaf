const inputSearch = document.getElementById('inputSearch');

const magnifyingGlass = document.getElementById('magnifyingGlass');

const products = document.getElementById('products');

const screenCard = document.getElementById('screenCard');

const popup = document.getElementById('popup')

const popupValue = document.getElementById("total-prod")

const itemsInCart = document.createElement('span')
itemsInCart.setAttribute('id', 'items-in-cart')

let is_home = false;
let array_cart = [];
let quanty = 0

let array_products = [
    {id: 1, name: 'Oferta do dia', title: 'Rtx 4090', image: 'produto-1', type_img: 'jpg', qtd: 1, description: '', price: 18065, old_price: 12035.55,},
    {id: 2, name: 'Oferta do dia', title: 'Lenovo GM2 Pro', image: 'produto-2', type_img: 'webp', qtd: 1, description: '', price: 135.92, old_price: 75.21},
    {id: 3, name: 'Oferta do dia', title: 'Playstation VR2', image: 'produto-3', type_img: 'jpg', qtd: 1, description: '', price: 3980.9, old_price: 2245.99},
    {id: 4, name: 'Oferta do dia', title: 'MacBook Pro 16', image: 'produto-4', type_img: 'jpeg', qtd: 1, description: '', price: 8095.32, old_price: 6995.81},
    {id: 5, name: 'Oferta do dia', title: 'Gabinete Gamer', image: 'produto-5', type_img: 'jpeg', qtd: 1, description: '', price: 2545.62, old_price: 1495.32},

    {id: 6, name: 'Oferta', title: 'IPhone 13 Pro', image: 'iphone-img', type_img: 'jpeg', qtd: 1, description: '', price: 6999.32, old_price: 5520.96},
    {id: 7, name: 'Oferta', title: 'Air Pods Pro', image: 'fone-img', type_img: 'avif', qtd: 1, description: '', price: 2545.62, old_price: 953.52},
    {id: 8, name: 'Oferta', title: 'Dell XPS 14', image: 'laptop-img', type_img: 'jpg', qtd: 1, description: '', price:  8999.00, old_price: 6582.23},
    {id: 9, name: 'Oferta', title: 'Bvlgari Diagono', image: 'relogio', type_img: 'jpeg', qtd: 1, description: '', price: 92950.99, old_price: 82543.46},
    {id: 10, name: 'Oferta', title: 'LG OLED CX (55 pol)', image: 'tv-img', type_img: 'webp', qtd: 1, description: '', price: 7999.14, old_price: 5672.31}
]

function searchBtn() {    
    if(filteredProducts.length == 0){
        return document.body.appendChild(emptyText())
    }

    return
}

function createPopup() {
    array_cart.forEach((product, index) => {
        
        if (!array_products[product.id]) {
            
            array_products[product.id] = true;

            const product_str = create_tag_product(product, index);

            let divProduct = document.createElement("div");
            divProduct.setAttribute("class", "content");
            divProduct.setAttribute("id", `prod-${product.id}`);        
            divProduct.innerHTML = product_str;

            screenCard.appendChild(divProduct);
        }
    })

    calculationInCart()
}

function openPopup() {
    if(array_cart.length == 0) return

    let popup = document.getElementById('modal-card')
    popup.style.display = 'flex'
    
    screenCard.textContent = "";
    
    let string_storage = localStorage.getItem('array_products')
    array_cart = JSON.parse(string_storage)
    console.log(array_cart)
    
    createPopup()

    let itens = document.getElementById('itens')
    let product = createProducts()
    itens.innerHTML = product
}

function closePopup() {
    let popup = document.getElementById('modal-card')
    popup.style.display = 'none'
}

function transform(valor) {
    if (isNaN(valor) || !isFinite(valor)) {
      return '';
    }
    const partes = valor.toFixed(2).split('.');
    const parteInteira = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    const parteDecimal = partes[1];
    return `R$ ${parteInteira},${parteDecimal}`;
}

function create_tag_product(product, index) {
        return `
        <h3 class="titleH3">${product.name}</h3>
        <img class="qtd: 1, descriptionBtn" src="./assents/logo-dark_noclaf.png" alt="">
        <img class="pdr1 img_product" src="./assents/${product.image}.${product.type_img}" alt="">
        <h3 class="namePdr"> ${product.title} </h3>
        <h2 class="old-price"> ${transform(product.old_price)}</h2>
        <h2 class="price"> ${transform(product.price)}</h2>
        <input class="buy" type="button" onclick="buyProduct(${index})" value="Add ao carrinho">`
}

createHome()

function deleteButton() {
    localStorage.removeItem('array_products')
    let popup = document.getElementById('modal-card')
    popup.style.display = 'none'

    itemsInCart.remove()
    array_cart = []
    quanty = 0
}

function calculationInCart() {
    let calculation = 0 
    array_cart.forEach((product) => {
        calculation += product.old_price * product.qtd
    })
    popupValue.textContent = transform(calculation)
}

function buyProduct(index) {
    console.log(array_cart)
    let prod_res = array_cart.findIndex(prod => prod.id === array_products[index].id)

    if(prod_res > -1){
        array_cart[prod_res].qtd += 1;
        quanty += 1;
    }
    else{
        array_cart.push(array_products[index]);
        quanty += 1;
    }
    
    itemsInCart.textContent = quanty || 0
    popup.appendChild(itemsInCart)
    localStorage.setItem('array_products', JSON.stringify(array_cart));
}

function buttonCart() {
    let string_storage = localStorage.getItem('array_products');
    array_cart = JSON.parse(string_storage);
    console.log(array_cart);
}

function createHome() {
    products.innerHTML = "";
    array_products.forEach((product, index) => {

        const product_str = create_tag_product(product, index);

        let divProduc = document.createElement("div");

        divProduc.setAttribute("class", "content");
        divProduc.setAttribute("id", `prod-${product.id}`);        
        divProduc.innerHTML = product_str;

        products.appendChild(divProduc);
    });
}

function createProducts() {
    let tag_li_str = ''
    console.log(array_cart);
    array_cart.forEach((product, index) => {
        tag_li_str += `<li class="nameItem">
            <div class='row'> 
                <h2>${product.title}, </h2>
                <h3 class="priceOfProduct"> R$ ${product.old_price},</h3>
                <h4 class="productQuantity"> Você possui ${product.qtd} desse produto</h4>
                <img class="deleteItem" src="./assents/X.svg" alt="" onclick="deleteProduct(${index})">
            </div>
        </li>`
    })

    return tag_li_str
}

function deleteProduct(index) {
    array_cart.splice(index, 1)
    localStorage.setItem('array_products', JSON.stringify(array_cart))

    openPopup()

    const itemsInCartLocalStorage = JSON.parse(localStorage.getItem('array_products'));
    itemsInCart.textContent = itemsInCartLocalStorage.length || 0;
}

magnifyingGlass.addEventListener('click', function() {
    const searchText = inputSearch.value.toLowerCase();

    products.innerHTML = "";

    const filteredProducts = array_products.filter(product => {
        const productTitle = product.title.toLowerCase();
        return productTitle.includes(searchText);
    })

    let footer = document.getElementsByTagName('footer')[0];

    let emptyCart = document.getElementById('empty-cart')

    if (filteredProducts.length == 0) {
        emptyCart.textContent = "Nenhum resultado encontrado. Verifique a ortografia ou use uma palavra ou frase diferente."
        footer.style.bottom = "0"
    }

    else{
        footer.style.bottom = "auto"
        emptyCart.textContent = ""
    }

    filteredProducts.forEach((product, index) => {
        const product_str = create_tag_product(product, index);
        let divProduc = document.createElement("div");
        divProduc.setAttribute("class", "content");
        divProduc.setAttribute("id", `prod-${product.id}`);
        divProduc.innerHTML = product_str;
        products.appendChild(divProduc);
    })
})