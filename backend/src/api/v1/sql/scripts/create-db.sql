-- MySQL Workbench Forward Engineering
SET
  @OLD_UNIQUE_CHECKS = @ @UNIQUE_CHECKS,
  UNIQUE_CHECKS = 0;

SET
  @OLD_FOREIGN_KEY_CHECKS = @ @FOREIGN_KEY_CHECKS,
  FOREIGN_KEY_CHECKS = 0;

SET
  @OLD_SQL_MODE = @ @SQL_MODE,
  SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema rent_and_run
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema rent_and_run
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `rent_and_run` DEFAULT CHARACTER SET utf8;

USE `rent_and_run`;

-- -----------------------------------------------------
-- Table `rent_and_run`.`vehicle_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rent_and_run`.`vehicle_types` (
  `id` TINYINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `rent_and_run`.`fuel_types`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rent_and_run`.`fuel_types` (
  `id` TINYINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `rent_and_run`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rent_and_run`.`roles` (
  `id` TINYINT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `rent_and_run`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rent_and_run`.`users` (
  `id` VARCHAR(36) NOT NULL,
  `first_name` VARCHAR(64) NOT NULL,
  `last_name` VARCHAR(64) NULL,
  `phone` VARCHAR(10) NOT NULL,
  `email` VARCHAR(256) NOT NULL,
  `password` VARCHAR(256) NOT NULL,
  `role` TINYINT NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `fk_users_roles_idx` (`role` ASC) VISIBLE,
  UNIQUE INDEX `phone_UNIQUE` (`phone` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_users_roles` FOREIGN KEY (`role`) REFERENCES `rent_and_run`.`roles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `rent_and_run`.`coupons`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rent_and_run`.`coupons` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `coupon_code` VARCHAR(16) NOT NULL,
  `discount_amout` DECIMAL(4, 2) NOT NULL,
  `valid_till` DATE NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `rent_and_run`.`payment_methods`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rent_and_run`.`payment_methods` (
  `id` TINYINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `rent_and_run`.`vehicles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rent_and_run`.`vehicles` (
  `id` VARCHAR(36) NOT NULL,
  `vehicle_type` TINYINT NOT NULL,
  `fuel_type` TINYINT NOT NULL,
  `brand` VARCHAR(64) NOT NULL,
  `model_name` VARCHAR(64) NOT NULL,
  `images` JSON NULL,
  `milage_in_km` TINYINT NOT NULL,
  `power_in_cc` SMALLINT NOT NULL,
  `top_speed_in_kmph` SMALLINT NOT NULL,
  `available_count` INT NOT NULL,
  `seats` SMALLINT NOT NULL DEFAULT 2,
  `daily_rental_rate` DECIMAL(9, 2) NOT NULL,
  `security_amount` DECIMAL(9, 2) NOT NULL,
  `description` VARCHAR(512) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_vehicles_vehicle_types1_idx` (`vehicle_type` ASC) VISIBLE,
  INDEX `fk_vehicles_fuel_types1_idx` (`fuel_type` ASC) VISIBLE,
  CONSTRAINT `fk_vehicles_vehicle_types1` FOREIGN KEY (`vehicle_type`) REFERENCES `rent_and_run`.`vehicle_types` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_vehicles_fuel_types1` FOREIGN KEY (`fuel_type`) REFERENCES `rent_and_run`.`fuel_types` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `rent_and_run`.`payment_statuses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rent_and_run`.`payment_statuses` (
  `id` TINYINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `rent_and_run`.`rentals`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rent_and_run`.`rentals` (
  `id` VARCHAR(36) NOT NULL,
  `user` VARCHAR(36) NOT NULL,
  `vehicle` VARCHAR(36) NOT NULL,
  `booking_date` DATETIME NOT NULL,
  `returning_date` DATETIME NOT NULL,
  `drop_address` VARCHAR(256) NOT NULL,
  `rent_amount` DECIMAL(9, 2) NOT NULL,
  `payment_status` TINYINT NULL,
  `coupon` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_rentals_users1_idx` (`user` ASC) VISIBLE,
  INDEX `fk_rentals_vehicles1_idx` (`vehicle` ASC) VISIBLE,
  INDEX `fk_rentals_coupons1_idx` (`coupon` ASC) VISIBLE,
  INDEX `fk_rentals_payment_statuses1_idx` (`payment_status` ASC) VISIBLE,
  CONSTRAINT `fk_rentals_users1` FOREIGN KEY (`user`) REFERENCES `rent_and_run`.`users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_rentals_vehicles1` FOREIGN KEY (`vehicle`) REFERENCES `rent_and_run`.`vehicles` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_rentals_coupons1` FOREIGN KEY (`coupon`) REFERENCES `rent_and_run`.`coupons` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    CONSTRAINT `fk_rentals_payment_statuses1` FOREIGN KEY (`payment_status`) REFERENCES `rent_and_run`.`payment_statuses` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `rent_and_run`.`payments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `rent_and_run`.`payments` (
  `id` VARCHAR(36) NOT NULL,
  `rental` VARCHAR(36) NOT NULL,
  `payment_method` TINYINT NOT NULL,
  `total_amount` DECIMAL(9, 2) NOT NULL,
  `status` TINYINT NOT NULL,
  `transaction_id` VARCHAR(256) NOT NULL,
  `transaction_update_time` DATETIME NOT NULL,
  `note` VARCHAR(512) NULL,
  `payment_details` JSON NULL,
  PRIMARY KEY (`id`, `rental`),
  INDEX `fk_payments_payment_methods1_idx` (`payment_method` ASC) VISIBLE,
  INDEX `fk_payments_rentals1_idx` (`rental` ASC) VISIBLE,
  INDEX `fk_payments_payment_statuses1_idx` (`status` ASC) VISIBLE,
  CONSTRAINT `fk_payments_payment_methods1` FOREIGN KEY (`payment_method`) REFERENCES `rent_and_run`.`payment_methods` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_payments_rentals1` FOREIGN KEY (`rental`) REFERENCES `rent_and_run`.`rentals` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `fk_payments_payment_statuses1` FOREIGN KEY (`status`) REFERENCES `rent_and_run`.`payment_statuses` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB;

SET
  SQL_MODE = @OLD_SQL_MODE;

SET
  FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET
  UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;