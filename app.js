const productContainer = document.querySelector(".grid");

// Obtén los productos desde el archivo JSON (products.json) y crea las tarjetas
fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      const card = createProductCard(product);
      productContainer.appendChild(card);
    });
  });

// Función para crear una tarjeta de producto
const createProductCard = (product) => {
  const card = document.createElement("div");

  card.innerHTML = `
  <div class="flex flex-col md:h-80 rounded-lg bg-white shadow hover:shadow-md p-6">
  <img src="/${product.image}" alt="${product.name}" class="w-32 h-32 mx-auto mb-4 object-contain">
  <h2 class="text-lg">${product.name}</h2>
  <a href="/product.html?id=${product.id}" class="flex mt-auto items-center">
  <button class="bg-sky-500 text-white p-2 mt-4 ml-auto rounded" data-id="${product.id}">
  Ver detalle
  </button>
  </a>
  </div>
      `;
  return card;
};
