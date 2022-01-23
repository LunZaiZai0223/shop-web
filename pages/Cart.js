// import api
import { getCartProductsData, changeProductsQuantity, deleteOneProduct, deleteAllCartProducts, fetchOneProductData, getCompletedOrderData } from '../api/apiHelper.js';

// import utils
import { getProductIdAndType, addingProductIntoCart, getOneProductData, addProductIdToHash, displayLoading, hideLoading, showDeletingProductAlert } from '../utils.js';

// import components
import CartNoProduct from "../components/CartNoProduct.js";
import CartForm from '../components/CartForm.js';
import Guess from '../components/Guess.js';

//import utils
import { render } from '../utils.js';

// import page 
import ThankyouPage from './Thankyou.js';

let cartDataLocally = [];

const createCartItem = ({ carts }) => {
  let item = '';
  carts.forEach((data) => {
    const { id, quantity, product } = data;
    const { images, price, title } = product;
    item += (`
      <tr>
        <td>
          <div class="cart-title">
            <img style="cursor: pointer" src="${images}" alt="product image" data-product-id="${product.id}">
            <h3>${title}</h3>
          </div>
        </td>
        <td>
          NT$${price}
        </td>
        <td>
          <div class="cart-qty">
            <input type="number" min="0" value="${quantity}" data-cart-qty data-cart-id="${id}">
          </div>
        </td>
        <td>
          NT$${price * quantity}
        </td>
        <td>
          <span style="cursor: pointer" class="material-icons cart-delete-btn" data-delete-single-product-btn data-cart-id="${id}">
            clear
          </span>
        </td>
      </tr>
    `);
  });

  return item;
};

const totalPrice = ({ finalTotal }) => {
  return finalTotal;
};

const reRenderCartPage = async () => {
  await Cart.updateCartDataLocally();
  render(document.querySelector('#root'), Cart.render());
  Cart.after_render();
};

// input change event => render 完都要重新拔掉 + 新增
const addChangeCartQtyEvent = () => {
  const qtyInputs = document.querySelectorAll('[data-cart-qty]');
  if (qtyInputs.length !== 0) {
    qtyInputs.forEach((input) => {
      input.addEventListener('change', async (event) => {
        displayLoading();
        const isProductQtyUnderZero = checkProductQty(event.target);
        const id = event.target.dataset.cartId;
        if (isProductQtyUnderZero) {
          await deleteOneProduct(id);
          showDeletingProductAlert();
        } else {
          const quantity = Number(event.target.value);
          const data = {
            id,
            quantity
          };
          await changeProductsQuantity(data);
        }
        reRenderCartPage();
        hideLoading();
      });
    });
  }
};

const checkProductQty = (target) => {
  console.log(target);
  let productShouldBeDeleted = false;
  if (target.value <= 0) {
    productShouldBeDeleted = true;
  }

  return productShouldBeDeleted;
};

const addDeleSingleProductEvent = () => {
  const deleteSingleProductBtns = document.querySelectorAll('[data-delete-single-product-btn]');
  if (deleteSingleProductBtns.length !== 0) {
    deleteSingleProductBtns.forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        displayLoading();
        const { cartId } = event.target.dataset;
        await deleteOneProduct(cartId);
        reRenderCartPage();
        hideLoading();
        showDeletingProductAlert();
      });
    });
  }
};

const addDeleteAllProductsEvent = () => {
  const deleteAllProductsBtn = document.querySelector('[data-delete-all-product-btn]');
  if (deleteAllProductsBtn) {
    deleteAllProductsBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      displayLoading();
      await deleteAllCartProducts();
      reRenderCartPage();
      hideLoading();
      showDeletingProductAlert();
    });
  }
};

const addGoToProductPageEvent = () => {
  const table = document.querySelector('[data-cart-table]');
  console.log(table);
  if (table) {
    table.addEventListener('click', async (event) => {
      const { productId } = event.target.dataset;
      if (productId) {
        const singleProductData = await fetchOneProductData(productId);
        console.log(singleProductData);
        // hash change 
        // 把資料傳出去，讓 product Page 可以拿到資料
        location.hash = singleProductData[0].id;
      }
    });
  }
};

const addGuessClickEvent = () => {
  const ele = document.querySelector('.guess-list');
  const handleClick = async (event) => {
    event.preventDefault();
    const target = event.target;
    const productIdAndType = getProductIdAndType(target);
    console.log(productIdAndType);
    addingProductIntoCart(productIdAndType);
    if (productIdAndType.type === 'add') {
      displayLoading();
      setTimeout(reRenderCartPage, 2000);
      setTimeout(hideLoading, 2000);
      console.log('need rerender');
    }
    const productData = await getOneProductData(productIdAndType);
    addProductIdToHash(productData);
  };

  if (ele) {
    ele.addEventListener('click', handleClick);
  }
};

