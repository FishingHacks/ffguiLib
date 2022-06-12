import { html, useContext } from "/framework";

export default function Checkbox(
  { color, checked, style, cls, disabled, ...other },
  children
) {
  let theme = useContext("selectedColorTheme")?.style;

  disabled = disabled || false;
  if (disabled == "false") disabled = false;

  cls = (cls || "").split(" ");
  cls.push("guilibcheckbox");
  if (disabled) cls.push("disabled");

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

  style = `--color: ${theme ? theme[color][5] : "blue"};` + (style || "");

  checked = checked || false;
  if (checked == "false") checked = false;

  return html`
  <input type="checkbox" ...${
    checked ? { checked: "" } : {}
  } style=${style} class=${cls.join(" ")} ...${
    disabled ? { onchange: ({ event: e }) => e.target.checked = !e.target.checked } : {}
  } ...${other}>${children}</input>
  `;
}
