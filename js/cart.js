// js/cart.js
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  const item = cart.find(p => p.name === name);
  if (item) item.qty += 1;
  else cart.push({ name, price, qty: 1 });
  saveCart();
  alert(`${name} added to cart`);
}

function renderCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  if (!list) return;

  list.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.innerHTML = `${item.name} x ${item.qty} <span>₹${item.price * item.qty}</span>`;
    list.appendChild(li);
    total += item.price * item.qty;
  });

  totalEl.textContent = total;
}

function makeOrder() {
  if (cart.length === 0) return alert("Cart is empty!");

  let msg = "Hello, I want to order:%0A";
  cart.forEach(p => {
    msg += `• ${p.name} x ${p.qty} = ₹${p.qty * p.price}%0A`;
  });
  const total = cart.reduce((sum, p) => sum + p.qty * p.price, 0);
  msg += `%0ATotal: ₹${total}`;

  const phone = "919649687305";
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

  // Open WhatsApp link
  window.open(url, "_blank");

  // Clear cart and redirect to thank-you page
  cart = [];
  saveCart();
  setTimeout(() => {
    window.location.href = "thankyou.html";
  }, 500); // Delay to allow WhatsApp tab to open
}


window.onload = renderCart;
