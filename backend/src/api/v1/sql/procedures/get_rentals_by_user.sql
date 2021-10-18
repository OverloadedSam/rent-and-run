USE rent_and_run;

DROP PROCEDURE IF EXISTS get_rentals_by_user;

DELIMITER $$
CREATE PROCEDURE get_rentals_by_user(user_id CHAR(36))
BEGIN
  SELECT
    r.id,
    v.id AS vehicle_id,
    v.brand AS vehicle_brand,
    v.model_name AS vehicle_model_name,
    v.images AS vehicle_images,
    r.booking_date,
    r.returning_date,
    r.rent_amount,
    ps.name AS payment_status,
    c.discount_amount,
    p.id AS payment_id,
    p.total_amount,
    p.transaction_update_time
  FROM
    rentals r
    JOIN vehicles v ON r.vehicle = v.id
    JOIN payment_statuses ps ON r.payment_status = ps.id
    LEFT JOIN coupons c ON r.coupon = c.id
	  LEFT JOIN payments p ON r.id = p.rental
  WHERE
    r.user = user_id;
END$$

DELIMITER ;
