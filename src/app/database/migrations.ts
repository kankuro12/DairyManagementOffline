export default [
  `
  CREATE TABLE IF NOT EXISTS farmers(
    id INTEGER PRIMARY KEY,
    no INTEGER,
    name TEXT,
    type INTEGER,
    center_id INTEGER
  );

  `,
  `
  create table IF NOT EXISTS rates(
    id INTEGER PRIMARY KEY,
    name TEXT,
    rate DECIMAL(8,2)
  );

  `,
  `
  create table IF NOT EXISTS centers(
    id INTEGER PRIMARY KEY,
    name TEXT,
    snf_rate DECIMAL(8,2),
    fat_rate DECIMAL(8,2),
    cc DECIMAL(8,2),
    tc DECIMAL(8,2)
  );
  `,
  `
  create table IF NOT EXISTS milkdatas(
    id INTEGER PRIMARY KEY,
    date int,
    m_amount decimal(10,3),
    e_amount decimal(10,3),
    user_id integer,
    center_id integer,
    FOREIGN KEY(user_id) REFERENCES farmers(id),
    FOREIGN KEY(center_id) REFERENCES centers(id)
  );
  `,
  `
  create table IF NOT EXISTS advances(
    id INTEGER PRIMARY KEY,
    date int,
    title text,
    amount decimal(10,2),
    user_id integer,
    FOREIGN KEY(user_id) REFERENCES farmers(id)
  );`,
  //type 2=paid by dairy, 1=paid by farmer
  `
  create table IF NOT EXISTS farmerpayments(
    id INTEGER PRIMARY KEY,
    date int,
    title text,
    amount decimal(10,2),
    user_id integer,
    type integer default 1,
    FOREIGN KEY(user_id) REFERENCES farmers(id)
  );
  `,
  `
  create table IF NOT EXISTS milkamounts(
    id INTEGER PRIMARY KEY,
    session integer,
    snf decimal(10,2),
    fat decimal(10,2),
    rate decimal(10,2),
    amount decimal(10,2),
    user_id integer,
    FOREIGN KEY(user_id) REFERENCES farmers(id)
  );
  `,
  `
  create table IF NOT EXISTS snffats(
    id INTEGER PRIMARY KEY,
    date integer,
    snf decimal(10,2),
    fat decimal(10,2),
    user_id integer,
    FOREIGN KEY(user_id) REFERENCES farmers(id)
  );
  `,
  `
  create table IF NOT EXISTS customers(
    id INTEGER PRIMARY KEY,
    name text,
    phone varchar(15) UNIQUE
  );
  `,
  `
  create table IF NOT EXISTS chalanitems(
    id INTEGER PRIMARY KEY,
    title TEXT,
    item_id INTEGER,
    rate decimal(10,2),
    date INTEGER

  );
  `,
  `
  create table IF NOT EXISTS chalansellitems(
    id INTEGER PRIMARY KEY,
    title TEXT,
    item_id INTEGER,
    rate decimal(10,2),
    date INTEGER,
    phone text
  );
  `,
  `
  create table IF NOT EXISTS chalanpayments(
    id INTEGER PRIMARY KEY,
    amount decimal(10,2),
    date INTEGER,
    phone text
  );
  `,
  `ALTER TABLE chalansellitems
  ADD qty decimal(10,2);`
  ,
  `ALTER TABLE chalansellitems
  ADD sync integer default 0;`
  ,
  `ALTER TABLE chalanitems
  ADD user_id integer;`
  ,
  `ALTER TABLE chalansellitems
  ADD user_id integer;`
  ,
  `ALTER TABLE chalanpayments
  ADD user_id integer;`
  ,
  `ALTER TABLE chalanpayments
  ADD sync integer default 0;`
  ,
  `
  create table IF NOT EXISTS bills(
    id INTEGER PRIMARY KEY,
    total decimal(10,2),
    discount decimal(10,2),
    paid decimal(10,2),
    date INTEGER,
    particular text,
    phone text,
    name text
  );`,
  `ALTER TABLE bills
  ADD sync integer default 0;`
  ,
  `
  create table IF NOT EXISTS customerpayments(
    id INTEGER PRIMARY KEY,
    amount decimal(10,2),
    date INTEGER,
    phone text,
    name text,
    sync INTEGER default 0
  );`,
  `ALTER TABLE customers
  ADD area_id integer default 0;`
];
