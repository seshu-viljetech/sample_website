import PropTypes from 'prop-types';
import styles from './Button.module.css';
const Button = ({ title, onClick, variant = 'primary', size = 'md', disabled = false, type = 'button' }) => {
    return (
      <button
        className={`${styles.button} ${styles[variant]} ${styles[size]}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {title}
      </button>
    );
  };
  
  Button.propTypes = {
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    disabled: PropTypes.bool,
    type: PropTypes.string,
  };
export default Button  