// import { displayLoading, hideLoading } from "./utils.js";

export function getAllProductsData () {
  // displayLoading();
  const url = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/products';

  return axios.get(url).then(getProducts);
}

function getProducts (promise) {
  const { products } = promise.data;
  return products;
}

export function getCartProductsData () {
  const ulr = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/carts';

  return axios.get(ulr).then(getCartProductData);
}

function getCartProductData (promise) {
  const { carts } = promise.data;
  const { finalTotal } = promise.data;
  const cartData = {
    carts,
    finalTotal
  };

  return cartData;
}

export function deleteAllCartProducts () {
  const url = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/carts';

  return axios.delete(url).then((response) => {
    const { carts } = response.data;
    const { finalTotal } = response.data;
    const cartData = {
      carts,
      finalTotal
    };

    return cartData;
  });
}

export async function addProductsIntoCart (productId) {
  console.log('hi add product into cart');
  console.log(productId);
  const url = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/carts';
  const config = {
    data: {
      productId,
      quantity: 1
    }
  };
  await axios.post(url, config);
}

export function changeProductsQuantity (data) {
  const url = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/carts';
  const config = { data };
  console.log(config);

  // return axios.patch(url, config).then((response) => {
  // const { carts, finalTotal } = response.data;
  // const cartData = {
  // carts,
  // finalTotal
  // };

  // return cartData;
  // });

  return axios.patch(url, config).then(getCartProductData);
}

export function deleteOneProduct (cartId) {
  const url = `https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/carts/${cartId}`;

  return axios.delete(url).then((response) => {
    const { carts, finalTotal } = response.data;
    const cartData = {
      carts,
      finalTotal
    };

    return cartData;
  });
}

export function getCompletedOrderData (inputValue) {
  const url = 'https://livejs-api.hexschool.io/api/livejs/v1/customer/lunnnnnnn/orders';

  return axios.post(url, inputValue).then((response) => {
    console.log(response.data);
    const { products, total } = response.data;
    const cartData = {
      products,
      total
    };

    return cartData;
  });
}

export function fetchOneProductData (productId) {

  return axios.get('../data.json').then((response) => {
    const { products } = response.data;
    return products.filter((product) => product["id"] === productId);
  });
}
