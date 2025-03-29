// Cart
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const removeCart = document.querySelector('#close-cart');

// Open Cart
cartIcon.onclick = () => {
  cart.classList.add('cart-active');
};

// Close Cart
removeCart.onclick = () => {
  cart.classList.remove('cart-active');
};

// Cart working JS
if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready);
} else {
  ready();
}
// Making Function
function ready() {
  // Remove Items From Cart
  const removeCartButton = document.getElementsByClassName('cart-remove');
  for (let i = 0; i < removeCartButton.length; i++) {
    const button = removeCartButton[i];
    button.addEventListener('click', removeCartItem);
  }
  // Quantity Changes
  const quantityInputs = document.getElementsByClassName('cart-quantity');
  for (let i = 0; i < quantityInputs.length; i++) {
    const inputs = quantityInputs[i];
    inputs.addEventListener('change', quantityChanged);
  }

  const addCart = document.getElementsByClassName('add-cart');
  for (let i = 0; i < addCart.length; i++) {
    const button = addCart[i];
    button.addEventListener('click', addCartCLicked);
  }
}

// Remove Item From Cart
function removeCartItem(event) {
  const button = event.target;
  button.parentElement.remove();
  updateTotal();
  //    cartItemsCount--;
  //  cartCount.innerText = cartItemsCount;
}

// Quantity Changes
function quantityChanged(event) {
  const input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

window.addEventListener('DOMContentLoaded', (event) => {
  const cartItems = document.getElementsByClassName('cart-content')[0];
  cartItems.innerHTML = '';
});

// Add Cart
function addCartCLicked(event) {
  const button = event.target;
  const productBox = button.closest('.product-box');

  // Get Product Details
  const productId = button.getAttribute('data-id');
  const title = productBox.getElementsByClassName('product-title')[0].innerText;
  const price = productBox.getElementsByClassName('price')[0].innerText;
  const productImg = productBox.getElementsByClassName('product-img')[0].src;

  addProductToCart(title, price, productImg, productId); // Pass the data-id as an argument
  updateTotal();

  //   // cart increment
  //   cartItemsCount++;
  //  cartCount.innerText = cartItemsCount;
}

function addProductToCart(title, price, productImg, productId) {
  const cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  const cartItems = document.getElementsByClassName('cart-content')[0];
  const cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

  // Check if the product already exists in the cart by comparing the data-id
  const cartItemsIds = cartItems.getElementsByClassName('cart-product-title');
  for (let i = 0; i < cartItemsIds.length; i++) {
    const existingProductId = cartItemsIds[i].getAttribute('data-id');
    if (existingProductId === productId) {
      alert('You have already added this item to the cart');
      return;
    }
  }

  // Creating the cart box with the product details
  const cartBoxContent = `
                        <img src="${productImg}" alt="" class="cart-img">
                        <div class="detail-box">
                            <div class="cart-product-title" data-id="${productId}">${title}</div>
                            <div class="cart-price">${price}</div>
                            <input type="number" value="1" class="cart-quantity">
                        </div>
                        <!-- Remove -->
                       <i class='bx bxs-trash-alt cart-remove'></i>
                       `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);

  // Add event listeners for removing the item and changing the quantity
  cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click', removeCartItem);
  cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change', quantityChanged);
}

// Update Total
function updateTotal() {
  const cartContents = document.getElementsByClassName('cart-content')[0];
  const cartBoxes = cartContents.getElementsByClassName('cart-box');
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    const cartBox = cartBoxes[i];
    const priceElement = cartBox.getElementsByClassName('cart-price')[0];
    const quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    const price = parseFloat(priceElement.innerText.replace('GMD', ''));
    const quantity = quantityElement.value;
    total = total + price * quantity;

    total = Math.round(total * 100) / 100;

    document.getElementsByClassName('total-price')[0].innerText = 'GMD' + total;
  }
}

// WhatsApp functionality for "Buy Now" button
const whatsappBtn = document.querySelectorAll('.whatsapp-btn');

for (let i = 0; i < whatsappBtn.length; i++) {
  const whatsappbtns = whatsappBtn[i];
  whatsappbtns.addEventListener('click', sendToWhatsApp);
}

// Function to generate the message and send to WhatsApp
function sendToWhatsApp() {
  const cartContents = document.getElementsByClassName('cart-content')[0];
  const cartItems = cartContents.getElementsByClassName('cart-box');

  if (cartItems.length === 0) {
    alert('Nothing on cart!');
    return;
  }

  let message =
    'Hello Arena Trade Hub Logistics & Supply I want to buy these items:\n\n';

  // Loop through the cart items to build the message
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    const title =
      item.getElementsByClassName('cart-product-title')[0].innerText;
    const price = item.getElementsByClassName('cart-price')[0].innerText;
    const quantity = item.getElementsByClassName('cart-quantity')[0].value;
    const img = item.getElementsByClassName('cart-img')[0].src;

    // Add product info to message
    message += `Product: ${title}\nPrice: ${price}\nQuantity: ${quantity}\nImage: ${img}\n\n`;
  }

  // Add total price to the message
  const total = document.getElementsByClassName('total-price')[0].innerText;
  message += `Total: ${total}`;

  // Get location input (if provided)
  const locationInput = document.getElementById('location-input').value.trim();
  if (locationInput !== '') {
    message += `Google Map Delivery Location Code: ${locationInput}`;
  }

  // WhatsApp message link with your phone number
  const whatsappNumber = '2203696147';

  // Detect if the user is on a mobile device
  const isMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);

  const whatsappLink = isMobile
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
        message
      )}`;

  // Open WhatsApp with the generated message
  window.open(whatsappLink, '_blank');
}



// WhatsApp Chat
const whatsappChatt = document.querySelector(".whatsapp-btns");
console.log(whatsappChatt);

if (whatsappChatt) {
  whatsappChatt.addEventListener("click", function () {
    const whatsappNumber = '2207194940'; // Your WhatsApp number
    const defaultMessage = "Hello, I’m interested in your products!"; // Default message

    // Detect if the user is on a mobile device
    const isMobile = /iPhone|Android|iPad/i.test(navigator.userAgent);

    // Generate the correct WhatsApp link
    const whatsappLink = isMobile
      ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`
      : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(defaultMessage)}`;

    // Open WhatsApp chat in a new tab
    window.open(whatsappLink, '_blank');
  });
}




// Scroll Top Btn
const scrollToTop = document.querySelector('.btn-top');

window.addEventListener('scroll', function () {
  const scrollHeight = window.scrollY;

  if (scrollHeight > 400) {
    scrollToTop.classList.add('btn-active');
  } else {
    scrollToTop.classList.remove('btn-active');
  }
});


function Top() {
  console.log(7);
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // ✅ No extra comma here
  });
}
