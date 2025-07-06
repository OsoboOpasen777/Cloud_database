// app/layout.tsx

export const metadata = {
  title: 'KPI Dashboard',
  description: 'Панель управления показателями',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body style={{ margin: 0, fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
