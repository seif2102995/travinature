import { Tripss } from "../models/tripsSchema";
const addToWishlist = async function (req, res) {
const productId = req.params.productId;
const email = req.session.user.Email;
  
    try {
      // Fetch the product details from the database
      const product = await Tripss.findById(productId);
  
      if (!product) {
        throw new Error('Pack not found');
      }
  
      // Check if the product already exists in the wishlist
      const user = { email: email };
      let list = await Wishlist.findOne(user);
  
      if (!list) {
        list = await Wishlist.create({ items: [], email: email });
      }
  
      // Check if the product already exists in the wishlist items
      const exists = list.items.some(item => item.productId == product.id);
  
      if (exists) {
        res.json({ success: false, message: 'Pack already exists in the wishlist' });
        return;
      }
  
      list.items.push({ productId: product.id, internalId: productId });
      list.save();
      res.json({ success: true, message: 'Pack added to wishlist' });
    } catch (error) {
      console.error('Error adding product to wishlist:', error);
      res.status(500).json({ success: false, message: 'Error adding Pack to wishlist' });
    }
  };
  

    const removeFromWishlist = async function (req, res) {
      const productId = req.params.productId;
      const email = req.session.user.Email;
      try {
        const user = { email: email };
        // Find the order document for the user
        const wishlist = await Tripss.findOne(user);
    
        if (!wishlist) {
          throw new Error('Wishlist not found');
        }
        // Find the index of the item to remove
        const index = wishlist.items.findIndex(item => item.productId == productId);
    
        if (index === -1) {
          throw new Error('Pack not found in wishlist');
        }
    
        // Remove the item from the order array
        wishlist.items.splice(index, 1);
    
        // Save the updated wishlist
        await wishlist.save();
    
        res.send(wishlist);
      } catch (error) {
        console.error('Error removing Pack from wishlist:', error);
        res.sendStatus(500);}
};