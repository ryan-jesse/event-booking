import React, { useState } from "react";

interface NewBookingFormProps {
  onMakeBookingClick: (firstName: string, lastName: string) => void
}

export const NewBookingForm = (props: NewBookingFormProps) => {
  const [form, setForm] = useState<{ firstName: string, lastName: string}>({ firstName: '', lastName: ''});

  const updateFormState = (prop: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [prop]: event.target.value
      }
    });
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.firstName || !form.lastName) {
      alert('Both first and last name need to be provided');
      return;
    }

    props.onMakeBookingClick(form.firstName, form.lastName);
  }

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <div className="form-row">
          <label className="booking-form-label">
            First name:
            <input type="text" value={ form.firstName } onChange={ updateFormState('firstName') }/>
          </label>
        </div>
        <div className="form-row">
          <label className="booking-form-label">
            Last name:
            <input type="text" value={ form.lastName } onChange={ updateFormState('lastName') }/>
          </label>
        </div>
        <input className="submit-booking-input" type="submit" value="Make booking"></input>
      </form>
    </div>
  )
}
