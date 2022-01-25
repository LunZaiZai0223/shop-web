import { addProductsIntoCart } from '../api/apiHelper.js';
import { showAddingProductAlert, scrollMove } from '../utils.js';

const handleClick = async (event) => {
  event.preventDefault();
  const { productId } = event.target.dataset;
  addProductsIntoCart(productId);
  showAddingProductAlert();
};

const Product = {
  render: (product) => {
    const item = (`
    <section class="single-product mt-3 mb-5 my-md-5 px-md-0 px-3">
    <div class="row justify-content-center px-md-0 px-3">
      <div class="col-md-5">
        <img
          src="${product.images}"
          alt="product image" class="single-product-image">
      </div>
      <div class="col-md-5 mt-3 mt-md-0 single-product-text">
        <h1 class="single-product-text-title" data-product-title>
        ${product.title}
        </h1>
        <p class="single-product-text-original-price mb-2" data-product-original-price>NT$ ${product.origin_price.toLocaleString('en-US')}</p>
        <p class="single-product-text-price mb-2" data-product-price>NT$ ${product.price.toLocaleString('en-US')}</p>
        <p><strong style="color: #ff0000">兩週內快速出貨</strong></p>
        <p class="mb-2">【商品分類】</p>
        <p data-product-category>${product.category}</p>
        <p class="mb-2">【商品介紹】</p>
        <p data-product-description>${product.description}</p>
        <a href="" class="mt-3 mt-md-0 single-product-text-add-btn" data-product-id="${product.id}">加入購物車</a>
      </div>
    </div>
  </section>
    `);

    return item;
  },
  after_render: () => {
    scrollMove();
    const addProductIntoCartButton = document.querySelector('[data-product-id]');
    addProductIntoCartButton.addEventListener('click', handleClick);
  }
};

export default Product;
