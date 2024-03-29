import "./input.css";

const Input = ({ type, label, name, onChange }) => {
  return (
    <>
      <div className="input-main">
        <label>{label}</label>
        {type === "textarea" ? (
          <textarea
            className="custom-input"
            name={name}
            onChange={onChange}
          ></textarea>
        ) : (
          <input
            className="custom-input"
            type={type}
            name={name}
            onChange={onChange}
          />
        )}
      </div>
    </>
  );
};

export default Input;
