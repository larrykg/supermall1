<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" class="tab-control-item" @click="itemClick(index)" :class="{active:index==currentIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data(){
    return{
      currentIndex :0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index
    }
  },
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.tab-control{
  display: flex;
  text-align: center;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item{
  flex: 1;
}
.tab-control-item span{
  padding:5px;
}
.active{
  color: var(--color-high-text);

}
.active span{
  border-bottom: 3px solid var(--color-high-text);
}
</style>
