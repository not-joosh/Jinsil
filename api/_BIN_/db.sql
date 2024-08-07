CREATE DATABASE IF NOT EXISTS jinsil;

CREATE TABLE IF NOT EXISTS certificate (
    certificate_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    certificate_title VARCHAR(255) NOT NULL,
    certificate_description TEXT NOT NULL,
    certificate_owner_uid INT NOT NULL,
    redirect_url TEXT NOT NULL,
    image_url TEXT NOT NULL
);


INSERT INTO certificate (user_id, certificate_title, certificate_description, certificate_owner_uid, redirect_url, image_url) VALUES (1, 'AWS Certified Solutions Architect', 'AWS Certified Solutions Architect - Associate', 1, 'https://www.youracclaim.com/badges/1b3b3b3b-1b3b-1b3b-1b3b-1b3b3b3b1b3b', 'https://www.youracclaim.com/badges/1b3b3b3b-1b3b-1b3b-1b3b-1b3b3b3b1b3b');

SELECT * FROM certificate;
-- Getting all from certificate table, to read all values

DELETE FROM certificate WHERE user_id = 1;
-- Removing user_id 1 from certificate table