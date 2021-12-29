<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        :is-check="isSelectAll"
        @click.native="checkClick"
        class="check-button"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{ totalPrice }}
    </div>
    <div class="calculate">
      去计算({{ checkLength }})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        this.$store.state.cartList.forEach(item => item.isChecked = false)
      } else {
        this.$store.state.cartList.forEach(item => item.isChecked = true)
      }
    }
  },
  computed: {
    totalPrice() {
      return '￥' + this.$store.state.cartList.filter(item => {
        return item.isChecked
      }).reduce((preValue, item) => {
        return preValue + item.price * item.count
      }, 0).toFixed(2)
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.isChecked).length
    },
    isSelectAll() {
      if (this.$store.state.cartList.length == 0) {
        return false
      }
      return !(this.$store.state.cartList.filter(item => !item.isChecked).length)
    }

  }
}
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background: #eee;
  line-height: 40px;


  position: relative;
  display: flex;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;

  width: 60px;

}

.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 20px;
  flex: 1;
}

.calculate {
  width: 90px;
  background: #e4393c;
  color: white;
  text-align: center;
}
</style>
