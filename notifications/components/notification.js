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
  close = close == false ? false : true;

  if (!id) calledfromctx = false;

  if (!calledfromctx && !onClose) {
    timeout = -1;
  }

  switch (icon) {
    case "checkmark":
    case "complete":
      icon = html`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M18.047,4,22,8.325,9.3,20,2,12.68,6.136,8.533,9.474,11.88Z"
        />
      </svg>`;
      break;
    default:
      icon = icon || undefined;
  }

  if (!close) {
    icon = html`<svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="40px"
      height="40px"
      viewBox="0 0 50 50"
      style="enable-background:new 0 0 50 50;"
      xml:space="preserve"
    >
      <path
        fill="currentColor"
        d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 25 25"
          to="360 25 25"
          dur="0.6s"
          repeatCount="indefinite"
        ></animateTransform>
      </path>
    </svg>`;
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
    style = style(useContext("selectedColorTheme")?.style);

  return html`
    <div
      class="notification ${color}${icon ? " icon" : ""}"
      ref=${ref}
      ...${style ? { style: style } : {}}
      ...${other}
    >
      ${icon
        ? html`<div
            class="icon"
            style="--currentColor: ${useContext("selectedColorTheme")?.style
              ? useContext("selectedColorTheme")?.style[color][5]
              : color == "orange"
              ? "#f08c00"
              : color == "green"
              ? "#048304"
              : color == "purple"
              ? "#891aa5"
              : color}; --color: var(--currentColor); --col: var(--color); --curcol: var(--col); color: var(--col); fill: var(--col);"
          >
            ${icon}
          </div>`
        : []}
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
