/* eslint-disable react/no-unused-class-component-methods */
import React, { Component } from 'react';
import Joi from 'joi-browser';
import Input from './Input';
import Button from './Button';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      errors: {},
    };
  }

  validateData = () => {
    const { data } = this.state;
    const options = { abortEarly: false };
    const { error } = Joi.validate(data, this.schema, options);

    if (!error) return null;

    const errorList = Array(error)[0].details;
    let errors = {};
    errorList.forEach((item) => {
      errors[item.path[0]] = item.message;
    });

    return errors;
  };

  validateFieldValue = (field, value) => {
    const dataObj = { [field]: value };
    const schemaObj = { [field]: this.schema[field] };
    const { error } = Joi.validate(dataObj, schemaObj);

    return error ? error.details[0].message : null;
  };

  handleChange = (e) => {
    const { name: field, value } = e.currentTarget;
    let { errors } = this.state;
    const { data } = this.state;

    const error = this.validateFieldValue(field, value);

    if (!error) delete errors[field];
    else errors[field] = error;
    data[field] = value;

    this.setState({ errors });
    this.setState({ data });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateData();
    if (errors) return this.setState({ errors });

    this.performSubmit(e);
    return null;
  };

  renderInput = (attributes) => {
    const { data, errors } = this.state;
    const { id, onChangeHandler, ...rest } = attributes;

    return (
      <Input
        id={id}
        onChange={onChangeHandler || this.handleChange}
        error={errors[id]}
        value={data[id]}
        {...rest}
      />
    );
  };

  renderButton = (attributes) => {
    const { label, onClickHandler, ...rest } = attributes;

    return (
      <Button onClick={onClickHandler || this.handleSubmit} {...rest}>
        {label}
      </Button>
    );
  };
}

export default Form;
