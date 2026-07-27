import "./globals.css";

export const metadata = {
  title: "PulseCRM Unified Inbox",
  description: "PulseCRM fake unified inbox prototype",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
