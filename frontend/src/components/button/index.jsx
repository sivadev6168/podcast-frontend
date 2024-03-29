import "./button.css";

const Buttons = ({ className, onClick, children }) => {
  return (
    <>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </>
  );
};

export default Buttons;
