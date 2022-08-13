export default [
  `
  CREATE TABLE farmers(
    id INTEGER PRIMARY KEY,
    no INTEGER unique,
    name TEXT,
    type INTEGER
  );

  `,
  `alter table farmers add center_id INTEGER `,
  `
  create table rates(
    id INTEGER PRIMARY KEY,
    name TEXT,
    rate DECIMAL(8,2)
  );

  `,
  `
  create table centers(
    id INTEGER PRIMARY KEY,
    name TEXT,
    snf_rate DECIMAL(8,2),
    fat_rate DECIMAL(8,2),
    cc DECIMAL(8,2),
    tc DECIMAL(8,2)
  );
  `,
  `
  create table milkdatas(
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
  create table advances(
    id INTEGER PRIMARY KEY,
    date int,
    title text,
    amount decimal(10,2),
    user_id integer,
    FOREIGN KEY(user_id) REFERENCES farmers(id)
  );`

];
