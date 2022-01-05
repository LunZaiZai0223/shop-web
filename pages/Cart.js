// import api
import { getCartProductsData, changeProductsQuantity, deleteOneProduct, deleteAllCartProducts, fetchOneProductData } from '../api/apiHelper.js';
// import components
import CartNoProduct from "../components/CartNoProduct.js";
import CartForm from '../components/CartForm.js';

//import utils
import { render, hideBanner } from '../utils.js';

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

// input change event => render 完都要重新拔掉 + 新增
const addChangeCartQtyEvent = () => {
  const qtyInputs = document.querySelectorAll('[data-cart-qty]');
  if (qtyInputs.length !== 0) {
    qtyInputs.forEach((input) => {
      input.addEventListener('change', async (event) => {
        console.log(event.target);
        const isProductQtyUnderZero = checkProductQty(event.target);
        const id = event.target.dataset.cartId;
        console.log(isProductQtyUnderZero);
        if (isProductQtyUnderZero) {
          await deleteOneProduct(id);
        } else {
          const quantity = Number(event.target.value);
          const data = {
            id,
            quantity
          };
          console.log(await changeProductsQuantity(data));
        }
        await Cart.updateCartDataLocally();
        render(document.querySelector('#root'), Cart.render());
        Cart.after_render();
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
        console.log(event.target.dataset);
        const { cartId } = event.target.dataset;
        console.log(cartId);
        await deleteOneProduct(cartId);
        await Cart.updateCartDataLocally();
        render(document.querySelector('#root'), Cart.render());
        console.log(cartDataLocally);
        Cart.after_render();
      });
    });
  }
};

const addDeleteAllProductsEvent = () => {
  const deleteAllProductsBtn = document.querySelector('[data-delete-all-product-btn]');
  if (deleteAllProductsBtn) {
    deleteAllProductsBtn.addEventListener('click', async (event) => {
      event.preventDefault();
      console.log('click delete all');
      await deleteAllCartProducts();
      await Cart.updateCartDataLocally();
      render(document.querySelector('#root'), Cart.render());
      Cart.after_render();
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
      }
    });
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
        <ul class="row guess-list">
          <li class="mb-3 mb-md-0 col-md-4 guess-list-item">
            <img
              src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Zr4h1Oqvc6NtAnpe5pNqJfGYyBJshAlKctfv0BTAZBqVAuvfSAWk4bcidBd8qBu1lRn5TWvib6O3UbmIAEt5w8SdB94GuFplZn6IM4SBvtxWJA2VnOqvQOsKungCPDXv.png"
              alt="product img">
            <a href="">加入購物車</a>
            <p class="mb-2">Jordan 雙人床架 / 雙人加大</p>
            <p class="m-0">NT$9000</p>
          </li>
          <li class="mb-3 mb-md-0 col-md-4 guess-list-item">
            <img
              src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Zr4h1Oqvc6NtAnpe5pNqJfGYyBJshAlKctfv0BTAZBqVAuvfSAWk4bcidBd8qBu1lRn5TWvib6O3UbmIAEt5w8SdB94GuFplZn6IM4SBvtxWJA2VnOqvQOsKungCPDXv.png"
              alt="product img">
            <a href="">加入購物車</a>
            <p class="mb-2">Jordan 雙人床架 / 雙人加大</p>
            <p class="m-0">NT$9000</p>
          </li>
          <li class="mb-3 mb-md-0 col-md-4 guess-list-item">
            <img
              src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Zr4h1Oqvc6NtAnpe5pNqJfGYyBJshAlKctfv0BTAZBqVAuvfSAWk4bcidBd8qBu1lRn5TWvib6O3UbmIAEt5w8SdB94GuFplZn6IM4SBvtxWJA2VnOqvQOsKungCPDXv.png"
              alt="product img">
            <a href="">加入購物車</a>
            <p class="mb-2">Jordan 雙人床架 / 雙人加大</p>
            <p class="m-0">NT$9000</p>
          </li>
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
    hideBanner();
  },
  updateCartDataLocally: async () => {
    cartDataLocally = await getCartProductsData();
    console.log(cartDataLocally);
  }
};


export default Cart;
