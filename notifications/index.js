import { useContext } from "/framework";

import notification from "./components/notification.js";
import NotificationProvider from "./components/notificationprovider.js";

function useNotification(payload) {
  useContext("notificationProvider")({ type: "ADD_NOTIFICATION", payload });
}

function updateNotification({
  id, payload
}) {
  useContext("notificationProvider")({type: "EDIT_NOTIFICATION", payload: {id, editedObject: payload}})
}

export { notification, NotificationProvider, useNotification, updateNotification };
