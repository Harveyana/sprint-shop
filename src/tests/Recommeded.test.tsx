
import { render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import Recommended from '../components/Recommended';
import { useProducts } from '../contexts/ProductsContext';
// import Product from '../components/Product';

// Mock the useProducts hook and the Product component
jest.mock('../contexts/ProductsContext', () => ({
  useProducts: jest.fn(),
}));

jest.mock('../components/Product', () => jest.fn(() => <div>Mocked Product</div>));

describe('Recommended Component', () => {
  const mockRecommendations = [
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

  const mockNoRecommendations:[] = [];

  const mockGetRecommendations = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockGetRecommendations.mockResolvedValue(mockRecommendations); // Mock the resolved value of getRecommendations
    (useProducts as jest.Mock).mockReturnValue({
      getRecommendations: mockGetRecommendations,
      query: '', // Mock query state
    });
  });

  test('renders a list of recommended products when available', async () => {
    render(<Recommended />);

    // Check if the 'Recommended' heading is rendered
    expect(await screen.findByText('Recommended')).toBeInTheDocument();

    // Wait for the async call to complete and check if the Product component is rendered for each recommended product
    await waitFor(() => {
      const productComponents = screen.getAllByText('Mocked Product');
      expect(productComponents).toHaveLength(2);
    });

    // Ensure that getRecommendations is called once
    expect(mockGetRecommendations).toHaveBeenCalledTimes(1);
  });

  test('does not display the "Recommended" heading when there are no products', async () => {
    // Mock empty recommendations
    mockGetRecommendations.mockResolvedValue(mockNoRecommendations);
    render(<Recommended />);

    // Check if the "Recommended" heading is not rendered
    await waitFor(() => {
      expect(screen.queryByText('Recommended')).not.toBeInTheDocument();
    });

    // Ensure that getRecommendations is called once
    expect(mockGetRecommendations).toHaveBeenCalledTimes(1);
  });
});
