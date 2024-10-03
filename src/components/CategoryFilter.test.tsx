import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';
import { fetchCategories } from '../services/productService';
import { useFavorite } from '../context/FavoriteContext';

jest.mock('../services/productService', () => ({
  fetchCategories: jest.fn(),
}));

jest.mock('../context/FavoriteContext', () => ({
  useFavorite: jest.fn(),
}));

const mockFetchCategories = fetchCategories as jest.Mock;
const mockUseFavorite = useFavorite as jest.Mock;

describe('CategoryFilter', () => {
  const mockOnCategoryChange = jest.fn();
  const selectedCategories = ['electronics'];

  const setupMocks = () => {
    mockFetchCategories.mockResolvedValue(['electronics', 'jewelery', 'men clothing']);
    mockUseFavorite.mockReturnValue({ favorites: [{ id: 1, title: 'Favorite Product' }] });
  };

  beforeEach(() => {
    setupMocks();
    jest.clearAllMocks();
  });

  it('should render categories fetched from the API', async () => {
    render(<CategoryFilter selectedCategories={selectedCategories} onCategoryChange={mockOnCategoryChange} />);

    await waitFor(() => {
      expect(screen.getByText('Electronics')).toBeInTheDocument();
      expect(screen.getByText('Jewelery')).toBeInTheDocument();
      expect(screen.getByText('Men Clothing')).toBeInTheDocument();
      expect(screen.getByText('Favorites (1)')).toBeInTheDocument();
    });
  });

  it('should toggle category selection', async () => {
    render(<CategoryFilter selectedCategories={selectedCategories} onCategoryChange={mockOnCategoryChange} />);

    await waitFor(() => expect(screen.getByText('Electronics')).toBeInTheDocument());

    const jeweleryCheckbox = screen.getByLabelText('Jewelery');
    fireEvent.click(jeweleryCheckbox);

    expect(mockOnCategoryChange).toHaveBeenCalledWith([...selectedCategories, 'jewelery']);

    const electronicsCheckbox = screen.getByLabelText('Electronics');
    fireEvent.click(electronicsCheckbox);

    expect(mockOnCategoryChange).toHaveBeenCalledWith([]);
  });

  it('should display the correct number of favorite items', async () => {
    render(<CategoryFilter selectedCategories={selectedCategories} onCategoryChange={mockOnCategoryChange} />);

    await waitFor(() => {
      expect(screen.getByText('Favorites (1)')).toBeInTheDocument();
    });
  });

  it('should handle an empty categories list', async () => {
    mockFetchCategories.mockResolvedValueOnce([]);
    
    render(<CategoryFilter selectedCategories={[]} onCategoryChange={mockOnCategoryChange} />);

    await waitFor(() => {
      expect(screen.getByText('Favorites (1)')).toBeInTheDocument();
    });
  });
});
