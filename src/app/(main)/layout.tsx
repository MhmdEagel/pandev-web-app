import Navbar from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/sonner";

export default function HomeLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <Toaster />
      <Navbar />
      {children}
    </>
  );
}
