const { Schema, model } = require("mongoose");

const User = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

User.methods.addToCart = function (productId) {
  const cartProductIndex = this.cart.items.findIndex((item) => {
    return productId.toString() === item.productId.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId,
      quantity: newQuantity,
    });
  }

  this.cart = {
    items: updatedCartItems,
  };

  return this.save();
};

User.methods.clearAllCart = function () {
  this.cart = { items: [] };
  this.save();
};

module.exports = model("User", User);

/* module.exports = class User {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  static getUsers() {
    const db = getDB();
    return new Promise((res, rej) => {
      db.collection("users")
        .find()
        .toArray()
        .then((users) => res(users))
        .catch((err) => console.log(err));
    });
  }

  static deleteUser(userId) {
    return new Promise((res, rej) => {
      fs.readFile(route, (err, data) => {
        let users = [];

        if (!err && data.length >= 1) {
          users = JSON.parse(data);
        }

        const newList = filter(users, ({ id }) => id !== toNumber(userId));

        if (newList.length === users.length) {
          rej("User Not Found");
        }

        fs.writeFile(route, JSON.stringify(newList), (err) => {
          console.log(err);

          if (!err) {
            res();
          }
        });
      });
    });
  }

  async editUser(userId) {
    return new Promise((res, rej) => {
      fs.readFile(route, (err, data) => {
        let users = [];
        if (!err && data.length >= 1) {
          users = JSON.parse(data);
        }

        let modifiedUser;
        const newArray = flatMap(users, (user) => {
          if (user.id === toNumber(userId)) {
            const objectFiltered = omitBy(this, isNil);
            modifiedUser = assign(user, objectFiltered);
            return modifiedUser;
          }

          return user;
        });

        fs.writeFile(route, JSON.stringify(newArray), (err) => {
          if (!err) {
            res(modifiedUser);
          }
        });
      });
    });
  }
  // Improve ID creation due to a vulnerability when creating and deleting a lot of users.
  createId(users) {
    if (users.length === 0) {
      this.id = users.length + 1;
      return;
    }

    const ids = values(users).map(({ id }) => id);
    this.id = Math.max(...ids) + 1;
  }

  save() {
    const db = getDB();
    return new Promise((res, rej) => {
      db.collection("users")
        .insertOne(this)
        .then((data) => {
          console.log(data);
          res(this);
        })
        .catch((err) => rej(err));
    });
  }
};
 */
