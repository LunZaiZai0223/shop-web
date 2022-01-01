// import pages
import Home from './pages/Home.js';

// import api
import { getAllProductsData } from './api/apiHelper.js';

// import utils
import { render } from './utils.js';

window.addEventListener('hashchange', () => {
  console.log('hash changed');
});

// 只要有重新載入就會觸發 load event 
// => refresh / first visit
window.addEventListener('load', async () => {
  console.log('start load event');
  const a = await getAllProductsData();
  console.log(a);
  await Home.updateProductData();
  const b = Home.getProductData();
  console.log(b);
  console.log(document.querySelector('#root'));
  render(document.querySelector('#root'), Home.render());
  Home.after_render();
  console.log('end load event');
});

// console.log(document.querySelector('[data-product-select]'));

// const productSelectEle = document.querySelector('[data-product-select]');
// productSelectEle.addEventListener('change', (event) => {
  // const selectValue = event.target.value;
  // console.log(selectValue);
// });
