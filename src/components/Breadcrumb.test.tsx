import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Breadcrumb from './Breadcrumb';

describe('Breadcrumb component', () => {
  it('renders the breadcrumb with correct items', () => {
    render(
      <MemoryRouter initialEntries={['/categories/electronics']}>
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/categories/electronics" element={<div>Electronics</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
  });

  it('navigates to the home page when clicking on Home', () => {
    const navigate = jest.fn();
    
    render(
      <MemoryRouter initialEntries={['/categories/electronics']}>
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/categories/electronics" element={<div>Electronics</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Home'));
    
    expect(navigate).toHaveBeenCalledWith('/');
  });

  it('navigates to the correct path when clicking on other breadcrumbs', () => {
    const navigate = jest.fn();

    render(
      <MemoryRouter initialEntries={['/categories/electronics']}>
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/categories" element={<div>Categories</div>} />
          <Route path="/categories/electronics" element={<div>Electronics</div>} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Categories'));

    expect(navigate).toHaveBeenCalledWith('/categories');
  });
});
