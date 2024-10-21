
import { render, screen, fireEvent } from '@testing-library/react';
import CartItem from '../components/cartItem';
import { useCart } from '../contexts/CartContext';
import "@testing-library/jest-dom";

jest.mock('../contexts/CartContext'); // Mock CartContext

const mockHandleAddToCart = jest.fn();
const mockHandleDeleteFromCart = jest.fn();
const mockIncreaseQuantity = jest.fn();
const mockDecreaseQuantity = jest.fn();

const mockUseCart = () => ({
  handleAddToCart: mockHandleAddToCart,
  cart: [],
  totalPriceCost: 0,
  handleDeleteFromCart: mockHandleDeleteFromCart,
  increaseQuantity: mockIncreaseQuantity,
  decreaseQuantity: mockDecreaseQuantity,
});

useCart.mockReturnValue(mockUseCart);


test('renders cart item with product information', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    quantity: 2,
    price: 100,
    image: 'product.jpg',
  };


  render(
    <CartItem
      id={product.id}
      name={product.name}
      price={product.price}
      image={product.image}
      quantity={product.quantity}
    />
  );

  const productName = screen.getByText(product.name);
  const productQuantity = screen.getByText(`x ${product.quantity}`);
  const productPrice = screen.getByText(`₦ ${product.price}`);

  expect(productName).toBeInTheDocument();
  expect(productQuantity).toBeInTheDocument();
  expect(productPrice).toBeInTheDocument();
});

test('clicking delete button calls handleDeleteFromCart', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    quantity: 2,
    price: 100,
    image: 'product.jpg',
  };

  render(
    <CartItem
      id={product.id}
      name={product.name}
      price={product.price}
      image={product.image}
      quantity={product.quantity}
    />
  );

  const deleteButton = screen.getByTestId('delete');
  fireEvent.click(deleteButton);

  expect(mockHandleDeleteFromCart).toHaveBeenCalledWith(product.id);
});

test('clicking increment button calls increaseQuantity', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    quantity: 2,
    price: 100,
    image: 'product.jpg',
  };

  render(
    <CartItem
      id={product.id}
      name={product.name}
      price={product.price}
      image={product.image}
      quantity={product.quantity}
    />
  );

  const incrementButton = screen.getByTestId('increase')
  fireEvent.click(incrementButton);

  expect(mockIncreaseQuantity).toHaveBeenCalledWith(product.id);
});

test('clicking decrement button calls decreaseQuantity (when quantity > 1)', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    quantity: 2,
    price: 100,
    image: 'product.jpg',
  };

  render(
    <CartItem
      id={product.id}
      name={product.name}
      price={product.price}
      image={product.image}
      quantity={product.quantity}
    />
  );

  const decrementButton = screen.getByTestId('decrease');
  fireEvent.click(decrementButton);

  expect(mockDecreaseQuantity).toHaveBeenCalledWith(product.id);
});

test('clicking decrement button calls handleDeleteFromCart (when quantity is 1)', () => {
  const product = {
    id: 1,
    name: 'Test Product',
    quantity: 1,
    price: 100,
    image: 'product.jpg',
  };

  render(
    <CartItem
      id={product.id}
      name={product.name}
      price={product.price}
      image={product.image}
      quantity={product.quantity}
    />
  );

  const decrementButton = screen.getByTestId('decrease');
  fireEvent.click(decrementButton);

  expect(mockDecreaseQuantity).not.toHaveBeenCalled();
  expect(mockHandleDeleteFromCart).toHaveBeenCalledWith(product.id);
});