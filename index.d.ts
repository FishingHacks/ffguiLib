interface Style {
  primary: Array<string>;
  background: Array<string>;
  text: Array<string>;
  blue: Array<string>;
  red: Array<string>;
  yellow: Array<string>;
  orange: Array<string>;
  green: Array<string>;
  purple: Array<string>;
}

declare function Notification (
  props: {
    title: string;
    content: string;
    color: "blue" | "red" | "orange" | "green" | "yellow" | "purple" = "blue";
    timeout: number = 1000;
    calledfromctx?: boolean;
    onClose?: (n: Notification) => void;
    onOpen?: (n: Notification) => void;
    id?: number;
    icon?: string;
    close?: boolean;
    style?: Style;
    [name: string]: any;
  },
  childs: Array<any | string>
): void;

declare function NotificationProvider (props: {}, childs: Array<any | string>): void;

declare function useNotification (payload: {
  title: string;
  content: string;
  color: "blue" | "red" | "orange" | "green" | "yellow" | "purple" = "blue";
  timeout: number = 1000;
  calledfromctx?: boolean;
  onClose?: (n: Notification) => void;
  onOpen?: (n: Notification) => void;
  id?: number;
  icon?: string;
  close?: boolean;
  style?: Style;
  [name: string]: any;
}): void;

declare function updateNotification (payload: {
  id: number;
  payload: {
    title: string;
    content: string;
    color: "blue" | "red" | "orange" | "green" | "yellow" | "purple" = "blue";
    timeout: number = 1000;
    calledfromctx?: boolean;
    onClose?: (n: Notification) => void;
    onOpen?: (n: Notification) => void;
    icon?: string;
    close?: boolean;
    style?: Style;
    [name: string]: any;
  };
}): void;

declare function StyleProvider (
  props: { style: Style; mode: "dark" | "light" },
  childs: Array<any | string>
): void;

type onetonine = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

type zerotonine = "0" | `${onetonine}`;

type radius =
  | `${onetonine}${zerotonine}px`
  | `${onetonine}${zerotonine}%`
  | "100%"
  | `${onetonine}${zerotonine}rem`
  | `${onetonine}${zerotonine}em`
  | `${zerotonine}px`
  | `${zerotonine}%`
  | `${zerotonine}rem`
  | `${zerotonine}em`
  | "100px"
  | "100rem"
  | "100em";

declare function Button (
  props: {
    cls?: string | Array<string>;
    radius?: radius = "4px";
    disabled?: boolean;
    compact?: boolean;
    upperCase?: boolean;
    variant?: "light" | "outline" | "subtle" | "filled" = "filled";
    color?: "blue" | "red" | "orange" | "green" | "yellow" | "purple" = "blue";
    style: Style;
    [name: string]: any;
  },
  childs: Array<any | string>
): void;

declare function Checkbox (
  props: {
    color?: "blue" | "red" | "orange" | "green" | "yellow" | "purple" = "blue";
    checked?: boolean;
    cls?: string | Array<string>;
    disabled?: boolean;
    [name: string]: any;
  },
  children: Array<any | string>
): void;

export {
  Notification,
  NotificationProvider,
  useNotification,
  updateNotification,
  StyleProvider,
  Button,
  Checkbox
};