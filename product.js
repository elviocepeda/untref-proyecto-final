const cartItems = JSON.parse(localStorage.getItem("untref-cart")) || [];
const productDetail = document.getElementById("product-detail");
const addToCartButton = document.getElementById("add-to-cart");

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
      const existingItem = cartItems.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
        localStorage.setItem("untref-cart", JSON.stringify(cartItems));
        console.log("quantity++");
      } else {
        cartItems.push({ ...product, quantity: 1 });
        localStorage.setItem("untref-cart", JSON.stringify(cartItems));
        console.log("nuevo producto");
      }
    });
    productDetail.appendChild(card);
  });
