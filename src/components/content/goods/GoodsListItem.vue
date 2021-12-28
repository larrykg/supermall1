<template>
  <div class="goods-item" @click="itemClick">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="goods-info">
      <p>{{ good.title }}</p>
      <span class="price">{{ good.price }}</span>
      <span class="collect">{{ good.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListView",
  props: {
    good: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imageLoad() {
      //鉴于首页和详情得推荐都使用了本组件，需要分别讨论事件总线
      //事件总线
      if(this.$route.path.indexOf('/home')!=-1){
        this.$bus.$emit('HomeItemImgLoad')
      }else if(this.$route.path.indexOf('/recommend')!=-1){
        this.$bus.$emit('detailImgLoad')
      }

    },
    itemClick() {
      this.$router.push('/detail/' + this.good.iid)
    }
  },
  computed:{
    showImage(){
      return this.good.image||this.good.show.img
    }
  }
}
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;


}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
