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
    
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    
});

test('renders all fields text when all fields are submitted.', async () => {
    
});