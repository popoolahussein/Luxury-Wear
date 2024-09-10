import PropTypes from 'prop-types';
import { shopItemsData } from './Data';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Shop = ({ searchQuery, basket, setBasket }) => {
  const filteredShopItems = shopItemsData.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleIncrement = (id) => {
    setBasket((prev) => {
      const itemExists = prev.find(item => item.id === id);
      if (itemExists) {
        return prev.map(item =>
          item.id === id ? { ...item, item: item.item + 1 } : item
        );
      } else {
        return [...prev, { id, item: 1 }];
      }
    });
  };

  const handleDecrement = (id) => {
    setBasket((prev) => {
      const itemExists = prev.find(item => item.id === id);
      if (itemExists && itemExists.item > 1) {
        return prev.map(item =>
          item.id === id ? { ...item, item: item.item - 1 } : item
        );
      } else if (itemExists && itemExists.item === 1) {
        return prev.filter(item => item.id !== id);
      }
      return prev;
    });
  };

  return (
    <section className="shop">
      {filteredShopItems.map(({ id, name, price, desc, img }) => {
        const quantity = basket.find(item => item.id === id)?.item || 0;
        return (
          <div key={id} className="item">
            <img width="218" src={img} alt={name} />
            <div className="details">
              <h3>{name}</h3>
              <p>{desc}</p>
              <h4>Price: #{price}</h4>
              <div className='count'>
                <button className='.bi-plus-lg' onClick={() => handleDecrement(id)}>-</button>
                <span>{quantity}</span>
                <button onClick={() => handleIncrement(id)}>+</button>
              </div>
              <Link to="/cart">
                <button className="place-order">Place you order</button>
              </Link>
            </div>
          </div>
        );
      })}
    </section>
  );
};

Shop.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      item: PropTypes.number.isRequired,
    })
  ).isRequired,
  setBasket: PropTypes.func.isRequired,
};

export default Shop;
