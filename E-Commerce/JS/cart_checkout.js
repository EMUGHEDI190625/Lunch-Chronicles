const restaurants = [
    {
      name: "Spaghetti Express",
      items: [
        {
          name: "Jollof Spaghetti",
          description: "Spicy jollof spaghetti with grilled chicken.",
          price: 2000,
          image: "https://via.placeholder.com/80?text=Spaghetti"
        },
        {
          name: "Creamy Alfredo",
          description: "Creamy pasta with mushrooms and cheese.",
          price: 2500,
          image: "https://via.placeholder.com/80?text=Alfredo"
        }
      ]
    },
    {
      name: "Bole Abuja",
      items: [
        {
          name: "Bole with Fish",
          description: "Roasted plantain served with spicy pepper fish.",
          price: 3500,
          image: "https://via.placeholder.com/80?text=Bole"
        },
        {
          name: "Bole with Groundnut",
          description: "Traditional roasted plantain with groundnut.",
          price: 1500,
          image: "https://via.placeholder.com/80?text=Groundnut"
        }
      ]
    }
  ];
  
  let cart = {};
  
  function renderMenu() {
    const menuDiv = document.getElementById('menu');
    restaurants.forEach(restaurant => {
      const section = document.createElement('div');
      section.className = 'restaurant';
      section.innerHTML = `<h2>${restaurant.name}</h2>`;
  
      restaurant.items.forEach(item => {
        const itemHTML = `
          <div class="food-card">
            <img src="${item.image}" alt="${item.name}">
            <div class="food-info">
              <strong>${item.name}</strong><br>
              ${item.description}<br>
              <strong>₦${item.price}</strong>
            </div>
            <button onclick="addToCart('${restaurant.name}', ${JSON.stringify(item).replace(/"/g, '&quot;')})">Add</button>
          </div>
        `;
        section.innerHTML += itemHTML;
      });
  
      menuDiv.appendChild(section);
    });
  }
  
  function addToCart(restaurantName, item) {
    if (!cart[restaurantName]) cart[restaurantName] = [];
    cart[restaurantName].push(item);
    updateCartDisplay();
  }
  
  function updateCartDisplay() {
    const cartDiv = document.getElementById('cartDisplay');
    cartDiv.innerHTML = '';
    let total = 0;
  
    for (const restaurant in cart) {
      cartDiv.innerHTML += `<h3>📌 ${restaurant}</h3>`;
      cart[restaurant].forEach(item => {
        total += item.price;
        cartDiv.innerHTML += `
          <div class="cart-item">
            <strong>${item.name}</strong> - ₦${item.price}<br>
            ${item.description}<br>
            <img src="${item.image}" style="width:50px;height:50px;margin-top:5px;"><br><br>
          </div>
        `;
      });
    }
  
    cartDiv.innerHTML += `<h3>Total: ₦${total}</h3>`;
  }
  
  renderMenu();