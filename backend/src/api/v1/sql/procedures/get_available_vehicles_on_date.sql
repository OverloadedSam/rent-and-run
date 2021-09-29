USE rent_and_run;

DROP PROCEDURE IF EXISTS get_available_vehicles_on_date;

DELIMITER $ $ CREATE PROCEDURE get_available_vehicles_on_date (
  current_booking_date DATETIME,
  current_returning_date DATETIME
) BEGIN
SELECT
  v.id,
  v.brand,
  v.model_name,
  v.images,
  v.power_in_cc,
  COUNT(r.id) + v.available_count AS 'available_count',
  -- Add available_count from vehicle table and from algorithm.
  v.daily_rental_rate,
  v.security_amount,
  r.booking_date,
  r.returning_date
FROM
  rent_and_run.vw_vehicles_by_essential_details v
  LEFT JOIN rentals r ON (
    v.id = r.vehicle
    AND r.returning_date > NOW()
    AND -- Today's date
    r.returning_date < current_booking_date
    AND -- User's booking date
    r.payment_status = 1
  )
  OR (
    v.id = r.vehicle
    AND r.booking_date > NOW()
    AND -- Today's date
    r.booking_date > current_returning_date
    AND -- User's returning date
    r.payment_status = 1
  )
GROUP BY
  v.id;

END $ $ DELIMITER;