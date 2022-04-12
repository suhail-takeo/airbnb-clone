import { FC } from 'react';
import Search from './Search';

const Hero: FC = () => {
  return (
    <div className="relative">
      <img
        style={{ height: '90vh', width: '100vw' }}
        src="/images/hero-image.webp"
        alt="Hero"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
        <Search />
      </div>
    </div>
  );
};

export default Hero;
