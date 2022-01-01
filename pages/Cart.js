import CartNoProduct from "../components/CartNoProduct.js";


// 如果有商品才會 render 購物車
const Cart = () => {
  render: () => {
    const item = (`
  <section class="container-xl cart">
    <h3 class="title">我的購物車</h3>
    ${CartNoProduct()}
    <div class="table-wrapper">
      <table class="cart-table">
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
          <tr>
            <td>
              <div class="cart-title">
                <img
                  src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Zr4h1Oqvc6NtAnpe5pNqJfGYyBJshAlKctfv0BTAZBqVAuvfSAWk4bcidBd8qBu1lRn5TWvib6O3UbmIAEt5w8SdB94GuFplZn6IM4SBvtxWJA2VnOqvQOsKungCPDXv.png"
                  alt="product image">
                <h3>Jordan 雙人床架 / 雙人加大</h3>
              </div>
            </td>
            <td>NT$9,000</td>
            <td>
              <div class="cart-qty">
                <input type="number" min="0" value="1">
                <!-- <span>+</span> -->
                <!-- <span>1</span> -->
                <!-- <span>-</span> -->
              </div>
            </td>
            <td>NT$9,000</td>
            <td><span>刪除</span></td>
          </tr>
          <tr>
            <td>
              <div class="cart-title">
                <img
                  src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Zr4h1Oqvc6NtAnpe5pNqJfGYyBJshAlKctfv0BTAZBqVAuvfSAWk4bcidBd8qBu1lRn5TWvib6O3UbmIAEt5w8SdB94GuFplZn6IM4SBvtxWJA2VnOqvQOsKungCPDXv.png"
                  alt="product image">
                <h3>Jordan 雙人床架 / 雙人加大</h3>
              </div>
            </td>
            <td>NT$9,000</td>
            <td>
              <div class="cart-qty">
                <input type="number" min="0" value="1">
                <!-- <span>+</span> -->
                <!-- <span>1</span> -->
                <!-- <span>-</span> -->
              </div>
            </td>
            <td>NT$9,000</td>
            <td>
              <span class="material-icons cart-delete-btn">
                clear
              </span>
            </td>
          </tr>
          <tr>
            <td>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <a class="cart-delete-all-products-btn" href="">
                刪除全部商品
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="row my-md-3 g-0 justify-content-md-between">
      <div class="col-md-5">
        <h5 style="padding-left: 12px">猜您可能也喜歡</h5>
        <ul class="row guess-list">
          <li class="col-md-4 guess-list-item">
            <img
              src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Zr4h1Oqvc6NtAnpe5pNqJfGYyBJshAlKctfv0BTAZBqVAuvfSAWk4bcidBd8qBu1lRn5TWvib6O3UbmIAEt5w8SdB94GuFplZn6IM4SBvtxWJA2VnOqvQOsKungCPDXv.png"
              alt="product img">
            <a href="">加入購物車</a>
            <p class="mb-2">Jordan 雙人床架 / 雙人加大</p>
            <p class="m-0">NT$9000</p>
          </li>
          <li class="col-md-4 guess-list-item">
            <img
              src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/Zr4h1Oqvc6NtAnpe5pNqJfGYyBJshAlKctfv0BTAZBqVAuvfSAWk4bcidBd8qBu1lRn5TWvib6O3UbmIAEt5w8SdB94GuFplZn6IM4SBvtxWJA2VnOqvQOsKungCPDXv.png"
              alt="product img">
            <a href="">加入購物車</a>
            <p class="mb-2">Jordan 雙人床架 / 雙人加大</p>
            <p class="m-0">NT$9000</p>
          </li>
          <li class="col-md-4 guess-list-item">
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
                <th class="total-table-price">NT$9.0000
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
  </section>
    `);

    return item;
  };

  // after_render: () => {

  // };
};

export default Cart;