import React from 'react'
import { createRoute } from '@tanstack/react-router';
import { rootRoute } from '../main';

const Hero = () => {
  return (
    <div>
      Hero
    </div>
  );
};

export const heroRoute = createRoute({
    getParentRoute: () => rootRoute,
    path:'/hero',
    component: Hero,
});

export default Hero;
