// import pages
import Home from './pages/Home.js';
import Cart from './pages/Cart.js';
import Product from './pages/Product.js';
import About from './pages/About.js';
import FAQ from './pages/FAQ.js';

// import api
import { fetchOneProductData } from './api/apiHelper.js';

// import utils
import { render, hideBanner, displayLoading, hideLoading, addBlurToFocusNavBarList, getBackToTopButton, displayBackToTopButton, hideBackToTopButton, handleClickGoToBackButton, footerFree } from './utils.js';

const rootEle = document.querySelector('#root');

const routeState = (() => {
  const _routes = {
    '#cartInfo': 'cartInfo',
    '#advantage': 'homePage',
    '#compare': 'homePage',
    '#recommendation': 'homePage',
    '#productList': 'homePage',
    '#logo': 'homePage',
    '#purchaseWay': 'homePage',
    '#AboutUs': 'aboutPage',
    '#FAQ': 'faqPage',
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

// 保存上一步 hash 在哪裡
const viewState = (() => {
  let _currentView = '';

  const setCurrentView = (newView) => {
    _currentView = newView;
  };

  const getCurrentView = () => {
    return _currentView;
  };

  return {
    setCurrentView,
    getCurrentView
  };
})();

const checkNeedRender = (newView) => {
  const lastView = viewState.getCurrentView();
  return newView === lastView;
};

const changePage = async (route) => {
  displayLoading();
  if (route === 'cartInfo') {
    hideBanner();
    await Cart.updateCartDataLocally();
    render(rootEle, Cart.render());
    Cart.after_render();
  } else if (route === 'homePage') {
    render(rootEle, Home.render());
    Home.after_render();
    footerFree();
  } else if (route === 'productInfo') {
    hideBanner();
    const currentHash = location.hash;
    const productId = currentHash.slice(1);
    const [productData] = await fetchOneProductData(productId);
    render(rootEle, Product.render(productData));
    Product.after_render();
    footerFree();
  } else if (route === 'aboutPage') {
    hideBanner();
    render(rootEle, About.render());
    About.after_render();
    footerFree();
  } else if (route === 'faqPage') {
    hideBanner();
    render(rootEle, FAQ.render());
    FAQ.after_render();
    footerFree();
  }
  hideLoading();
};

// scroll event
const addScrollEvent = () => {
  const backToTopButton = getBackToTopButton();
  window.addEventListener('scroll', () => {
    const currentClientHeight = document.documentElement.clientHeight;
    const currentScrollY = window.scrollY;
    displayBackToTopButton(currentClientHeight, currentScrollY, backToTopButton);
    hideBackToTopButton(currentClientHeight, currentScrollY, backToTopButton);
    backToTopButton.addEventListener('click', handleClickGoToBackButton);
  });
};



// hashchange event
window.addEventListener('hashchange', () => {
  const currentHash = location.hash;
  const currentPage = routeState.getRoutes(currentHash);
  const sameView = checkNeedRender(currentPage);
  viewState.setCurrentView(currentPage);
  if (!sameView) {
    changePage(currentPage);
  }
});

// 只要有重新載入就會觸發 load event 
// => refresh / first visit
window.addEventListener('load', async () => {
  displayLoading();
  // 不管怎樣都先取得全部商品的資料
  await Home.updateProductData();
  const currentHash = location.hash || null;
  const route = routeState.getRoutes(currentHash) || 'homePage';
  viewState.setCurrentView(route);
  changePage(route);
  hideLoading();
  addBlurToFocusNavBarList();
  addScrollEvent();
});
