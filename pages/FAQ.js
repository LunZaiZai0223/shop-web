import { scrollMove } from "../utils.js";

const createItem = (qty) => {
  let str = '';

  for (let i = 0; i < qty; i++) {
    str += (`
      <li class="FAQ-item mb-4">
        <p class="p-3 m-0 d-flex justify-content-between align-items-center" data-toggle="collapse">
          勞動本網排名任何不？
          <span class="material-icons arrow" data-toggle="collapse">
            expand_more
          </span>
        </p>
        <div class="panel">
          <p class="px-3 py-4 m-0">
            魅力一名網頁不敢一人解決一家要求充分幫助領先共享版，不肯怪物微軟責任，時期期間網上命令，滑鼠機器完美不限背景，模型瀏覽次數地理學術想像生物，大聲共享版還沒有攝影可能是他沒什麼一個月符合商務設施，制定哪些的確超過意大利通常不需要一件並非第二章孤獨，環節那是。
          </p>
        </div>
      </li>
    `);
  }

  return str;
};

const addCollapseEvent = () => {
  const list = document.querySelector('.FAQ-list');
  list.addEventListener('click', (event) => {
    const target = event.target;
    target.dataset.toggle === 'collapse' && (() => {
      target.closest('.FAQ-item').classList.toggle('FAQ-item_active');
    })();
  });
};

const FAQ = {
  render: () => {
    const item = (`
  <section class="container-xl my-5 FAQ">
    <h3 class="title">常見問題</h3>
    <ul class="FAQ-list">

    ${createItem(8)}

    </ul>
  </section>
    `);

    return item;
  },
  after_render: () => {
    scrollMove();
    addCollapseEvent();
  }
};

export default FAQ;