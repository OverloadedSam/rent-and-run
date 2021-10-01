import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { vehicleActions as action } from '../redux/actions';
import { Container, Grid, Card, Media, Button, Loader, Error } from '../common';

const VehicleDetails = () => {
  const dispatch = useDispatch();
  const {
    loading,
    error,
    success,
    data: vehicle,
  } = useSelector((state) => state.vehicleDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch(action.getVehicleDetails(id));
  }, []);

  return (
    <Container className='block block-vehicle-screen'>
      {loading ? (
        <Loader />
      ) : error ? (
        <Error {...error} />
      ) : success ? (
        <>
          <Grid layout='grid--1x2'>
            <Card className='vehicle__display'>
              <Card.Header>
                <img
                  className='vehicle__display__image'
                  src={`/assets/images/vehicles/${vehicle.images[0]}`}
                  alt={vehicle.model_name}
                />
              </Card.Header>
              <Card.Body>
                <Button block>Add To Cart</Button>
              </Card.Body>
            </Card>

            <Card className='vehicle__details'>
              <Card.Header>
                <h2 className='vehicle__name'>
                  {`${vehicle.brand}  ${vehicle.model_name}`}
                </h2>
                <h2 className='vehicle__rental-rate'>
                  <span>Starting @ </span>₹ {vehicle.daily_rental_rate}
                  <span> / Day</span>
                </h2>
              </Card.Header>
              <Card.Body>
                <h3 className='vehicle__features-label'>Vehicle Features</h3>
                <ul className='list vehicle__features'>
                  <li>
                    <Media>
                      <Media.Image className='icon-container'>
                        <svg className='icon icon--secondary'>
                          <use href='/assets/icons/car-average.svg#car-average' />
                        </svg>
                      </Media.Image>
                      <Media.Body>
                        <Media.Title>Milage</Media.Title>
                        <Media.Description>
                          {vehicle.milage_in_km} Km/L
                        </Media.Description>
                      </Media.Body>
                    </Media>
                  </li>
                  <li>
                    <Media>
                      <Media.Image className='icon-container'>
                        <svg className='icon icon--secondary'>
                          <use href='/assets/icons/seat.svg#seat' />
                        </svg>
                      </Media.Image>
                      <Media.Body>
                        <Media.Title>Seats</Media.Title>
                        <Media.Description>{vehicle.seats}</Media.Description>
                      </Media.Body>
                    </Media>
                  </li>
                  <li>
                    <Media>
                      <Media.Image className='icon-container'>
                        <svg className='icon icon--secondary'>
                          <use href='/assets/icons/speedometer.svg#speedometer' />
                        </svg>
                      </Media.Image>
                      <Media.Body>
                        <Media.Title>Top Speed</Media.Title>
                        <Media.Description>
                          {vehicle.top_speed_in_kmph} Km/H
                        </Media.Description>
                      </Media.Body>
                    </Media>
                  </li>
                  <li>
                    <Media>
                      <Media.Image className='icon-container'>
                        <svg className='icon icon--secondary'>
                          <use href='/assets/icons/fuel.svg#fuel' />
                        </svg>
                      </Media.Image>
                      <Media.Body>
                        <Media.Title>Fuel</Media.Title>
                        <Media.Description>
                          {vehicle.fuel_type}
                        </Media.Description>
                      </Media.Body>
                    </Media>
                  </li>
                  <li>
                    <Media>
                      <Media.Image className='icon-container'>
                        <svg className='icon icon--secondary'>
                          <use href='/assets/icons/power.svg#power' />
                        </svg>
                      </Media.Image>
                      <Media.Body>
                        <Media.Title>Power</Media.Title>
                        <Media.Description>
                          {vehicle.power_in_cc} CC
                        </Media.Description>
                      </Media.Body>
                    </Media>
                  </li>
                  <li>
                    <Media>
                      <Media.Image className='icon-container'>
                        <svg className='icon icon--secondary'>
                          <use href='/assets/icons/security-deposit.svg#security-deposit' />
                        </svg>
                      </Media.Image>
                      <Media.Body>
                        <Media.Title>Security</Media.Title>
                        <Media.Description>
                          ₹ {Math.trunc(vehicle.security_amount)}/-
                        </Media.Description>
                      </Media.Body>
                    </Media>
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Grid>

          <Card className='vehicle__description'>
            <Card.Header>
              <h3 className='vehicle__description__heading'>
                Vehicle Description
              </h3>
            </Card.Header>
            <Card.Body>
              <p>{vehicle.description}</p>
            </Card.Body>
          </Card>

          <Card className='vehicle__terms'>
            <Card.Header>
              <h3 className='vehicle__terms__heading'>Terms & Conditions</h3>
            </Card.Header>
            <Card.Body>
              <ul className='list'>
                <li>
                  You need to submit an original id (Passport/Aadhar card) and a
                  photocopy of your driving license.
                </li>
                <li>
                  One Helmet will be given with the bike. Another will be
                  available on request.
                </li>
                <li>
                  Passport submission is mandatory in case of bike models above
                  500 CC.
                </li>
                <li>
                  you can drop off the bike anywhere in Delhi, India. Just
                  provide us the drop location at the time of making a
                  rental/checkout.
                </li>
                <li>
                  The cost of transportation to and from our store/location
                  would be borne by the customer along with idle day&rsquo;s
                  rental.
                </li>
                <li>
                  Security Deposit is refundable once we receive the bike in
                  proper condition.
                </li>
                <li>
                  In case of any damage to the vehicle, the customer is liable
                  to pay the repair charges as per the authorized Service
                  Center.
                </li>
                <li>
                  We reserve the vehicle for the customer. In case of
                  cancellation unnecessary inconvenience is caused to the us. So
                  once booked vehicle(s) there is no refund policy.
                </li>
                <li>
                  <Link to='/policy'>More policy and terms & conditions</Link>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </>
      ) : null}
    </Container>
  );
};

export default VehicleDetails;