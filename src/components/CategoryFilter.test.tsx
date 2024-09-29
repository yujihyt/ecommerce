import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CategoryFilter from './CategoryFilter';

const mockCategories = ['electronics', 'jewelery', 'men\'s clothing', 'women\'s clothing'];

jest.mock('../services/productService', () => ({
  fetchCategories: jest.fn(() => Promise.resolve(mockCategories)),
}));

describe('CategoryFilter Component', () => {
  test('renders categories and handles selection correctly', async () => {
    const mockOnCategoryChange = jest.fn();
    const selectedCategories: string[] = [];

    render(<CategoryFilter selectedCategories={selectedCategories} onCategoryChange={mockOnCategoryChange} />);

    expect(await screen.findByText('electronics')).toBeInTheDocument();
    expect(screen.getByText('jewelery')).toBeInTheDocument();
    expect(screen.getByText('men\'s clothing')).toBeInTheDocument();
    expect(screen.getByText('women\'s clothing')).toBeInTheDocument();
  });

  test('handles multi-category selection correctly', async () => {
    const mockOnCategoryChange = jest.fn();
    const selectedCategories: string[] = [];

    render(<CategoryFilter selectedCategories={selectedCategories} onCategoryChange={mockOnCategoryChange} />);

    const electronicsButton = await screen.findByText('electronics');
    const jeweleryButton = screen.getByText('jewelery');

    fireEvent.click(electronicsButton);
    expect(mockOnCategoryChange).toHaveBeenCalledWith(['electronics']);

    fireEvent.click(jeweleryButton);
    expect(mockOnCategoryChange).toHaveBeenCalledWith(['electronics', 'jewelery']);

    fireEvent.click(electronicsButton);
    expect(mockOnCategoryChange).toHaveBeenCalledWith(['jewelery']);
  });

  test('highlights selected categories', async () => {
    const mockOnCategoryChange = jest.fn();
    const selectedCategories = ['electronics'];

    render(<CategoryFilter selectedCategories={selectedCategories} onCategoryChange={mockOnCategoryChange} />);

    const electronicsButton = await screen.findByText('electronics');
    const jeweleryButton = screen.getByText('jewelery');

    expect(electronicsButton).toHaveClass('bg-blue-500');
    expect(jeweleryButton).not.toHaveClass('bg-blue-500');

    fireEvent.click(jeweleryButton);
    expect(mockOnCategoryChange).toHaveBeenCalledWith(['electronics', 'jewelery']);
  });
});
