<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import {getDetail} from 'network/detail';

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  created() {
    this.iid = this.$route.params.iid;
    //获取详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      //数据分离
      this.topImages = res.result.itemInfo.topImages
    })
  }
}
</script>

<style scoped>

</style>
