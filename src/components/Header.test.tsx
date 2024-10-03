import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header';

jest.mock('./CartDropdown', () => () => <div>Cart Dropdown</div>);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

describe('Header', () => {
  const mockSetSearchQuery = jest.fn();
  const searchQuery = 'phone';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the header with links, search input, and icons', () => {
    render(
      <Router>
        <Header searchQuery={searchQuery} setSearchQuery={mockSetSearchQuery} />
      </Router>
    );

    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Categories')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Project Logo/i })).toBeInTheDocument();
    expect(screen.getByText('Ecommerce')).toBeInTheDocument();
    expect(screen.getByText('Ecommerce')).toHaveAttribute('href', '/');
  });

  it('should handle search input changes', () => {
    render(
      <Router>
        <Header searchQuery={searchQuery} setSearchQuery={mockSetSearchQuery} />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'laptop' } });

    expect(mockSetSearchQuery).toHaveBeenCalledWith('laptop');
  });

  it('should open and close the cart dropdown when clicking the cart icon', () => {
    render(
      <Router>
        <Header searchQuery={searchQuery} setSearchQuery={mockSetSearchQuery} />
      </Router>
    );

    const cartIcon = screen.getByRole('img', { hidden: true });

    expect(screen.queryByText('Cart Dropdown')).not.toBeInTheDocument();

    fireEvent.click(cartIcon);
    expect(screen.getByText('Cart Dropdown')).toBeInTheDocument();

    fireEvent.click(cartIcon);
    expect(screen.queryByText('Cart Dropdown')).not.toBeInTheDocument();
  });

  it('should close the cart dropdown when clicking outside', () => {
    render(
      <Router>
        <Header searchQuery={searchQuery} setSearchQuery={mockSetSearchQuery} />
      </Router>
    );

    const cartIcon = screen.getByRole('img', { hidden: true });
    
    fireEvent.click(cartIcon);
    expect(screen.getByText('Cart Dropdown')).toBeInTheDocument();

    fireEvent.mouseDown(document);
    expect(screen.queryByText('Cart Dropdown')).not.toBeInTheDocument();
  });

  it('should navigate to the user page when clicking the user icon', () => {
    const mockNavigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockNavigate,
    }));

    render(
      <Router>
        <Header searchQuery={searchQuery} setSearchQuery={mockSetSearchQuery} />
      </Router>
    );

    const userIcon = screen.getByRole('img', { hidden: true });

    fireEvent.click(userIcon);
    expect(mockNavigate).toHaveBeenCalledWith('/user');
  });
});
