USE rent_and_run;

DROP PROCEDURE IF EXISTS get_vehicle_details;

DELIMITER $$
CREATE PROCEDURE get_vehicle_details(vehicle_id CHAR(36)) BEGIN
SELECT
  v.id,
  vt.name AS vehicle_type,
  ft.name AS fuel_type,
  v.brand,
  v.model_name,
  v.images,
  v.milage_in_km,
  v.power_in_cc,
  v.top_speed_in_kmph,
  v.available_count,
  v.seats,
  v.daily_rental_rate,
  v.security_amount,
  v.description
FROM
  vehicles v
  JOIN vehicle_types vt ON v.vehicle_type = vt.id
  JOIN fuel_types ft ON v.fuel_type = ft.id
WHERE
  v.id = vehicle_id;

END $$
DELIMITER ;