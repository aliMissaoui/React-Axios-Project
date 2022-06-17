import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation } from "react-router-dom";

const Header = ({ title, onAdd, showAdd }) => {
  const onDoubleClick = () => {
    console.log("double clicked!");
  };

  const location = useLocation();
  return (
    <header className="header">
      <h1>{title}</h1>
      {location.pathname === "/" && (
        <Button
          onDoubleClick={onDoubleClick}
          onClick={onAdd}
          color={showAdd ? "black" : "green"}
          text={showAdd ? "Close" : "Add Task"}
        />
      )}
    </header>
  );
};

Header.defaultProps = {
  title: "React app",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
export default Header;
