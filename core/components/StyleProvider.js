import { createContext, html, h } from "/framework";

export default async function StyleProvider({ mode, style }, children) {
  if (document.head.getElementsByClassName("ffgl-stylings-main").length < 1) {
    const style = document.createElement("style");
    style.append(document.createTextNode('.GUILibTextbox{border:none;padding:10px;padding-left:20px;padding-right:20px;color:var(--text-1);cursor:text;}.GUILibTextbox.compact{padding:5px;}.GUILibTextbox.disabled{cursor:not-allowed;}.GUILibTextbox.filled{background-color:var(--background-7);}.GUILibTextbox.outline{border:1px solid var(--background-7);background-color:inherit;}.GUILibTextbox:focus,.GUILibTextbox:focus-within{outline:0px;border:1px solid var(--bg);}.GUILibTextbox.subtle{color:var(--text-1);background-color:#0000;}.GUILibButton{border:none;padding:10px;padding-left:20px;padding-right:20px;color:var(--text-1);font-weight:bold;cursor:pointer;}.GUILibButton.compact{padding:5px;}.GUILibButton:not(.disabled):active{transform:translateY(1px);}.GUILibButton.disabled{cursor:not-allowed;}.GUILibButton.filled{background-color:var(--bg);}.GUILibButton.outline{border:1px solid var(--bg);background-color:inherit;}.GUILibButton.outline:active{transform:translateY(1px);}.GUILibButton.outline:focus,.GUILibButton.outline:hover,.GUILibButton.outline:active{background-color:var(--bga);}.GUILibButton.light{background-color:var(--bga);}.GUILibButton.light:focus,.GUILibButton.light:hover,.GUILibButton.light:active{background-color:var(--bgb);}.GUILibButton.subtle{color:var(--bg);background-color:inherit;}.GUILibButton:hover,.GUILibButton:focus,.GUILibButton:active{background-color:var(--bga);}input.guilibcheckbox{width:41px;height:21px;cursor:pointer;display:flex;border-radius:50px;appearance:none;border:1px #444 solid;background-color:var(--background-9);}input.guilibcheckbox::before{content:"";border-radius:50%;background-color:var(--text-1);width:15px;height:15px;transform:translate(2px,2px);}input.guilibcheckbox:checked::before{transform:translate(22px,2px);}input.guilibcheckbox:checked{background-color:var(--color);border:1px var(--color) solid;}input.guilibcheckbox.disabled,input.guilibcheckbox.disabled:checked{background-color:var(--background-9);}input.guilibcheckbox.disabled::before,input.guilibcheckbox.disabled:checked::before{background-color:var(--background-6);}'));
    style.classList.add("ffgl-stylings-main");
    document.head.append(style);
  }
  mode = mode == "light" ? "light" : "dark";
  style = style || {
    primary: [
      "#dbeafe",
      "#bfdbfe",
      "#93c5fd",
      "#60a5fa",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8",
      "#1e40af",
      "#1e3a8a",
    ],
    background:
      mode == "light"
        ? [
            "#f9f9f9",
            "#f7f7f7",
            "#f9fafa",
            "#f3f4f6",
            "#e5e7eb",
            "#d1d5db",
            "#9ca3af",
            "#fff",
            "#fff",
          ]
        : [
            "#f5f5f5",
            "#e5e5e5",
            "#d4d4d4",
            "#a3a3a3",
            "#737373",
            "#525252",
            "#404040",
            "#262626",
            "#171717",
          ],
    text: mode == "light" ? ["#000", "#525151"] : ["#fff", "#525151"],
    blue: [
      "#dbeafe",
      "#bfdbfe",
      "#93c5fd",
      "#60a5fa",
      "#3b82f6",
      "#2563eb",
      "#1d4ed8",
      "#1e40af",
      "#1e3a8a",
    ],
    red: [
      "#fee2e2",
      "#fecaca",
      "#fca5a5",
      "#f87171",
      "#ef4444",
      "#dc2626",
      "#b91c1c",
      "#991b1b",
      "#7f1d1d",
    ],
    yellow: [
      "#fef9c3",
      "#fef08a",
      "#fde047",
      "#facc15",
      "#eab308",
      "#ca8a04",
      "#a16207",
      "#854d0e",
      "#713f12",
    ],
    orange: [
      "#ffedd5",
      "#fed7aa",
      "#fdba74",
      "#fb923c",
      "#f97316",
      "#ea580c",
      "#c2410c",
      "#9a3412",
      "#7c2d12",
    ],
    green: [
      "#dcfce7",
      "#bbf7d0",
      "#86efac",
      "#4ade80",
      "#22c55e",
      "#16a34a",
      "#15803d",
      "#166534",
      "#14532d",
    ],
    purple: [
      "#f3e8ff",
      "#e9d5ff",
      "#d8b4fe",
      "#c084fc",
      "#a855f7",
      "#9333ea",
      "#7e22ce",
      "#6b21a8",
      "#581c87",
    ],
  };

  createContext({ mode, style }, "selectedColorTheme");
  await new Promise((r) => setTimeout(r, 0));
  document.body.style.color = style.text[0];
  document.body.style.backgroundColor = style.background[8];

  return html`
  ${h(
    "style",
    {},
    `:root{--purple-1:${style.purple[0]};--purple-2:${style.purple[1]};--purple-3:${style.purple[2]};--purple-4:${style.purple[3]};--purple-5:${style.purple[4]};--purple-6:${style.purple[5]};--purple-7:${style.purple[6]};--purple-8:${style.purple[7]};--purple-9:${style.purple[8]};--green-1:${style.green[0]};--green-2:${style.green[1]};--green-3:${style.green[2]};--green-4:${style.green[3]};--green-5:${style.green[4]};--green-6:${style.green[5]};--green-7:${style.green[6]};--green-8:${style.green[7]};--green-9:${style.green[8]};--orange-1:${style.orange[0]};--orange-2:${style.orange[1]};--orange-3:${style.orange[2]};--orange-4:${style.orange[3]};--orange-5:${style.orange[4]};--orange-6:${style.orange[5]};--orange-7:${style.orange[6]};--orange-8:${style.orange[7]};--orange-9:${style.orange[8]};--yellow-1:${style.yellow[0]};--yellow-2:${style.yellow[1]};--yellow-3:${style.yellow[2]};--yellow-4:${style.yellow[3]};--yellow-5:${style.yellow[4]};--yellow-6:${style.yellow[5]};--yellow-7:${style.yellow[6]};--yellow-8:${style.yellow[7]};--yellow-9:${style.yellow[8]};--red-1:${style.red[0]};--red-2:${style.red[1]};--red-3:${style.red[2]};--red-4:${style.red[3]};--red-5:${style.red[4]};--red-6:${style.red[5]};--red-7:${style.red[6]};--red-8:${style.red[7]};--red-9:${style.red[8]};--blue-1:${style.blue[0]};--blue-2:${style.blue[1]};--blue-3:${style.blue[2]};--blue-4:${style.blue[3]};--blue-5:${style.blue[4]};--blue-6:${style.blue[5]};--blue-7:${style.blue[6]};--blue-8:${style.blue[7]};--blue-9:${style.blue[8]};--background-1:${style.background[0]};--background-2:${style.background[1]};--background-3:${style.background[2]};--background-4:${style.background[3]};--background-5:${style.background[4]};--background-6:${style.background[5]};--background-7:${style.background[6]};--background-8:${style.background[7]};--background-9:${style.background[8]};--primary-1:${style.primary[0]};--primary-2:${style.primary[1]};--primary-3:${style.primary[2]};--primary-4:${style.primary[3]};--primary-5:${style.primary[4]};--primary-6:${style.primary[5]};--primary-7:${style.primary[6]};--primary-8:${style.primary[7]};--primary-9:${style.primary[8]};--text-1:${style.text[0]};--text-2:${style.text[1]};}`
  )}
  ${children}`;
}
