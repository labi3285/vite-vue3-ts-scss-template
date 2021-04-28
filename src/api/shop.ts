
export function getProducts() {
  const products = [
    { 'id': 1, 'name': '手机', 'price': 3000, 'stock': 1 },
    { 'id': 2, 'name': '手表', 'price': 400, 'stock': 2 },
    { 'id': 3, 'name': '衣服', 'price': 200, 'stock': 3 },
  ];
  return new Promise((resove, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) {
        resove(products);
      } else {
        reject(new Error('error'));
      }
    }, 1000);
  });
}

export function buyProducts(products: any[]) {
  return new Promise((resove, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.5) {
        resove(products);
      } else {
        reject(new Error('error'));
      }
    }, 100);
  });
}
