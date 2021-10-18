USE rent_and_run;

DELIMITER $$
DROP TRIGGER IF EXISTS payments_after_insert;

CREATE TRIGGER payments_after_insert
  AFTER INSERT ON payments
  FOR EACH ROW
BEGIN
  UPDATE rentals r
  SET payment_status = NEW.status
  WHERE r.id = NEW.rental;

  UPDATE vehicles v
  SET v.available_count = IF(NEW.status = 1, v.available_count - 1, v.available_count)
  WHERE v.id = (SELECT vehicle
                FROM rentals r
                WHERE r.id = NEW.rental);

END$$

DELIMITER ;
