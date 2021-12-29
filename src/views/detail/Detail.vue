<template>
  <div id="detail">

    <detail-nav-bar class="detail-nav" ref="detail_nav" @titleClick="titleClick"/>
    <scroll class="content" ref="scroll" @scroll="detailScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop='shop'></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-param-info ref="param" :param-info="paramsInfo"/>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart='addCart'/>
    <back-top @click.native="backClick" v-show="isBackTopShow"/>
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
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import {getDetail, Goods, Shop, GoodsParams, getRecommend} from 'network/detail';

import {debounce} from 'common/utils.js'
import {backTopMixin} from 'common/mixin.js'

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
      recommend: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0
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
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [backTopMixin],
  methods: {
    addCart(){
      console.log('add');
      //获取购物车需要展示的信息
      const cartInfo = {};
      cartInfo.img =this.topImages[0];
      cartInfo.title =this.goods.title;
      cartInfo.desc =this.goods.desc;
      cartInfo.price =this.goods.realPrice;
      cartInfo.iid = this.iid;
      //将商品添加入购物车
      this.$store.dispatch('addCart',cartInfo);
    },
    imgLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100)
    },
    detailScroll(position) {
      const positionY = -position.y;
      for (let i = 0, l = this.themeTopY.length; i < l - 1; i++) {
        if (this.currentIndex != i && (positionY > this.themeTopY[i] && positionY < this.themeTopY[i + 1])) {
          this.currentIndex = i;
          this.$refs.detail_nav.currentIndex = i
        }
      }
      ;
      this.isBackTopShow = -position.y > 1000;

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
      getRecommend().then(res => {
        this.recommend = res.data.list
      });
      this.$nextTick(() => {
          //渲染下一帧时执行
        }
      );
      this.getThemeTopY = debounce(() => {
        this.themeTopY = [];
        this.themeTopY.push(0);
        this.themeTopY.push(this.$refs.param.$el.offsetTop);
        this.themeTopY.push(this.$refs.comment.$el.offsetTop);
        this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopY.push(Number.MAX_VALUE);
      }, 900)

    })
  },
  updated() {

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
  height: calc(100% - 44px - 49px);
}
</style>
