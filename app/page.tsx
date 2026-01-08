import HeroSection from './components/home/hero-section';
import TrustBadges from './components/home/trust-badges';
import ValuePropositions from './components/home/value-propositions';
import ServicesOverview from './components/home/services-overview';
import TestimonialsSection from './components/home/testimonials-section';
import AboutLloyd from './components/home/about-lloyd';
import ServiceAreaMap from './components/home/service-area-map';
import FinalCTA from './components/home/final-cta';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="pt-20">
      <HeroSection />
      <TrustBadges />
      <ValuePropositions />
      <ServicesOverview />
      <TestimonialsSection />
      <AboutLloyd />
      <ServiceAreaMap />
      <FinalCTA />
    </div>
  );
}
