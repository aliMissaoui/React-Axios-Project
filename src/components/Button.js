import PropTypes from "prop-types";

const Button = ({ text, color, onClick, onDoubleClick }) => {
  return (
    <button
      className="btn"
      onDoubleClick={onDoubleClick}
      onClick={onClick}
      style={{ backgroundColor: color }}
    >
      {text}
    </button>
  );
};

Button.defaultProps = {
  text: "Add Task",
  color: "red",
};
Button.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  onClick: PropTypes.func,
  onDoubleClick: PropTypes.func,
};
export default Button;
