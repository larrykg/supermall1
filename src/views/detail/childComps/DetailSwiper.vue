<template>
  <swiper class="swiper_">
    <swiper-item v-for="(item,index) in topImages">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper';

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style scoped>
.swiper_ {
  height: 300px;
  overflow: hidden;
}

.swiper_ img{
  width: 100%;
  height: 100%;
}
</style>
