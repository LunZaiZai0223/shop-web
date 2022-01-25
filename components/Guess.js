import Home from '../pages/Home.js';

const getAllProduct = () => {
  return Home.getProductData();
};

const getRandomProducts = (products) => {
  const result = [];

  while (result.length < 3) {
    const indexNum = Math.floor(Math.random() * products.length);
    if (result.findIndex((x) => x.id === products[indexNum].id) === -1) {
      result.push(products[indexNum]);
    }
  }

  return result;
};

const createGuessItem = (products) => {
  let item = '';

  products.forEach((product) => {
    /* html */
    item += (`
      <li class="mb-3 mb-md-0 col-md-4 guess-list-item">
        <img
          src="${product.images}"
          alt="product img"
          data-product-id-show="${product.id}">
        <a 
          href=""
          data-product-id-add="${product.id}"
          class="py-2"
          >
        加入購物車</a>
        <div class="mt-2 guess-list-item-body">
          <p class="mb-2">${product.title}</p>
          <p class="m-0">NT$${product.price.toLocaleString('en-US')}</p>
        </div>
      </li>
    `);
  });

  return item;
};

const Guess = () => {
  const allProduct = getAllProduct();
  const guessProducts = getRandomProducts(allProduct);
  const item = createGuessItem(guessProducts);

  return item;
};

export default Guess;
