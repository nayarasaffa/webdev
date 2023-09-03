class Shop {
  constructor(shopElement, cart) {
    this.shopElement = shopElement;
    this.cart = cart;
    this.shopItemsData = [
      {
        id: 1,
        name: "aespa - The 3rd Mini Album [MY WORLD]",
        img: "assets/aespa.jpg",
        price: "200000",
      },
      {
        id: 2,
        name: "ZEROBASEONE - The 1st Mini Album [YOUTH IN THE SHADE]",
        img: "assets/zerobaseone.jpg",
        price: "250000",
      },
      {
        id: 3,
        name: 'IVE - THE 1ST ALBUM [I"ve IVE]',
        img: "assets/ive.png",
        price: "220000",
      },
      {
        id: 4,
        name: "NCT - The 4th Album [GOLDEN AGE]",
        img: "assets/nct.jpg",
        price: "300000",
      },
      {
        id: 5,
        name: "ITZY - The 1st Album [CRAZY IN LOVE]",
        img: "assets/itzy.png",
        price: "210000",
      },
      {
        id: 6,
        name: "Stray Kids - The 3rd Album [★★★★★ (5-STAR)]",
        img: "assets/straykids.jpg",
        price: "310000",
      },
      {
        id: 7,
        name: "NewJeans - [NewJeans 1st EP 'New Jeans']",
        img: "assets/newjeans.jpg",
        price: "330000",
      },
      {
        id: 8,
        name: "LEE MU JIN - The 1st Mini Album [Room Vol.1]",
        img: "assets/leemujin.png",
        price: "230000",
      },
      {
        id: 9,
        name: "IZ*ONE - Mini Album Vol. 4 [ONE REELER / ACT IV]",
        img: "assets/izone.jpg",
        price: "300000",
      },
    ];
    this.basket = [];

    this.generateShop();
    this.showCart();
  }

  generateShop() {
    this.shopElement.innerHTML = this.shopItemsData
      .map(({ id, name, price, img }) => {
        return `
          <div id="product-id-${id}" class="col">
            <div class="card h-100" style="border-color: #e48eac">
              <img src="${img}" class="card-img-top" />
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${name}</h5>
                <div class="price-quantity mt-auto">
                  <p class="card-text">Rp${price}</p>
                  <div class="buttons d-flex justify-content-end">
                    <i
                      onclick="shop.decrement(${id})"
                      class="bi bi-dash-square-fill"
                      style="color: #e48eac"
                    ></i>
                    <div id="${id}" class="quantity">0</div>
                    <i
                      onclick="shop.increment(${id})"
                      class="bi bi-plus-square-fill"
                      style="color: #e48eac"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      })
      .join("");
  }

  increment(id) {
    let selectedItem = id;
    let search = this.basket.find((x) => x.id === selectedItem);

    if (search === undefined) {
      this.basket.push({
        id: selectedItem,
        item: 1,
      });
    } else {
      search.item += 1;
    }

    console.log(this.basket);
    this.update(selectedItem);
    this.showCart();
  }

  decrement(id) {
    let selectedItem = id;
    let search = this.basket.find((x) => x.id === selectedItem);

    if (search.item === 0) {
      return;
    } else {
      search.item -= 1;
      this.update(selectedItem);
      if (search.item === 0) {
        this.basket = this.basket.filter((x) => x.id !== selectedItem);
      }
    }
    console.log(this.basket);
    this.showCart();
  }

  update(id) {
    let search = this.basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
  }

  showCart() {
    let cartContent = "";
    let totalPrice = 0;

    if (this.basket.length === 0) {
      cartContent += `<p style= "font-size: 20px;  color: #683f4e"><b>Cart is Empty !</b></p>`;
    } else {
      for (let i = 0; i < this.basket.length; i++) {
        let item = this.basket[i];
        let shopItem = this.shopItemsData.find(
          (itemData) => itemData.id === item.id
        );

        cartContent += `
          <div class="row">
              <div class="col-sm">
                  <img src="${shopItem.img}" width="100px"
                  style="border-radius: 10px" />
              </div>
              <div class="col-sm">
                <div class="row" style="text-align: left">
                  ${shopItem.name}
                </div>
                <div class="row" style="text-align: left; color: #c67b95">
                  Rp${shopItem.price} x ${item.item}
                </div>
              </div>
              <div class="col-sm" style="text-align:left">
                <b>Rp${shopItem.price * item.item}</b>
              </div>
          </div>`;
        totalPrice += shopItem.price * item.item;
      }
    }
    cartContent += `
      <div class="row">
          <div class="col-sm-8" style="text-align: right; color: #c67b95"><b>Total Pembelian</b></div>
          <div class="col-sm-4" style="text-align: left; color: #c67b95"><b>Rp${totalPrice}</b></div>
      </div>
      <div class="row">
          <div class="col-sm-8" style="text-align: right; color: #c67b95"><b>Pajak 11%</b></div>
          <div class="col-sm-4" style="text-align: left; color: #c67b95"><b>Rp${
            (totalPrice * 11) / 100
          }</b></div>
      </div>
      <div class="row">
          <div class="col-sm-8" style="text-align: right; color: #c67b95"><b>Total Bayar</b></div>
          <div class="col-sm-4" style="text-align: left; color: #c67b95"><b>Rp${
            totalPrice + (totalPrice * 11) / 100
          }</b></div>
      </div>`;

    const cartContentElement = document.getElementById("cartContent");
    cartContentElement.innerHTML = cartContent;
    cart.innerHTML = cartContent;
  }
}

const shop = new Shop(
  document.getElementById("shop"),
  document.getElementById("cart")
);
