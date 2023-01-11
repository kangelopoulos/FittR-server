CREATE TABLE public.users (
  "_id" serial NOT NULL,
  "email" varchar(60) NOT NULL UNIQUE,
  "password" varchar NOT NULL,
  "display_name" varchar(30),
  CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE  
);

CREATE TABLE public.user_weights (
  "_id" serial NOT NULL, 
  "user_id" integer NOT NULL, 
  "date" date NOT NULL DEFAULT NOW()::date, 
  "weight" decimal NOT NULL,
  CONSTRAINT "user_weights_pk" PRIMARY KEY ("_id"),
  CONSTRAINT "user_weights_fk" FOREIGN KEY ("user_id") REFERENCES public.users("_id")
) WITH (
  OIDS=FALSE  
);