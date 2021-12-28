import { render, displayLoading, hideLoading, showDeletingProductAlert, showCustomerAlert } from '../utils.js';
import ThankPage from './thankPage.js';

// import api promises
import { getCartProductsData, deleteAllCartProducts, changeProductsQuantity, deleteOneProduct, getCompletedOrderData } from '../api.js';

let cartDataLocally = {};

function createCartProductELe ({ carts }) {
  let productTrEle = '';

  if (carts.length === 0) {
    productTrEle = '<tr><td>目前購物車沒有商品</td></tr>';
  } else {
    carts.forEach((cart) => {
      const { id, quantity, product } = cart;
      productTrEle += `
      <tr>
        <td>
          <div class="cardItem-title">
            <img src="${product.images.toLocaleString('en-US')}" alt="">
            <p>${product.title}</p>
          </div>
        </td>
        <td>NT$${product.price.toLocaleString('en-US')}</td>
        <td>
          <div style="display: flex; align-items: center" data-cart-id="${id}">
            <span class="material-icons cartAmount-icon" data-product-quantity="${quantity - 1 === 0 ? 'delete' : quantity - 1}">remove</span>
            <span style="margin: 0 5px;">${quantity}</span>
            <span class="material-icons cartAmount-icon" data-product-quantity="${quantity + 1}">add</span></div>
        </td>
        <td>NT$${(product.price * quantity).toLocaleString('en-US')}</td>
        <td class="discardBtn" data-cart-id="${id}">
          <span href="#" class="material-icons" data-product-quantity="delete" style="cursor: pointer;">
            clear
          </span>
        </td>
      </tr>`;
    });
  }

  return productTrEle;
}

function createCartCounterEle ({ finalTotal }) {
  return finalTotal === 0 ?
    (`<tr>
      <td>
        <a href="#" class="discardAllBtn" style="visibility: hidden;" data-delete-all-product-btn>刪除所有品項</a>
      </td>
      <td></td>
      <td></td>
      <td>
        <p>總金額</p>
      </td>
      <td>NT$${finalTotal.toLocaleString('en-US')}</td>
    </tr>`) :
    (`<tr>
      <td>
        <a href="#" class="discardAllBtn" data-delete-all-product-btn>刪除所有品項</a>
      </td>
      <td></td>
      <td>
      </td>
      <td>
        <p>總金額</p>
      </td>
      <td>NT$${finalTotal.toLocaleString('en-US')}</td>
    </tr>`);
}

// 購物車內有產品才會出現填寫購物人資料
function createCustomerInfoForm ({ carts }) {
  return carts.length !== 0 ?
    (`<section class="orderInfo wrap" id="orderInfo">
      <h3 class="section-title">填寫預訂資料</h3>
      <form action="" class="orderInfo-form" data-customer-info-form>
        <div class="orderInfo-formGroup">
          <label for="customerName" class="orderInfo-label">姓名</label>
          <div class="orderInfo-inputWrap">
            <input type="text" class="orderInfo-input" id="customerName" placeholder="請輸入姓名" name="姓名">
            <p class="orderInfo-message" data-message="姓名">必填</p>
          </div>
        </div>
        <div class="orderInfo-formGroup">
          <label for="customerPhone" class="orderInfo-label">電話</label>
          <div class="orderInfo-inputWrap">
            <input type="tel" class="orderInfo-input" id="customerPhone" placeholder="請輸入電話" name="電話">
            <p class="orderInfo-message" data-message="電話">必填</p>
          </div>
        </div>
        <div class="orderInfo-formGroup">
          <label for="customerEmail" class="orderInfo-label">Email</label>
          <div class="orderInfo-inputWrap">
            <input type="email" class="orderInfo-input" id="customerEmail" placeholder="請輸入 Email" name="Email">
            <p class="orderInfo-message" data-message="Email">必填</p>
          </div>
        </div>
        <div class="orderInfo-formGroup">
          <label for="customerAddress" class="orderInfo-label">寄送地址</label>
          <div class="orderInfo-inputWrap">
            <input type="text" class="orderInfo-input" id="customerAddress" placeholder="請輸入寄送地址" name="寄送地址">
            <p class="orderInfo-message" data-message="寄送地址">必填</p>
          </div>
        </div>
        <div class="orderInfo-formGroup">
          <label for="tradeWay" class="orderInfo-label">交易方式</label>
          <div class="orderInfo-inputWrap">
            <select id="tradeWay" class="orderInfo-input" name="交易方式">
              <option value="ATM" selected>ATM</option>
              <option value="信用卡">信用卡</option>
              <option value="超商付款">超商付款</option>
            </select>
          </div>
        </div>
        <input type="submit" value="送出預訂資料" class="orderInfo-btn">
      </form>
    </section>`) :
    '<div></div>';
}

