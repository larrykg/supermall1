<template>
  <div class="goods">
    <goods-list-view v-for="good in goods" :good="good"/>
  </div>
</template>

<script>
import GoodsListView from './GoodsListItem'

export default {
  name: "GoodsList",
  components: {
    GoodsListView
  },
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}


</style>
