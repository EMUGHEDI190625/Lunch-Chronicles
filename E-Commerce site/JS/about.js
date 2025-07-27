const images = {
  0: "/E-Commerce/Images/Lunch Chronicles Staffs.jpg",
  1: "my_picture.jpg",
  2: "mypicture",
  3: "mypictures"
}

function updateImage() {
  const month = new Date().getMonth();
  const index = math.floor(month / 3);
  const imageContainer = document.getElementById("imageContainer");

  // Remove the old image (if any)
  imageContainer.innerHTML = "";

  const newImg = document.createElement("img");
  newImg.alt = "Seasonal Image";
  newImg.width = 200;

  imageContainer.appendChild(newImg);
}

updateImage()

// // const products = document.getElementById("products");
// const toggleBtn = document.getElementById("toggleBtn");
// const initialProducts = `
// <div class="product menus">
// <img src="../HTML/Product/Spaghettiexpress/Images/Screenshot_2025-04-15-21-25-57-90_40deb401b9ffe8e1df2f1cc5ba480b12.jpg" alt="">
// <img src="../HTML/Product/Spaghettiexpress/Images/Screenshot_2025-04-15-21-26-58-03_40deb401b9ffe8e1df2f1cc5ba480b12.jpg" alt="">
// <img src="../HTML/Product/Spaghettiexpress/Images/Screenshot_2025-04-15-21-27-27-82_40deb401b9ffe8e1df2f1cc5ba480b12.jpg" alt="">
// <img src="../HTML/Product/Spaghettiexpress/Images/Screenshot_2025-04-15-21-29-33-98_40deb401b9ffe8e1df2f1cc5ba480b12.jpg" alt="">
// </div>
// `;

// const newProducts = `
// <div class="product menus">
//     <img src="../HTML/Product/Maubbys/Image/Screenshot_2025-04-15-15-53-56-78_40deb401b9ffe8e1df2f1cc5ba480b12.jpg"
//     alt="">
//     <img src="../HTML/Product/Maubbys/Image/Screenshot_2025-04-15-15-55-51-92_40deb401b9ffe8e1df2f1cc5ba480b12.jpg" 
//     alt="">
//     <img src="../HTML/Product/Maubbys/Image/Screenshot_2025-04-15-15-58-16-59_40deb401b9ffe8e1df2f1cc5ba480b12.jpg" 
//     alt="">
//     <img src="../HTML/Product/Maubbys/Image/Screenshot_2025-04-15-15-59-12-77_40deb401b9ffe8e1df2f1cc5ba480b12.jpg" 
//     alt="">
// </div>
// `;