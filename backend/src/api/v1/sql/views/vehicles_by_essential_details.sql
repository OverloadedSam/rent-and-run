USE rent_and_run;

CREATE
OR REPLACE VIEW vw_vehicles_by_essential_details AS
SELECT
  id,
  brand,
  model_name,
  images,
  power_in_cc,
  available_count,
  daily_rental_rate,
  security_amount
FROM
  vehicles;