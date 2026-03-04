document.addEventListener("DOMContentLoaded", function () {
  // Add to cart button click handler
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCountElement = document.getElementById("cart-count");

  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCountElement) {
      cartCountElement.textContent = totalCount;
    }
  }

  function showNotification(message) {
    let notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 2000);
  }

  addToCartButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const name = this.getAttribute("data-name");
      const price = this.getAttribute("data-price");
      const image = this.getAttribute("data-image");
      const quantityInput = this.closest(".pro, .single-pro-details").querySelector("input[type='number']");
      let quantity = 1;
      if (quantityInput) {
        quantity = parseInt(quantityInput.value) || 1;
      }
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      // Check if product already in cart
      const existingProductIndex = cart.findIndex(item => item.name === name);
      if (existingProductIndex !== -1) {
        // Update quantity
        cart[existingProductIndex].quantity += quantity;
      } else {
        cart.push({ name, price, image, quantity });
      }
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      showNotification("Item added to cart");
    });
  });

  updateCartCount();
});
