export default [
  `
  CREATE TABLE IF NOT EXISTS farmers(
    id INTEGER PRIMARY KEY,
    no INTEGER unique,
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
  `

];
