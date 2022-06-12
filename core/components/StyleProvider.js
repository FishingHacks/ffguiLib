import { createContext, html } from "/framework";

export default async function StyleProvider({ mode, style }, children) {
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

  return html`<style>
      .GUILibButton {
        border: none;
        padding: 10px;
        padding-left: 20px;
        padding-right: 20px;
        color: ${style.text[0]};
        font-weight: bold;
        cursor: pointer;
      }
      .GUILibButton.compact {
        padding: 5px;
      }
      .GUILibButton:not(.disabled):active {
        transform: translateY(1px);
      }
      .GUILibButton.disabled {
        cursor: not-allowed;
      }
      .GUILibButton.filled {
        background-color: var(--bg);
      }
      .GUILibButton.outline {
        border: 1px solid var(--bg);
        background-color: inherit;
      }
      .GUILibButton.outline:active {
        transform: translateY(1px);
      }
      .GUILibButton.outline:focus,
      .GUILibButton.outline:hover,
      .GUILibButton.outline:active {
        background-color: var(--bga);
      }
      .GUILibButton.light {
        background-color: var(--bga);
      }
      .GUILibButton.light:focus,
      .GUILibButton.light:hover,
      .GUILibButton.light:active {
        background-color: var(--bgb);
      }
      .GUILibButton.subtle {
        color: var(--bg);
        background-color: inherit;
      }
      .GUILibButton:hover,
      .GUILibButton:focus,
      .GUILibButton:active {
        background-color: var(--bga);
      }
      
      input.guilibcheckbox {
        width: 41px;
        height: 21px;
        cursor: pointer;
        display: flex;
        border-radius: 50px;
        appearance: none;
        border: 1px #444 solid;
        background-color: ${style.background[8]};
      }
      
      input.guilibcheckbox::before {
        content: "";
        border-radius: 50%;
        background-color: ${style.text[0]};
        width: 15px;
        height: 15px;
        transform: translate(2px, 2px);
      }
      
      input.guilibcheckbox:checked::before {
        transform: translate(22px, 2px);
      }
      
      input.guilibcheckbox:checked {
        background-color: var(--color);
        border: 1px var(--color) solid;
      }

      input.guilibcheckbox.disabled,
      input.guilibcheckbox.disabled:checked {
        background-color: ${style.background[8]}
      }

      input.guilibcheckbox.disabled::before,
      input.guilibcheckbox.disabled:checked::before {
        background-color: ${style.background[5]}
      }
      </style>
      ${children}`;
}
