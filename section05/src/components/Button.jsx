import "./Button.css";

const Button = (props) => {
  console.log(props);
  return <button>{props.text}</button>;
};

export default Button;
