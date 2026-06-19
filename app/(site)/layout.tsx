import ScrollToTop from "@/components/ScrollToTop";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AmbientBackground } from "@/components/AmbientBackground";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollToTop />
      <AmbientBackground />
      <div className="flex min-h-screen w-full max-w-[1400px] flex-col mx-auto">
        <Navbar />
        <main className="flex-1 w-full pt-[5.5rem] md:pt-24">
          <div className="min-h-screen w-full overflow-x-hidden">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  );
}
