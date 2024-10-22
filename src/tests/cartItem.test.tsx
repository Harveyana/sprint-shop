import { render, fireEvent, screen } from '@testing-library/react';

import "@testing-library/jest-dom";
import CartItem from '../components/cartItem';
import { useCart } from '../contexts/CartContext';
// import useToast from '../hooks/useToast';

// Mock the useCart hook
jest.mock('../contexts/CartContext', () => ({
  useCart: jest.fn(),
}));

// Mock the useToast hook
// jest.mock('../hooks/useToast', () => ({
//   default: jest.fn(),
// }));

describe('CartItem Component', () => {
  let mockCartFunctions: any;

  beforeEach(() => {
    // Reset mocks before each test
    mockCartFunctions = {
      handleDeleteFromCart: jest.fn(),
      increaseQuantity: jest.fn(),
      decreaseQuantity: jest.fn(),
    };

    // Mock the return value of useCart
    (useCart as jest.Mock).mockReturnValue(mockCartFunctions);

    // Mock useToast function
    // (useToast as jest.Mock).mockReturnValue({
    //   notify: jest.fn(),
    // });
  });

  it('renders cart item correctly', () => {
    const product = {
      id: 1,
      name: 'Sample Product',
      quantity: 2,
      price: 100,
      image: 'sample-image-url',
    };

    render(<CartItem {...product} />);

    // Check if product name is rendered
    expect(screen.getByText('Sample Product')).toBeInTheDocument();

    // Check if quantity is rendered
    expect(screen.getByText('x 2')).toBeInTheDocument();

    // Check if price is rendered
    expect(screen.getByText(/₦ 100/)).toBeInTheDocument();
  });

  it('calls handleDeleteFromCart when delete button is clicked', () => {
    const product = {
      id: 1,
      name: 'Sample Product',
      quantity: 2,
      price: 100,
      image: 'sample-image-url',
    };

    render(<CartItem {...product} />);

    const deleteButton = screen.getByTestId('delete');
    fireEvent.click(deleteButton);

    expect(mockCartFunctions.handleDeleteFromCart).toHaveBeenCalledWith(1);
    // expect(useToast().notify).toHaveBeenCalledWith('Item removed successfully');
  });

  it('increases quantity when increment button is clicked', () => {
    const product = {
      id: 1,
      name: 'Sample Product',
      quantity: 2,
      price: 100,
      image: 'sample-image-url',
    };

    render(<CartItem {...product} />);

    const incrementButton = screen.getByTestId('increase');
    fireEvent.click(incrementButton);

    expect(mockCartFunctions.increaseQuantity).toHaveBeenCalledWith(1);
  });

  it('decreases quantity when decrement button is clicked', () => {
    const product = {
      id: 1,
      name: 'Sample Product',
      quantity: 2,
      price: 100,
      image: 'sample-image-url',
    };

    render(<CartItem {...product} />);

    const decrementButton = screen.getByTestId('decrease');
    fireEvent.click(decrementButton);

    expect(mockCartFunctions.decreaseQuantity).toHaveBeenCalledWith(1);
  });

  it('deletes product,when decrement button is clicked and quantity is equal to 1', () => {
    const product = {
      id: 1,
      name: 'Sample Product',
      quantity: 1,
      price: 100,
      image: 'sample-image-url',
    };

    render(<CartItem {...product} />);

    const decrementButton = screen.getByTestId('decrease');
    fireEvent.click(decrementButton);

    expect(mockCartFunctions.handleDeleteFromCart).toHaveBeenCalledWith(1);
  });

});