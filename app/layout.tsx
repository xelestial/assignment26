
import './globals.css'; 
import { AppProvider } from './context/AppContext'
import { Header } from '@/components/Header';

export const metadata = {
  title: 'Assignment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className='dark'>
      <body className="min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <AppProvider>
        <Header />
          <div className="flex flex-col items-center justify-center min-h-screen">
            <div className="bg-darkgray shadow-md rounded-lg p-6 w-full max-w-md">
              {children}
            </div>
          </div>
        {children}
        </AppProvider>
      </body>
    </html>
  );
}
