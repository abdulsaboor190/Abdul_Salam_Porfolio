import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import FeaturedProject from './components/FeaturedProject';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import BackToTop from './components/BackToTop';
import ScrollProgress from './components/ScrollProgress';
import './index.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <FeaturedProject />
        <Projects />
        <About />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </ThemeProvider>
  );
}

export default App;
