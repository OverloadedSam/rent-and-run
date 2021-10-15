import React from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';

function withRouterProps(Component) {
  const newComponent = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const searchParams = useSearchParams();

    return (
      <Component
        {...props}
        location={location}
        navigate={navigate}
        params={params}
        searchParams={searchParams}
      />
    );
  };

  return newComponent;
}

export default withRouterProps;
