import { html, useContext, useEffect } from "/framework";

export default function Input(
  {
    cls,
    radius,
    compact,
    upperCase,
    variant,
    color,
    style,
    error,
    type,
    icon,
    disabled,
    ...props
  },
  children
) {
  if (cls instanceof Array) cls = cls;
  else cls = (cls || "").split(" ");
  cls = [...cls, "GUILibTextbox"];
  disabled = disabled || false;
  if (disabled == "false") disabled = false;
  disabled = !!disabled;
  error = error || false;
  if (error == false) error = false;
  error = !!error;

  if (disabled) cls.push("disabled")

  let theme = useContext("selectedColorTheme")?.style;

  radius = radius || "4px";
  compact = compact || false;
  if (compact == "false") compact = false;
  upperCase = upperCase || false;
  if (upperCase == "false") upperCase = false;

  switch (variant) {
    case "filled":
    case "subtle":
      break;
    default:
      variant = "outline";
      break;
  }

  switch (color) {
    case "purple":
    case "red":
    case "yellow":
    case "orange":
    case "green":
      break;
    default:
      color = "blue";
  }

  cls.push(disabled?"filled":variant);
  if (disabled) cls.push("disabled");
  if (compact) cls.push("compact");
  if (upperCase) {
    if (!(children instanceof Array)) children = [children];
    children = children.map((el) =>
      typeof el == "string" ? el.toUpperCase() : el
    );
  }

  const inputRef = {current: null};
  const iconRef = {current: null};
  const childrenRef = {current: null};

  useEffect(()=>{
    if (inputRef.current == null) return;
    if (iconRef.current != null) inputRef.current.style.paddingLeft = `${iconRef.current.clientWidth}px`;
    if (childrenRef.current != null) inputRef.current.style.paddingRight = `${childrenRef.current.clientWidth}px`;
  });

  return html`<div style="display: flex;flex-direction: row;align-items: center;"><div ref=${iconRef} style="position: absolute;" class="FFGL-InputIcon">${icon}</div><input ref=${inputRef} type=${type || "text"} class=${cls.join(
    " "
  )} style="${error?"border: 1px solid red;":""}border-radius: ${radius}; --bg: ${
    theme && theme[color] ? (disabled ? "#1e293b" : theme[color][5]) : color
  };${style || ""}" ...${props}>${children}</input><div ref=${childrenRef} style="position: absolute;">${children}</div></div>`;
}
