const VuePreLoadImg = {};
const PRELOAD_IMAGES_KEY = 'VUE_PRELOAD_IMG_CONFIG';

/**
 * Vue预加载插件
 * 功能：在mounted钩子中，加载需要预加载的图片。
 *
 * 使用方法：
 *
 * 1. 引入
 * import VuePreLoadImg from 'vue-preload-img'
 *
 * 2. 使用
 * Vue.use(VuePreLoadImg)
 *
 * 3. 在data中加入要预加载的图片地址，如：
 *
 * data() {
 *   return {
 *     // ...
 *     VUE_PRELOAD_IMG_CONFIG: {
 *       delay: 1000, // 延迟毫秒数
 *       data: [
 *           '图片1.png'，
 *           '图片2.png'，
 *           '图片3.png'
 *        ]
 *     }
 *   }
 * }
 *
 */
VuePreLoadImg.install = function (Vue) {
  Vue.mixin({
    mounted() {
      if (this.$data
           && this.$data[PRELOAD_IMAGES_KEY]
           && this.$data[PRELOAD_IMAGES_KEY].data
           && Array.isArray(this.$data[PRELOAD_IMAGES_KEY].data)
           && this.$data[PRELOAD_IMAGES_KEY].data.length
      ) {
        const { delay } = this.$data[PRELOAD_IMAGES_KEY];
        let thisDelay = 0;
        if (delay && typeof delay === 'number') {
          thisDelay = delay;
        }
        setTimeout(() => {
          this.$data[PRELOAD_IMAGES_KEY].data.map((item) => {
            const image = new Image();
            image.src = item;
          });
        }, thisDelay);
      }
    },
  });
};

export default VuePreLoadImg;
