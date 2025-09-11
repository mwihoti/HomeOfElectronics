import nextConnect from "next-connect";
import { client } from "@/lib/client";

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something happened! ${error.message}` });
  },
});
const generateRandomDiscountPercentage = () => {
  return Math.floor(Math.random() * 16); // Random percentage between 0 and 15
};

const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  if (!originalPrice || discountPercentage <= 0) return originalPrice || 0;
  const discountAmount = (originalPrice * discountPercentage) / 100;
  return Math.round(originalPrice - discountAmount) // Round to 2 decimal places
};

const generateRandomSold = () => {
  return Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
};

const generateRandomReview = () => {
  return Math.floor(Math.random() * 10)
 }
apiRoute.get(async (req, res) => {
  try {
    const query = `*[_type == "product"]{
      _id,
      name,
      price,
      quantity,
      "images": images[].asset->url,
      description,
      originalPrice
    }`;
    const products = await client.fetch(query);

    // Enhance products with random discount and calculated discounted price
    const enrichedProducts = products.map((product) => {
      const randomDiscount = generateRandomDiscountPercentage();
      const discountedPrice = calculateDiscountedPrice(product.originalPrice || product.price, randomDiscount);
      const savings = (product.originalPrice || product.price) - discountedPrice

      return {
        ...product,
        discount: randomDiscount,
        discountedPrice: discountedPrice,
        savings: savings,
        reviews: generateRandomReview(),
        sold: generateRandomSold(),
      };
    });
    res.status(200).json(enrichedProducts); // Return enriched data
  } catch (error) {
    res.status(500).json({ error: `Server error! ${error.message}` });
  }
});

export default apiRoute;