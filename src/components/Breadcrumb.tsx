import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Breadcrumb.css';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="breadcrumb">
      <ul className="flex items-center">
        <li>
          <span
            onClick={() => navigate('/')}
            className="breadcrumb-item"
          >
            Home
          </span>
        </li>
        {pathnames.length > 0 && (
          <li className="breadcrumb-separator"> {'>'} </li>
        )}

        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={to} className="flex items-center">
              {isLast ? (
                <span className="breadcrumb-item-current">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </span>
              ) : (
                <>
                  <span
                    onClick={() => navigate(to)}
                    className="breadcrumb-item"
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </span>
                  <li className="breadcrumb-separator">
                    {'>'}
                  </li>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
