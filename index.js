// import content from "./views/homePage.js";
import { render, displayLoading, hideLoading } from "./utils.js";

// import views
import HomePage from './views/homePage.js';
import CartPage from './views/cartPage.js';
import ThankPage from "./views/thankPage.js";

// import api data 
import { getAllProductsData } from './api.js';

const rootEle = document.querySelector('#root');
const [...navbarLinks] = document.querySelectorAll('[data-navbar-link]');
navbarLinks.forEach((aTag) => {
  aTag.addEventListener('click', (event) => {
    // event.preventDefault();
    console.log(event);
  });

});

const routes = {
  "#bedAdvantage": 'homePage',
  "#recommendation": 'homePage',
  "#transport": 'homePage',
  "#homepage": 'homePage',
  null: 'homePage',
  "#cartInfo": 'cartInfo',
  "#customerInfo": 'customerInfo',
  "#thankyou": 'thankPage'

};

let lastHash = location.hash || null;
console.log('first render', lastHash);

function initialize (rootEle) {
  console.log('init from index.js');
  console.log(location.hash);
  const currentHash = location.hash || null;
  console.log(currentHash);
  const currentView = routes[currentHash];
  console.log(currentView);
  changePage(currentView, rootEle);
  // console.log(routes[currentHash]);
}

/**
 * 
 * @param {String} 目前的 hash 
 * @param {HTML Tag} rootEle 
 */
async function changePage (view, rootEle) {

  displayLoading();
  console.log(view);
  if (view === 'homePage') {
    // 先更新資料再渲染
    await HomePage.updateAllProductsDataLocally();
    render(rootEle, await HomePage.item());
    await HomePage.addEvent();
    await HomePage.addProductListClickEvent();
    await HomePage.addSelectChangeEvent();
    // HomePage.insertSelectOptionEles();
    console.log(await getAllProductsData());
    // 把得到的資料塞進 dom 裡面
    // loading 的 class 蓋住頁面，讓使用者知道目前正在載入資料
  } else if (view === 'cartInfo') {
    console.log('目前在購物車的頁面');
    // 先載入資料 => 觸發事件再更新資料 => 渲染
    await CartPage.updateCartDataLocally();
    render(rootEle, await CartPage.item());
    CartPage.addDeleteAllProductsEvent();
    CartPage.addChangeProductsQuantityEvent();
    CartPage.addCheckCustomerInfoEvent();

  } else if (view === 'thankPage') {
    console.log('現在到感謝的頁面了！');
    render(rootEle, await ThankPage.item());
  }
  hideLoading();

}

/**
 * 
 * @param {event} 
 * 1. 確認是否要 render 
 *    - 依照上一個 hash 判斷是否需要 render（上一頁不在 homePage 的才要 render）
 */
// lastHash, routes 靠 ref. 往外找
function handleHashchange (event) {

  console.log('hash change: lastHash', lastHash);
  console.log('current hash', location.hash);

  // null 代表一開始進入頁面的時候的狀態
  const homeHashesArr = ['#bedAdvantage', '#recommendation', "#transport", "#homepage", null];
  const currentHash = location.hash || null;
  // 只要選擇 HomePage 的 hash 就要判斷前一步是不是已經在 HomePage
  const isCurrentHashEqualHomeHash = checkCurrentHashIsEqualHomeHashes(currentHash, homeHashesArr);

  console.log('有選擇 HomePage 的 hash?', isCurrentHashEqualHomeHash);

  if (!isCurrentHashEqualHomeHash) {
    console.log('可以直接 render，因為選的 hash 不是 HomePage');
    const routeName = getRouteDOM(isCurrentHashEqualHomeHash, currentHash);
    console.log('目前的頁面為', routeName);
    changePage(routeName, rootEle);

  } else {
    // true => 上一步及下一步都在主頁，不用 render
    // false => 有更動，要 render
    console.log('要檢查上一捕是不是已經在 HomePage，因為有選 HomePage 的 Hash');
    const result = checkUserIsAlreadyOnHomePage(homeHashesArr);
    const routeName = getRouteDOM(result, currentHash);
    changePage(routeName, rootEle);
  }

  changeLastHash();

}

// 靠 ref. 找 routes
function getRouteDOM (cantRender, contentType) {
  let content;

  if (!cantRender) {
    content = routes[contentType];
  } else {
    content = null;
  }

  return content;
}

function checkUserIsAlreadyOnHomePage (homeHashesArr, currentHash) {
  let ans = false;
  console.log(homeHashesArr);
  console.log(lastHash);

  // 已經在 homepage 了
  // 用 ref. 讀取外層的 lashHash
  const already = homeHashesArr.find((hash) => hash === lastHash);
  console.log(already);
  if (currentHash === null || already || already === null) {
    ans = true;
    console.log('我目前在 homepage 的守備範圍');
    return ans;
  }

  console.log('已經不在 homepage 了喔');
  return ans;
}

function checkCurrentHashIsEqualHomeHashes (currentHash, homeHashesArr) {
  const result = homeHashesArr.find((homeHash) => homeHash === currentHash) || false;
  return result;
}

function changeLastHash () {
  lastHash = location.hash;
}

initialize(rootEle);

// hashchange => 當 hash 改變時觸發
//  1. 判斷 hash 是什麼
//    - 要記得從上一個 hash 判斷要不要換頁（如果上一個是 homepage 的就不用）
//    - render or homepage 移動到指定的 tag
//  2. render  
window.addEventListener('hashchange', handleHashchange);
