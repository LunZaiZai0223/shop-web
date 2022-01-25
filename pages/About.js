import { scrollMove } from "../utils.js";

const About = {
  render: () => {
    const item = (`
  <section class="my-md-5 my-4 container-xl about">
    <h3 class="title">關於我們</h3>
    <img
      src="https://images.unsplash.com/photo-1552960504-34e1e1be3f53?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      alt="" class="about-image">
    <div class="my-3 about-text-group">
      <h3>我們是專業團隊</h3>
      <p>
        促銷航空特價想法，期待廣場之後住宅主人付出百度一塊想想三大仔細獲得，草魚士兵解決人大供求，效果億元通訊建設包括當時風景加上典型，調整日記，全文女朋友，行業好看配套轉讓用來竟然離開目光目光也會感情工業是否，金幣之處完全不能下載能力投資做出專家，每頁這個需求。
      </p>
    </div>

    <div class="my-3 about-text-group">
      <h3>我們是專業團隊</h3>
      <p>
        促銷航空特價想法，期待廣場之後住宅主人付出百度一塊想想三大仔細獲得，草魚士兵解決人大供求，效果億元通訊建設包括當時風景加上典型，調整日記，全文女朋友，行業好看配套轉讓用來竟然離開目光目光也會感情工業是否，金幣之處完全不能下載能力投資做出專家，每頁這個需求。
      </p>
    </div>
    <div class="my-3 about-text-group">
      <h3>我們是專業團隊</h3>
      <p>
        促銷航空特價想法，期待廣場之後住宅主人付出百度一塊想想三大仔細獲得，草魚士兵解決人大供求，效果億元通訊建設包括當時風景加上典型，調整日記，全文女朋友，行業好看配套轉讓用來竟然離開目光目光也會感情工業是否，金幣之處完全不能下載能力投資做出專家，每頁這個需求。
      </p>
    </div>
  </section>
    `);
    return item;
  },
  after_render: () => {
    scrollMove();
  }
};

export default About;