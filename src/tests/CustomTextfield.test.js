import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import CustomTextfield from '../components/CustomTextfield';

describe('CustomTextfield Component', () => {
  const mockOnChange = jest.fn();

  it('Renders with provided value,placeholder', () => {
    render(
      <CustomTextfield
        id="product"
        label="Product name"
        placeholder="Product name"
        value="Mobile"
      />
    );

    const inputElement = screen.getByRole('textbox', {
      id: 'textfield-product',
    });

    expect(inputElement.value).toBe('Mobile');
    expect(inputElement.placeholder).toBe('Product name');
    expect(inputElement.type).toBe('text'); // If no type is passed default should be text.
  });

  it('Testing on change', () => {
    render(
      <CustomTextfield
        id="product"
        label="Product name"
        placeholder="Product name"
        value="Mobile"
        onChange={mockOnChange}
      />
    );

    const inputElement = screen.getByRole('textbox', {
      id: 'textfield-product',
    });

    // Check the value of the input element
    fireEvent.change(inputElement, { target: { value: 'Laptop' } });

    expect(inputElement.value).toBe('Laptop');
    expect(mockOnChange).toHaveBeenCalledWith('product', 'Laptop');
  });

  it('Testing on change when no text is entered and label prop is present- Should show error message with label prop.', () => {
    render(
      <CustomTextfield
        id="product"
        label="Product name"
        placeholder="Product name"
        value="Mobile"
        onChange={mockOnChange}
      />
    );

    const inputElement = screen.getByRole('textbox', {
      id: 'textfield-product',
    });

    fireEvent.change(inputElement, { target: { value: '' } });
    expect(
      screen.getByText('Please enter the product name.')
    ).toBeInTheDocument();
  });

  it('Testing on change when no text is entered and label prop is not present but type prop is present - Should show error message with type prop.', () => {
    render(
      <CustomTextfield
        id="product"
        type="text"
        value="Mobile"
        onChange={mockOnChange}
      />
    );

    const inputElement = screen.getByRole('textbox', {
      id: 'textfield-product',
    });

    fireEvent.change(inputElement, { target: { value: '' } });
    expect(screen.getByText('Please enter the text.')).toBeInTheDocument();
  });

  it('Testing if element is disabled', () => {
    render(
      <CustomTextfield
        id="product"
        label="Product name"
        placeholder="Product name"
        value="Mobile"
        disabled={true}
      />
    );

    const inputElement = screen.getByRole('textbox', {
      id: 'textfield-product',
    });

    expect(inputElement.disabled).toBe(true);
  });

  it('Testing customErrorMessage prop', async () => {
    let quantity = 0;
    render(
      <CustomTextfield
        id="quantity"
        type="number"
        label="Quantity"
        customErrorMessage={
          quantity <= 0 && 'Please enter a value greater than 0.'
        }
      />
    );

    expect(
      screen.getByText('Please enter a value greater than 0.')
    ).toBeInTheDocument();

    // If quantity is greater than 0, ensure the error message is not present
    //    expect(
    //     screen.queryByText('Please enter a value greater than 0.')
    //   ).not.toBeInTheDocument();
  });

  it('Testing inputProps prop', () => {
    render(
      <CustomTextfield
        id="quantity"
        type="number"
        label="Quantity"
        inputProps={{ min: 1 }}
      />
    );

    const inputElement = screen.getByRole('spinbutton', {
      id: 'textfield-quantity',
    });
    expect(inputElement.min).toBe('1');
  });
});
