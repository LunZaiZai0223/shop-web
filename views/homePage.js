import { getAllProductsData, addProductsIntoCart, getCartProductsData } from '../api.js';
import { render, showAddingProductAlert, hideAddingProductAlert } from '../utils.js';

console.log(getAllProductsData);

// 把全部的商品資料接到本地裡面
let allProductsData = [];

// 得到篩選的 section
function getSelectOptionKeys (allProductsData) {
  const keys = allProductsData.map((product) => product.category);
  const optionsArr = keys.filter((key, indexNum) => {
    return keys.indexOf(key) === indexNum;
  });
  console.log(optionsArr);
  return optionsArr;
}

// 要不然就是先打 api
// 阿靠腰，那之後也要把這個更新耶= =
// 哭啊！！
async function checkCartItemNum () {
  console.log('來確認購物車了喔');
  const cartData = await getCartProductsData();
  console.log(cartData);
  const cartItemLength = cartData.carts.length;
  const cartIcon = document.querySelector('#cart-icon');
  cartIcon.setAttribute('data-after', cartItemLength);
}

checkCartItemNum();

// 創造 option
function createSelectOptionsEle (optionsArr) {
  console.log(optionsArr);
  let optionEles = '<option value="全部" selected>全部</option>';
  optionsArr.forEach((option) => {
    optionEles += `<option value="${option}">${option}</option>`;
  });

  console.log(optionEles);
  return optionEles;
}

// 創造商品卡片
function createProductCardLiELe (allProductsData) {
  // data-product-list 要放的地方
  let card = '';
  allProductsData.forEach((product) => {
    card += `<li class="productCard">
          <h4 class="productType">${product.category}</h4>
          <img
            src="${product.images}"
            alt="">
          <a href="#" class="addCardBtn" data-product-id="${product.id}">加入購物車</a>
          <div class="card-content">
            <h3>${product.title}</h3>
            <div class="card-price-wrapper">
              <del class="originPrice">NT$${product.origin_price.toLocaleString('en-US')}</del>
              <p class="nowPrice">NT$${product.price.toLocaleString('en-US')}</p>
            </div>
          </div>
        </li>`;
  });

  return card;
}

