
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import "@testing-library/jest-dom";
import SearchModal from '../components/SearchModal';
import { useProducts } from '../contexts/ProductsContext';
// import SearchProduct from '../components/SearchProduct';

// Mock the necessary components and hooks
jest.mock('../contexts/ProductsContext', () => ({
  useProducts: jest.fn(),
}));

jest.mock('../components/SearchProduct', () => jest.fn(() => <div>Mocked SearchProduct</div>));

describe('SearchModal Component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Product A',
      price: 1000,
      image: 'https://via.placeholder.com/150',
      category: 'electronics',
      description: 'This is product A',
      rating: { rate: 4.5, count: 10 },
    },
    {
      id: 2,
      title: 'Product B',
      price: 2000,
      image: 'https://via.placeholder.com/150',
      category: 'books',
      description: 'This is product B',
      rating: { rate: 4.0, count: 5 },
    },
  ];

  beforeEach(() => {
    (useProducts as jest.Mock).mockReturnValue({
      products: mockProducts,
      saveQuery: jest.fn(),
    });
  });

  it('renders the modal correctly', async () => {
    const setOpen = jest.fn();
    render(<SearchModal open={true} setOpen={setOpen} />);

    // Check for the modal by its ID
    const modal = screen.getByTestId('modal');
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveAttribute('data-testid'); // Assert the ID

  });

  it('filters products based on search input', async () => {
    const setOpen = jest.fn();
    render(<SearchModal open={true} setOpen={setOpen} />);

    
    // Type into the search input
    const input = screen.getByPlaceholderText(/search products/i);
    
    await act(async () => {
      fireEvent.change(input, { target: { value: 'Product A' } });
    });

    // Wait for the filtering to take effect
    await waitFor(() => {
      expect(screen.getByText(/mocked searchproduct/i)).toBeInTheDocument();
    });

    // Check if Product A is displayed
    expect(screen.getByText(/mocked searchproduct/i)).toBeInTheDocument();

    // Check that Product B is not displayed
    expect(screen.queryByText(/mocked searchproduct/i)).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', async () => {
    const setOpen = jest.fn();
    render(<SearchModal open={true} setOpen={setOpen} />);

    const closeButton = screen.getByTestId('close-button');

    await act(async () => {
      fireEvent.click(closeButton);
    });

    expect(setOpen).toHaveBeenCalledWith(false);
  });
});
