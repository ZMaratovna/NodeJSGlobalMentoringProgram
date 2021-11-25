CREATE TABLE "user" (
    id uuid PRIMARY KEY,
    login varchar(255) UNIQUE NOT NULL,
    password varchar(255) NOT NULL,
    age int,
    "isDeleted" boolean
);
