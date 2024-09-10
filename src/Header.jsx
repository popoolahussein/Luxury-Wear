import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = ({ cartCount }) => {
  return (
    <header className="navbar">
      <Link to="/">
        <h2>Ajogbe Bead & More</h2>
      </Link>
      <Link to="/cart">
        <div className="cart">
          <i className="bi bi-bag-check-fill"></i>
          <div id="cartAmount" className="cartAmount">{cartCount}</div>
        </div>
      </Link>
    </header>
  );
};

Header.propTypes = {
  cartCount: PropTypes.number.isRequired,
};

export default Header;
