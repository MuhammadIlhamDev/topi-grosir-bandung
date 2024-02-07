const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#hamburger-menu").onclick = (event) => {
  navbarNav.classList.toggle("active");
  event.preventDefault();
};

// klik diluar sidebar untuk menghilangkan nav
const hamburger = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (e) {
  if (!hamburger.contains(e.target) && !navbarNav.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});

// shopping cart
const shoppingCart = document.getElementById("shopping-cart");
const shoppingCartS = document.querySelector(".shopping-cart");

shoppingCart.onclick = (event) => {
  shoppingCartS.classList.toggle("active");
  event.preventDefault();
};

// Tambahkan event listener untuk menyembunyikan formulir ketika klik di luar formulir Shopping cart
document.addEventListener("click", (event) => {
  if (
    !shoppingCart.contains(event.target) &&
    !shoppingCartS.contains(event.target)
  ) {
    shoppingCartS.classList.remove("active");
  }
});

let listProductHTML = document.querySelector(".product-card");
let listProductModal = document.querySelector(".container");
let listCartHTML = document.querySelector(".shopping-cart");
let listCartSpan = document.querySelector(".navbar-extra span");
let iconCartSpan = document.querySelector(".iconCartSpan");

let listProducts = [];
let carts = [];

const addDataToHTML = () => {
  listProductHTML.innerHTML = "";
  listProductModal.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      let newModals = document.createElement("div");
      newProduct.classList.add("menu-card");
      newProduct.dataset.id = product.id;
      newModals.classList.add("container");
      const price = product.price;
      newProduct.innerHTML = `
      <div class="product-icon">
      <button
        ><i class="icon-cart" data-feather="shopping-cart"></i
      ></button>
      <a href="#" class="icon-eye-p${product.id}"
        ><i data-feather="eye"></i
      ></a>
      </div>
    <div class="product-image">
      <img
        src="${product.image}"
        alt="${product.product}"
        class="menu-card-img"
      />
      <h1 class="menu-card-title">${product.product}</h1>
      <p class="menu-card-price">Rp ${price.toLocaleString()}</p>
    </div>
      `;
      listProductHTML.appendChild(newProduct);

      newModals.innerHTML = `
      <div class="modal" id="modals-${product.id}">
      <div class="modal-container">
        <div class="modal-content">
          <img src="${product.image}" alt="product 1" />
          <div class="product-content">
            <div class="content-title-close">
              <h3>${product.product}</h3>
              <a href="#" class="icon-x"><i data-feather="x"></i></a>
            </div>
            <p>
              ${product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
      `;
      listProductModal.appendChild(newModals);
    });
    feather.replace();

    // click button icon eye bring up box
    // icon eye
    const iconEyes1 = document.querySelector(".icon-eye-p1");
    const iconEyes2 = document.querySelector(".icon-eye-p2");
    const iconEyes3 = document.querySelector(".icon-eye-p3");
    const iconEyes4 = document.querySelector(".icon-eye-p4");
    const iconEyes5 = document.querySelector(".icon-eye-p5");
    const iconEyes6 = document.querySelector(".icon-eye-p6");
    // modal box
    const modals1 = document.querySelector("#modals-1");
    const modals2 = document.querySelector("#modals-2");
    const modals3 = document.querySelector("#modals-3");
    const modals4 = document.querySelector("#modals-4");
    const modals5 = document.querySelector("#modals-5");
    const modals6 = document.querySelector("#modals-6");
    //ixon x close modal box
    const iconX = document.querySelectorAll(".icon-x");

    iconEyes1.onclick = (event) => {
      modals1.classList.toggle("active");
      event.preventDefault();
    };
    iconEyes2.onclick = (event) => {
      modals2.classList.toggle("active");
      event.preventDefault();
    };
    iconEyes3.onclick = (event) => {
      modals3.classList.toggle("active");
      event.preventDefault();
    };
    iconEyes4.onclick = (event) => {
      modals4.classList.toggle("active");
      event.preventDefault();
    };
    iconEyes5.onclick = (event) => {
      modals5.classList.toggle("active");
      event.preventDefault();
    };
    iconEyes6.onclick = (event) => {
      modals6.classList.toggle("active");
      event.preventDefault();
    };

    // click icon-x remove box
    iconX.forEach((button) => {
      button.onclick = (event) => {
        modals1.classList.remove("active");
        modals2.classList.remove("active");
        modals3.classList.remove("active");
        modals4.classList.remove("active");
        modals5.classList.remove("active");
        modals6.classList.remove("active");
        event.preventDefault();
      };
    });

    // click icon-x or outside box remove
    window.onclick = (event) => {
      if (event.target === modals1) {
        modals1.classList.remove("active");
      } else if (event.target === modals2) {
        modals2.classList.remove("active");
      } else if (event.target === modals3) {
        modals3.classList.remove("active");
      } else if (event.target === modals4) {
        modals4.classList.remove("active");
      } else if (event.target === modals5) {
        modals5.classList.remove("active");
      } else if (event.target === modals6) {
        modals6.classList.remove("active");
      }
    };
  }
};

listProductHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  // Cek apakah elemen yang diklik memiliki kelas "icon-cart"
  if (positionClick.classList.contains("icon-cart")) {
    // Temukan elemen product-icon yang merupakan parentElement dari elemen yang diklik
    let productIcon = positionClick.closest(".product-icon");
    if (productIcon) {
      // Lakukan sesuatu dengan elemen product-icon yang ditemukan
      let product_Id = productIcon.parentElement.dataset.id;
      addToCart(product_Id);
      event.preventDefault();
    }
  }
});

const addToCart = (product_Id) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_Id == product_Id
  );
  if (carts.length <= 0) {
    carts = [
      {
        product_Id: product_Id,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      product_Id: product_Id,
      quantity: 1,
    });
  } else {
    carts[positionThisProductInCart].quantity =
      carts[positionThisProductInCart].quantity + 1;
  }
  addCartToHTML();
  addCartToMemory();
};

const addCartToMemory = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

function addCartToHTML() {
  // Menemukan elemen tempat daftar belanja akan ditampilkan
  listCartHTML.innerHTML = "";

  let totalQuantity = 0;
  let totalPrice = 0;

  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity += cart.quantity;
      let newCart = document.createElement("div");
      newCart.classList.add("cart-item");
      newCart.dataset.id = cart.product_Id;

      // Mendapatkan informasi produk dari listProducts
      let info = listProducts.find((product) => product.id === cart.product_Id);

      // Menghitung total harga untuk setiap item keranjang
      const total_price = info.price * cart.quantity;
      totalPrice += total_price;

      // Membuat struktur HTML untuk setiap item keranjang
      newCart.innerHTML = `
        <img src="${info.image}" alt="${info.product}" />
        <div class="item-detail">
          <p>${info.product}</p>
          <p>Rp ${total_price.toLocaleString()}/kodi</p>
        </div>
        <div class="quantity">
          <span class="minus"><</span>
          <span>${cart.quantity}</span>
          <span class="plus">></span>
        </div>
        <i class="remove-item" data-feather="trash-2"></i>
      `;

      // Menambahkan item keranjang ke daftar belanja
      listCartHTML.appendChild(newCart);
    });

    // Membuat elemen untuk menampilkan total harga dan menambahkannya ke daftar belanja
    let totalPriceElement = document.createElement("div");
    totalPriceElement.classList.add("total-price");
    totalPriceElement.innerHTML = `<div><p>Total Belanja: Rp ${totalPrice.toLocaleString()}</p></div>
    <div class="data-customer">
    <p>customer details</p>
    <div class="form-fields" id="checkoutForm">
      <div class="form-field">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" />
      </div>
      <div class="form-field">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" />
      </div>
      <div class="form-field">
        <label for="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" />
      </div>
      <button class="buttons disabled" type="submit">checkout</button>
    </div>
  </div>
  
    `;
    listCartHTML.appendChild(totalPriceElement);

    const buttons = document.querySelector(".buttons");
    buttons.disabled = true;

    const form = document.querySelector("#checkoutForm");
    const inputs = form.querySelectorAll("input");

    // Function to send data
    function sendData() {
      // Mengumpulkan data yang dibutuhkan
      const formData = {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        phone: document.querySelector("#phone").value,
        itemCart: carts, // Menyimpan item-cart dari keranjang
        totalPrice: totalPrice, // Menyimpan total harga
      };
      // Format pesan WhatsApp
      const message = formatMessage(formData);

      // Kirim pesan, misalnya dengan menggunakan link WhatsApp
      const whatsappLink = `https://wa.me/6289503596485/?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappLink, "_blank");
    }

    // Function to check if all fields are filled
    function checkFields() {
      let allFieldsFilled = true;
      inputs.forEach((input) => {
        if (input.value.length === 0) {
          allFieldsFilled = false;
        }
      });
      return allFieldsFilled;
    }

    // Function to handle button click
    function checkoutButtonClick() {
      if (checkFields()) {
        sendData(); // Panggil fungsi untuk mengirim data jika semua bidang terisi
      } else {
        alert("Please fill in all fields before checking out.");
      }
    }

    // Tambahkan event listener untuk tombol "checkout"
    buttons.addEventListener("click", checkoutButtonClick);

    // Tambahkan event listener untuk setiap input
    inputs.forEach((input) => {
      input.addEventListener("input", function () {
        if (checkFields()) {
          buttons.disabled = false;
          buttons.classList.remove("disabled");
        } else {
          buttons.disabled = true;
          buttons.classList.add("disabled");
        }
      });
    });

    // Format pesan untuk WhatsApp
    const formatMessage = (object) => {
      let message = `
Data Customer :
  Nama : ${object.name}
  Email : ${object.email}
  Phone : ${object.phone}
Data Pesanan :\n`;

      // Menambahkan detail pesanan dan total harga
      object.itemCart.forEach((item) => {
        let info = listProducts.find(
          (product) => product.id === item.product_Id
        );
        message += `  ${info.product} x ${item.quantity} kodi\n`;
      });
      message += `Total Harga: Rp ${object.totalPrice.toLocaleString()}\n Apakah ini tersedia?`;
      return message;
    };
  }

  // Mengupdate jumlah item di ikon keranjang
  iconCartSpan.innerText = totalQuantity;

  // Memperbarui ikon menggunakan Feather Icons
  feather.replace();

  // Menyimpan data keranjang ke Local Storage
  saveCartToLocalStorage();
}

const saveCartToLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(carts));
};

listCartHTML.addEventListener("click", (event) => {
  let positionClick = event.target;
  if (
    positionClick.classList.contains("minus") ||
    positionClick.classList.contains("plus")
  ) {
    event.stopPropagation();
    let product_id = positionClick.parentElement.parentElement.dataset.id;
    let type = "minus";
    if (positionClick.classList.contains("plus")) {
      type = "plus";
    }
    changeQuantity(product_id, type);
  } else if (positionClick.classList.contains("remove-item")) {
    let productId = positionClick.parentElement.dataset.id;
    let indexToRemove = carts.findIndex(
      (cart) => cart.product_Id === productId
    );
    event.stopPropagation();
    if (indexToRemove !== -1) {
      carts.splice(indexToRemove, 1);
      addCartToHTML();
    }
  }
});

const changeQuantity = (product_id, type) => {
  let positionItemInCart = carts.findIndex(
    (value) => value.product_Id == product_id
  );
  if (positionItemInCart >= 0) {
    switch (type) {
      case "plus":
        carts[positionItemInCart].quantity =
          carts[positionItemInCart].quantity + 1;
        break;

      default:
        let valueChange = carts[positionItemInCart].quantity - 1;
        if (valueChange > 0) {
          carts[positionItemInCart].quantity = valueChange;
        } else {
          carts.splice(positionItemInCart, 1);
        }
        break;
    }
  }
  addCartToMemory();
  addCartToHTML();
};

const initApp = () => {
  // get data from json product
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      listProducts = data;
      addDataToHTML();
      // get cart from memory
      if (localStorage.getItem("cart")) {
        carts = JSON.parse(localStorage.getItem("cart"));
        addCartToHTML();
        saveCartToLocalStorage();
      }
    });
};
initApp();
