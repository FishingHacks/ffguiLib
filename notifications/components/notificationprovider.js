import notification from "./notification.js";
import { createContext, useReducer, useContext, html, h } from "/framework";

export default function NotificationProvider(props, children) {
  if (document.head.getElementsByClassName("ffgl-stylings-notifications").length < 1) {
    const style = document.createElement("style");
    style.append(document.createTextNode('.GUILibTextbox{border:none;padding:10px;padding-left:20px;padding-right:20px;color:var(--text-1);cursor:text;}.GUILibTextbox.compact{padding:5px;}.GUILibTextbox.disabled{cursor:not-allowed;}.GUILibTextbox.filled{background-color:var(--background-7);}.GUILibTextbox.outline{border:1px solid var(--background-7);background-color:inherit;}.GUILibTextbox:focus,.GUILibTextbox:focus-within{outline:0px;border:1px solid var(--bg);}.GUILibTextbox.subtle{color:var(--text-1);background-color:#0000;}.GUILibButton{border:none;padding:10px;padding-left:20px;padding-right:20px;color:var(--text-1);font-weight:bold;cursor:pointer;}.GUILibButton.compact{padding:5px;}.GUILibButton:not(.disabled):active{transform:translateY(1px);}.GUILibButton.disabled{cursor:not-allowed;}.GUILibButton.filled{background-color:var(--bg);}.GUILibButton.outline{border:1px solid var(--bg);background-color:inherit;}.GUILibButton.outline:active{transform:translateY(1px);}.GUILibButton.outline:focus,.GUILibButton.outline:hover,.GUILibButton.outline:active{background-color:var(--bga);}.GUILibButton.light{background-color:var(--bga);}.GUILibButton.light:focus,.GUILibButton.light:hover,.GUILibButton.light:active{background-color:var(--bgb);}.GUILibButton.subtle{color:var(--bg);background-color:inherit;}.GUILibButton:hover,.GUILibButton:focus,.GUILibButton:active{background-color:var(--bga);}input.guilibcheckbox{width:41px;height:21px;cursor:pointer;display:flex;border-radius:50px;appearance:none;border:1px #444 solid;background-color:var(--background-9);}input.guilibcheckbox::before{content:"";border-radius:50%;background-color:var(--text-1);width:15px;height:15px;transform:translate(2px,2px);}input.guilibcheckbox:checked::before{transform:translate(22px,2px);}input.guilibcheckbox:checked{background-color:var(--color);border:1px var(--color) solid;}input.guilibcheckbox.disabled,input.guilibcheckbox.disabled:checked{background-color:var(--background-9);}input.guilibcheckbox.disabled::before,input.guilibcheckbox.disabled:checked::before{background-color:var(--background-6);}'));
    style.classList.add("ffgl-stylings-main");
    document.head.append(style);
  }



  const [notifications, dispatch] = useReducer((state, action) => {
    if (!action.type || !action.payload) return state;
    let payload = action.payload;
    if (typeof action.type != "string") return state;
    switch (action.type) {
      case "DELETE_NOTIFICATION":
        if (payload.onClose && state.find((el) => el.id == payload.id))
          payload.onClose(payload.id);
        if (payload.id) return state.filter((el) => el.id != payload.id);
        else return state;
      case "ADD_NOTIFICATION":
        if (!payload.content || typeof payload.content != "string") {
          return state;
        }
        const id = payload.id || createID();
        if (payload.onopen) payload.onopen(id);
        if (payload.onOpen) payload.onOpen(id);
        return [
          ...state,
          {
            content: payload.content,
            title: payload.title || "",
            color: payload.color || "blue",
            timeout: payload.timeout || -1,
            onClose: payload.onClose || payload.onclose || (() => {}),
            icon: payload.icon || undefined,
            id,
            close: payload.close != false ? true : false,
            style: payload.style,
          },
        ];
      case "EDIT_NOTIFICATION":
        if (!payload.id) return state;
        return state.map((el) =>
          el.id == payload.id ? { ...el, ...payload.editedObject } : el
        );
      default:
        console.error(action, "was not registered to be valid")
        return state;
    }
  }, []);

  let theme = useContext("selectedColorTheme");
  theme = theme ? { ...theme.style, mode: theme.mode } : undefined;

  createContext(dispatch, "notificationProvider");

  return html`
    ${h(
      "style",
      {},
      `.notification {position: relative;padding: 10px 5px 10px 22px;border-radius: 7px;${
        theme
          ? theme.mode == "dark"
            ? ""
            : "box-shadow: 5px 5px 5px #635d5d"
          : "box-shadow: 5px 5px 5px #635d5d"
      };background-color: ${
        theme ? theme.background[7] : "#d4d4d4"
      };width: fit-content;height: fit-content;min-width: 440px;max-width: 500px;margin: 26px 7px 7px 16px;pointer-events: all;overflow-x: hidden;flex-direction: row;display: flex;right: 16px;bottom: 16px;z-index: 10000;}.notification .title {font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";color: ${
        theme ? theme.text[0] : "#000"
      };}.notification .content {font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";color: ${
        theme ? theme.text[1] : "#525151"
      };line-break: strict;}.notification::before {content: "";display: block;position: absolute;width: 7px;top: 5px;bottom: 5px;left: 4px;border-radius: 3px;}@keyframes popout {0% {right: 0%;}100% {right: -100%;}}.notification.close {animation: popout 0.4s;right: -110%;}.notification button.close-btn {width: 28px;height: 28px;display: flex;background-color: #0000;border: none;cursor: pointer;border-radius: 4px;justify-content: center;align-items: center;right: 10px;top: 10px;position: absolute;color: ${
        theme ? theme.text[0] : "#000"
      };}.notification button.close-btn:hover {background-color: ${
        theme ? theme.background[6] : "#f1f1f1"
      };}.notification button.close-btn:active {background-color: ${
        theme ? theme.background[6] : "#f1f1f1"
      };transform: translateY(1px);}.notification.blue::before {background-color: ${
        theme ? theme.blue[5] : "#00f"
      };}.notification.red::before {background-color: ${
        theme ? theme.red[5] : "#f00"
      };}.notification.yellow::before {background-color: ${
        theme ? theme.yellow[5] : "#fe0"
      };}.notification.orange::before {background-color: ${
        theme ? theme.orange[5] : "#f08c00"
      };}.notification.green::before {background-color: ${
        theme ? theme.red[5] : "#048304"
      };}.notification.purple::before {background-color: ${
        theme ? theme.red[5] : "#891aa5"
      };}.notification.icon::before {display: none;}.notification.icon {padding: 10px 5px 10px 7px;min-width: 453px;}.notification .body {margin-left: 5px;display: flex;flex-direction: column;}.notification .icon * {width: 40px;height: 40px;min-width: 40px;min-height: 40px;max-width: 40px;max-height: 40px;}`
    )}
    <div
      class="notification-provider"
      style="overflow-x: hidden; position: fixed; width: fit-content; height: fit-content; bottom: 0px; right: 0px; pointer-events: none;"
    >
      ${notifications
        .slice(0, 5)
        .map(
          (el) => html`
            <${notification}
              title=${el.title}
              content=${el.content}
              color=${el.color}
              timeout=${el.timeout}
              calledfromctx=${true}
              onClose=${el.onClose}
              onOpen=${el.onOpen}
              id=${el.id}
              icon=${el.icon}
              close=${el.close}
              ...${el.style ? { style: el.style } : {}}
            />
          `
        )}
    </div>
    ${children}
  `;
}

function createID() {
  const contains = Object.values(
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
  );
  let id = "";
  for (let i = 0; i < 30; i++) {
    id += contains[Math.floor(Math.random() * contains.length)];
  }
  return id;
}
