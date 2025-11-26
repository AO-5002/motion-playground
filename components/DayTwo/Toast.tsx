import React from "react";
import { NotificationStack, data } from "./components";

function Toast() {
  return <NotificationStack notifications={data} />;
}

export default Toast;
