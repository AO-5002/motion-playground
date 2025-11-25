import { ModalPage } from "@/components/DayOne/ModalPage";
import Block from "@/components/components";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="row-start-2">{children}</div>
    </div>
  );
}

export default function Home() {
  return (
    <Layout>
      <Block />
    </Layout>
  );
}
