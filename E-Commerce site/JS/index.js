const toggleBtn = document.getElementById("toggleBtn");
const moreContent = document.getElementById("moreContent");
        
toggleBtn.addEventListener("click", function () {
  if (moreContent.style.display === "none") {
      moreContent.style.display = "block";
      toggleBtn.textContent = "Show Less";
    }
    else {
      moreContent.style.display = "none";
      toggleBtn.textContent = "Show More";
    }
    
});

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