
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import Products from '../components/Products';
import { useProducts } from '../contexts/ProductsContext';
// import Product from '../components/Product';

// Mock the useProducts hook
jest.mock('../contexts/ProductsContext', () => ({
  useProducts: jest.fn(),
}));

// Mock the Product component to simplify the test
jest.mock('../components/Product', () => jest.fn(() => <div>Mocked Product</div>));

describe('Products Component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Product 1',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'electronics',
      description: 'This is product 1',
      rating: { rate: 4.5, count: 10 },
    },
    {
      id: 2,
      title: 'Product 2',
      price: 2000,
      image: 'https://via.placeholder.com/150',
      category: 'books',
      description: 'This is product 2',
      rating: { rate: 4.0, count: 5 },
    },
  ];

  const mockNoProducts:any[] = [];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays "No Products Found" when no products are available', () => {
    (useProducts as jest.Mock).mockReturnValue({ products: mockNoProducts });

    render(<Products />);

    // Check if the "No Products Found" message is displayed
    expect(screen.getByText('No Products Found')).toBeInTheDocument();
  });

  test('renders a list of products when products are available', () => {
    (useProducts as jest.Mock).mockReturnValue({ products: mockProducts });

    render(<Products />);

    // Check if the Product component is rendered for each product in the list
    const productComponents = screen.getAllByText('Mocked Product');
    expect(productComponents).toHaveLength(2);
  });
});
