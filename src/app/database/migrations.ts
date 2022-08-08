export default [
  `
  CREATE TABLE farmers(
    id INTEGER PRIMARY KEY,
    no INTEGER unique,
    name TEXT,
    type INTEGER
  );

  `,
  `alter table farmers add center_id INTEGER `
];
