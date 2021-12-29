export default {
  addCart(context, payLoad) {
    //判断数组是否存在该商品
    let product = context.state.cartList.find((item) => {
      return item.iid === payLoad.iid
    });
    if (product) {
      //product.count += 1
      context.commit('addCounter', product)
    } else {
      payLoad.count = 1;
      // context.state.cartList.push(payLoad)
      context.commit('addCart', payLoad)
    }
  },
}
