const cartStore = {
  productsInCart: [],
  productCount: 0,
  grandTotal: 0,

  addProductToCart(product) {
    const isSelected = this.productsInCart.some((Eproduct) => Eproduct.id === product.id);
    if (!isSelected) {
      const subtotal = product.price * (product.quantity || 1);
      this.productsInCart.push({ ...product, quantity: product.quantity || 1, subtotal });
      this.productCountCalc();
      this.grandTotalCalc();
    }
  },
  deleteProductFromCart(id) {
    const index = this.getIndexOfProduct(id);
    this.productsInCart.splice(index, 1);
    this.productCountCalc();
    this.grandTotalCalc();
  },
  addProductQuantity(id) {
    const index = this.getIndexOfProduct(id);
    this.productsInCart[index].quantity += 1;
    this.subTotalCalc(index);
    this.grandTotalCalc();
    this.productCountCalc();

  },
  substractProductQuantity(id) {
    const index = this.getIndexOfProduct(id);
    if (this.productsInCart[index].quantity > 1) {
      this.productsInCart[index].quantity -= 1;
      this.subTotalCalc(index);
      this.grandTotalCalc();
      this.productCountCalc();

    }
  },
  getIndexOfProduct(id) {
    return this.productsInCart.findIndex((Eproduct) => Eproduct.id === id);
  },
  subTotalCalc(index) {
    this.productsInCart[index].subtotal = this.productsInCart[index].price * this.productsInCart[index].quantity;
  },
  grandTotalCalc() {
    this.grandTotal = this.productsInCart.reduce((acc, product) => acc + product.subtotal, 0);
  },
  productCountCalc() {
    this.productCount = this.productsInCart.reduce((acc, product) => acc + product.quantity, 0);
  }
};

export default cartStore;