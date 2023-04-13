import "./globals.css";

export const metadata = {
  title: "Siege singles",
  description: "Hot rainbow six siege haters in your bombsite.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-main text-secondary">{children}</body>
    </html>
  );
}
