const productListEl = document.getElementById("product-list");
const cartItemsEl = document.getElementById("cart-items");
const cartCountEl = document.getElementById("cart-count");
const totalPriceEl = document.getElementById("total-price");

// Embedded product data (No fetch needed)
const products = [
  {
    id: 1,
    name: "Echo Dot (4th Gen)",
    price: 49.99,
    image: "https://m.media-amazon.com/images/I/61IxWv3ecpL._AC_SL1000_.jpg"
  },
  {
    id: 2,
    name: "Fire TV Stick 4K",
    price: 39.99,
    image: "https://m.media-amazon.com/images/I/51Da2Z+FTtL._AC_SL1000_.jpg"
  },
  {
    id: 3,
    name: "Kindle Paperwhite",
    price: 129.99,
    image: "https://m.media-amazon.com/images/I/61jnhQ+O6HL._AC_SL1000_.jpg"
  },
  {
    id: 4,
    name: "Apple AirPods",
    price: 199.99,
    image: "https://m.media-amazon.com/images/I/71NTi82uBEL._AC_SL1500_.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Render all products
function renderProducts() {
  productListEl.innerHTML = "";
  products.forEach(product => {
    const el = document.createElement("div");
    el.className = "product";
    el.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productListEl.appendChild(el);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existing = cart.find(p => p.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  saveCart();
  updateCartUI();
}

// Update the cart display
function updateCartUI() {
  cartItemsEl.innerHTML = "";
  let total = 0;
  let count = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    cartItemsEl.appendChild(li);
    total += item.price * item.quantity;
    count += item.quantity;
  });

  cartCountEl.textContent = count;
  totalPriceEl.textContent = total.toFixed(2);
}

// Save cart to local storage
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// Initialize
renderProducts();
updateCartUI();
