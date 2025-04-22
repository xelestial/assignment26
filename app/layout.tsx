// app/layout.tsx
import './globals.css'; // Tailwind 전역 스타일

export const metadata = {
  title: 'Assignment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
