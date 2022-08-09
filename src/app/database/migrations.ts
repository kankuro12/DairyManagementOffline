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
  `
];
