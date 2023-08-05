import FooterSection from "./FooterSection";
import HeaderSection from "./HeaderSection";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <section>
          <HeaderSection />
        </section>
        {children}
      </div>
      <div className="mt-28">
        <section>
          <FooterSection />
        </section>
      </div>
    </div>
  );
}
