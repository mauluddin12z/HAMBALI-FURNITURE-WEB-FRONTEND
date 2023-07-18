/* eslint-disable @next/next/no-page-custom-font */ import FooterSection from "./components/FooterSection";
import HeaderSection from "./components/HeaderSection";
import "./globals.css";

export const metadata = {
  title: "Hambali Furniture",
  description: "Hambali Furniture",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body>
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
      </body>
    </html>
  );
}
