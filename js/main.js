// product section variables
const firstHomeSection = document.querySelector('#primerSeccion')
const secondHomeSection = document.querySelector('#segundaSeccion')
const thirdHomeSection = document.querySelector('#terceraSeccion')
const menSection = document.querySelector('#seccionHombre')
const womenSection = document.querySelector('#seccionMujer')
const firstChildSection = document.querySelector('#primerSeccionNinios')
const secondChildSection = document.querySelector('#segundaSeccionNinios')

// cart variables
let cart = []
// cart page variables
const cartContainer = document.querySelector('#carrito')
const emptyCart = document.querySelector('.carritoVacio')
const shoppingContainer = document.querySelector('.contenedorCompra')
const cartProducts = document.querySelector('#productosCarrito')
const buttonFinishBuying = document.querySelector('.botonFinalizarCompra')

// load products from storage
document.addEventListener('DOMContentLoaded', () => {
  cart = JSON.parse(localStorage.getItem('cart')) || []

  if (cartContainer && cart.length) {
    emptyCart.classList.add('hidden')
    shoppingContainer.classList.remove('hidden')

    showCartProducts()
  }
  // display products in product pages
  if (!cartContainer) {
    showProducts()
    updateCartQuantity()
  }
})

// fetch products
async function getData() {
  const response = await fetch(
    firstHomeSection ? './productos.json' : '../productos.json'
  )
  return response.json()
}

// function to add products to different sections
function addProducts(productList, section) {
  productList.forEach((prod) => {
    section.innerHTML += `
      <article class="producto">
        <div class="card rounded-0">
          <img
            src="${firstHomeSection ? prod.img : `.${prod.img}`}"
            class="card-img-top"
            alt="${prod.type} ${prod.name}"
          />
          <div class="card-body">
            <h2 class="card-title precioProd">$${prod.price}</h2>
            <p class="card-text descripcionProd">${prod.name}</p>
            <button
              id="${prod.id}"
              class="btn btnCompra"
              onclick="addToCart(${prod.id})"
            >
              Comprar
            </button>
          </div>
        </div>
      </article>
    `
  })
}

// function to display products
async function showProducts() {
  const productList = await getData()

  // add products per page
  if (firstHomeSection) {
    // separate products by sections
    const firstHomeSectionProducts = productList.slice(0, 4)
    const secondHomeSectionProducts = productList.slice(4, 8)
    const thirdHomeSectionProducts = productList.slice(8, 12)

    // add products to home
    addProducts(firstHomeSectionProducts, firstHomeSection)
    addProducts(secondHomeSectionProducts, secondHomeSection)
    addProducts(thirdHomeSectionProducts, thirdHomeSection)
  }

  if (menSection) {
    // filter men's products
    const menProducts = productList.filter((prod) => prod.category === 'hombre')
    // add products to men's page
    addProducts(menProducts, menSection)
  }

  if (womenSection) {
    // filter women's products
    const womenProducts = productList.filter(
      (prod) => prod.category === 'mujer'
    )
    // add products to women's page
    addProducts(womenProducts, womenSection)
  }

  if (firstChildSection) {
    // filter children's products
    const childProducts = productList.filter(
      (producto) => producto.category === 'niños'
    )

    // separate products by sections
    const firstChildSectionProducts = childProducts.slice(0, 4)
    const secondChildSectionProducts = childProducts.slice(4, 8)

    // add products to children's page
    addProducts(firstChildSectionProducts, firstChildSection)
    addProducts(secondChildSectionProducts, secondChildSection)
  }
}

// cart functions
// add product to cart
async function addToCart(id) {
  const productList = await getData()
  const productToBuy = productList.find((prod) => prod.id === id)

  if (cart.some((prod) => prod.id === productToBuy.id)) {
    cart.map((prod) => {
      if (prod.id === productToBuy.id) {
        prod.quantity++
      }
    })
  } else {
    cart.push(productToBuy)
  }

  updateCartQuantity()
  localStorage.setItem('cart', JSON.stringify(cart))

  Toastify({
    text: 'Tu producto se añadió al carrito',
    duration: 3000,
    style: {
      color: 'black',
      background: '#FFBD59',
    },
  }).showToast()
}

// update quantity of products in cart
function updateCartQuantity() {
  const cartQuantity = document.querySelector('.cantidadCarrito')
  cartQuantity.textContent = cart.length
}

// add cart products to cart page
function showCartProducts() {
  cartProducts.innerHTML = ''
  if (cart.length) {
    cart.forEach((prod) => {
      cartProducts.innerHTML += `
        <article class="productoCarrito">
          <img class="imgProdCarrito"
            src=".${prod.img}"
            alt="${prod.type} ${prod.name}"
          />
          <span class="nombreProdCarrito">${prod.name}</span>
          <span class="precioProdCarrito">
            $${prod.price * prod.quantity}
          </span>
          <span class="cantidadProdCarrito">
            Cantidad: ${prod.quantity}
          </span>
          <button class="removeBtn" onclick="deleteFromCart(${prod.id})">
            <i class="bi bi-trash"></i>
          </button>
        </article>
      `
    })
  }

  updateCartTotalPrice()
}

// total sum of the prices of the products in the cart
function updateCartTotalPrice() {
  const cartTotalPrice = document.querySelector('.precioTotalCarrito')
  const total = cart.reduce((acc, prod) => acc + prod.price * prod.quantity, 0)
  cartTotalPrice.innerHTML = `$${total}`
}

// remove a product from the cart
function deleteFromCart(prodId) {
  cart = cart.filter((prod) => prod.id !== prodId)

  localStorage.setItem('cart', JSON.stringify(cart))

  Toastify({
    text: 'El producto fue eliminado del carrito',
    duration: 3000,
    style: {
      color: 'black',
      background: 'red',
    },
  }).showToast()

  showCartProducts()

  if (!cart.length) {
    emptyCart.classList.remove('hidden')
    shoppingContainer.classList.add('hidden')
    localStorage.clear()
  }
}

// complete the purchase
cartContainer &&
  buttonFinishBuying.addEventListener('click', () => {
    Swal.fire(
      'Compra realizada con éxito!',
      'Gracias por elegirnos!',
      'success'
    )
    localStorage.clear()
    cart = []

    emptyCart.classList.remove('hidden')
    shoppingContainer.classList.add('hidden')
  })
