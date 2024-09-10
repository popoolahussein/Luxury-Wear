import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { shopItemsData } from './Data.js';

const Cart = ({ searchQuery, basket, setBasket }) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showClearCartModal, setShowClearCartModal] = useState(false);
  const [filteredBasket, setFilteredBasket] = useState(basket);

  useEffect(() => {
    setFilteredBasket(
      basket.filter(({ id }) => {
        const item = shopItemsData.find(data => data.id === id);
        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [searchQuery, basket]);

  const calculateTotal = useCallback(() => {
    const total = filteredBasket.reduce((acc, { id, item }) => {
      const shopItem = shopItemsData.find(data => data.id === id);
      return acc + (shopItem.price * item);
    }, 0);
    setTotalAmount(total);
  }, [filteredBasket]);

  useEffect(() => {
    calculateTotal();
    localStorage.setItem('data', JSON.stringify(basket));
  }, [basket, filteredBasket, calculateTotal]);

  const incrementItem = (id) => {
    setBasket((prev) => prev.map((b) => b.id === id ? { ...b, item: b.item + 1 } : b));
  };

  const decrementItem = (id) => {
    setBasket((prev) => prev.map((b) => b.id === id ? { ...b, item: b.item - 1 } : b).filter((b) => b.item > 0));
  };

  const removeItem = (id) => {
    setBasket((prev) => prev.filter((b) => b.id !== id));
  };

  const sendToWhatsApp = () => {
    const items = filteredBasket.map(({ id, item }) => {
      const selectedItem = shopItemsData.find(data => data.id === id);
      return `*${selectedItem.name}* (Quantity: ${item}) - #${selectedItem.price}\nImage: ${selectedItem.img}\n`;
    }).join('\n');

    const message = `Hello! I'd like to place the following order:\n\n${items}\n*Total Price:* #${totalAmount}\n\nThank you!`;
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "+2347035258447";

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    clearCart();
  };

  const handleCheckout = () => {
    setShowWhatsAppModal(true);
  };

  const clearCart = () => {
    setShowClearCartModal(true);
  };

  const confirmClearCart = () => {
    setBasket([]);
    setTotalAmount(0);
    localStorage.setItem('data', JSON.stringify([]));
    setShowClearCartModal(false);
  };

  const cancelClearCart = () => {
    setShowClearCartModal(false);
  };

  return (
    <div className="cart-container">
      <div className="cart-summary">
        <h3 className='cart-item-price'>Total: #{totalAmount}</h3>
        {filteredBasket.length > 0 && (
          <div>
            <button className='checkout' onClick={handleCheckout}>Checkout</button>
            <button className="removeAll" onClick={clearCart}>Remove All Items</button>
          </div>
        )}
      </div>
      {filteredBasket.length > 0 ? (
        filteredBasket.map(({ id, item }) => {
          const shopItem = shopItemsData.find((data) => data.id === id);
          return (
            <div key={id} className="cart-item">
              <img src={shopItem.img} alt={shopItem.name} width="100" />
              <div>
                <h4 className='title-price-x'>{shopItem.name}</h4>
                <p>Price: #{shopItem.price}</p>
                <div className='count'>
                  <button onClick={() => decrementItem(id)}>-</button>
                  <span>{item}</span>
                  <button onClick={() => incrementItem(id)}>+</button>
                </div>
                <p>Total: #{item * shopItem.price}</p>
                <button onClick={() => removeItem(id)}>Remove</button>
              </div>
            </div>
          );
        })
      ) : (
        <h2>Cart is Empty</h2>
      )}
      
      {showWhatsAppModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowWhatsAppModal(false)}>X</button>
            <p>Are you sure you want to send the order details to WhatsApp?</p>
            <button className="send-whatsapp" onClick={sendToWhatsApp}>Send to WhatsApp</button>
          </div>
        </div>
      )}
      {showClearCartModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowClearCartModal(false)}>X</button>
            <p>Are you sure you want to remove all items from the cart?</p>
            <div>
            <button onClick={confirmClearCart} style={{marginRight: "5px"}}>Yes</button>
            <button onClick={cancelClearCart} style={{marginLeft: "5px"}}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Cart.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      item: PropTypes.number.isRequired,
    })
  ).isRequired,
  setBasket: PropTypes.func.isRequired,
};

export default Cart;