// 想不到其他的解決辦法，只好在這裡重寫一個 render 
// 綁在 table 上，然後再看是否點擊對應的按鈕
// 但刪除全部商品會綁在該按鍵上
async function reRenderCartPage () {
  render(document.querySelector('#root'), await CartPage.item());
  CartPage.addDeleteAllProductsEvent();
  CartPage.addChangeProductsQuantityEvent();
  CartPage.addCheckCustomerInfoEvent();
}

const CartPage = {
  item: async () => {

    const ele = (`<section class="shoppingCart">
      <h3 class="section-title">我的購物車</h3>
      <div class="overflowWrap">
        <table class="shoppingCart-table" data-cart-table>
          <tr>
            <th width="40%">品項</th>
            <th width="15%">單價</th>
            <th width="15%">數量</th>
            <th width="15%">金額</th>
            <th width="15%"></th>
          </tr>
          
          ${createCartProductELe(cartDataLocally)}
          ${createCartCounterEle(cartDataLocally)}

        </table>
      </div>
    </section>
    ${createCustomerInfoForm(cartDataLocally)}
  `);

    return ele;
  },

  updateCartDataLocally: async () => {
    cartDataLocally = await getCartProductsData();
    console.log(cartDataLocally);
  },

  addDeleteAllProductsEvent: async () => {
    document.querySelector('[data-delete-all-product-btn]').addEventListener('click', handleClickDeleteAllProducts);
  },

  addChangeProductsQuantityEvent: async () => {
    document.querySelector('[data-cart-table]').addEventListener('click', handleClickChangeProductQuantity);
  },

  addDeleteSingleProductEvent: async () => {
    document.querySelector('[data-cart-table]').addEventListener('click', handleClickChangeProductQuantity);
  },

  addCheckCustomerInfoEvent: async () => {
    const customerInfoForm = document.querySelector('[data-customer-info-form]');
    const [...inputEles] = document.querySelectorAll('[data-customer-info-form] input.orderInfo-input');
    if (customerInfoForm) {
      customerInfoForm.addEventListener('submit', handleSubmitCustomerInfoEvent)
    }
    if (inputEles) {
      inputEles.forEach((input) => {
        input.addEventListener('change', handleChange);
      });
    }
  }
};

async function handleClickDeleteAllProducts (event) {
  event.preventDefault();

  // 先把 API 資料存在本地後渲染
  // 靠外層的 ref. 讀取外面的 cartDateLocally
  // 全部刪除後會回傳剩下的購物車資訊
  displayLoading();
  cartDataLocally = await deleteAllCartProducts();
  console.log(cartDataLocally);
  reRenderCartPage(cartDataLocally);
  showDeletingProductAlert();
  // 把購物車歸零
  const cartIcon = document.querySelector('#cart-icon');
  cartIcon.setAttribute('data-after', 0);
  hideLoading();
}

async function handleClickChangeProductQuantity (event) {
  // 把購物車歸零
  // const cartIcon = document.querySelector('#cart-icon');
  // cartIcon.setAttribute('data-after', 0);

  // html data-attribute 如果用 - 分開字的話會自動駝峰 => data-product-quantity ==> productQuantity
  const { productQuantity } = event.target.dataset;
  const hasCartId = event.target.closest('[data-cart-id]') || null;
  const cartId = getCartId(hasCartId);

  if (!productQuantity && !cartId) return;

  displayLoading();
  // 刪除商品
  if (productQuantity === 'delete' && cartId) {
    // 刪除商品（數量為 0 及 刪除按鍵都會觸發刪除商品）
    // 更改 local + rerender
    cartDataLocally = await deleteOneProduct(cartId);

    // 更改購物車內的商品數量
    const cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-after', `${cartDataLocally.carts.length}`);
    reRenderCartPage(cartDataLocally);
    showDeletingProductAlert();
  } else if (productQuantity && cartId) {
    // 更改數量
    cartDataLocally = await changeProductsQuantity(cartId, Number(productQuantity));
    reRenderCartPage(cartDataLocally);
  }
  hideLoading();
}

