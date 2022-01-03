const CartForm = () => {
  return (`
    <section class="container-xl my-5">
      <h3 class="title">填寫預定資料</h3>
      <form action="" class="orderInfo-form" data-customer-info-form>
        <div class="orderInfo-formGroup mb-4">
          <label for="customerName" class="mb-2 orderInfo-label">姓名</label>
          <div class="mb-4 orderInfo-inputWrap">
            <input type="text" class="mb-2 orderInfo-input" id="customerName" placeholder="請輸入姓名" name="姓名">
            <p class="orderInfo-message" data-message="姓名">必填</p>
          </div>
        </div>
        <div class="mb-4 orderInfo-formGroup">
          <label for="customerPhone" class="mb-2 orderInfo-label">電話</label>
          <div class="mb-4 orderInfo-inputWrap">
            <input type="tel" class="mb-2 orderInfo-input" id="customerPhone" placeholder="請輸入電話" name="電話">
            <p class="orderInfo-message" data-message="電話">必填</p>
          </div>
        </div>
        <div class="mb-4 orderInfo-formGroup">
          <label for="customerEmail" class="mb-2 orderInfo-label">Email</label>
          <div class="mb-4 orderInfo-inputWrap">
            <input type="email" class="mb-2 orderInfo-input" id="customerEmail" placeholder="請輸入 Email" name="Email">
            <p class="orderInfo-message" data-message="Email">必填</p>
          </div>
        </div>
        <div class="mb-4 orderInfo-formGroup">
          <label for="customerAddress" class="mb-2 orderInfo-label">寄送地址</label>
          <div class="mb-4 orderInfo-inputWrap">
            <input type="text" class="mb-2 orderInfo-input" id="customerAddress" placeholder="請輸入寄送地址" name="寄送地址">
            <p class="orderInfo-message" data-message="寄送地址">必填</p>
          </div>
        </div>
        <div class="mb-4 orderInfo-formGroup">
          <label for="tradeWay" class="mb-2 orderInfo-label">交易方式</label>
          <div class="mb-4 orderInfo-inputWrap">
            <select id="tradeWay" class="mb-2 orderInfo-input" name="交易方式">
              <option value="ATM" selected>ATM</option>
              <option value="信用卡">信用卡</option>
              <option value="超商付款">超商付款</option>
            </select>
          </div>
        </div>
        <input type="submit" value="送出預訂資料" class="orderInfo-btn">
      </form>
    </section>
  `);
};

export default CartForm;