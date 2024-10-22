
import { render, screen, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import Product from '../components/Product';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

// Mock the useNavigate, useCart, and useToast hooks
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../contexts/CartContext', () => ({
  useCart: jest.fn(),
}));

describe('Product Component', () => {
  const product = {
    id: 1,
    title: 'Sample Product',
    price: 1000,
    image: 'https://via.placeholder.com/150',
    category: 'electronics',
    description: 'This is a sample product',
    rating: { rate: 4.5, count: 10 },
  };

  const mockNavigate = jest.fn();
  const mockHandleAddToCart = jest.fn();
//   const mockNotify = jest.fn();

  beforeEach(() => {
    // Reset mocks before each test
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useCart as jest.Mock).mockReturnValue({
      handleAddToCart: mockHandleAddToCart,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the product information correctly', () => {
    render(<Product {...product} key={product.id} />);

    // Check if the product's title is displayed
    expect(screen.getByText('Sample Product')).toBeInTheDocument();

    // Check if the product's price is displayed
    expect(screen.getByText('₦ 1000')).toBeInTheDocument();

    // Check if the product's category is displayed
    expect(screen.getByText('electronics')).toBeInTheDocument();

    // Check if the product's rating is displayed
    expect(screen.getByText('4.5')).toBeInTheDocument();
    expect(screen.getByText('(10)')).toBeInTheDocument();

    // Check if the product image is rendered
    const imageElement = screen.getByRole('img');
    expect(imageElement).toHaveAttribute('src', 'https://via.placeholder.com/150');
  });

  test('navigates to the product details page when the product is clicked', () => {
    render(<Product {...product} key={product.id} />);

    // Click the product container to trigger navigation
    const productContainer = screen.getByText('Sample Product');
    fireEvent.click(productContainer);

    // Assert that navigate was called with the correct product ID
    expect(mockNavigate).toHaveBeenCalledWith('/product/1');
  });

  test('adds the product to the cart when the "Add to Cart" button is clicked', () => {
    render(<Product {...product} key={product.id} />);

    // Click the "Add to Cart" button
    const addToCartButton = screen.getByRole('button');
    fireEvent.click(addToCartButton);

    // Assert that handleAddToCart was called with the correct product details
    expect(mockHandleAddToCart).toHaveBeenCalledWith({
      id: product.id,
      name: product.title,
      image: product.image,
      quantity: 1,
      price: product.price,
      category: product.category,
    });

  });
});