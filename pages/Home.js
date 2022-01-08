// import api
import { getAllProductsData, addProductsIntoCart, fetchOneProductData } from '../api/apiHelper.js';

// import utils
import { getSelectOptions, render, showAddingProductAlert, showBanner, getProductIdAndType, addingProductIntoCart, getOneProductData, addProductIdToHash } from '../utils.js';

// import components 
// import Banner from '../components/Banner.js';
import Advantage from '../components/Advantage.js';
import Compare from '../components/Compare.js';
import Recommendation from '../components/Recommendation.js';
import How from '../components/How.js';

let productData = [];

/**
 * 
 * @param {Array} categories 
 * @returns {HTML Elements}
 */
const createSelectOptionEles = (categories) => {
  let options = '<option value="全部商品">全部商品</option>';

  categories.forEach((cate) => {
    options += `
    <option value="${cate}">${cate}</option>
    `;
  });

  return options;
};

const handleChange = (event) => {
  console.log('start change');
  console.log(event.target.value);
  const filterResult = getFilterResult(event.target.value);
  const productLiEles = createProductItemEle(filterResult);
  render(document.querySelector('[data-product-list]'), productLiEles);
  console.log('end change');
};

// 1. go to product page 
// 2. add products into cart
const handleClick = async (event) => {
  event.preventDefault();
  const productTypeAndId = getProductIdAndType(event.target);
  console.log(productTypeAndId);
  addingProductIntoCart(productTypeAndId);
  const productData = await getOneProductData(productTypeAndId);
  console.log(productData);
  addProductIdToHash(productData);
};

/**
 * 
 * @param {String} 
 * @returns {Array} 
 */
const getFilterResult = (filterWord) => {
  return filterWord === '全部商品' ? productData : (() => productData.filter((product) => product.category === filterWord))();
};

/**
 * 
 * @param {Array}
 * @returns {HTML Element}
 */
const createProductItemEle = (filterResult) => {
  console.log(filterResult);
  let item = '';

  filterResult.forEach((result) => {
    item += `
      <li class="col-md-3 col-sm-6 product-item">
        <h5 class="product-label">${result.category}</h5>
        <div class="product-image-wrapper">
          <img
            src="${result.images}"
            alt="product image"
            data-product-id-show="${result.id}"
          >
        </div>
        <a class="product-item-add-btn" href="" data-product-id-add="${result.id}">加入購物車</a>
        <div class="d-flex justify-content-between my-3 flex-column product-item-content">
          <h3>${result.title}</h3>
          <div>
            <p class="m-0 product-item-content-original-price">NT$${result.origin_price}</p>
            <p class="product-item-content-price">NT$${result.price}</p>
          </div>
        </div>
      </li>
        `;
  });

  return item;
};

const Home = {
  render: () => {
    const item = (`
    ${Advantage()}
    ${Compare()}
    ${Recommendation()}
    ${How()}

    <section class="container-xl product">
      <select class="product-select" data-product-select>
      ${createSelectOptionEles(getSelectOptions(productData))}
      </select>

      <ul class="row p-0 product-list" data-product-list>
      ${createProductItemEle(productData)}
      </ul>
    </section>
    `);

    return item;
  },
  updateProductData: async () => {
    productData = await getAllProductsData();
  },

  getProductData: () => {
    return productData;
  },

  after_render: () => {
    // select change event
    document.querySelector('[data-product-select]').addEventListener('change', handleChange);
    // product list click event
    document.querySelector('[data-product-list]').addEventListener('click', handleClick);
    showBanner();
  }



};

export default Home;
