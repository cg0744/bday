import { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import SectionWrapper from './components/SectionWrapper';
import Section1 from './components/sections/Section1';
import Section2 from './components/sections/Section2';
import Section3 from './components/sections/Section3';

function App() {
  const [unlockedSection, setUnlockedSection] = useState(1);

  return (
    <main className="relative w-full bg-gradient-to-b from-primary to-rose-light font-sans overflow-x-hidden selection:bg-secondary selection:text-black text-gray-800">
      
      <FloatingHearts />
      
      {/* SECTION 1: The Greeting */}
      <SectionWrapper id="section-1" isUnlocked={unlockedSection >= 1} isSolved={unlockedSection > 1}>
        {({ scrollYProgress }) => (
          <Section1 scrollYProgress={scrollYProgress} setUnlockedSection={setUnlockedSection} />
        )}
      </SectionWrapper>

      {/* SECTION 2: Our Story Timeline */}
      <SectionWrapper id="section-2" isUnlocked={unlockedSection >= 2} isSolved={unlockedSection > 2}>
        {({ scrollYProgress }) => (
          <Section2 scrollYProgress={scrollYProgress} setUnlockedSection={setUnlockedSection} />
        )}
      </SectionWrapper>

      {/* SECTION 3: The Tulip Garden */}
      <SectionWrapper id="section-3" isUnlocked={unlockedSection >= 3} isSolved={false}>
        {({ scrollYProgress }) => (
          <Section3 scrollYProgress={scrollYProgress} />
        )}
      </SectionWrapper>

    </main>
  );
}

export default App;