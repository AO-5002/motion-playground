import { ModalPage } from "@/components/DayOne/ModalPage";
import {
  Block,
  Block2,
  AnimatedList,
  KeyFrameBlock,
} from "@/components/components";
import Toast from "@/components/DayTwo/Toast";
import ListItems from "@/components/DayThree/layout";
import ChessboardPage from "@/components/DayFour/Pragmatic";
import GridPage from "@/components/DayFive/GridPage";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono w-full min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <div className="w-2/3 h-[500px]">
        <GridPage />
      </div>
    </Layout>
  );
}
