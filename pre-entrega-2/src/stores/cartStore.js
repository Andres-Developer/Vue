const cartStore = {
  productsInCart: [],
  get productCount() {
    return this.productsInCart.reduce((acc, product) => acc + product.quantity, 0);
  },
  get grandTotal() {
    return this.productsInCart.reduce((acc, product) => acc + product.subtotal, 0);
  },

  addProductToCart(product) {
    const isSelected = this.productsInCart.some((Eproduct) => Eproduct.id === product.id);
    if (!isSelected) {
      const subtotal = product.price * (product.quantity || 1);
      this.productsInCart.push({ ...product, quantity: product.quantity || 1, subtotal });
    }
  },
  deleteProductFromCart(id) {
    const index = this.getIndexOfProduct(id);
    this.productsInCart.splice(index, 1);
  },
  addProductQuantity(id) {
    const index = this.getIndexOfProduct(id);
    this.productsInCart[index].quantity += 1;
    this.subTotalCalc(index);
  },
  subtractProductQuantity(id) {
    const index = this.getIndexOfProduct(id);
    if (this.productsInCart[index].quantity > 1) {
      this.productsInCart[index].quantity -= 1;
      this.subTotalCalc(index);
    }
  },
  getIndexOfProduct(id) {
    return this.productsInCart.findIndex((Eproduct) => Eproduct.id === id);
  },
  subTotalCalc(index) {
    this.productsInCart[index].subtotal = this.productsInCart[index].price * this.productsInCart[index].quantity;
  },
  clearCart() {
    this.productsInCart = [];
  }
};

export default cartStore;