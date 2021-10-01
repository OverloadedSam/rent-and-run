import React from 'react';
import Joi from 'joi-browser';
import { Form, Grid } from '../common';

class VehicleSearch extends Form {
  constructor(props) {
    super(props);
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    now.setDate(now.getDate() + 1);

    const bookingDate = props.bookingDate || now.toISOString().slice(0, 16);
    const returningDate = props.returningDate || '';
    this.state = {
      data: { bookingDate, returningDate },
      errors: {},
    };
  }

  schema = {
    bookingDate: Joi.date().greater('now').required().label('Booking Date'),
    returningDate: Joi.date().greater('now').required().label('Returning Date'),
  };

  performSubmit = () => {
    let { bookingDate, returningDate } = this.state.data;
    let errors = { ...this.state.errors };

    if (new Date(returningDate) <= new Date(bookingDate)) {
      errors.returningDate = 'Returning date is invalid!';
      return this.setState({ errors });
    }

    return this.props.setSearchParams({ bookingDate, returningDate });
  };

  render() {
    const { bookingDate } = this.state.data;
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    const minBookingDate = now.toISOString().slice(0, 16);

    const bookingDateInput = {
      id: 'bookingDate',
      label: 'Booking Date',
      type: 'datetime-local',
      min: minBookingDate,
    };

    const returningDateInput = {
      id: 'returningDate',
      label: 'Returning date',
      type: 'datetime-local',
      min: bookingDate,
    };

    const searchButton = {
      label: 'Search',
      variant: 'outline',
      block: true,
      disabled: !!this.props.loading,
    };

    return (
      <Grid layout='grid--1x2' className='vehicle-search'>
        <div>{this.renderInput(bookingDateInput)}</div>
        <div>{this.renderInput(returningDateInput)}</div>
        {this.renderButton(searchButton)}
      </Grid>
    );
  }
}

export default VehicleSearch;