const addCustomerInfoFormChangeEvent = () => {
  const ele = document.querySelector('[data-customer-info-form]');

  const handleChange = (event) => {
    const target = event.target;
    // checkInputFiled(target);
    const inputEle = getInputEle(target);
    checker(inputEle);
  };

  const getInputEle = (target) => {
    return {
      input: target,
      inputValue: target.value,
      errMsgEle: document.querySelector(`[data-message="${target.name}"`),
      inputName: target.name,
      state: false,
      inputParent: target.parentElement
    };
  };

  const checker = (input) => {
    if (input.inputName === '姓名' || input.inputName === '寄送地址') {
      checkNameAndAddressValue(input);
      addValidationFeedbackNameAndAddress(input);
    } else if (input.inputName === 'Email') {
      checkEmailValue(input);
      addValidationFeedbackEmail(input);
    } else if (input.inputName === '電話') {
      checkPhoneValue(input);
      addValidationFeedbackPhone(input);
    }

    removeValidationFeedback(input);
  };

  const checkNameAndAddressValue = (input) => {
    if (input.inputValue === '') {
      input.state = false;
    } else {
      input.state = true;
    }
  };

  const removeValidationFeedback = (input) => {
    if (input.state) {
      input.errMsgEle.style.display = 'none';
    }
  };

  const addValidationFeedbackNameAndAddress = (input) => {
    console.log(input);
    if (!input.state) {
      input.errMsgEle.style.display = 'block';
      input.errMsgEle.textContent = `${input.inputName} 不可空白`;
    }
  };

  const checkEmailValue = (input) => {
    // ref. https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
    const checker = /\S+@\S+\.\S+/;
    const result = checker.test(input.inputValue);
    if (result) {
      input.state = true;
    }
  };

  const addValidationFeedbackEmail = (input) => {
    if (!input.state) {
      input.errMsgEle.textContent = `${input.inputName} 格式錯誤`;
      input.errMsgEle.style.display = 'block';
    }
  };

  const checkPhoneValue = (input) => {
    const checker = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    const result = checker.test(input.inputValue);
    if (result) {
      input.state = true;
    }
  };

  const addValidationFeedbackPhone = (input) => {
    if (!input.state) {
      input.errMsgEle.textContent = `${input.inputName}格式錯誤，應為 09xxxxxxxx`;
      input.errMsgEle.style.display = 'block';
    }
  };

  if (ele) {
    ele.addEventListener('change', handleChange);
  }
};

const addCustomerInfoFormSubmitEvent = () => {
  const ele = document.querySelector('[data-customer-info-form]');

  //input eles 
  const nameInputEle = document.querySelector('input[name="姓名"]');
  const phoneInputEle = document.querySelector('input[name="電話"]');
  const emailInputEle = document.querySelector('input[name="Email"]');
  const addressInputEle = document.querySelector('input[name="寄送地址"]');
  const paymentSelectEle = document.querySelector('select[name="交易方式"]');

  // error eles 
  const [...errorMsgEles] = document.querySelectorAll('[data-message]');

  const getInputValue = (name, phone, email, address, payment) => {
    const obj = {
      "data": {
        "user": {
          "name": name.value,
          "tel": phone.value,
          "email": email.value,
          "address": address.value,
          "payment": payment.value
        }
      }
    };

    return obj;
  };

  const getValueAreCorrect = (errorMsgEles) => {
    const result = [];
    errorMsgEles.forEach((errorMsgEle) => {
      errorMsgEle.style.display === 'none' && result.push(true);
    });

    return result.length === 4;
  };

  const sendOrder = async (inputValue) => {
    const data = await getCompletedOrderData(inputValue);
    return data;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const allValueAreCorrect = getValueAreCorrect(errorMsgEles);

    if (allValueAreCorrect) {
      displayLoading();
      const inputValue = getInputValue(nameInputEle, phoneInputEle, emailInputEle, addressInputEle, paymentSelectEle);
      const sentProductData = await sendOrder(inputValue);
      render(document.querySelector('#root'), ThankyouPage.render(sentProductData));
      hideLoading();
    }
  };


  // 如果有商品才會出現
  if (ele) {
    ele.addEventListener('submit', handleSubmit);
  }
};

// 如果有商品才會 render 購物車
const Cart = {
  render: () => {
    const item = (`
  <section class="container-xl cart my-5">
    <h3 class="title">我的購物車</h3>

    ${cartDataLocally.carts.length === 0 ? CartNoProduct() : (() => '<div></div>')()}

    ${cartDataLocally.carts.length === 0 ? '<div></div>' : (`
    <div class="table-wrapper" style="display: ${cartDataLocally.carts.length === 0 ? 'none' : 'block'}">
      <table class="cart-table" data-cart-table>
        <thead class="cart-head">
          <tr>
            <th>品項</th>
            <th>單價</th>
            <th>數量</th>
            <th>金額</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="cart-body">

        ${createCartItem(cartDataLocally)}

          <tr>
            <td>
            </td>
            <td></td>
            <td></td>
            <td colspan="2" style="text-align: end">
              <a class="cart-delete-all-products-btn" href="" data-delete-all-product-btn>
                刪除全部商品
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    `)}

    ${cartDataLocally.carts.length === 0 ? '<div></div>' : (`
    <div class="row my-5 my-md-3 g-0 justify-content-md-between">
      <div class="col-md-5">
        <h5 style="padding-left: 12px">猜您可能也喜歡</h5>
        <ul class="row g-0 g-md-4 guess-list">

        ${Guess()}

        </ul>
      </div>
      <div class="col-md-5">
        <h5>購物車總計</h5>
        <div class="table-wrapper">
          <table class="total-table">
            <tbody>
              <tr>
                <th class="total-table-price">總計</th>

                <th class="total-table-price">NT$${totalPrice(cartDataLocally)}
                </th>

              </tr>
              <tr>
                <th>運送方式</th>
                <th>免費運送</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    `)}

  </section>

  ${cartDataLocally.carts.length === 0 ? '<div></div>' : CartForm()}

    `);

    return item;
  },

  after_render: () => {
    addChangeCartQtyEvent();
    addDeleSingleProductEvent();
    addDeleteAllProductsEvent();
    addGoToProductPageEvent();
    addGuessClickEvent();
    addCustomerInfoFormChangeEvent();
    addCustomerInfoFormSubmitEvent();
  },
  updateCartDataLocally: async () => {
    cartDataLocally = await getCartProductsData();
    console.log(cartDataLocally);
  }
};


export default Cart;
