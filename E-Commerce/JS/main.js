// const { response } = require("express");

// function togglenavbar() {
//   const nav = document.getElementById("navlinks");
//   nav.style.display = nav.style.display === "flex" ? "none" : "flex";
// }


// document.addEventListener("DOMContentLoaded", function() {
//   const messageBox = document.getElementById("celebration_message");

//   const today = new Date();
//   const year = today.getFullYear();
//   const todayTimestamp = getTime();

//   const apiKey = "DMDmyKgBvKx5wG3vkOb0uiTIaMig8SAA";
//   const country = "NG";
//   const year = new Date().getFullYear()

//   const url = "https://calendarific.com/api/v2/holidays?api_key={apiKey}&country=&{country}&year={year}";

//   fetch(url)
//   .then(response => response.json())
//   .then(data => {
//     const holidays = data.response.holidays;
//     let message = "";

//     holidays.forEach(holiday => {
//       const eventDate = new Date(holidays.date.iso);
//       const eventTimestamp = eventDate.getTime();
//       const diffInDays = Math.floor((eventTimestamp - todayTimestamp) / (1000 * 60 * 60 * 24));

//       if(diffInDays === 30) {
//         message += `Rminder: "${holiday.name}" is in a moth time!<br>`;
//       }
//       else if(diffInDays === 14) {
//         message = `Heads up! "${holiday.name}" is in 2 weeks time!<br>`;
//       }
//       else if(diffInDays === 0) {
//         message = `Today is "${history.name}"! Celebrate with your love once!<br>`
//       }
//     });
//     if(message) {
//       messageBox.innerHTML = message;
//     }
//     else {
//       messageBox.style.display = "none";
//     }
//   })
//   .catch(error => {
//     console.error("Error fetching celebration:", error);
//     messageBox.style.display = "none"
//   })
// })

let currenIndex = 0
const testimonials = document.querySelectorAll(".testimonial");

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.remove("active");
    if(i === index) {
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