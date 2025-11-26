"use client";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { Check, TriangleAlert, Bug } from "lucide-react";

enum TNews {
  GOOD,
  WARNING,
  BAD,
}

interface INotification {
  news: TNews;
  notif: string;
}

interface INotificationStack {
  notifications: INotification[];
}

function Notification({ news, notif }: INotification) {
  function EmojiFunct() {
    return (
      <>
        {(() => {
          switch (news) {
            case TNews.GOOD:
              return <Check size={24} color="lime" className="font-bold" />;
            case TNews.WARNING:
              return <TriangleAlert size={24} />;
            case TNews.BAD:
              return <Bug size={24} color="red" className="font-bold" />;
            default:
              return null;
          }
        })()}
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, x: 200 }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        transition: { duration: 0.3 },
      }}
      exit={{ opacity: 0, x: -200, transition: { duration: 0.2 } }}
      className="w-112 h-18 text-white rounded-xl bg-zinc-800 flex flex-row items-center justify-between p-4"
    >
      <div className="w-full flex flex-row items-center gap-8">
        <EmojiFunct />
        <p className="text-base font-bold text-wrap line-clamp-2">{notif}</p>
      </div>
      <motion.div whileHover={{ scale: 1.5 }}>
        <X size={16} color="white" />
      </motion.div>
    </motion.div>
  );
}

function NotificationStack({ notifications }: INotificationStack) {
  return (
    <>
      <div className="relative w-full h-full ">
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {notifications.map((el, i) => (
              <Notification key={i} {...el} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

const data: INotification[] = [
  { news: TNews.GOOD, notif: "Account Successfully Updated!" },
  { news: TNews.BAD, notif: "Issue with Connection!" },
];

export { NotificationStack, data };
