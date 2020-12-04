import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    //Arrange
    render(<CheckoutForm/>)

    //Act
    const formHeader = screen.getByText(/Checkout Form/)

    //Assert
    expect(formHeader).toBeInTheDocument()

});

test("form shows success message on submit with form details", async () => {
    //Arrange
    render(<CheckoutForm/>)

    //Act
    const firstNameInput = screen.getByLabelText(/First Name/)
    const lastNameInput = screen.getByLabelText(/Last Name/)
    const addressInput = screen.getByLabelText(/Address/)
    const cityInput = screen.getByLabelText(/City/)
    const stateInput = screen.getByLabelText(/State/)
    const zipInput = screen.getByLabelText(/Zip/)

    userEvent.type(firstNameInput, "Maxwell")
    userEvent.type(lastNameInput, "Stofman")
    userEvent.type(addressInput, "1312 Me Lane")
    userEvent.type(cityInput, "LA")
    userEvent.type(stateInput, "CA")
    userEvent.type(zipInput, "90019")

    const button = screen.getByRole("button")
    userEvent.click(button)
    
    //Assert
    const successMessage = await screen.findByTestId("successMessage")
    const successRow1 = screen.getByText('Maxwell Stofman')
    const successRow2 = screen.getByText('1312 Me Lane')
    const successRow3 = screen.getByText('LA, CA 90019')

    expect(successMessage).toBeInTheDocument()
    expect(successRow1).toBeInTheDocument()
    expect(successRow2).toBeInTheDocument()
    expect(successRow3).toBeInTheDocument()
});
