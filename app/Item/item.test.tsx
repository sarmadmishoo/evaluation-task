import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import this line for additional jest-dom matchers
import Item from './item';

// Mock the props
const mockItemProps = {
  id: 1,
  name: 'Item',
  price: 10,
  img: 'image.jpg',
  colour: 'red',
  increaseItem: jest.fn(),
  decreaseItem: jest.fn(),
  clearItem: jest.fn(),
  quantity: jest.fn(),
};

describe('Item Component', () => {
  it('renders correctly', () => {
    const { getByText, getByAltText } = render(<Item {...mockItemProps} />);

    expect(getByText('Item')).toBeInTheDocument();
    expect(getByText('$10')).toBeInTheDocument();
    expect(getByAltText('Item')).toBeInTheDocument();
  });

  it('calls increaseItem when + button is clicked', () => {
    const { getByText } = render(<Item {...mockItemProps} />);
    fireEvent.click(getByText('+'));
    expect(mockItemProps.increaseItem).toHaveBeenCalledWith(1);
  });

  it('calls clearItem when Remove button is clicked', () => {
    const { getByText } = render(<Item {...mockItemProps} />);
    fireEvent.click(getByText('Remove'));
    expect(mockItemProps.clearItem).toHaveBeenCalledWith(1);
  });
});