function getCartId (hasCartId) {
  return hasCartId ? hasCartId.dataset.cartId : null;
}

async function handleSubmitCustomerInfoEvent (event) {
  event.preventDefault();
  const [...errorMsgs] = document.querySelectorAll(`[data-message]`);
  const allInputCorrect = checkAllInfoCorrect(errorMsgs);
  const inputValue = getCustomerInfo(allInputCorrect);

  if (inputValue) {
    displayLoading();
    console.log('訂單發送');
    this.reset();
    ThankPage.getOrderInfo(await getCompletedOrderData(inputValue));
    render(document.querySelector('#root'), await ThankPage.item());
    // 把購物車歸零
    const cartIcon = document.querySelector('#cart-icon');
    cartIcon.setAttribute('data-after', 0);
    hideLoading();
    return;
  }
  showCustomerAlert();
  console.log('部分表單未確實填寫');
}

function checkAllInfoCorrect (errorMsgEles) {
  const result = [];
  errorMsgEles.forEach((ele) => {
    if (ele.style.display === 'none') result.push(true);
  });
  return result.length === 4 && true;
}

function getCustomerInfo (checkResult) {
  // 記得前面要 + return，讓此函式可以回傳這個三元的東西
  return !checkResult ? null : (() => {
    const nameInputValue = document.querySelector('input[name="姓名"]').value;
    const phoneInputValue = document.querySelector('input[name="電話"]').value;
    const emailInputValue = document.querySelector('input[name="Email"]').value;
    const addressInputValue = document.querySelector('input[name="寄送地址"]').value;
    const payMethodValue = document.querySelector('select[name="交易方式"]').value;

    const obj = {
      data: {
        user: {
          name: nameInputValue,
          tel: phoneInputValue,
          email: emailInputValue,
          address: addressInputValue,
          payment: payMethodValue
        }
      }
    };

    return obj;

  })();
}

// input onChange event
function handleChange (event) {
  const target = event.target;
  const isCorrectInput = checkIsCorrectInput(target);
  const validationResult = isCorrectInput(target);
  console.log(validationResult);
  addValidationFeedback(validationResult);
  removeValidationFeedBack(validationResult);
}

function checkIsCorrectInput ({ name }) {
  const isCorrect = (name === '寄送地址' || '姓名' || '電話' || 'Email') && name;
  return ({ value }) => {
    return !isCorrect ? null : (isCorrect === '電話' ? checkMobile(value) : (isCorrect === 'Email' ? checkEmail(value) : (value === '' ? { state: false, msg: `${name} 為必填`, inputType: `${name}` } : { state: true, msg: null, inputType: `${name}` })));
  };

  // 想不到其他辦法，只好用靠 ref. 讀取外部的 isCorrect
  function checkMobile (value) {
    // ref. https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
    const checker = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return checker.test(value) ? { state: true, msg: null, inputType: `${name}` } : { state: false, msg: `${name}格式錯誤，應為 09xxxxxxxx`, inputType: `${name}` };
  }
  function checkEmail (value) {
    // ref. https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const checker = /\S+@\S+\.\S+/;
    return checker.test(value) ? { state: true, msg: null, inputType: `${name}` } : { state: false, msg: `${name} 格式錯誤`, inputType: `${name}` };
  }
}

function addValidationFeedback ({ state, msg, inputType }) {
  if (state) return;
  document.querySelector(`[data-message=${inputType}]`).textContent = msg;
  document.querySelector(`[data-message=${inputType}]`).style.display = 'block';
}

function removeValidationFeedBack ({ state, inputType }) {
  if (state) {
    document.querySelector(`[data-message=${inputType}]`).style.display = 'none';
  }
}

export default CartPage;