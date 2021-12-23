<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control @tabClick="tabClick" :titles="['流行','新款','精选']" ref="tabControl1" class="tab-control" v-show="isTabFixed" />
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll='scrollEvent'
            @pullingUp='loadMore'
            :pull-up-load="true">
      <home-swiper :banner="banner" @swiperImageLoad='swiperImageLoad'/>
      <recommend-view :recommend='recommend'/>
      <feature-view/>
      <tab-control @tabClick="tabClick" :titles="['流行','新款','精选']" ref="tabControl2" />
      <goods-list :goods="showGood"/>
    </scroll>
    <!--    原生组件的点击需要 .native-->
    <back-top @click.native="backClick" v-show="isBackTopShow"/>

  </div>


</template>

<script>

import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from "components/common/navbar/NavBar";
import TabControl from 'components/content/tabControl/TabControl'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backtop/BackTop'

import GoodsList from 'components/content/goods/GoodsList'

import {getHomeMultidata, homeRequst, getHomeGoods} from 'network/home';
import {debounce} from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentGood: 'pop',
      isBackTopShow: false,
      tabOffsetTop: 0,
      isTabFixed: false
    }
  },
  computed: {
    showGood() {
      return this.goods[this.currentGood].list
    }
  },
  created() {
    this.homeRequst()
//请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    //监听图片加载完成
    this.$bus.$on('itemImgLoad', () => {
      refresh()
    })

    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
  },
  methods: {
    //事件监听

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentGood = 'pop';
          break
        case 1:
          this.currentGood = 'new';
          break
        case 2:
          this.currentGood = 'sell';
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      //$refs.scroll:  子组件  由于设置了ref='scroll'
      //$refs.scroll.scroll 子组件的属性
      this.$refs.scroll.scrollTo(0, 0, 1000)
    },

    scrollEvent(position) {
      //判断backTop是否显示
      this.isBackTopShow = -position.y > 1000;
      //决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    loadMore() {
      this.getHomeGoods(this.currentGood)
    },
    swiperImageLoad() {
      //获取tabControl的offsetTop
      //所有的组件都有属性和 $el：用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    //网络请求
    //1请求多个数据
    homeRequst() {
      homeRequst().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  /*100 view height*/
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: white;

  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*top: 0;*/
  /*z-index: 9;*/

}


.content {
  /*height: 300px;*/
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;

  /*height: calc(100% - 93px);*/
}
.tab-control{
  position: relative;
  z-index: 9;
}

</style>