const HomePage = {
  // 這邊用 async 確保 expression html tag 可以安全產生
  item: async () => {
    const ele = (`<section class="wrap" id="bedAdvantage">
      <div class="banner">
        <h2 class="banner-text">窩窩家居<br>跟您一起品味生活</h2>
      </div>
      <h3 class="section-title">床墊優勢</h3>
      <ul class="bedAdvantage">
        <li>
          <img class="bedAdvantage-img" src="./images/床墊優勢-原木料環保.png" alt="原木料環保">
          <p class="bedAdvantage-text">原木料環保</p>
        </li>
        <li>
          <img class="bedAdvantage-img" src="./images/床墊優勢-好收納.png" alt="好收納">
          <p class="bedAdvantage-text">好收納</p>
        </li>
        <li>
          <img class="bedAdvantage-img" src="./images/床墊優勢-好組裝.png" alt="好組裝">
          <p class="bedAdvantage-text">好組裝</p>
        </li>
      </ul>
    </section>

    <section class="furniture-compare">
      <div class="wrap">
        <h3 class="section-title">家具比較</h3>
        <div class="overflowWrap">
          <table class="compare-table">
            <thead>
              <tr>
                <th></th>
                <th>窩窩系統模組家具</th>
                <th class="text-muted">組合式家具</th>
                <th class="text-muted">實木家具</th>
              </tr>
            </thead>
            <tr>
              <td>可單人自行組裝</td>
              <td><span class="material-icons">done</span></td>
              <td class="text-muted">不一定</td>
              <td></td>
            </tr>
            <tr>
              <td>可多次重複拆裝</td>
              <td><span class="material-icons">done</span></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>床墊規格彈性大</td>
              <td><span class="material-icons">done</span></td>
              <td class="text-muted">不一定</td>
              <td class="text-muted">不一定</td>
            </tr>
            <tr>
              <td>材質可長久使用</td>
              <td><span class="material-icons">done</span></td>
              <td></td>
              <td><span class="material-icons">done</span></td>
            </tr>
            <tr>
              <td>小客車即可搬運</td>
              <td><span class="material-icons">done</span></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </div>
      </div>
    </section>

    <section class="recommendation" id="recommendation">
      <div class="wrap">
        <h3 class="section-title">好評推薦</h3>
        <div class="recommendation-wall">
          <ul class="gallery-top">
            <li class="recommendation-card">
              <img src="./images/推薦產品-Jodan雙人床架.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-王六角.png" alt="">
                  <div>
                    <p>王六角</p>
                    <p class="recommend-text">Jodan 雙人床架</p>
                  </div>
                </div>
                <p>CP值很高。</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-Antony雙人床架.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-Leaf.png" alt="">
                  <div>
                    <p>Leaf</p>
                    <p class="recommend-text">Antony 雙人床架</p>
                  </div>
                </div>
                <p>很喜歡～還有送三年保固～</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-Charles系列儲物組合.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-鄧紫棋.png" alt="">
                  <div>
                    <p>美濃鄧子琪</p>
                    <p class="recommend-text">Charles 系列儲物組合</p>
                  </div>
                </div>
                <p>廚房必備美用品！</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-Antony雙人床架2.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-isRayNoArray.png" alt="">
                  <div>
                    <p>isRaynotArray</p>
                    <p class="recommend-text">Antony 雙人床架</p>
                  </div>
                </div>
                <p>物超所值!</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-Louvre雙人床架.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-鮭魚.png" alt="">
                  <div>
                    <p>程鮭魚</p>
                    <p class="recommend-text">Louvre 雙人床架</p>
                  </div>
                </div>
                <p>租屋用剛剛好</p>
              </div>
            </li>
          </ul>
          <ul class="gallery-bottom">
            <li class="recommendation-card">
              <img src="./images/推薦產品-小杰.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-小杰.png" alt="">
                  <div>
                    <p>小杰</p>
                    <p class="recommend-text">Louvre 雙人床架</p>
                  </div>
                </div>
                <p>非常舒適，有需要會再回購</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-江八角.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-江八角.png" alt="">
                  <div>
                    <p>江八角</p>
                    <p class="recommend-text">Charles 雙人床架</p>
                  </div>
                </div>
                <p>品質不錯～</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-讚神.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦產品-讚神.png" alt="">
                  <div>
                    <p>juni讚神</p>
                    <p class="recommend-text">Antony 床邊桌</p>
                  </div>
                </div>
                <p>讚ㄉ！</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-讚神.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-讚神.png" alt="">
                  <div>
                    <p>久安說安安</p>
                    <p class="recommend-text">Antony 單人床架</p>
                  </div>
                </div>
                <p>一個躺剛剛好。</p>
              </div>
            </li>
            <li class="recommendation-card">
              <img src="./images/推薦產品-PeiQun.png" alt="">
              <div class="recommend-content">
                <div class="recommend-img">
                  <img src="./images/推薦人-PeiQun.png" alt="">
                  <div>
                    <p>PeiQun</p>
                    <p class="recommend-text">Antony 雙人床架</p>
                  </div>
                </div>
                <p>睡起來很舒適</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="transport" id="transport">
      <h3 class="section-title">運送方式</h3>
      <ul class="transport-intro">
        <li class="transport-card">
          <div class="cardImg">
            <span class="material-icons">
              shopping_cart
            </span>
          </div>
          <h4>STEP.1</h4>
          <p>選購商品</p>
        </li>
        <li class="transport-card">
          <div class="cardImg">
            <span class="material-icons">
              format_list_bulleted
            </span>
          </div>
          <h4>STEP.2</h4>
          <p>填寫預定資料</p>
        </li>
        <li class="transport-card">
          <div class="cardImg">
            <span class="material-icons">
              local_post_office
            </span>
          </div>
          <h4>STEP.3</h4>
          <p>預定成功</p>
        </li>
        <li class="transport-card">
          <div class="cardImg">
            <span class="material-icons">
              done
            </span>
          </div>
          <h4>STEP.4</h4>
          <p>Email 付款資訊</p>
        </li>
      </ul>
    </section>

    <section class="wrap productDisplay">
      <select name="" class="productSelect" data-product-select>
        ${createSelectOptionsEle(getSelectOptionKeys(allProductsData))}
      </select>
      <ul class="productWrap" data-product-list>
        ${createProductCardLiELe(allProductsData)}
      </ul>
    </section>
    `);

    return ele;
  },

  addEvent: async () => {
    // 推薦卡片滑動
    // document.addEventListener('DOMContentLoaded', function () {
    const ele = document.querySelector('.recommendation-wall');
    ele.style.cursor = 'grab';
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const mouseDownHandler = function (e) {
      ele.style.cursor = 'grabbing';
      ele.style.userSelect = 'none';

      pos = {
        left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    };
    const mouseMoveHandler = function (e) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      ele.scrollTop = pos.top - dy;
      ele.scrollLeft = pos.left - dx;
    };
    const mouseUpHandler = function () {
      ele.style.cursor = 'grab';
      ele.style.removeProperty('user-select');

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };
    // Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);
    // });

    // navbar hamburger
    // menu 切換
    let menuOpenBtn = document.querySelector('.menuToggle');
    let linkBtn = document.querySelectorAll('.topBar-menu a');
    let menu = document.querySelector('.topBar-menu');
    menuOpenBtn.addEventListener('click', menuToggle);

    linkBtn.forEach((item) => {
      item.addEventListener('click', closeMenu);
    })

    function menuToggle () {
      if (menu.classList.contains('openMenu')) {
        menu.classList.remove('openMenu');
      } else {
        menu.classList.add('openMenu');
      }
    }
    function closeMenu () {
      menu.classList.remove('openMenu');
    }
  },

  addProductListClickEvent: async () => {
    // data-product-list
    document.querySelector('[data-product-list]').addEventListener('click', handleClickAddProductsIntoCart);
  },

  addSelectChangeEvent: async () => {
    // data-product-select
    document.querySelector('[data-product-select]').addEventListener('change', handleChangeSelectProducts);
    // render again!
  },

  checkHaveAllProductsDataLocally: () => {
    return allProductsData.length === 0 ? false : true;
  },

  updateAllProductsDataLocally: async () => {
    allProductsData = await getAllProductsData();
    console.log(allProductsData);
    // allProductsData.push(getAllProductsData());
    // console.log(allProductsData);
  },

  getAllProductsDataLocally: () => {
    return allProductsData;
  }


};

