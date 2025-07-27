// document.addEventListener("DOMContentLoaded", () => {
//   const orderBody = document.getElementById("orderBody");
//   const orders = JSON.parse(localStorage.getItem("orders")) || [];

//   if (orders.length === 0) {
//     orderBody.innerHTML = "<tr><td colspan='4' style='text-align: center;'>No orders found</td></tr>";
//     return;
//   }

//   orders.forEach(order => {
//     const row = document.createElement("tr");

//     const idCell = document.createElement("td");
//     idCell.textContent = order.id;

//     const itemCell = document.createElement("td");
//     itemCell.innerHTML = order.item
//       .split(",")
//       .map(it => `<li>${it.trim()}</li>`)
//       .join("");

//     const amountCell = document.createElement("td");
//     amountCell.textContent = order.amount;

//     const dateCell = document.createElement("td");
//     dateCell.textContent = order.date;

//     row.appendChild(idCell);
//     row.appendChild(itemCell);
//     row.appendChild(amountCell);
//     row.appendChild(dateCell);

//     orderBody.appendChild(row);
//   });
// });

// function saveToLocalStorage() {
//   const orders = {
//     id : Date.now().toString(),
//     first_Name : document.getElementById("first_name"),
//     surname : document.getElementById("surname"),
//     order_Items : document.getElementById("order_Items"),
//     phone_number : document.getElementById("phone_number"),
//     address : document.getElementById("address"),
//     email : document.getElementById("email")
//   };
//   const existing = JSON.parse(localStorage.getItem("orders")) || [];
//   existing.push(order);
//   localStorage.setItem("orders", JSON.stringify(existing));
// }

document.addEventListener("DOMContentLoaded", () => {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const tableBody = document.getElementById("orderTableBody");

  if(orders.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='4' style='text-align:center;'>No orders found</td></tr>";
    return;
  }

  orders.forEach(order => {
    const row = document.createElement("tr");
    row.innerText = `
    <td>${order.timestamp}</td>
    <td>${order.First_name}</td>
    <td>${order.surname}</td>
    <td>${order.order_items}</td>
    <td>${order.phone_number}</td>
    <td>${order.address}</td>
    <td>${order.email}</td>
    `;
    tableBody.appendChild(row)
  })
})