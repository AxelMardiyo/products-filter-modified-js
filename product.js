const productDOM = document.querySelector(".single-product");
const url = "https://www.course-api.com/javascript-store-single-product";

// Theme Toggle
// Fetch Product from API
const fetchProduct = async () => {
  try {
    productDOM.innerHTML = '<h4 class="text-center text-lg">Loading...</h4>';
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const response = await fetch(`${url}?id=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    productDOM.innerHTML = '<p class="text-center text-red-500">There was a problem loading the product. Please try again later.</p>';
  }
};

// Display Product
const displayProduct = (product) => {
  const { company, colors, description, name: title, price, image } = product.fields;
  const { url: img } = image[0];
  document.title = title.toUpperCase();

  const colorsList = colors
    .map((color) => `<span class="w-6 h-6 inline-block rounded-full" style="background: ${color}"></span>`)
    .join("");

  productDOM.innerHTML = `
    <div class="flex flex-col lg:flex-row items-center gap-8">
      <img src="${img}" alt="${title}" class="w-full lg:w-1/2 rounded shadow-md" />
      <div class="flex flex-col items-start space-y-4 text-gray-800 dark:text-gray-200">
        <h3 class="text-2xl font-bold">${title}</h3>
        <h5 class="text-xl font-semibold">${company}</h5>
        <span class="text-blue-500 font-semibold text-lg">$${(price / 100).toFixed(2)}</span>
        <div class="flex gap-2">${colorsList}</div>
        <p class="text-gray-600 dark:text-gray-400">${description}</p>
        <button class="px-4 py-2 bg-blue-500 text-white rounded dark:bg-blue-700">Add to Cart</button>
      </div>
    </div>`;
};

const start = async () => {
  const data = await fetchProduct();
  displayProduct(data);
};

start();
