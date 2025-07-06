export const metadata = {
  title: "KPI Dashboard",
  description: "Мониторинг показателей",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head />
      <body>{children}</body>
    </html>
  );
}
