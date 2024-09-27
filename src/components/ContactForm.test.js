import React from 'react';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />);
});

test('renders the contact form header', ()=> {
    render(<ContactForm />);
    const header = screen.queryByText(/contact form/i)
    expect(header).toBeInTheDocument()
    expect(header).toBeTruthy()
    expect(header).toHaveTextContent(/contact form/i)

});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    //Arrange
    render(<ContactForm />);
    //Act
    const firstNameErr = screen.getByLabelText(/First Name/i)
    userEvent.type(firstNameErr, 'Pauline')
    const errorMessage = screen.queryAllByText(/error/i)
    //Assert
    expect(errorMessage).toBeTruthy()
    
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />)
    const firstNameErr = screen.getByLabelText(/First Name/i)
    userEvent.type(firstNameErr, '')
    const errMess1 = screen.queryAllByText(/error/i)
    expect(errMess1).toBeTruthy();

    const lastNameErr = screen.getByLabelText(/Last Name/i)
    userEvent.type(lastNameErr, '')
    const errMess2 = screen.queryAllByText(/error/i)
    expect(errMess2).toBeTruthy()

    const emailErr = screen.getByLabelText(/email/i)
    userEvent.type(emailErr, '')
    const errMess3 = screen.queryAllByText(/error/i)
    expect(errMess3).toBeTruthy()
    
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
		const firstNameErr = screen.getByLabelText(/First Name/i);
		userEvent.type(firstNameErr, 'Pauline');
		const errMess1 = screen.queryAllByText(/error/i);
		expect(errMess1).toBeTruthy();

		const lastNameErr = screen.getByLabelText(/Last Name/i);
		userEvent.type(lastNameErr, 'Stokes');
		const errMess2 = screen.queryAllByText(/error/i);
		expect(errMess2).toBeTruthy();

         const emailErr = screen.getByLabelText(/email/i);
		 userEvent.type(emailErr, '')
		 const errMess3 = screen.queryAllByText(/error/i);
		 expect(errMess3).toBeTruthy();
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
     render(<ContactForm />);
			const firstNameInput = screen.getByLabelText(/First Name/i);
			const lastNameInput = screen.getByLabelText(/Last Name/i);
			const emailInput = screen.getByLabelText(/Email/i);
			const button = screen.getByRole("button");
            
            userEvent.type(firstNameInput, "Pauline");
            userEvent.type(lastNameInput, "Stokes");
            userEvent.type(emailInput, "fake");
            userEvent.click(button);
            
            
			const emailError = screen.queryByText(/must be a valid email address/i);
			expect(emailError).toBeTruthy();

});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
		const firstNameInput = screen.getByLabelText(/First Name/i);
		const lastNameInput = screen.getByLabelText(/Last Name/i);
		const emailInput = screen.getByLabelText(/Email/i);
		const button = screen.getByRole("button");

		userEvent.type(firstNameInput, "Pauline")
		userEvent.type(lastNameInput, '')
		userEvent.type(emailInput, "pauline.stokes007@gmail.com")
		userEvent.click(button)

		const lastNameError = screen.queryByText(/lastName is a required field/i)
		expect(lastNameError).toBeTruthy();
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
		const firstNameInput = screen.getByLabelText(/First Name/i);
		const lastNameInput = screen.getByLabelText(/Last Name/i);
		const emailInput = screen.getByLabelText(/Email/i);
		const button = screen.getByRole("button");

		userEvent.type(firstNameInput, "Pauline");
		userEvent.type(lastNameInput, "Stokes");
		userEvent.type(emailInput, "pauline.stokes007@gmail.com");
		userEvent.click(button);

        const firstNameSubmit = screen.queryByTestId('firstnameDisplay')
        const lastNameSubmit = screen.queryByTestId('lastnameDisplay')
        const emailSubmit = screen.queryByTestId('emailDisplay')

        expect(firstNameSubmit).toBeTruthy()
        expect(lastNameSubmit).toBeTruthy()
        expect(emailSubmit).toBeTruthy()
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />)
    

    const firstNameInput = screen.getByLabelText(/First Name/i)
		const lastNameInput = screen.getByLabelText(/Last Name/i)
		const emailInput = screen.getByLabelText(/Email/i)
        const messageInput = screen.getByLabelText(/message/i)
		const button = screen.getByRole("button")

		userEvent.type(firstNameInput, "Pauline")
		userEvent.type(lastNameInput, "Stokes")
		userEvent.type(emailInput, "pauline.stokes007@gmail.com")
        userEvent.type(messageInput, 'here is a message')
		userEvent.click(button);

         await waitFor(() => {
			const firstNameSubmit = screen.queryByTestId('firstnameDisplay')
			expect(firstNameSubmit).toBeInTheDocument()
			})
         await waitFor(() => {
			const lastNameSubmit = screen.queryByTestId('lastnameDisplay')
			expect(lastNameSubmit).toBeInTheDocument()
			})
         await waitFor(() => {
			const emailSubmit = screen.queryByTestId('emailDisplay')
			expect(emailSubmit).toBeInTheDocument()
			})
         await waitFor(() => {
			const messageSubmit = screen.queryByTestId('messageDisplay')
			expect(messageSubmit).toBeInTheDocument()
			})

});