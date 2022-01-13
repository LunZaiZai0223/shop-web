import { fetchOneProductData, addProductsIntoCart } from './api/apiHelper.js';
/**
 * 
 * @param {HTMLTag} bindDOM 
 * @param {HTMLELes} eleItems 
 */
export function render (bindDOM, eleItems) {
  console.log('進入 render');
  if (!eleItems) {
    console.log('沒達成 render 條件');
    return;
  }
  console.log('準備 render');
  bindDOM.innerHTML = eleItems;
}

export function getSelectOptions (allProducts) {
  const categories = allProducts.map((product) => product.category);
  const categoryOptions = categories.filter((category, index) => index === categories.indexOf(category));
  return categoryOptions;
}

export function displayLoading () {
  document.querySelector('.loading').classList.add('loading_active');
  document.querySelector('.overlay').classList.add('overlay_active');
}

export function hideLoading () {
  setTimeout(() => {
    document.querySelector('.loading').classList.remove('loading_active');
    document.querySelector('.overlay').classList.remove('overlay_active');
  }, 1000);
}

export function showAddingProductAlert () {
  document.querySelector('[data-alert-card-text]').textContent = '商品已成功加入購物車';
  document.querySelector('[data-alert-icon]').innerHTML = '<i class="fas fa-check-circle"></i>';
  document.querySelector('[data-alert-card]').classList.remove('hide-alert');
  document.querySelector('[data-alert-card]').classList.add('alert-success', 'show-alert');

  // 兩秒後自動刪除 Alert
  setTimeout(() => { hideAlter(); }, 2000);
}

export function showDeletingProductAlert () {
  document.querySelector('[data-alert-card-text]').textContent = '購物車商品已被移除';
  document.querySelector('[data-alert-icon]').innerHTML = '<i class="fas fa-check-circle"></i>';
  document.querySelector('[data-alert-card]').classList.remove('hide-alert', 'alert-success');
  document.querySelector('[data-alert-card]').classList.add('alert-danger', 'show-alert');

  setTimeout(() => { hideAlter(); }, 2000);
}

export function hideAlter () {
  document.querySelector('[data-alert-card]').classList.remove('show-alert');
  document.querySelector('[data-alert-card]').classList.add('hide-alert');
  setTimeout(() => {
    document.querySelector('[data-alert-card]').classList.remove('alert-danger', 'alert-success');
  }, 1000);
}

// export function hideDeletingProductAlert () {
// document.querySelector('[data-alert-card]').classList.remove('show-alert');
// document.querySelector('[data-alert-card]').classList.add('hide-alert');
// }

// export function showCustomerAlert () {
// // 更改 icon
// document.querySelector('[data-alert-card]').classList.remove('hide-alert');
// document.querySelector('[data-alert-icon]').innerHTML = '<i class="fas fa-exclamation-circle"></i>';
// document.querySelector('[data-alert-card-text]').textContent = '預定資料填寫不正確';
// document.querySelector('[data-alert-card]').classList.add('alert-danger');
// document.querySelector('[data-alert-card]').classList.add('show-alert');

// // 兩秒後自動刪除 Alert
// setTimeout(() => { hideDeletingProductAlert(); }, 2000);
// }

// // 綁定刪除卡片事件
// document.querySelector('[data-alert-card]').addEventListener('click', (event) => {
// const targetNodeName = event.target.nodeName;
// if (targetNodeName === 'SPAN') {
// hideDeletingProductAlert();
// }
// });

export function hideBanner () {
  const banner = document.querySelector('[data-banner]');
  banner.style.display = 'none';
}

export function showBanner () {
  const banner = document.querySelector('[data-banner]');
  banner.style.display = 'block';
}

export function scrollMove () {
  const rootEle = document.querySelector('#root');
  const topPosition = rootEle.offsetTop;
  window.scrollTo(0, topPosition - 32);
}


export function getProductIdAndType (target) {
  const result = {
    type: '',
    productId: ''
  };

  if (target.dataset.productIdAdd) {
    result.type = 'add';
    result.productId = target.dataset.productIdAdd;
  } else if (target.dataset.productIdShow) {
    result.type = 'show';
    result.productId = target.dataset.productIdShow;
  }

  return result;
}

/**
 * 
 * @param {Object}
 * 1. 確定是加入購物車按鈕被按下才會加入購物車
 * 2. 顯示提示 
 */
export function addingProductIntoCart ({ type, productId }) {
  type === 'add' && ((productId) => {
    addProductsIntoCart(productId);
    showAddingProductAlert();
  })(productId);
}

export function getOneProductData ({ type, productId }) {
  return type === 'show' && (async (productId) => {
    const data = await fetchOneProductData(productId);
    data[0].type = type;
    return data;
  })(productId);
}

export function addProductIdToHash (productData) {
  if (productData) {
    const { id, type } = productData[0];
    // 更換 show 的 item
    // 更換 hash 
    // 在 hash event 寫 id 頁面的邏輯
    // 更換 hash 後再靠 hash change render!
    // const {type}
    type === 'show' && ((id) => {
      location.hash = `#${id}`;
    })(id);
  }

}
