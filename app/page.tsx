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
import { TutorialThreeFiber } from "@/components/DaySix/three-fiber-intro";
import CardGallery from "@/components/DaySix/CardGallery";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono w-full h-screen flex justify-center items-center">
      {children}
    </div>
  );
}

function ThreeJSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="bg-zinc-900 font-mono w-full h-screen flex justify-center items-center">
        {children}
      </div>
    </>
  );
}

function Layout2({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[url(/images/cool.png)] bg-cover bg-no-repeat font-mono w-full min-h-screen flex justify-center items-center">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <ThreeJSLayout>
      <TutorialThreeFiber />
    </ThreeJSLayout>
  );
}
