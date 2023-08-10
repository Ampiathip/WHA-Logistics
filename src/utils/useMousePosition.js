import { useEffect, useState } from "react";

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [alert, setAlert] = useState(false);

  useEffect(() => {
    const setFromEvent = (e) => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);

// useEffect(() => {
//     const handleWindowClick = () => setAlert(false)
//     if(alert) {
//       window.addEventListener('click', handleWindowClick);
//       console.log('88888888888', alert);
//     } else {
//       window.removeEventListener('click', handleWindowClick)
//     }
//     return () => window.removeEventListener('click', handleWindowClick);
//   }, [alert, setAlert]);

  

  return position;
};