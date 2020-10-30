import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CheckoutForm from "./CheckoutForm";

// Write up the two tests here and make sure they are testing what the title shows

test("form header renders", () => {
    render(<CheckoutForm/>);

    //Act:
    //1. get access to form fields
    const formHeader = screen.getByText(/checkout form/i) // this grabs the <h2> by its text

    //Assert
    // The content of formHeader is in the DOM
    expect(formHeader).toBeInTheDocument() 
});


test("form shows success message on submit with form details", async () => {
    render(<CheckoutForm/>);

    //Act:
    //1. get access to form fields
    const firstNameInput = screen.getByLabelText(/first name/i)
    const lastNameInput = screen.getByLabelText(/last name/i)
    const addressInput = screen.getByLabelText(/address/i)
    const cityInput = screen.getByLabelText(/city/i)
    const stateInput = screen.getByLabelText(/state/i)
    const zipInput = screen.getByLabelText(/zip/i)

    //2. add text to our fields
    fireEvent.change(firstNameInput, {target:{value: 'Maxwell', name:'firstName'}})
    fireEvent.change(lastNameInput, {target:{value: 'Stofman', name:'lastName'}})
    fireEvent.change(addressInput, {target:{value: '1312 Orange', name:'address'}})
    fireEvent.change(cityInput, {target:{value: 'Los Angeles', name:'city'}})
    fireEvent.change(stateInput, {target:{value: 'CA', name:'state'}})
    fireEvent.change(zipInput, {target:{value: '90019', name:'zip'}})

    //3. get access to and click our button
    const button = screen.getByRole("button")
    fireEvent.click(button)

    // Assert check that text is on screen
    const successMessageText = await screen.findByTestId(/successMessage/i)
    expect(successMessageText).toBeTruthy()

});
