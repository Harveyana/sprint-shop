
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import Categories from '../components/categories';
import { useProducts } from '../contexts/ProductsContext';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the useProducts hook
jest.mock('../contexts/ProductsContext', () => ({
  useProducts: jest.fn(),
}));

describe('Categories Component', () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    (useProducts as jest.Mock).mockReturnValue({
      categories: [],
    });
  });

  it('renders "OUR CATEGORIES" button correctly', () => {
    render(
      <Router>
        <Categories />
      </Router>
    );

    const button = screen.getByText(/our categories/i);
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-[#E6B41D]');
  });

  it('displays categories when they are provided', () => {
    // Mock the categories to return some sample categories
    (useProducts as jest.Mock).mockReturnValue({
      categories: ['electronics', 'furniture', 'clothing'],
    });

    render(
      <Router>
        <Categories />
      </Router>
    );

    // Check if all the categories are rendered
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/furniture/i)).toBeInTheDocument();
    expect(screen.getByText(/clothing/i)).toBeInTheDocument();
  });

  it('does not render any categories when the list is empty', () => {
    // Mock the categories to return an empty array
    (useProducts as jest.Mock).mockReturnValue({
      categories: [],
    });

    render(
      <Router>
        <Categories />
      </Router>
    );

    // Check if the component does not render any categories
    expect(screen.queryByText(/electronics/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/furniture/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/clothing/i)).not.toBeInTheDocument();
  });
});
