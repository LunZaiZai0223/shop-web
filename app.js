// import pages
import Home from './pages/Home.js';
import Cart from './pages/Cart.js';

// import api
import { getAllProductsData } from './api/apiHelper.js';

// import utils
import { render } from './utils.js';

const rootEle = document.querySelector('#root');

const routeState = (() => {
  const _routes = {
    '#cartInfo': 'cartInfo',
    '#advantage': 'homePage',
    '#recommendation': 'homePage',
    '#productList': 'homePage',
    '#logo': 'homePage',
    '#purchaseWay': 'homePage',
    '#HlMgPLGr0aAitS6xFafR': 'productInfo',
    '#IlfApDFrDf20CtDriC3Y': 'productInfo',
    '#K5GXdzZ9Ml3p2EVYBzJw': 'productInfo',
    '#OpzexlWQCZCFvkJ7Jowq': 'productInfo',
    '#YC36QvTxBPP1YqiZ3xKi': 'productInfo',
    '#sAeOCivCBZoSBDAuPfvV': 'productInfo',
    '#m8GdFCwaV5sABBfEQHPR': 'productInfo',
    '#ijeeShv2kc7U5GRVGmtV': 'productInfo',
  };

  const getRoutes = (hash) => {
    return _routes[hash];
  };

  return {
    getRoutes,
  };
})();

const changePage = async (route) => {
  console.log('start change page');
  if (route === 'cartInfo') {
    console.log('render cart');
    await Cart.updateCartDataLocally();
    render(rootEle, Cart.render());
    Cart.after_render();
  } else if (route === 'homePage') {
    console.log('render to homepage');
    render(rootEle, Home.render());
    Home.after_render();
  }
  console.log('end change page');

};

window.addEventListener('hashchange', () => {
  console.log('hash changed');
  console.log('current hast:', routeState.getRoutes(location.hash));
  const currentHash = location.hash;
  const currentPage = routeState.getRoutes(currentHash);
  changePage(currentPage);
});

// 只要有重新載入就會觸發 load event 
// => refresh / first visit
window.addEventListener('load', async () => {
  console.log('start load event');
  // 不管怎樣都先取得全部商品的資料
  await Home.updateProductData();
  // 測試先用購物車
  const currentHash = location.hash || null;
  const route = routeState.getRoutes(currentHash);
  console.log(route);
  changePage(route);
  // const a = await getAllProductsData();
  // console.log(a);
  // await Home.updateProductData();
  // const b = Home.getProductData();
  // console.log(b);
  // console.log(document.querySelector('#root'));
  // render(document.querySelector('#root'), Home.render());
  // Home.after_render();
  // console.log('end load event');
});

// console.log(document.querySelector('[data-product-select]'));

// const productSelectEle = document.querySelector('[data-product-select]');
// productSelectEle.addEventListener('change', (event) => {
  // const selectValue = event.target.value;
  // console.log(selectValue);
// });
