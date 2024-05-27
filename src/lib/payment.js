import PaystackPop from "@paystack/inline-js";
import axios from "axios";
export const payWithPaystack = async ( data ) => {
    const paystack = new PaystackPop();
    paystack.newTransaction({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email,
        amount: price, // the amount value is multiplied by 100 to convert to the lowest currency unit
        currency: "USD", // Use GHS for Ghana Cedis or USD for US Dollars

        // ref: "YOUR_REFERENCE1",

        onSuccess: transaction => {
            // Payment complete! Reference: transaction.reference

            const reference = transaction.reference;
        },
        onCancel: () => {
            // user closed popup
            alert("Transaction was not completed, window closed.");
        }
    });
};
