const cartItems = JSON.parse(localStorage.getItem("untref-cart")) || [];
const totalAmountTitle = document.getElementById("total-amount");
const cart = document.getElementById("cart"); // Empty cart message
const emptyCartMessage = document.getElementById("empty-cart-message");
console.log(emptyCartMessage);
console.log(cart);
console.log(totalAmountTitle);
// Add to cart
export const addToCart = (product) => {
  const existingItem = cartItems.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
};

// Render cart
export const updateCart = () => {
  if (cartItems.length > 0) emptyCartMessage.classList.add("hidden");
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  console.log("totalAmount: ", totalAmount);
  cart.innerHTML = "";
  totalAmountTitle.innerHTML = `$ ${Math.floor(totalAmount)}`;
  console.log(cartItems);
  cartItems.forEach((item) => {
    const total = item.price * item.quantity;
    const cartItem = document.createElement("div");
    if (cartItems.length === 0) cartItem.innerHTML = `asdasd`;
    console.log(`Total amount: $${totalAmount}`);
    console.log(`Total items: ${totalItems}`);
    cartItem.innerHTML = `
        <div class="md:flex justify-between items-center">
          <div>
            ${item.name} x${item.quantity}<br/>  
            $${Math.floor(total)}
          </div>
          <div>
            <button class="remove bg-sky-500 text-white p-2 mt-4 rounded" data-id="${
              item.id
            }">Eliminar</button>
            <button class="increase font-bold bg-sky-500 text-white p-2 w-10 mt-4 rounded" data-id="${
              item.id
            }">+</button>
            <button class="decrease font-bold bg-sky-500 text-white p-2 w-10 mt-4 rounded" data-id="${
              item.id
            }">-</button>    
          </div>
        </div>
                  `;

    cart.appendChild(cartItem);
  });

  // Payment action
  const paymentActionButton = document.getElementById("payment-action");
  if (cartItems.length === 0) paymentActionButton.classList.add("hidden");
  paymentActionButton.addEventListener("click", () => {
    alert("Confirmación de compra exitosa!");
    cartItems.splice(0);
    localStorage.setItem("untref-cart", JSON.stringify([]));
    updateCart();
  });

  // Delete all from cart
  const deleteCartButton = document.getElementById("delete-cart");
  if (cartItems.length === 0) deleteCartButton.classList.add("hidden");
  deleteCartButton.addEventListener("click", () => {
    cartItems.splice(0);
    localStorage.setItem("untref-cart", JSON.stringify([]));
    updateCart();
  });

  // Remove item button
  const removeButtons = cart.querySelectorAll(".remove");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = parseInt(button.getAttribute("data-id"));
      removeFromCart(itemId);
    });
  });

  // Increase quantity button
  const increaseButtons = cart.querySelectorAll(".increase");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = parseInt(button.getAttribute("data-id"));
      increaseQuantity(itemId);
    });
  });

  // Decrease quantity button
  const decreaseButtons = cart.querySelectorAll(".decrease");
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = parseInt(button.getAttribute("data-id"));
      decreaseQuantity(itemId);
    });
  });
};
updateCart();
// Remove item from cart
export const removeFromCart = (itemId) => {
  const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    localStorage.setItem("untref-cart", JSON.stringify(cartItems));
    updateCart();
  }
};

// Increase quantity
export const increaseQuantity = (itemId) => {
  const item = cartItems.find((item) => item.id === itemId);
  if (item) {
    item.quantity++;
    localStorage.setItem("untref-cart", JSON.stringify(cartItems));
    updateCart();
  }
};

// Decrease quantity
export const decreaseQuantity = (itemId) => {
  const item = cartItems.find((item) => item.id === itemId);
  if (item && item.quantity > 1) {
    item.quantity--;
    localStorage.setItem("untref-cart", JSON.stringify(cartItems));
    updateCart();
  }
};
