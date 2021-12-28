export const mixin={

  mounted(){
    console.log('在创建得时候混入');
  }
}
import BackTop from "components/content/backtop/BackTop";
export const  backTopMixin = {
  components:{
    BackTop
  },
  data(){
    return {
      isBackTopShow : false
    }
  },
  methods:{
    backClick(){
      this.$refs.scroll.scrollTo(0,0,100)
    }
  },
}
