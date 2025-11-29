import { ModalPage } from "@/components/DayOne/ModalPage";
import {
  Block,
  Block2,
  AnimatedList,
  KeyFrameBlock,
} from "@/components/components";
import Toast from "@/components/DayTwo/Toast";
import ListItems from "@/components/DayThree/layout";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="border font-mono grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="row-start-2">{children}</div>
    </div>
  );
}

export default function Home() {
  interface DataProps {
    name: string;
    price: string;
  }

  const data: DataProps[] = [
    {
      name: "item",
      price: "20",
    },
    {
      name: "item2",
      price: "20",
    },
    {
      name: "item3",
      price: "20",
    },
  ];

  return (
    <Layout>
      <ListItems dataContent={data} />
    </Layout>
  );
}
