import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorize } from './scripts.js';

function SafeRoute(props) {
  const POLLING_INTERVAL = 60000;
  const navigator = useNavigate();

  useEffect(() => {
    authorize(navigator, window.location.pathname);
    const intervalId = setInterval(() => {
      authorize(navigator, window.location.pathname);
    }, POLLING_INTERVAL);

    return () => clearInterval(intervalId);
  }, [window.location.pathname]);

  return <>{props.children}</>;
}

export default SafeRoute;