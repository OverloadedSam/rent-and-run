USE rent_and_run;

DROP PROCEDURE IF EXISTS get_rental_by_id_with_details;

DELIMITER $$
CREATE PROCEDURE get_rental_by_id_with_details(rental_id CHAR(36))
BEGIN
	SELECT
		r.id,
        r.user,
        v.id AS vehicle_id,
        v.brand AS vehicle_brand,
        v.model_name AS vehicle_model_name,
        v.daily_rental_rate AS vehicle_daily_rental_rate,
        v.security_amount AS vehicle_security_amount,
        r.booking_date,
        r.returning_date,
        r.drop_address,
        r.rent_amount,
        pm.name AS payment_method,
        ps.name AS payment_status,
        c.coupon_code AS coupon_code,
        c.discount_amount,
        c.valid_till AS coupon_valid_till,
        p.id AS payment_id,
        p.total_amount AS total_payable_amount,
        p.transaction_id,
        p.transaction_update_time,
        p.note,
        p.payment_details
    FROM rentals r
    JOIN vehicles v ON r.vehicle = v.id
    JOIN payment_methods pm ON r.payment_method = pm.id
    JOIN payment_statuses ps ON r.payment_status = ps.id
    LEFT JOIN payments p ON r.id = p.rental
    LEFT JOIN coupons c ON r.coupon = c.id
    WHERE r.id = rental_id;
END$$

DELIMITER ;