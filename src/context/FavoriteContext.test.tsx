import { render, act } from '@testing-library/react';
import { FavoriteProvider, useFavorite } from './FavoriteContext';
import { CartItem } from '../types/CartItem';

const TestComponent = () => {
  const { favorites, toggleFavorite } = useFavorite();
  const item: CartItem = { id: 1, title: 'Test Product', price: 10, image: 'test.jpg', quantity: 1 };

  return (
    <>
      <button onClick={() => toggleFavorite(item)}>Toggle Favorite</button>
      <ul>
        {favorites.map((fav) => (
          <li key={fav.id}>{fav.title}</li>
        ))}
      </ul>
    </>
  );
};

describe('FavoriteContext', () => {
  it('should add an item to the favorites', () => {
    const { getByText, queryByText } = render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>
    );

    expect(queryByText(/Test Product/)).toBeNull();

    act(() => {
      getByText('Toggle Favorite').click();
    });

    expect(getByText('Test Product')).toBeInTheDocument();
  });

  it('should remove an item from the favorites when toggled again', () => {
    const { getByText, queryByText } = render(
      <FavoriteProvider>
        <TestComponent />
      </FavoriteProvider>
    );

    act(() => {
      getByText('Toggle Favorite').click();
    });

    expect(getByText('Test Product')).toBeInTheDocument();

    act(() => {
      getByText('Toggle Favorite').click();
    });

    expect(queryByText('Test Product')).toBeNull();
  });
});
