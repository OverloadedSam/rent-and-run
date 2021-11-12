USE rent_and_run;

DROP FUNCTION IF EXISTS get_available_vehicle_count_on_date;

DELIMITER $$

CREATE FUNCTION get_available_vehicle_count_on_date (
  vehicle_id VARCHAR(36),
  current_booking_date DATETIME,
  current_returning_date DATETIME
) RETURNS INTEGER READS SQL DATA BEGIN DECLARE unreserved_in_rentals INT DEFAULT 0;

DECLARE available_in_vehicles INT DEFAULT 0;

DECLARE total_unreserved_vehicles INT DEFAULT 0;

SELECT
  COUNT(*) INTO unreserved_in_rentals
FROM
  rentals r
WHERE
  (
    r.returning_date > NOW()
    AND r.returning_date < current_booking_date
    AND r.payment_status = 1
    AND r.vehicle = vehicle_id
  )
  OR (
    r.booking_date > NOW()
    AND r.booking_date > current_returning_date
    AND r.payment_status = 1
    AND r.vehicle = vehicle_id
  );

SELECT
  available_count INTO available_in_vehicles
FROM
  vehicles v
WHERE
  v.id = vehicle_id;

SET
  total_unreserved_vehicles = unreserved_in_rentals + available_in_vehicles;

RETURN total_unreserved_vehicles;

END $$

DELIMITER;
