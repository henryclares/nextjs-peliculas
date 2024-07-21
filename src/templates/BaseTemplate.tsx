import { ReactNode } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

const BaseTemplate = (props: { children: ReactNode }) => {
  return (
    <div className="w-full text-gray-600 antialiased">
      <div className="mx-auto max-w-screen-lg">
        <header className="border-b border-gray-300">
          <Navbar />
        </header>

        <main>{props.children}</main>
        <Footer />
      </div>
    </div>
  );
};

export { BaseTemplate };
