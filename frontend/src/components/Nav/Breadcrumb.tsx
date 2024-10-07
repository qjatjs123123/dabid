import React from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbPath {
  name: string;
  link: string;
}

interface BreadcrumbProps {
  paths: BreadcrumbPath[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ paths }) => {
  return (
    <nav className="mx-5">
      {paths.map((path, index) => (
        <span key={index}>
          {index > 0 && <span> {' > '} </span>}
          <Link to={path.link}>{path.name}</Link>
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
