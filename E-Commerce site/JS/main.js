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