function togglenavbar() {
  const nav = document.getElementById("navlinks");
  nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

const toggle = document.getElementById('themeToggle');

toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', toggle.checked);
});


document.addEventListener("DOMContentLoaded", function() {
  const messageBox = document.getElementById("celebration_message");

  const today = new Date();
  const todayTimestamp = today.getTime();

  const apiKey = "DMDmyKgBvKx5wG3vkOb0uiTIaMig8SAA";
  const country = "NG";
  const year = today.getFullYear();

  const url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const holidays = data.response.holidays;
      let message = "";

      holidays.forEach(holiday => {
        const eventDate = new Date(holiday.date.iso);
        const eventTimestamp = eventDate.getTime();
        const diffInDays = Math.floor((eventTimestamp - todayTimestamp) / (1000 * 60 * 60 * 24));

        if (diffInDays === 30) {
          message += `Reminder: "${holiday.name}" is in a month!<br>`;
        } else if (diffInDays === 14) {
          message += `Heads up! "${holiday.name}" is in 2 weeks!<br>`;
        } else if (diffInDays === 0) {
          message += `Today is "${holiday.name}"! Celebrate with your loved ones!<br>`;
        }
      });

      if (message) {
        messageBox.innerHTML = message;
      } else {
        messageBox.style.display = "none";
      }
    })
    .catch(error => {
      console.error("Error fetching celebration:", error);
      messageBox.style.display = "none";
    });
});

// Toggle More Content
const toggleBtn = document.getElementById("toggleBtn");
const moreContent = document.getElementById("moreContent");

toggleBtn.addEventListener("click", function () {
  if (moreContent.style.display === "none" || moreContent.style.display === "") {
    moreContent.style.display = "block";
    toggleBtn.textContent = "Show Less";
  } else {
    moreContent.style.display = "none";
    toggleBtn.textContent = "Show More";
  }
});

// Testimonials Carousel
let currenIndex = 0;
const testimonials = document.querySelectorAll(".testimonial");

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.remove("active");
    if (i === index) {
      testimonial.classList.add("active");
    }
  });
}

function nextTestimonial() {
  currenIndex = (currenIndex + 1) % testimonials.length;
  showTestimonial(currenIndex);
}

function prevTestimonial() {
  currenIndex = (currenIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(currenIndex);
}

setInterval(nextTestimonial, 5000);

document.getElementById("nextButton").addEventListener("click", nextTestimonial);
document.getElementById("prevButton").addEventListener("click", prevTestimonial);

const scrollLeft = document.getElementById("scroll-left");
const scrollRight = document.getElementById("scroll-right");

function updateButtons() {
  const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;

  if (atBottom) {
    // At bottom → change to Scroll Up
    scrollLeft.textContent = "Scroll Up";
    scrollRight.textContent = "Scroll Up";
    scrollLeft.onclick = scrollUp;
    scrollRight.onclick = scrollUp;
  } else {
    // Else → show Scroll Down
    scrollLeft.textContent = "Scroll Down";
    scrollRight.textContent = "Scroll Down";
    scrollLeft.onclick = scrollDown;
    scrollRight.onclick = scrollDown;
  }
}

function scrollDown() {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
}

function scrollUp() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Run on page load + when scrolling
window.addEventListener("scroll", updateButtons);
window.addEventListener("load", updateButtons);

// const colors =["color-bule", "color-darkbule", "color-gray"];
// const heading = document.getElementById("multicolor_heading");
// const text = heading.innerText;
// let coloredHTML = "";

// for (let i = 0; i < text.length; i++) {
//   const char = text[i]
//   const colorClass = colors[i % colors.length];
//   if(char !== "") {
//     coloredHTML += `<span class="${colorClass}">${char}</span>`
//   }
//   else {
//     coloredHTML += "";
//   }

//   heading.innerHTML = coloredHTML;
// }

// function payWithPaystack() {
//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const amount = parseFloat(document.getElementById("amount").value) * 100;
  
//     let handler = PaystackPop.setup({
//       key: "Your_PUBLIC_KEY_HERE",
//       email: email,
//       amount: amount,
//       currency: "NGN",
//       ref: "" + Math.floor(Math.random() * 10000000000 + 1),
//       label: name,
//       callback: function(response) {
//         fetch("http://localhost:3000/verify", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify({ reference: response.reference })
//         })
//         .then(res => res.json())
//         .then(data => {
//           if (data.status === "success") {
//             const orderId = Date.now().toString();
//             const orderItems = cart.map(item => item.product).join(", ");
//             const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
//             const date = new Date().toISOString().split("T")[0];
  
//             const order = {
//               id: orderId,
//               item: orderItems,
//               amount: `₦${totalAmount}`,
//               date: date
//             };
  
//             const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
//             existingOrders.push(order);
//             localStorage.setItem("orders", JSON.stringify(existingOrders));
  
//             alert("Order placed successfully!");
//             window.location.href = "success.html";
//           } else {
//             alert("Payment failed or not verified.");
//           }
//         })
//         .catch(err => {
//           console.error("Verification error:", err);
//           alert("Something went wrong");
//         });
//       }
//     });
  
//     handler.openIframe();
// }
