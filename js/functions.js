// ======== ELEMENTOS DEL DOM ========
const cartToggle = document.getElementById("cart-toggle");
const cart = document.getElementById("cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartBtn = document.getElementById("clear-cart");
const addToCartButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");
const cartCloseBtn = document.getElementById("cart-close");

let cartItems = [];

// ======== MOSTRAR / OCULTAR CARRITO ========
cartToggle.addEventListener("click", () => {
  cart.classList.toggle("active");
});

// Cierra el carrito al hacer clic fuera
document.addEventListener("click", (e) => {
  if (!cart.contains(e.target) && !cartToggle.contains(e.target)) {
    cart.classList.remove("active");
  }
});

cartCloseBtn.addEventListener("click", () => {
  cart.classList.remove("active");
});

// ======== AGREGAR PRODUCTO ========
addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);

    const existingItem = cartItems.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cartItems.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

// ======== ACTUALIZAR CARRITO ========
function updateCart() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  cartItems.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} x${item.quantity} <span>$${(
      item.price * item.quantity
    ).toFixed(2)}</span>`;
    cartItemsContainer.appendChild(li);
    total += item.price * item.quantity;
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
  cartCount.textContent = cartItems.reduce((acc, item) => acc + item.quantity, 0);
}

// ======== VACIAR CARRITO ========
clearCartBtn.addEventListener("click", () => {
  cartItems = [];
  updateCart();
});