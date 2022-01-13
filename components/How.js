const How = () => {
  return (`
  <section class="my-md-5 my-3 how" id="purchaseWay">
    <h3 class="title">購物方式</h3>
    <ul class="d-block d-md-flex align-items-cent justify-content-between how-list">
      <li class="d-flex flex-column align-items-center how-item">
        <div class="my-3 d-flex justify-content-center align-items-center how-card">
          <span class="material-icons">
            shopping_cart
          </span>
        </div>
        <h4>STEP.01</h4>
        <p>選購商品</p>
      </li>
      <li class="d-flex flex-column align-items-center how-item">
        <div class="my-3 d-flex justify-content-center align-items-center how-card">
          <span class="material-icons">
            format_list_numbered
          </span>
        </div>
        <h4>STEP.02</h4>
        <p>填寫預定資料</p>
      </li>
      <li class="d-flex flex-column align-items-center how-item">
        <div class="my-3 d-flex justify-content-center align-items-center how-card">
          <span class="material-icons">
            check_circle
          </span>
        </div>
        <h4>STEP.03</h4>
        <p>預定成功</p>
      </li>
      <li class="d-flex flex-column align-items-center how-item">
        <div class="my-3 d-flex justify-content-center align-items-center how-card">
          <span class="material-icons">
            local_shipping
          </span>
        </div>
        <h4>STEP.04</h4>
        <p>等待貨物上門</p>
      </li>
    </ul>
  </section> 
    `);
};

export default How;
