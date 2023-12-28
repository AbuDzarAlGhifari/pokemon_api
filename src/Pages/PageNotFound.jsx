import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

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
    <div className="bg-yellow-200 h-screen flex flex-col items-center justify-center text-lg sm:text-xl lg:text-4xl font-bold">
      <div className="text-xl sm:text-4xl lg:text-6xl text-red-700">404</div>
      <div className="text-orange-500 font-poppins">Page Not Found</div>
      <div className="text-orange-500 font-poppins">
        Redirecting to the previous page in {time} sec
      </div>
    </div>
  );
}

export default PageNotFound;
