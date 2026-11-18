import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Kaam Karao | On-Demand Verified Skilled & Unskilled Labor Platform',
  description:
    'Book police-verified plumbers, electricians, carpenters, painters, and daily wage helpers with upfront flat rates and guaranteed 30-minute doorstep dispatch.',
  keywords:
    'labor, skilled workers, plumber, electrician, carpenter, daily wage helper, painter, home repairs, Rewa, Indore, Bhopal',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
