const recommendationData1 = [
  {
    person: '王六角',
    avatar: './images/推薦人-王六角.png',
    product: 'Jodan 雙人床架',
    productImg: './images/推薦產品-Jodan雙人床架.png',
    comment: 'CP 值很高'
  },
  {
    person: 'Leaf',
    avatar: './images/推薦人-Leaf.png',
    product: 'Antony 雙人床架',
    productImg: './images/推薦產品-Antony雙人床架.png',
    comment: '很喜歡～還有送三年保固'
  },
  {
    person: '美濃鄧紫棋',
    avatar: './images/推薦人-鄧紫棋.png',
    product: 'Charles 系列儲物組合',
    productImg: './images/推薦產品-Charles系列儲物組合.png',
    comment: '廚房必備美用品'
  },
  {
    person: 'Ray',
    avatar: './images/推薦人-isRayNoArray.png',
    product: 'Antony 雙人床架',
    productImg: './images/推薦產品-Antony雙人床架2.png',
    comment: '物美價廉'
  },
  {
    person: '程鮭魚',
    avatar: './images/推薦人-鮭魚.png',
    product: 'Louvre 雙人床架',
    productImg: './images/推薦產品-Louvre雙人床架.png',
    comment: '租屋用剛好'
  }
];

const recommendation2 = [
  {
    person: '小杰',
    avatar: './images/推薦人-小杰.png',
    product: 'Louvre 雙人床架',
    productImg: './images/推薦產品-Louvre雙人床架.png',
    comment: '非常舒適'
  },
  {
    person: '江八角',
    avatar: './images/推薦人-江八角.png',
    product: 'Charles 雙人床架',
    productImg: './images/推薦產品-江八角.png',
    comment: '品質不錯'
  },
  {
    person: '讚神',
    avatar: './images/推薦人-讚神.png',
    product: 'Antony 床邊桌',
    productImg: './images/推薦產品-讚神.png',
    comment: '讚讚讚'
  },
  {
    person: '安安',
    avatar: './images/推薦人-久安說安安.png',
    product: 'Antony 單人床架',
    productImg: './images/推薦產品-久安說安安.png',
    comment: '一個人躺剛好'
  },
  {
    person: 'PeiQun',
    avatar: './images/推薦人-PeiQun.png',
    product: 'Antony 雙人床架',
    productImg: './images/推薦產品-Antony雙人床架2.png',
    comment: '睡起來很舒適'
  },
];

const createGalleryCardItem = (data) => {
  let item = '';

  data.forEach((recommendation) => {
    const { person, avatar, product, productImg, comment } = recommendation;

    /* html */
    item += (`
      <li class="d-flex align-items-center me-3 gallery-card">
        <img class="d-block me-2" src="${productImg}">
        <div class="gallery-card-content">
          <div class="d-flex gallery-card-content-header">
            <img src="${avatar}">
            <div class="ms-2 gallery-card-content-header-txt">
              <p class="mb-1">${person}</p>
              <p class="m-0">${product}</p>
            </div>
          </div>
            <p class="mt-2 mb-0">${comment}</p>
        </div>
      </li>
    `);
  });

  return item;
};

const addRecommendationFunc = () => {
  const ele = document.querySelector('.slider');
  const mousePosition = { top: 0, left: 0, x: 0, y: 0 };

  const handleMouseDown = (event) => {
    mousePosition.top = ele.scrollTop;
    mousePosition.left = ele.scrollLeft;
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;

    ele.style.userSelect = 'none';
    ele.style.cursor = 'grab';

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    ele.style.cursor = 'grabbing';
    const dx = event.clientX - mousePosition.x;
    ele.scrollLeft = mousePosition.left - dx;
  };

  const handleMouseUp = () => {
    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');

    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  ele.addEventListener('mousedown', handleMouseDown);
};


const Recommendation = {
  render: () => {
    /* html */
    return (`
    <section class="py-5 recommendation" id="recommendation">
      <div class="container-xl slider" style="cursor: grab">
        <ul class="d-flex p-0 mb-4 gallery-top">
          ${createGalleryCardItem(recommendationData1)}
        </ul>
        <ul class="d-flex p-0 gallery">
          ${createGalleryCardItem(recommendation2)}
        </ul>
      </div>
    </section>
  `);
  },
  after_render: () => {
    addRecommendationFunc();
  }
};

export default Recommendation;