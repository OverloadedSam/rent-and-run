USE rent_and_run;

DELIMITER $$
DROP TRIGGER IF EXISTS rentals_after_update;

CREATE TRIGGER rentals_after_update
  AFTER UPDATE ON rentals
  FOR EACH ROW
BEGIN
  UPDATE vehicles v
  SET v.available_count = IF (
		OLD.rental_completion_date IS NULL AND NEW.rental_completion_date,
		v.available_count + 1, v.available_count
	)
  WHERE v.id = OLD.vehicle;

END$$

DELIMITER ;
