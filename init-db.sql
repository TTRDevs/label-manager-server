-- init-db.sql

-- Create an additional database called 'metabase'
CREATE DATABASE metabase;

-- Connect to the default 'postgres' database to create a table
\c postgres 
-- Create a 'sales_report' table in the 'postgres' database
CREATE TABLE IF NOT EXISTS sales_report (
    unique_bc_id VARCHAR PRIMARY KEY, date TIMESTAMP, paid_to VARCHAR, item_type VARCHAR, item_name VARCHAR, artist VARCHAR, currency VARCHAR, item_price NUMERIC, quantity INTEGER, discount_code VARCHAR, sub_total NUMERIC, shipping NUMERIC, ship_from_country_name VARCHAR, transaction_fee NUMERIC, fee_type VARCHAR, item_total NUMERIC, amount_you_received NUMERIC, bandcamp_transaction_id VARCHAR, paypal_transaction_id VARCHAR, net_amount NUMERIC, package VARCHAR, option VARCHAR, item_url VARCHAR, catalog_number VARCHAR, upc VARCHAR, isrc VARCHAR, buyer_name VARCHAR, buyer_email VARCHAR, buyer_phone VARCHAR, buyer_note VARCHAR, ship_to_name VARCHAR, ship_to_street VARCHAR, ship_to_street_2 VARCHAR, ship_to_city VARCHAR, ship_to_state VARCHAR, ship_to_zip VARCHAR, ship_to_country VARCHAR, ship_to_country_code VARCHAR, ship_date VARCHAR, ship_notes VARCHAR, country VARCHAR, country_code VARCHAR, region_or_state VARCHAR, city VARCHAR, referer VARCHAR, referer_url VARCHAR, sku VARCHAR, seller_tax NUMERIC, marketplace_tax NUMERIC
);
