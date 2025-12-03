import React, { useEffect, useState } from "react"; 
import { PaystackButton } from "react-paystack";
import {database, ref,get, push,set} from "./firebase";
import { getDatabase } from "firebase/database";

const Checkout = () => {
  const publicKey = "pk_live_a497d2451951e99dad68bf1f5bc7fd8c35048340"; // Replace with your test key
//   const amount = 1000000; // Amount in kobo (i.e. NGN 10,000)
  const [customer_status, setCustomerStatus] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [surname, setSurname] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [address, setAddress] = useState("");
  const [order_from, setOrderFrom] = useState("")
  const [order_category, setOrdercategory] = useState("")
  const [order_name, setOrderName] = useState("")
  const [amount, setAmount] = useState("0")
  const [email, setEmail] = useState("");
  const timestamp = new Date().toISOString();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
     const db = getDatabase();
     const fetchProducts = async () => {
       const snapshot = await get(ref(db, "car`"));
       if (snapshot.exists()) {
         const data = snapshot.val();
         const productsList = Object.keys(data).map(key => ({
           id: key,
           ...data[key],
         }));
         setProducts(productsList);
       } else {
         setProducts([]);
       }
       setLoading(false);
     };
     fetchProducts();
   }, []);

   const totalAmount = products.reduce(
    (sum, item) => sum + Number(item.price),
    0
   )

  const handlePaymentSuccess = (reference) => {
    const order = {
        timestamp: new Date().toISOString(),
        readable: new Date(timestamp).toLocaleDateString("en-US", {
            year: "numeric",
            month: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        }),
        customer_status: customer_status,
        first_name : first_name,
        surname : surname,
        name: `${first_name} ${surname}`,
        phone: phone_number,
        address: address,
        order_category: order_category,
        order_from: order_from,
        order_name: order_name,
        order_price: amount/100,
        email: email,
        // date: new Date().toISOString().split("T")[0],
        reference: reference.reference,
        items: "Order from Paystack Form",
    };

    const handleSuccess = async (reference) => {
        try {
            const res = await fetch('https://your-backend.com/api/verify-payment', {
             method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            reference: reference.reference,
            first_name : first_name,
            surname : surname,
            phone: phone_number,
            address: address,
            order_category: order_category,
            order_from: order_from,
            order_name: order_name,
            order_price: amount/100,
            email: email,
        }),
        });

        const result = await res.json();
        console.log('Verified and saved:', result);
    } catch (error) {
        console.error('Error verifying payment:', error);
    }

        }

    push(ref(database, "orders"), order)
    .then(() => alert('Payment successful Order details saved. kindly check your pass order in the <li><a href="/E-Commerce/HTML/custmoer_order_history.html" className="nav-link checkout">Customer view</a></li> page. Thank you'))
    .catch((error) => {
        console.error("error saving order:", error);
        alert("Payment went throught but order not savd!");
    })
  }
  const componentProps = {
    //   first_name,
    //   surname,
    //   phone_number,
    //   address,
      email,
      amount,
    metadata: {
        first_name,
        surname,
        name: `${first_name} ${surname}`,
        phone_number,
        amount: totalAmount * 100,
        address,
        email,
    },
    publicKey,
    text: "Pay Now",
    // onSuccess : () =>
    //     alert("Payment Successful"),
    onSuccess: handlePaymentSuccess,
    onClose: () => 
        alert("Payment Closed")
  };

  return (
    <>
      <div className="navbar">

        <div class="container_button logo">
            {/* <button class="button-toggle" onclick="togglenavbar()" title="togle nav bar">
                <i className="fa-solid fa-bars"></i>
            </button> */}
            <button class="button-toggle" onclick="togglenavbar()" title="togle nav bar">&#9776</button>
            <img src={process.env.PUBLIC_URL + "/Lunch_Chronicles.jpg"} alt="Lunch Chronicles business logo"></img>
            <span>Lunch Chronicles</span>
        </div>

        <nav className="nav">
          <div className="logo">
            <img src={process.env.PUBLIC_URL + "/Lunch_Chronicles.jpg"} alt="Lunch Chronicles business logo"></img>
            <span>Lunch Chronicles</span>
          </div>
          <ul className="top_navbar nav-links" id="navlinks">
            <li><a href="../../../index.html" className="nav-link home" style={{color : "white"}}>
                    Home
                </a>
            </li>
            <div className="dropdown">
              <a href="/E-Commerce/HTML/about_us.html" className="nav-link checkout">About Us 
              <i className="fa-solid fa-caret-down"></i></a>
              <div className="dropdown_content">
                <li>
                    <a href="/E-Commerce/HTML/how_it_work.html">How It Work</a>
                    </li>
                <li>
                    <a href="/E-Commerce/HTML/frequently_asked_questions.html" 
                        className="nav-link checkout">
                        FAQ
                    </a>
                    </li>
                <li>
                    <a href="/E-Commerce/HTML/contact.html" className="nav-link order_history">
                        Contact Us
                    </a>
                </li>
              </div>
            </div>
            <li>
                <a href="/E-Commerce/HTML/product.html" className="nav-link product">Restaurants</a>
                </li>
            {/* <div className="dropdown">
              <a href="our_service.html" className="nav-link service">Services <i className="fa-solid fa-caret-down"></i></a>
              <div className="dropdown_content">
                <li><a href="product.html" className="nav-link product">Restaurants</a></li>
                <li><a href="contact.html" className="nav-link order_history">Order</a></li>
                <li><a href="frequently_asked_questions.html" className="nav-link checkout">Delivery</a></li>
                <li><a href="contact.html" className="nav-link order_history">Contact Us</a></li>
              </div>
            </div> */}
            <li>
                <a href="../E-Commerce/HTML/checkout/index.html" className="nav-link checkout">Checkout</a>
                </li>
            <li>
                <a href="/E-Commerce/HTML/custmoer_order_history.html" className="nav-link checkout">
                    Customer view
                </a>
            </li>
            <label class="theme-switch">
                <input type="checkbox" id="themeToggle" />
                <span class="slider">
                <span class="icon sun">🌞</span>
                <span class="icon moon">🌙</span>
                </span>
            </label>
          </ul>
        </nav>
        <header>
          <h1>Checkout</h1>
          <p class="default-text">Hover on this background image to see the full image</p>
          <p id="hover-message">Move the cursor away from the image to return back to the norm state</p>
          {/* <button className="strong cta-button"><a href="#app">Get Our App</a></button> */}
        </header>
      </div>

      <div className="cursor-circle"></div>

      <div class="cart_checkout">
        <section class="main" id="form">
            <section class="parent">
                <h1>Your Order Details</h1>
                {products.length === 0 ? (
                    <p>No Items in cart yet</p>
                ) : (
                    <ul>
                        {products.map((item) => (
                            <li key={item.id}>
                                <strong>Category:</strong> {item.category} 
                                <br></br>
                                {item.name} - {item.price}
                                <br></br>
                                <img src={item.image} alt={item.name} width={100}></img>
                            </li>
                        ))}
                    </ul>
                    
                )}
                {/* <div id="cart-container"></div>
                <div class="total" id="total-price"></div> */}
                <div class="cart_button">
                    <button class="clear-cart button" onclick="clearCart()">Clear Cart</button>
                    <button class="clear-cart button" >
                        <a href="tulip.html">Previous</a>
                        </button>
                    <button class="clear-cart button">Add My Order Details to the form</button>
                </div>
                            {/* <!-- <div class="cart-child child">
                                <h1>Your Cart</h1>
                                <div id="cart-container"></div>
                                <div class="total" id="total-price"></div>
                                <button class="clear-cart" onclick="clearCart()">Clear Cart</button>
                            </div> --> */}
            </section>
            <section class="parent" id="parent">

                <div class="child">
                    <div id="topform">
                        <section>
                            <p>The puropse for this form is to collect your details for processing your 
                                order and to store it in our 
                                <strong> Data Base </strong>
                                also for you to check your order in 
                                <strong> Customer view. </strong>
                                <br></br>
                                <strong> Note: </strong> Your answer based on the following questions are 
                                between you and us (Lunch Chronicles).
                            </p>
                        </section>
                    </div>
                 </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <h2>Checkout</h2>
            
                    <section>
                    <h3> Customer Status </h3>                         
                    <p>The radio input field that have the text 
                        <b> Other </b>
                            is for those that do not want to specify if you are 
                            <strong> New Custmoer </strong> 
                            or
                            <strong> Returning Custmoer </strong> 
                            from the below 
                            <b> Custmoer Status </b>
                            question. <br></br>
                            <strong class="strong">Note: Selecting your custmoer status. This will 
                                determine which section is show next.
                            </strong>
                            <br></br>
                            We make the below questions mandating because we want to know your
                            <strong> Status </strong>
                            at a customer.
                                    </p>
                                    {/* <label for="new_customer">New Customer</label>
                                    <span>*</span>
                                    <input type="radio" name="customer_status" value="new" onclick={showCustomerSection()} 
                                    id="new_customer"></input>
                                    <label for="returning_customer">Returning Customer</label>
                                    <span>*</span>
                                    <input type="radio"name="customer_status" value="returning" onclick={showCustomerSection()} 
                                    id="returning_customer"></input>
                                    <label for="Other">Other</label>
                                    <input type="radio" name="customer_status" value="others" onclick={showCustomerSection()}
                                    id="other">
                                        <br></br>
                                    </input> */}
                                </section>

                                {/* margin: '10px', padding: '20px'
                                 */}

                                 {/* <select onChange={(e) => setCustomerStatus(e.target.value)}>
                                    <option value="">Select Your Status</option>
                                    <option value="new">New</option>
                                    <option value="returning">Returning</option>
                                    <option value="other">Other</option>
                                </select> */}

                                <label className="customer_status_label">kindly select Customer Status
                                </label>
                                 <select id="customer_status" onChange={(e) => setCustomerStatus(e.target.value)}>
                                    <option value="customer_status">Customer Status</option>
                                    <option value="new_customer">New Customer</option>
                                    <option value="returning_customer">Returning Customer</option>
                                    <option value="other">Other</option>
                                 </select>

                                 {/* const showCustomerSection = () => {
                                    if (customer_status === "new") {

                                    }
                                    else if (customer_status === "returning") {

                                    }

                                    else if (customer_status === "other") {

                                    }
                                 } */}

                                 {customer_status === "new_customer" && (
                                    <section id="newCustomerSection">
                                        {/* your full New Customer form here */}
                                        <h3>New Custmoer</h3>
                                        <p>Note this section is not mandating but we love you to fill this
                                            to know if we are lacking in anyway after rating us and give 
                                            your comment. Thank you.
                                        </p>
                                        <p>How did you come across this bussiness and Please why?</p>
                                        <label for="instagram" > Instagram </label>
                                        <input type="checkbox" name="instagram" class="socialplatform"></input>
                                        <label for="facebook"> Facebook </label>
                                        <input type="checkbox" name="source" value="facebook" class="socialplatform"></input>
                                        <label for="word_of_mouth"> Word of Mouth </label>
                                        <input type="checkbox" name="source" value="Word of Mouth" class="socialplatform">
                                        </input>
                                        <label for="google_search"> Google Search </label>
                                        <input type="checkbox" name="source" value="Google Search" class="socialplatform">
                                        </input>
                                        <label for="past_customer"> Past Custmoer </label>
                                        <input type="checkbox" name="source" value="Past Custmoer" class="socialplatform">
                                        </input><br></br>
                                        <label for="event_market_stall"> Event or Market Stall </label>
                                        <input type="checkbox" name="source" value="facebook" class="socialplatform">
                                        {/* <br></br> */}
                                        </input>
                                        <br></br>
                                        <label for="bussiness_recommendation">Recommendation From Another 
                                            Bussiness
                                        </label>
                                        <input type="checkbox" name="source" value="Recommendation From Another Bussiness"
                                            class="socialplatform">
                                        {/* <br></br> */}
                                        </input>
                                        <br></br>
                                        <label for="youtube_tiktok_video">YouTube or TikTok Video</label>
                                        <input type="checkbox" name="source" 
                                            value="YouTube or TikTok Video" class="socialplatform">
                                        </input>
                                        <label for="flyer_poster_brochure">flyer/poster/brochure</label>
                                        <input type="checkbox" name="source" value="flyer/poster/brochure" class="socialplatform" 
                                        id="">
                                        </input>
                                        <label for="other">Others</label>
                                        <input type="checkbox"  name="source" value="other"class="socialplatform"></input>
                                        <br></br>
                                        <p>Please if you select other from the previous question can you 
                                            specify and from the options about can you give reason/reasons
                                            why do you come to use our service based on your ansnwer above?
                                        </p>
                                        <textarea  name="newCustomerOtherReason" 
                                            placeholder="Leave your comment here...">
                                        </textarea>
                                        <p>
                                            kindly rate our UI (<strong class="strong">Lunch Chronicles
                                            </strong> design). 1: 
                                            Poor (1 star) 2: Fair (2 stars) 3: Good (3 stars) 4: very Good
                                            (4 stars)  5: Excellent (5 stars)
                                        </p>
                                        <p>
                                            
                                        </p>
                                        <select name="experience_rating">
                                            <option value="1">1 - Poor</option>
                                            <option value="2">2 - Fair</option>
                                            <option value="3">3 - Good</option>
                                            <option value="4">4 - Very Good</option>
                                            <option value="5">5 - Excellent</option>
                                        </select>
                                        <br></br>
                                        <p>kindly leave why you rate us form the previous question.</p>
                                        <textarea name="UI rate" id="rate"></textarea>
                                        <br></br>
                                        <br></br>
                                        <div className="checkout-form">
                                            <h3>Personal Order Details</h3>
                                            <label className="first">First Name
                                                <span> *</span>
                                            </label>
                                            <label className="second">Surname
                                                <span> *</span>
                                            </label>
                                            <br></br>
                                            <div class="row checkout-field">
                                                <input
                                                    type="text"
                                                    onChange={(e) => setFirst_name(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    onChange={(e) => setSurname(e.target.value)}
                                                />
                                            </div>

                                            <label className="first first_input">Phone
                                                <span> *</span>
                                            </label>
                                            <br></br>
                                            <label className="second second_input">Address
                                                <span> *</span>
                                            </label>
                                            <div className="row checkout-field">
                                            <input
                                                type="tel"
                                                onChange={(e) => setPhone_number(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                            </div>

                                            <p className="test">Below are Your Orders Details from Your 
                                                Cart
                                            </p>
                                            <div></div>
                                            <strong>Note:</strong> <span style={{color : "black"}}>From 
                                                the 
                                                <strong> Order Category </strong> 
                                                to 
                                                <strong>Order Price</strong> 
                                                are not mandating because if you selected order form the 
                                                Restaurants page and that your order show/diplay in the 
                                                cart that mean you may not fill those fileds unless the 
                                                meals are not display in the Restaurants page but in the 
                                                menu in that page
                                            </span>
                                            <br></br>
                                            <br></br>
                                            <label className="check">Order Category</label>
                                            <br></br>
                                            <br></br>
                                            <input
                                                    type="text"
                                                    onChange={(e) => setOrdercategory(e.target.value)}
                                                />
                                            <br></br>
                                            <label className="check">Order From</label>
                                            <br></br>
                                            <br></br>                           
                                            <div className="row checkout-field restaurants">
                                                <div onChange={(e) => setOrderFrom(e.target.value)}>
                                                    <label> Spaghettiexpress </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)}
                                                        class="socialplatform">
                                                    </input>
                                                    <label> Paprimz Pizza </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)} 
                                                        class="socialplatform">
                                                    </input>
                                                    <label> Bole Abuja </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)} 
                                                        class="socialplatform">
                                                    </input><br></br>
                                                    <label> Tulip Bistro </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)} 
                                                        class="socialplatform">
                                                    </input>
                                                </div><br></br>
                                                    {/* <option value=""></option>
                                                    <option value="Spaghettiexpress">Spaghettiexpress</option>
                                                    <option value="Paprimz Pizza">Paprimz Pizza</option>
                                                    <option value="Bole Abuja">Bole Abuja</option>
                                                    <option value="Tulip Bistro">Tulip Bistro</option> */}
                                            </div><br></br>

                                            <label className="check">Order Name</label>
                                            <br></br>
                                            <br></br>
                                            <textarea  name="ordername" onChange={(e) => setOrderName(e.target.value)}>
                                            </textarea>

                                            <label className="first first_input">Order Price</label>
                                            <br></br>
                                            <label className="second second_input">Email
                                                <span> *</span>
                                            </label>
                                            <div className="row checkout-field">
                                                <input
                                                    type="number"
                                                    onChange={(e) => setAmount(Number(e.target.value) * 100)}
                                                />
                                                <input
                                                    type="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                        <PaystackButton className="paystack-button" {...componentProps} />
                                    </div> 
                                    </section>
                                )}

                                {customer_status === "returning_customer" && (
                                    <section id="returningCustomerSection">
                                        <h3>Returning Customer</h3>
                                    <p>Please Note this section is not mandating but we love you to fill 
                                        this to know if we are lacking in anyway. Thank you.
                                    </p>
                                    <p>
                                        kindly rate your previous delivery experience. 1:  Poor (1 star) 
                                        2: Fair (2 stars) 3: Good (3 stars) 4: very Good (4 stars)  5: Excellent (5 stars)
                                    </p>
                                    <select name="experience_rating">
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </select><br></br>
                                    <p>
                                        Would you like to leave any comment or suggestion based on your 
                                        experience with our service? E.g. you can start with why you rate 
                                        us based on the above question.
                                    </p>
                                    <textarea name="returningComment" 
                                        placeholder="Leave your comment here...">
                                    </textarea>
                                    <div className="checkout-form">
                                            <h3>Personal Order Details</h3>
                                            <label className="first">First Name
                                                <span> *</span>
                                            </label>
                                            <label className="second">Surname
                                                <span> *</span>
                                            </label>
                                            <br></br>
                                            <div class="row checkout-field">
                                                <input
                                                    type="text"
                                                    onChange={(e) => setFirst_name(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    onChange={(e) => setSurname(e.target.value)}
                                                />
                                            </div>

                                            <label className="first first_input">Phone
                                                <span> *</span>
                                            </label>
                                            <br></br>
                                            <label className="second second_input">Address
                                                <span> *</span>
                                            </label>
                                            <div className="row checkout-field">
                                            <input
                                                type="tel"
                                                onChange={(e) => setPhone_number(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                            </div>

                                            <p className="test">Below are Your Orders Details from Your 
                                                Cart
                                            </p>
                                            <div></div>
                                            <strong>Note:</strong> 
                                            <span style={{color : "black"}}>From 
                                                the 
                                                <strong> Order Category </strong> 
                                                to 
                                                <strong>Order Price</strong> 
                                                are not mandating because if you selected order form the 
                                                Restaurants page and that your order show/diplay in the 
                                                cart that mean you may not fill those fileds unless the 
                                                meals are not display inthe Restaurants page but in the 
                                                menu in that page
                                            </span>
                                            <br></br>
                                            <br></br>
                                            <label className="check">Order Category</label>
                                            <br></br>
                                            <br></br>
                                            <input
                                                    type="text"
                                                    onChange={(e) => setOrdercategory(e.target.value)}
                                                />
                                            <br></br>
                                            <label className="check">Order From</label>
                                            <br></br>
                                            <br></br>                           
                                            <div className="row checkout-field restaurants">
                                                <div onChange={(e) => setOrderFrom(e.target.value)}>
                                                    <label> Spaghettiexpress </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)} 
                                                        class="socialplatform">
                                                    </input>
                                                    <label> Paprimz Pizza </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)} 
                                                        class="socialplatform">
                                                    </input>
                                                    <label> Bole Abuja </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)} 
                                                        class="socialplatform">
                                                    </input><br></br>
                                                    <label> Tulip Bistro </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)} 
                                                        class="socialplatform">
                                                    </input>
                                                </div><br></br>
                                                    {/* <option value=""></option>
                                                    <option value="Spaghettiexpress">Spaghettiexpress</option>
                                                    <option value="Paprimz Pizza">Paprimz Pizza</option>
                                                    <option value="Bole Abuja">Bole Abuja</option>
                                                    <option value="Tulip Bistro">Tulip Bistro</option> */}
                                            </div><br></br>

                                            <label className="check">Order Name</label>
                                            <br></br>
                                            <br></br>
                                            <textarea  name="ordername" onChange={(e) => setOrderName(e.target.value)}>
                                            </textarea>

                                            <label className="first first_input">Order Price</label>
                                            <br></br>
                                            <label className="second second_input">Email
                                                <span> *</span>
                                            </label>
                                            <div className="row checkout-field">
                                                <input
                                                    type="number"
                                                    onChange={(e) => setAmount(Number(e.target.value) * 100)}
                                                />
                                                <input
                                                    type="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                        <PaystackButton className="paystack-button" {...componentProps} />
                                    </div>
                                    </section>
                                )}


                                {customer_status === "other" && (
                                    <section id="otherCustomerSection">
                                          <div className="checkout-form">
                                            <h3>Personal Order Details</h3>
                                            <label className="first">First Name
                                                <span> *</span>
                                            </label>
                                            <label className="second">Surname
                                                <span> *</span>
                                            </label>
                                            <br></br>
                                            <div class="row checkout-field">
                                                <input
                                                    type="text"
                                                    onChange={(e) => setFirst_name(e.target.value)}
                                                />
                                                <input
                                                    type="text"
                                                    onChange={(e) => setSurname(e.target.value)}
                                                />
                                            </div>

                                            <label className="first first_input">Phone
                                                <span> *</span>
                                            </label>
                                            <br></br>
                                            <label className="second second_input">Address
                                                <span> *</span>
                                            </label>
                                            <div className="row checkout-field">
                                            <input
                                                type="tel"
                                                onChange={(e) => setPhone_number(e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                            </div>

                                            <p className="test">Below are Your Orders Details from Your 
                                                Cart
                                            </p>
                                            <div></div>
                                            <strong>Note:</strong> 
                                            <span style={{color : "black"}}>
                                                From the 
                                                <strong> Order Category </strong>
                                                 to <strong>Order Price</strong> 
                                                 are not mandating because if you selected order form the 
                                                 Restaurants page and that your order show/diplay in the 
                                                 cart that mean you may not fill those fileds unless the 
                                                 meals are not display in the Restaurants page but in the 
                                                 menu in that page
                                            </span>
                                            <br></br>
                                            <br></br>
                                            <label className="check">Order Category</label>
                                            <br></br>
                                            <br></br>
                                            <input
                                                    type="text"
                                                    onChange={(e) => setOrdercategory(e.target.value)}
                                                />
                                            <br></br>
                                            <label className="check">Order From</label>
                                            <br></br>
                                            <br></br>                           
                                            <div className="row checkout-field restaurants">
                                                <div onChange={(e) => setOrderFrom(e.target.value)}>
                                                    <label> Spaghettiexpress </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)} 
                                                        class="socialplatform">
                                                    </input>
                                                    <label> Paprimz Pizza </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)} 
                                                        class="socialplatform">
                                                    </input>
                                                    <label> Bole Abuja </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)} 
                                                        class="socialplatform">
                                                    </input><br></br>
                                                    <label> Tulip Bistro </label>
                                                    <input type="checkbox" onChange={(e) => setOrderFrom(e.target.value)} 
                                                        class="socialplatform">
                                                    </input>
                                                </div><br></br>
                                                    {/* <option value=""></option>
                                                    <option value="Spaghettiexpress">Spaghettiexpress</option>
                                                    <option value="Paprimz Pizza">Paprimz Pizza</option>
                                                    <option value="Bole Abuja">Bole Abuja</option>
                                                    <option value="Tulip Bistro">Tulip Bistro</option> */}
                                            </div><br></br>

                                            <label className="check">Order Name</label>
                                            <br></br>
                                            <br></br>
                                            <textarea  name="ordername" onChange={(e) => setOrderName(e.target.value)}>
                                            </textarea>

                                            <label className="first first_input">Order Price</label>
                                            <br></br>
                                            <label className="second second_input">Email
                                                <span> *</span>
                                            </label>
                                            <div className="row checkout-field">
                                                <input
                                                    type="number"
                                                    onChange={(e) => setAmount(Number(e.target.value) * 100)}
                                                />
                                                <input
                                                    type="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </div>

                                        <PaystackButton className="paystack-button" {...componentProps} />
                                    </div>
                                    </section>
                                )}
 
                            </form>
                </section>
            </section>
        </div>

        <div class="side-bubble left up"></div>
        <div class="side-bubble left down"></div>
        <div class="side-bubble right up"></div>
        <div class="side-bubble right down"></div>
        
        <footer>

        <div class="logo">
            <img src={process.env.PUBLIC_URL + "/Lunch_Chronicles.jpg"} alt="Lunch Chronicles business logo"></img>
            <span>Lunch Chronicles</span>
        </div>

        <div class="footer_container">
            {/* <!-- <a href="https://wa.me/+2348102764355" title="Click on this link to direct you to my WhatsApp page" id="icon">
                <i class="fa-brands fa-whatsapp"></i>
            </a>
            <a href="https://wa.me/+2348102764355" title="Click on this link to direct you to my WhatsApp page" id="icon">
                <i class="fa-brands fa-whatsapp"></i>
            </a> --> */}
            
            <div class="footer_section" id="footer_underlink">
                <strong class="strong quick-links">Quick Links</strong>
                <ul class="top_navbar">
                    <li>
                        <a href="../../index.html">Home</a>
                    </li>
                    <li>
                        <a href="/E-Commerce/HTML/about_us.html">About Us</a>
                    </li>
                    <li>
                        <a href="/E-Commerce/HTML/how_it_work.html">How It Work</a>
                    </li>
                    <li>
                        <a href="/E-Commerce/HTML/frequently_asked_questions.html">FAQ</a>
                    </li>
                    <li>
                        <a href="/E-Commerce/HTML/customer_support.html">Customer Support</a>
                    </li>
                    <li>
                        <a href="/E-Commerce/HTML/careers.html">Careers</a>
                    </li>
                    <li class="size">
                        <a href="/E-Commerce/HTML/term_conditions.html">Terms & Conditions</a>
                    </li>
                     <li id="size">
                         <a href="/E-Commerce/HTML/privacy_policy.html">Privacy Policy</a>
                    </li>
                </ul>
            </div>
            <div class="footer_section" id="footer_section_contact">
                <strong class="contact">Contact Us</strong>
                <div class="footer_section_contact" id="contact">
                    <a href="">08102764355</a>
                    <a href="">kenoyeikata@gmail.com</a>
                </div>
            </div>
            <div class="social">
                <strong>Stay in Touch with us</strong><br></br>
                <a href="https://wa.me/+2348102764355?text=Good%20day" target="_blank" 
                    title="Click on this link to direct you to my WhatsApp page. Note: Do not delete the defualt message." 
                    id="icon" style={{marginTop : "10%"}}>
                    <i class="fa-brands fa-whatsapp"></i>
                </a>
                <a class=" m-2" href="https://github.com/190625">
                    <i class="fab fa-github"></i>
                </a>
            </div>

            {/* <!-- <div class="footer_section button" id="app">
                <strong class="strong">Get Our App</strong>
                <section>
                    <p class="download">Download on</p>
                    <img src="/E-Commerce/Images/Screenshot_2025-04-24-15-28-59-97_680d03679600f7af0b4c700c6b270fe7.jpg" 
                        alt="App Store">
                    <button type="button" class="app ">
                        <a href="https://www.apple.com/app-store/">App Store</a>
                    </button> 
                </section>
                <section>
                    <p class="download">Download on</p>
                    <img src="/images/Google Icons & Symbols_files/732208.png" alt="Google Play">
                    <button type="button" class="app">
                        <a href="https://play.google.com/store/games?device=windows">Google Play</a>
                    </button>
                </section>
            </div> --> */}
        </div>
        <hr></hr>
        <section class="copyright-inform">

            <div>
                <p class="inline">
                    <span> {`\u00A9`} </span>
                    <span id="year" class="inline"> 2025 </span>
                    <strong class="inline" style={{color : "black"}}>Lunch Chronicles </strong>
                    | <br></br> All Rights Reserved
                </p>
            </div>

        </section>

        <a href="#scroll-up">Scroll Up</a>
        <a href="#scroll_up">Scroll Up</a>

    </footer>

    <script src="../JS/main.js"></script>
    <script src="../JS/about.js"></script>
    <script src="../JS/order_history.js"></script>

    </>
  );
}
export default Checkout;


