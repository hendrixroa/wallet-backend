# Schema database for didactical proposal

CREATE DATABASE wallet_shareable;

use wallet_shareable;

# Tables for database, the field is_admin can be 1 -> is admin user or 0 -> is not admin user

CREATE TABLE users (
	id int NOT NULL,
	username varchar(32) NOT NULL,
	password VARCHAR(100) NOT NULL,
	is_admin int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE wallet (
	id int NOT NULL,
	id_user int NOT NULL,
	money DOUBLE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# The field type on table transactions can be retirement, payment

CREATE TABLE transactions (
	id int NOT NULL,
	id_user int NOT NULL,
	date DATE NOT NULL,
	type VARCHAR(20) NOT NULL,
	quantity DOUBLE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# The field status on table requests can be progress, accepted, rejected
# The field operation can be the same of column type table transactions

CREATE TABLE requests (
	id int(10) NOT NULL,
	date DATE NOT NULL,
	id_requester int NOT NULL,
	status VARCHAR(20) NOT NULL,
	message VARCHAR(150),
	operation VARCHAR(20) NOT NULL,
	quantity DOUBLE NOT NULL,
	id_admin_request int
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE wallet ADD PRIMARY KEY (id);
ALTER TABLE transactions ADD PRIMARY KEY (id);
ALTER TABLE requests ADD PRIMARY KEY (id);

ALTER TABLE users MODIFY id int(10) NOT NULL AUTO_INCREMENT;
ALTER TABLE wallet MODIFY id int(10) NOT NULL AUTO_INCREMENT;
ALTER TABLE transactions MODIFY id int(10) NOT NULL AUTO_INCREMENT;
ALTER TABLE requests MODIFY id int(10) NOT NULL AUTO_INCREMENT;

ALTER TABLE wallet ADD FOREIGN KEY (id_user) REFERENCES users(id);
ALTER TABLE transactions ADD FOREIGN KEY (id_user) REFERENCES users(id);
ALTER TABLE requests ADD FOREIGN KEY (id_requester) REFERENCES users(id);
ALTER TABLE requests ADD FOREIGN KEY (id_admin_request) REFERENCES users(id);

# Users not admin

INSERT INTO users (username,password,is_admin) VALUES ('johnDoe', sha1('johnDoe'), 0);
INSERT INTO users (username,password,is_admin) VALUES ('janeDoe', sha1('janeDoe'), 0);

# Users admin

INSERT INTO users (username,password,is_admin) VALUES ('admin1', sha1('admin1'), 1);
INSERT INTO users (username,password,is_admin) VALUES ('admin2', sha1('admin2'), 1);

# Wallet of users

INSERT INTO wallet (id_user,money) VALUES (1, 300000);
INSERT INTO wallet (id_user,money) VALUES (2, 600000);