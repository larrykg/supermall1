<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info :param-info="paramsInfo"/>
      <detail-comment-info :commentInfo="commentInfo"/>
      <goods-list :goods="recommend"></goods-list>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import {getDetail, Goods, Shop, GoodsParams,getRecommend} from 'network/detail';

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommend:[]
    }
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    },
    titleClick(){

    }
  },
  created() {
    this.iid = this.$route.params.iid;
    //获取详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      //数据分离
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //商品详情数据
      this.detailInfo = data.detailInfo
      //获取参数信息
      this.paramsInfo = new GoodsParams(data.itemParams.info, data.itemParams.rule);
      //获取评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
      //获取推荐数据
      getRecommend().then(res=>{
        this.recommend = res.data.list
      })
    })
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background: white;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background: white;
}

.content {
  height: calc(100% - 44px);
}
</style>