{
    /* 
<div className="checkout-form">
                                    <h2>Pay with Paystack</h2>

                                    <div className="checkout-field">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setFirst_name(e.target.value)}
                                    />
                                    </div>

                                    <div className="checkout-field">
                                    <label>Surname</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setSurname(e.target.value)}
                                    />
                                    </div>

                                    <div className="checkout-field">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    </div>

                                    <div className="checkout-field">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setPhone_number(e.target.value)}
                                    />
                                    </div>

                                    <div className="checkout-field">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    </div>

                                    <PaystackButton className="paystack-button" {...componentProps} />
                                </div> */}
      {/* <div className="checkout-form">
        <h2>Pay with Paystack</h2>

        <div className="checkout-field">
          <label>First Name</label>
          <input
            type="text"
            onChange={(e) => setFirst_name(e.target.value)}
          />
        </div>

        <div className="checkout-field">
          <label>Surname</label>
          <input
            type="text"
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>

        <div className="checkout-field">
          <label>Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="checkout-field">
          <label>Phone</label>
          <input
            type="text"
            onChange={(e) => setPhone_number(e.target.value)}
          />
        </div>

        <div className="checkout-field">
          <label>Address</label>
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <PaystackButton className="paystack-button" {...componentProps} />
      </div>
       */}


       // import React, { useState } from "react";