// Add Product to cart event
async function handleClickAddProductsIntoCart (event) {
  event.preventDefault();
  const target = event.target.dataset;
  const productId = getProductId(target);
  if (productId) {
    console.log('adding product into cart');
    await addProductsIntoCart(productId);
    setTimeout(checkCartItemNum, 1000);
    // 如果沒有用 setTimeout 延遲執行，那麼每次第一筆新增商品至購物車都不會更新到購物車的數字，
    // 但我明明就在上一步使用 await 了，照理說應該會等到 await 的函式結束才會繼續執行，但是結果不如我預期。
    // 請問助教這邊程式碼哪裡出了問題呢？
    // checkCartItemNum();
    showAddingProductAlert();
  }
}

function getProductId ({ productId }) {
  console.log(productId);
  return productId;
}

// select change event 
function handleChangeSelectProducts (event) {
  const selectKeyword = event.target.value;
  const filterResult = getSelectFilterResult(selectKeyword);
  const productLiEles = createProductCardLiELe(filterResult);
  render(document.querySelector('[data-product-list]'), productLiEles);
}

// get filter result
function getSelectFilterResult (selectKeyword) {
  return selectKeyword === '全部' ? allProductsData : allProductsData.filter((product) => product.category === selectKeyword);
}

export default HomePage;