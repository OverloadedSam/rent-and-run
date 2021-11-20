import React from 'react';
import { Card, Table } from '../common';

const SummaryCard = (props) => {
  const {
    dailyRentalRate,
    daysOfRental,
    securityDeposit,
    couponDiscountAmount,
    renderButton,
  } = props;
  const subTotalAmount = Number(dailyRentalRate) * daysOfRental;
  const grandTotal =
    Number(subTotalAmount) +
    Number(securityDeposit) -
    Number(couponDiscountAmount || 0);

  const summaryColumns = [
    {
      path: 'key',
      key: '1',
    },
    {
      path: 'value',
      key: '2',
    },
  ];

  const summaryData = [
    {
      id: '1',
      key: 'Daily Rental Rate',
      value: `₹ ${dailyRentalRate}`,
    },
    {
      id: '2',
      key: 'Subtotal Amount',
      value: `₹ ${subTotalAmount.toFixed(2)}`,
    },
    {
      id: '3',
      key: 'Security Deposit',
      value: `₹ ${securityDeposit}`,
    },
    {
      id: '4',
      key: 'Coupon Discount',
      value: `₹ ${couponDiscountAmount || 0}`,
    },
  ];

  return (
    <Card className='summary-card'>
      <Card.Header>
        <h3>Rental Summary</h3>
        <hr />
      </Card.Header>
      <Card.Body>
        <Table omitHeader columns={summaryColumns} data={summaryData} />
        <hr />
        <Table
          columns={[
            { label: 'Grand Total' },
            { label: `₹ ${grandTotal.toFixed(2)}` },
          ]}
          data={[]}
        />
        <hr />
        {renderButton ? renderButton(props) : null}
      </Card.Body>
    </Card>
  );
};

export default SummaryCard;
