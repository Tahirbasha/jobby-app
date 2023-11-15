import { useNavigate } from 'react-router-dom';

export const CustomNavigate = (location, type) => {
  const navigate = useNavigate();
  if (type) {
      navigate(location, {replace: type});
    } else {
    navigate(location);
  }
  return <h1>t</h1>;
};