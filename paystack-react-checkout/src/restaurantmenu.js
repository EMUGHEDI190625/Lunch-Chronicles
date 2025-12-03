// src/components/RestaurantMenu.js
import { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";

export default function RestaurantMenu({ restaurantId, onAddToCart }) {
    
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const fetchProducts = async () => {
      const snapshot = await get(ref(db, `cart`));
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
  }, [restaurantId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Menu for {restaurantId}</h2>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} — ₦{product.price}
            <br />
            <img src={product.image} alt={product.name} width="100" />
            <br />
            <button onClick={() => onAddToCart(product)}>
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
