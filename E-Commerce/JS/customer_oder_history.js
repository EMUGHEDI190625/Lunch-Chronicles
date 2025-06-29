const form = document.getElementById("orderform");
const inputSearch = document.getElementById("inputSearch")
const form = document.getElementById("orderTableBody");
const results = document.getElementById("message")

let allOrders = [];

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.getElementById("email").value.trim();

        fetch(" " + encodeURIComponent(email))
        .then(res => res.json()) 
        .then(data => {
            allOrders = data;
            displayOrders(data);
        })
        .catch (() => {
            results.innerHTML = "<p>Error loading your orders. Please try again laster.</p";
        });
    })

    function displayOrders(orders) {
        orderTableBody.innerHTML = " ";
        orders.forEach(order => {
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${order.timestamp}</td>
                    <td>${order.customer_status}</td>
                    <td>${order.newCustomer_question}</td>
                    <td>${order.returningCustomer_firstQuestion}</td>
                    <td>${order.returningCustomer_secondQuestion}</td>
                    <td>${order.first_name}</td>
                    <td>${order.surname}</td>
                    <td>${order.orderItems}</td>
                    <td>${order.phoneNumber}</td>
                    <td>${order.address}</td>
                    <td>${order.paymentmenthod}</td>
                    <td>${order.email}</td>
            `;
            orderTableBody.appendChild(row);
        });
    }
    inputSearch.addEventListener("input", function() {
        const serchText = inputSearch.value.toLowerCase();

        const filtered = allOrders.filter(order => {
            return (
                (order.firstname && order.firstname.toLowerCase().include(serchText)) ||
                (order.surname && order.surname.toLowerCase().include(serchText)) ||
                (order.items && order.items.toLowerCase().include(serchText)) ||
                (order.phone && order.phone.toLowerCase().include(serchText)) ||
                (order.email && order.firstname.toLowerCase().include(serchText)) ||
                (order.address && order.firstname.toLowerCase().include(serchText)) ||
            );
        });
        
        displayOrders(filtered);
    })