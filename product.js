const productDetail = document.getElementById("product-detail");
const addToCartButton = document.getElementById("add-to-cart");
const totalAmountTitle = document.getElementById("total-amount");
const cartItems = JSON.parse(localStorage.getItem("untref-cart")) || [];
const cart = document.getElementById("cart");

// ID from params
const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get("id"));

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const product = data.find((item) => item.id === productId);
    const card = document.createElement("div");

    // Card product details
    card.innerHTML = `
        <div class="flex flex-col">
        <img src="/${product.image}" alt="${product.name}" class="w-80 h-80 mx-auto mb-4 object-contain">
        <h2 class="text-lg">${product.name}</h2>
        </div>`;

    addToCartButton.addEventListener("click", () => {
      addToCart(product);
    });
    productDetail.appendChild(card);
  });

// Add to cart
const addToCart = (product) => {
  const existingItem = cartItems.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }
  updateCart();
};

// Update cart
export const updateCart = () => {
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  cart.innerHTML = "";
  totalAmountTitle.innerHTML = `$ ${Math.floor(totalAmount)}`;
  cartItems.forEach((item) => {
    const total = item.price * item.quantity;
    const cartItem = document.createElement("div");
    console.log(`Total amount: $${totalAmount}`);
    console.log(`Total items: ${totalItems}`);
    cartItem.innerHTML = `
    <div class="flex justify-between items-center">
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
    localStorage.setItem("untref-cart", JSON.stringify(cartItems));
  });

  // Payment action
  const paymentActionButton = document.getElementById("payment-action");
  paymentActionButton.addEventListener("click", () => {
    alert("Confirmación de compra exitosa!");
    cartItems.splice(0);
    updateCart();
  });

  // Delete all from cart
  const deleteCartButton = document.getElementById("delete-cart");
  deleteCartButton.addEventListener("click", () => {
    cartItems.splice(0);
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
const removeFromCart = (itemId) => {
  const itemIndex = cartItems.findIndex((item) => item.id === itemId);
  if (itemIndex !== -1) {
    cartItems.splice(itemIndex, 1);
    updateCart();
  }
};

// Increase quantity
const increaseQuantity = (itemId) => {
  const item = cartItems.find((item) => item.id === itemId);
  if (item) {
    item.quantity++;
    updateCart();
  }
};

// Decrease quantity
const decreaseQuantity = (itemId) => {
  const item = cartItems.find((item) => item.id === itemId);
  if (item && item.quantity > 1) {
    item.quantity--;
    updateCart();
  }
};
