const ThankyouPage = {
  render: (productData) => {
    const item = (`
      <section class="container-xl my-5 shoppingCart">
        <h3 class="title">謝謝您，我們正在處理您的訂單</h3>
        <h3 class="title">訂單詳情<i class="far fa-check-square" style="margin-left: 5px; color: green"></i></h3>
        <div class="overflowWrap">
          <table class="shoppingCart-table" data-cart-table>
            <tr>
              <th width="40%">品項</th>
              <th width="15%">單價</th>
              <th width="15%">數量</th>
              <th width="15%">金額</th>
            </tr>
          
          ${createCartProductELe(productData)}
          ${createCartCounterEle(productData)}

          </table>
        </div>
      </section>   
    `);

    return item;
  }
};

// {products:[], total: num}
export default ThankyouPage;

function createCartProductELe ({ products }) {
  let productTrEle = '';

  products.forEach((product) => {
    const { quantity, price, images, title } = product;
    productTrEle += `
      <tr>
        <td>
          <div class="d-flex align-items-center gap-3 cardItem-title">
            <img src="${images}" alt="">
            <p>${title.toLocaleString('en-US')}</p>
          </div>
        </td>
        <td>NT$${price.toLocaleString('en-US')}</td>
        <td>
            <span style="margin: 0 5px;">${quantity}</span>
        </td>
        <td>NT$${(price * quantity).toLocaleString('en-US')}</td>
      </tr>`;
  });

  return productTrEle;
}

function createCartCounterEle ({ total }) {
  return (`<tr>
      <td</td>
      <td></td>
      <td></td>
      <td>
        <p>總金額</p>
      </td>
      <td>NT$${total.toLocaleString('en-US')}</td>
    </tr>`);
}
