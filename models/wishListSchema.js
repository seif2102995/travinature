const mongoose = require("mongoose")
const WishListSchema = new mongoose.Schema({
    Wish : {
        type: String,
        required: true
    }
})

const Wishlist = new mongoose.model('Wishlist', WishListSchema);
module.exports = Wishlist

//on route.js
/*const wishlistItem = require("../model/wishListSchema");
router.post("/watchlistitem", (req, res) => {
    res.send("hi ");
    console.log("wishlistItem item is here");
});*/