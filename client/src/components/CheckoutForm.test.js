import React from "react";
import { render, screen } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";
import userEvent from '@testing-library/user-event';

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
  render(<CheckoutForm />);

  const header = screen.getByText(/checkout form/i)
  expect(header).toBeInTheDocument();

});

test("form shows success message on submit with form details", async () => {
  render(<CheckoutForm />);

  const firstNameInput = screen.getByLabelText(/first name/i);
  const lastNameInput = screen.getByLabelText(/last name/i);
  const addressInput = screen.getByLabelText(/address/i);
  const cityInput = screen.getByLabelText(/city/i);
  const stateInput = screen.getByLabelText(/state/i);
  const zipInput = screen.getByLabelText(/zip/i);

  const testText = [
    'Leah',
    'Tabush',
    '123 Main St',
    'Redondo Beach',
    'CA',
    '90278'
  ]
  const inputs =[
    firstNameInput,
    lastNameInput,
    addressInput,
    cityInput,
    stateInput,
    zipInput
  ]
  //type in the inputs
  inputs.forEach((input, i) => {
    userEvent.clear(input);
    userEvent.type(input, testText[i]);
  })
  //hit submit
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  //check if the text shows on the page
  const successMessage = await screen.findByText(testText[0], { exact: false })
  expect(successMessage).toBeInTheDocument();
});
