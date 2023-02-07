import {html, useContext} from "/framework"

export default function Button({cls, radius, disabled, compact, upperCase, variant, color, style, onclick, tabindex, ...props}, children) {
    if (cls instanceof Array) cls = cls; else cls = (cls || "").split(" ");
    cls = [...cls, "GUILibButton"];

    let theme = useContext("selectedColorTheme")?.style;

    radius = radius || "4px";
    disabled = disabled || false;
    if(disabled=="false") disabled = false;
    compact = compact || false;
    if (compact=="false") compact = false;
    upperCase = upperCase || false;
    if (upperCase == "false") upperCase = false;

    switch (variant) {
        case "light":
        case "outline":
        case "subtle":
            break;
        default:
            variant="filled";
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

    cls.push(variant);
    if(disabled) cls.push("disabled");
    if (compact) cls.push("compact");
    if(upperCase) {
        if (!(children instanceof Array)) children = [children];
        children = children.map(el=>typeof el == "string"?el.toUpperCase():el);
    }

    return html`<button tabindex=${disabled?-1:isNaN(tabindex) ? false : Number(tabindex)/* We abuse the trick, that false values will be removed. When there's no tabindex */} class=${cls.join(" ")} style="border-radius: ${radius}; --bg: ${theme && theme[color]?disabled?"#1e293b":theme[color][5]:color}; --bgb: ${theme && theme[color]?disabled?"#1e293b89":theme[color][5]+"89":color}; --bga: ${theme && theme[color]?disabled?"#1e293b55":theme[color][5]+"55":color}; ${style}" ...${!onclick || disabled ? {...props} : {onclick, ...props}}>${children}</button>`
}