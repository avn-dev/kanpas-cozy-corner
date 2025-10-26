import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollToId = location.state?.scrollToId;
      
      if (scrollToId) {
        // Scrolle zu der angegebenen ID mit Header-Offset
        const element = document.getElementById(scrollToId);
        if (element) {
          // Header-Höhe ermitteln (ca. 80px auf Desktop, 72px auf Mobile)
          const headerHeight = window.innerWidth >= 768 ? 80 : 72;
          const elementPosition = element.offsetTop - headerHeight;
          
          window.scrollTo({ 
            top: elementPosition, 
            behavior: 'smooth' 
          });
        }
      } else if (location.state?.scrollToTop) {
        // Explizit nach oben scrollen
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Standard: Bei Seitenwechsel nach oben scrollen
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Verzögerung um sicherzustellen dass DOM-Elemente vorhanden sind
    const timeoutId = setTimeout(handleScroll, 150);

    return () => clearTimeout(timeoutId);
  }, [location.pathname, location.state]);

  return null;
};

export default ScrollToTop;