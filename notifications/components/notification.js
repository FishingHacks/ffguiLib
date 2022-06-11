import { useContext, html, useEffect } from "/framework";

export default function notification(props, children) {
  let {
    title,
    content,
    color,
    timeout,
    calledfromctx,
    onClose,
    onOpen,
    id,
    icon,
    close,
    style,
    ...other
  } = props;
  title = title || "";
  content = content || "";
  color = color || "blue";
  if (typeof timeout == "string") timeout = Number(timeout);
  timeout = timeout || 10000;
  calledfromctx = calledfromctx || false;
  icon = icon || undefined;
  close = close == false ? false : true;

  if (!id) calledfromctx = false;

  if (!calledfromctx && !onClose) {
    timeout = -1;
  }

  switch (color) {
    case "blue":
    case "red":
    case "yellow":
    case "orange":
    case "green":
      break;
    default:
      color = "purple";
  }

  const ref = { current: null };
  const closeRef = { current: null };

  useEffect(() => {
    if (!close) return;
    if (!calledfromctx && !onClose) return;
    let button = closeRef.current;
    if (!button) return console.error("Close button not found");

    const iconSvg = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    const iconPath = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );

    iconSvg.setAttribute("viewBox", "0 0 15 15");
    iconSvg.setAttribute("fill", "none");
    iconSvg.setAttribute("width", "16");
    iconSvg.setAttribute("height", "16");

    iconPath.setAttribute(
      "d",
      "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z"
    );
    iconPath.setAttribute("fill", "currentColor");
    iconPath.setAttribute("fill-rule", "evenodd");
    iconPath.setAttribute("clip-rule", "evenodd");

    iconSvg.appendChild(iconPath);

    button.appendChild(iconSvg);
  });

  if (timeout > 0 && close)
    useEffect(
      () =>
        setTimeout(() => {
          ref.current.classList.add("close");
          setTimeout(() => {
            if (!calledfromctx) onClose(id);
            if (calledfromctx)
              useContext("notificationProvider")({
                type: "DELETE_NOTIFICATION",
                payload: { id, onClose },
              });
          }, 400);
        }, timeout),
      0
    );

  if (typeof style == "function")
    style = style(useContext("selectedColorTheme").style);

  return html`
    <div
      class="notification ${color}${icon ? " icon" : ""}"
      ref=${ref}
      ...${style ? { style: style } : {}}
      ...${other}
    >
      ${icon ? html`<div class="icon">${icon}</div>` : []}
      <div class="body">
        <div class="title">${title}</div>
        <div class="content">
          ${content.split(/\\n|\n/).map((el) => html`${el}<br />`)}
        </div>
      </div>
      ${!calledfromctx && !onClose
        ? []
        : close
        ? html`<button
            onclick=${calledfromctx
              ? () => {
                  ref.current.classList.add("close");
                  setTimeout(() => {
                    if (!calledfromctx) onClose(id);
                    if (calledfromctx)
                      useContext("notificationProvider")({
                        type: "DELETE_NOTIFICATION",
                        payload: { id, onClose },
                      });
                  }, 400);
                }
              : () => {}}
            class="close-btn"
            ref=${closeRef}
          ></button>`
        : []}
    </div>
    ${children}
  `;
}
