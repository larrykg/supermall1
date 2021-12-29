export default {
  //每个方法尽可能完成的事件比较单一
  addCounter(state, payLoad) {
    payLoad.count++
  },
  addCart(state, payLoad) {
    payLoad.isChecked = true;
    state.cartList.push(payLoad)
  }
}
