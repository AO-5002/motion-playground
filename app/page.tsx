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

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative font-mono flex items-center justify-center min-h-screen p-8">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <ChessboardPage />
    </Layout>
  );
}
