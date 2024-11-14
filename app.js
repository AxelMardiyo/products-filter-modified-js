const url = "https://www.course-api.com/javascript-store-products";
const productsContainer = document.querySelector(".products-container");
let products = [];
let filteredProducts = [];

// Fetch Products from API
const fetchProducts = async () => {
  productsContainer.innerHTML = '<div class="text-center text-lg">Loading...</div>';
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    products = data;
    filteredProducts = data;
    displayProducts(filteredProducts);
    displayButtons();
  } catch (error) {
    console.log(error);
    productsContainer.innerHTML = '<p class="text-center text-red-500">There was an error loading products.</p>';
  }
};

// Display Products
const displayProducts = (list) => {
  if (list.length < 1) {
    productsContainer.innerHTML = `<h6 class="text-center text-gray-500">Sorry, no products matched your search</h6>`;
    return;
  }

  productsContainer.innerHTML = list
    .map((product) => {
      const { id } = product;
      const { name: title, price } = product.fields;
      const { url: image } = product.fields.image[0];
      const formatPrice = (price / 100).toFixed(2);

      return `<a href="./product.html?id=${id}" class="block bg-white dark:bg-gray-800 p-4 rounded shadow-md transition duration-300">
                <article class="product">
                  <img src="${image}" class="w-full h-40 object-cover rounded mb-4" alt="${title}" />
                  <footer class="flex justify-between items-center">
                    <h5 class="font-medium">${title}</h5>
                    <span class="text-blue-500 font-semibold">$${formatPrice}</span>
                  </footer>
                </article>
              </a>`;
    })
    .join("");
};

// Text Filter
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value.toLowerCase();
  filteredProducts = products.filter((product) => {
    return product.fields.name.toLowerCase().includes(inputValue);
  });
  displayProducts(filteredProducts);
});

// Display Filter Buttons
const companiesDOM = document.querySelector(".companies");

const displayButtons = () => {
  const buttons = ["all", ...new Set(products.map((product) => product.fields.company))];

  companiesDOM.innerHTML = buttons
    .map((company) => {
      return `<button class='company-btn m-1 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200' data-id="${company}">
                ${company.charAt(0).toUpperCase() + company.slice(1)}
              </button>`;
    })
    .join("");
};

// Filter by Company
companiesDOM.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("company-btn")) {
    if (el.dataset.id === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.fields.company === el.dataset.id;
      });
    }
    searchInput.value = "";
    displayProducts(filteredProducts);
  }
});

// Initialize by fetching products
fetchProducts();
