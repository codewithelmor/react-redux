import { addToCart, CartItem, removeFromCart } from "../stores/cart/cart-slice.ts";
import { useAppSelector, useCartDispatch } from "../stores/hooks.ts";

export default function CartItems() {
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useCartDispatch();

  const totalPrice = cartItems.reduce((value, item) => value + (item.price * item.quantity), 0);
  const formattedTotalPrice = totalPrice.toFixed(2);

  function handleAddToCart(item: CartItem) {
    dispatch(addToCart(item));
  }

  function handleRemoveFromCart(id: string) {
    dispatch(removeFromCart({ id }));
  }

  return (
    <div id="cart">
      { cartItems.length === 0 && <p>No items in cart!</p> }
      
      { cartItems.length > 0 && 
      <ul id="cart-items">
          {cartItems.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.title}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => handleRemoveFromCart(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleAddToCart(item)}>+</button>
                </div>
              </li>
            );
          })}
        </ul>}

      {<p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>}
    </div>
  );
}
