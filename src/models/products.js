const { Schema, model } = require("mongoose");

const product = new Schema({
  name: {
    type: String,
    require,
  },
  price: {
    type: Number,
    require,
  },
  stock: {
    type: Number,
    require,
  },
  SKU: {
    type: Number,
    require,
  },
  imgeUrl: {
    type: String,
    require,
  },
});

module.exports = model("Product", product);

/* module.exports = class Product {
  constructor({ name, price, stock, SKU, image_url }) {
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.SKU = SKU;
    this.image_url = image_url;
  }

  static getAll() {
    return new Promise((res, rej) => {
      fs.readFile(PRODUCTS_DOC, (err, data) => {
        let products = [];

        if (!err) {
          products = JSON.parse(data);
        }

        res(products);
      });
    });
  }

  static deleteProduct(productId) {
    return new Promise(async (res, rej) => {
      const products = await Product.getAll();
      const newProducts = filter(products, ({ id }) => productId !== id);
      fs.writeFile(PRODUCTS_DOC, JSON.stringify(newProducts), (err) => {
        if (!err) {
          res();
        }

        rej(err);
      });
    });
  }

  createId(products) {
    if (products.length === 0) {
      this.id = products.length + 1;
      return;
    }

    const ids = values(products).map(({ id }) => id);
    this.id = Math.max(...ids) + 1;
  }

  save() {
    return new Promise((res, rej) => {
      fs.readFile(PRODUCTS_DOC, (err, data) => {
        let products = [];

        if (!err && data.length >= 1) {
          products = JSON.parse(data);
        }

        this.createId(products);
        products.push(this);

        fs.writeFile(PRODUCTS_DOC, JSON.stringify(products), (err) => {
          if (!err) {
            res(this);
          }

          rej(err);
        });
      });
    });
  }

  update(productId) {
    return new Promise((res, rej) => {
      fs.readFile(PRODUCTS_DOC, (err, data) => {
        let products = [];
        if (!err) {
          products = JSON.parse(data);
        }

        let productUpdated;
        const newArray = flatMap(products, (product) => {
          if (product.id === toNumber(productId)) {
            const objectFiltered = omitBy(this, isNil);
            productUpdated = assign(product, objectFiltered);
            return productUpdated;
          }

          return product;
        });

        fs.writeFile(PRODUCTS_DOC, JSON.stringify(newArray), (err) => {
          if (!err) {
            res(productUpdated);
          }

          rej(err);
        });
      });
    });
  }
};
 */
