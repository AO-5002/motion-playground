"use client";
import React, { useState } from "react";
import { NotificationStack } from "./components";
import { INotification, TNews } from "./components";

const data: INotification[] = [
  { news: TNews.GOOD, notif: "Account Successfully Updated!" },
  // { news: TNews.BAD, notif: "Issue with Connection!" },
];

function Toast() {
  const [dataNotif, setDataNotif] = useState(data);
  return <NotificationStack notifications={dataNotif} setData={setDataNotif} />;
}

export default Toast;
