import React from 'react';
import { Card, Button, Table } from '../common';

const SummaryCard = () => {
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
      value: '₹ 3999',
    },
    {
      id: '2',
      key: 'Subtotal Amount',
      value: '₹ 14000',
    },
    {
      id: '3',
      key: 'Security Deposit',
      value: '₹ 5000',
    },
    {
      id: '4',
      key: 'Coupon Discount',
      value: '₹ 3999',
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
          columns={[{ label: 'Grand Total' }, { label: '₹ 17999' }]}
          data={[]}
        />
        <hr />
        <Button variant='secondary' block>
          Place Rental
        </Button>
      </Card.Body>
    </Card>
  );
};

export default SummaryCard;