// // import {PaystackButton} from "react";
// import { PaystackButton } from "react-paystack";

// const Checkout = () => {
//     const publicKey = "";
//     const amount = 10000;
//     const [first_name, setFirst_name] = useState("");
//     const [surname, setSurname] = useState("");
//     const [phone_number, setPhone_number] = useState("");
//     const [address, setAddress] = useState("");
//     const [email, setEmail] = useState("");

//     const componentProps = {
//         first_name,
//         surname,
//         phone_number,
//         address,
//         email,
//         metadate : {
//             first_name,
//             surname,
//             phone_number,
//             address,
//             email,
//         },
//         publicKey,
//         text : "Pay Now",
//         onSuccess : (response) =>
//             alert("Payment Successful Ref: ${response:reference}"),
//         onclose: () => 
//             alert("Payment Closed")
//     }
//     return (
//     <>
//       <div className="navbar">
//         <div className="container_button">
//           <button className="button-toggle"  title="toggle nav bar">&#9776;</button>
//           <img src="../src/Lunch Chronicles.jpg" alt="" />
//         </div>

//         <nav className="nav">
//           <div className="logo">
//             <img src="../src/Lunch Chronicles.jpg" alt="Lunch Chronicles" />
//           </div>
//           <ul className="top_navbar nav-links" id="navlinks">
//             <li><a href="index.html" className="nav-link home">Home</a></li>
//             <div className="dropdown">
//               <a href="about_us.html" className="nav-link checkout">About Us <i className="fa-solid fa-caret-down"></i></a>
//               <div className="dropdown_content">
//                 <li><a href="how_it_work.html">How It Work</a></li>
//                 <li><a href="frequently_asked_questions.html" className="nav-link checkout">FAQ</a></li>
//                 <li><a href="contact.html" className="nav-link order_history">Contact Us</a></li>
//               </div>
//             </div>
//             <div className="dropdown">
//               <a href="our_service.html" className="nav-link service">Services <i className="fa-solid fa-caret-down"></i></a>
//               <div className="dropdown_content">
//                 <li><a href="product.html" className="nav-link product">Restaurants</a></li>
//                 <li><a href="contact.html" className="nav-link order_history">Order</a></li>
//                 <li><a href="frequently_asked_questions.html" className="nav-link checkout">Delivery</a></li>
//                 <li><a href="contact.html" className="nav-link order_history">Contact Us</a></li>
//               </div>
//             </div>
//             <li><a href="cart_checkout.html" className="nav-link checkout">Checkout</a></li>
//             <li><a href="custmoer_order_history.html" className="nav-link checkout">Customer view</a></li>
//           </ul>
//         </nav>
//         <header>
//           <h1>Checkout</h1>
//           <button className="strong cta-button"><a href="#app">Get Our App</a></button>
//         </header>
//       </div>

//       <div className="checkout-form">
//       <h2>Pay with Paystack</h2>
//       <div className="checkout-field">
//         <label>first name</label>
//         <input
//           type="text"
//           onChange={(e) => setFirst_name(e.target.value)}
//         />
//       </div>
//       <div className="checkout-field">
//         <label>first name</label>
//         <input
//           type="text"
//           onChange={(e) => setSurname(e.target.value)}
//         />
//       </div>
//       <div className="checkout-field">
//         <label>Email</label>
//         <input
//           type="email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>
//       <div className="checkout-field">
//         <label>Phone</label>
//         <input
//           type="text"
//           onChange={(e) => setPhone_number(e.target.value)}
//         />
//       </div>
//       <PaystackButton className="paystack-button" {...componentProps} />
//     </div>
//     </>
//   );
// }
// export default Checkout;
