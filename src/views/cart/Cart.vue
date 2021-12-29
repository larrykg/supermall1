<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import {mapGetters} from 'vuex'
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed:{
    //可以有两种语法
   // ...mapGetters(['cartLength','cartList']),

   ...mapGetters({
     length:'cartLength',
     cart:'cartList'
   })
  }
}
</script>

<style scoped>
.cart{
height: 100vh;
}
.nav-bar{
  background: var(--color-tint);
  color: white;
}
</style>
