const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/verify", async(req, res) => {
    const ref = req.body.reference;

    try {
        const response = await axios.get("https://api.paystack.co/transaction/verify/${ref}", {
            headers : {
                Authorization : "Bearrer Your_SECRET_KEY",
                "Content-Type" : "application/json"
            }
        });

        if(response.data.data.status === "success") {
            res.json({status : "success"});
        }
        else {
            res.json({status : "failed"});
        }
    }
    catch {
        console.error("Error verifying payment:", error.message);
        res.status(500).json({status : "error", message : "Something went wrong"});
    }
});

app.listen(3000, () => console.log("Server running on post 3000"))