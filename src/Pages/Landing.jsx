import React, { useEffect, useState, useRef } from 'react';
import landingball from '../assets/landingball.png';
import { useSpring, animated } from '@react-spring/web';
import { Link } from 'react-router-dom';
import { fetchPokemonData } from '../services/api';
import { Typewriter } from 'react-simple-typewriter';
import ColorThief from 'colorthief';

const Landing = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [stats, setStats] = useState([]);
  const [resetAnimation, setResetAnimation] = useState(true);
  const [ballAnimationTrigger, setBallAnimationTrigger] = useState(false);
  const [bgColor, setBgColor] = useState('rgb(15, 23, 42)');
  const imgRef = useRef(null);

  const ball = useSpring({
    from: { x: 0, scale: 0 },
    to: { x: ballAnimationTrigger ? 360 : 0, scale: 1 },
  });

  const { x, scale } = useSpring({
    from: { x: 200, scale: 0.5 },
    to: async (next) => {
      if (resetAnimation) {
        await next({ x: 200, scale: 0.5 });
        await next({ x: 0, scale: 0.9 });
        setResetAnimation(false);
      } else {
        await next({ x: 0, scale: 0.9 });
        await next({ x: 0, scale: 1 });
      }
    },
    config: { mass: 1, tension: 150, friction: 10 },
  });

  useEffect(() => {
    const loadImages = async () => {
      try {
        const { imageUrl, statsData } = await fetchPokemonData();
        setCurrentImage(imageUrl);
        setStats(statsData);

        const interval = setInterval(async () => {
          const { imageUrl, statsData } = await fetchPokemonData();
          setCurrentImage(imageUrl);
          setStats(statsData);
          setResetAnimation(true);
        }, 7000);

        return () => clearInterval(interval);
      } catch (error) {
        console.error(error);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    setBallAnimationTrigger((prev) => !prev);
  }, [currentImage]);

  const getColorFromImage = (imageElement) => {
    const colorThief = new ColorThief();
    if (imageElement && imageElement.complete) {
      return colorThief.getColor(imageElement);
    }
    return null;
  };

  useEffect(() => {
    if (imgRef.current) {
      const color = getColorFromImage(imgRef.current);
      if (color) {
        setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]}, 0.8)`);
      } else {
        imgRef.current.addEventListener('load', () => {
          const color = getColorFromImage(imgRef.current);
          if (color) {
            setBgColor(`rgb(${color[0]}, ${color[1]}, ${color[2]}, 0.8)`);
          }
        });
      }
    }
  }, [currentImage]);

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Dekorasi */}
      <div className="absolute inset-0 z-0 before:content-[''] before:block before:absolute before:inset-0 before:w-[180%] before:h-[30%] before:bg-white before:opacity-20 before:transform before:rotate-45 before:translate-x-[-60%] before:translate-y-[-60%]" />
      <div className="absolute inset-0 z-0 before:content-[''] before:block before:absolute before:inset-0 before:w-[180%] before:h-[30%] before:bg-white before:opacity-20 before:transform before:rotate-45 before:translate-x-[-60%] before:translate-y-[120%]" />
      <div className="absolute inset-0 z-0 before:content-[''] before:block before:absolute before:inset-0 before:w-[180%] before:h-[30%] before:bg-white before:opacity-20 before:transform before:-rotate-45 before:translate-x-[-60%] before:translate-y-[-60%]" />
      <div className="absolute inset-0 z-0 before:content-[''] before:block before:absolute before:inset-0 before:w-[180%] before:h-[30%] before:bg-white before:opacity-20 before:transform before:-rotate-45 before:translate-x-[-60%] before:translate-y-[120%]" />

      <animated.div
        className="z-10 flex justify-end w-full p-5 sm:p-10"
        style={{ x }}
      >
        {currentImage && (
          <animated.img
            ref={imgRef}
            src={currentImage}
            crossOrigin="anonymous"
            alt="Pokémon"
            className="w-16 h-16 sm:w-52 sm:h-52"
            style={{
              transform: scale.to((s) => `scale(${s})`),
            }}
          />
        )}
      </animated.div>

      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center text-center">
        <h1 className="mb-2 text-4xl font-bold text-white">
          Welcome to the Pokémon World!
        </h1>
        <p className="mb-6 text-lg text-white">
          <Typewriter
            words={[
              'Discover and explore various Pokémon. Get to know their stats and abilities!',
              'You can also explore other information such as games and evolution chains as well as other Pokemon accessories.',
            ]}
            loop={2}
            cursor
            cursorStyle="|"
            typeSpeed={70}
            deleteSpeed={50}
          />
        </p>

        <Link to={'/home'}>
          <button
            className="p-3 px-5 font-bold text-white rounded-md shadow"
            style={{ backgroundColor: bgColor }}
          >
            Explore
          </button>
        </Link>
      </div>

      <div className="absolute bottom-0 z-10 p-5 sm:p-10">
        <animated.img
          src={landingball}
          alt="ball"
          className="w-16 sm:w-32"
          style={{
            transform: ball.x.to(
              (value) => `rotateZ(${value}deg) scale(${ball.scale.get()})`
            ),
          }}
        />
      </div>

      <div className="absolute z-10 p-5 rounded shadow-lg bottom-10 right-10">
        {stats.map((stat) => (
          <div key={stat.stat.name} className="w-full max-w-xs mb-1">
            <label className="block text-xs text-white sm:text-sm">
              {stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}
            </label>
            <div className="h-1 bg-gray-200 border rounded-full">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(stat.base_stat / 255) * 100}%`,
                  backgroundColor: bgColor,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Landing;
