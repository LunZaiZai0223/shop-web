const Banner = () => {
  return (
    `<section class="my-md-5 banner">
      <!-- Slider main container -->
      <div class="swiper">
        <!-- Additional required wrapper -->
        <div class="swiper-wrapper">
          <!-- Slides -->
          <div class="swiper-slide"
            style="background-image: url('https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1460&q=80');">
          </div>
          <div class="swiper-slide"
            style="background-image: url('https://images.unsplash.com/photo-1487300001871-12053913095d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');">
            ></div>
          <div class="swiper-slide"
            style="background-image: url('https://images.unsplash.com/photo-1493548578639-b0c241186eb0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');">
          </div>
        </div>
      </div>
      <div class="banner-text-wrapper">
        <h3>WOWOROOM</h3>
        <h3>您一覺好眠的幫手</h3>
      </div>
    </section>`
  );
};

export default Banner;