import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlatformIntro from './components/PlatformIntro';
import OurProcess from './components/OurProcess';
import Categories from './components/Categories';
import SmartBazar from './components/SmartBazar';
import WeeklyBazaar from './components/WeeklyBazaar';
import Catering from './components/Catering';
import Sponsors from './components/Sponsors';
import AboutUs from './components/AboutUs';
import DownloadCTA from './components/DownloadCTA';
import PaymentSandbox from './components/PaymentSandbox';


function MainApp() {
  if (window.location.hash === '#payment-sandbox') {
    return <PaymentSandbox />;
  }

  return (
    <div style={{ minHeight: '100dvh', backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <Navbar />
      <main>
        <Hero />
        <PlatformIntro />
        <OurProcess />
        <Categories />
        <SmartBazar />
        <WeeklyBazaar />
        <Catering />
        <Sponsors />
        <AboutUs />
      </main>
      <DownloadCTA />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <MainApp />
      </LanguageProvider>
    </ThemeProvider>
  );
}
