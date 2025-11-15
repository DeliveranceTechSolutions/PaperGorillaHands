drop table if exists "stonks";

create table if not exists "stonks" (
  "id" integer not null primary key,
  "selection" json,
  "created_at" integer
);