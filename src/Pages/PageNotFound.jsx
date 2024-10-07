import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function PageNotFound() {
  const [time, setTime] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (time === 0) {
      navigate(-1);
    }
  }, [time, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-lg font-bold bg-gray-200 sm:text-xl lg:text-4xl">
      <div className="text-xl text-gray-900 sm:text-4xl lg:text-6xl">404</div>
      <div className="text-gray-500 font-poppins">Page Not Found</div>
      <div className="text-gray-500 font-poppins">
        Redirecting to the previous page in {time} sec
      </div>
    </div>
  );
}

export default PageNotFound;
