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

// export function displayLoading () {
// console.log('loading 開始');
// document.querySelector('[data-loading]').classList.add('is-active');
// document.querySelector('[data-overlay]').classList.add('is-active');
// }

// export function hideLoading () {
// console.log('結束 loading');
// document.querySelector('[data-loading]').classList.remove('is-active');
// document.querySelector('[data-overlay]').classList.remove('is-active');
// }

export function showAddingProductAlert () {
  document.querySelector('[data-alert-card-text]').textContent = '商品已成功加入購物車';
  document.querySelector('[data-alert-icon]').innerHTML = '<i class="fas fa-check-circle"></i>';
  document.querySelector('[data-alert-card]').classList.remove('hide-alert');
  document.querySelector('[data-alert-card]').classList.remove('alert-danger');
  document.querySelector('[data-alert-card]').classList.add('alert-success');
  document.querySelector('[data-alert-card]').classList.add('show-alert');

  // 兩秒後自動刪除 Alert
  setTimeout(() => { hideAddingProductAlert(); }, 2000);
}

export function hideAddingProductAlert () {
  document.querySelector('[data-alert-card]').classList.remove('show-alert');
  document.querySelector('[data-alert-card]').classList.add('hide-alert');
}

// export function showDeletingProductAlert () {
  // document.querySelector('[data-alert-card-text]').textContent = '購物車商品已被移除';
  // document.querySelector('[data-alert-icon]').innerHTML = '<i class="fas fa-check-circle"></i>';
  // document.querySelector('[data-alert-card]').classList.remove('hide-alert');
  // document.querySelector('[data-alert-card]').classList.remove('alert-success');
  // document.querySelector('[data-alert-card]').classList.add('alert-danger');
  // document.querySelector('[data-alert-card]').classList.add('show-alert');

  // // 兩秒後自動刪除 Alert
  // setTimeout(() => { hideDeletingProductAlert(); }, 2000);
// }

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



