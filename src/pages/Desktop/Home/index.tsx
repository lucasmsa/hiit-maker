import React from 'react';
import LeftBar from '../../../components/Desktop/Home/LeftBar';
import MidSection from '../../../components/Desktop/Home/MidSection';
import { motion } from 'framer-motion/dist/framer-motion';
import WorkoutInformation from '../../../components/Desktop/Home/WorkoutInformation';
import { Container } from './styles';

const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Container>
        <LeftBar isHomePage />
        <MidSection />
        <WorkoutInformation />
      </Container>
    </motion.div>
  );
};

export default Home;
