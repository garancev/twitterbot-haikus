
CREATE TABLE public.haikus
(
    id bigint NOT NULL DEFAULT nextval('haikus_id_seq'::regclass),
    line1 text COLLATE pg_catalog."default",
    line2 text COLLATE pg_catalog."default",
    line3 text COLLATE pg_catalog."default",
    author text COLLATE pg_catalog."default",
    emoji text COLLATE pg_catalog."default",
    tweeted boolean DEFAULT false,
    CONSTRAINT haikus_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.haikus
    OWNER to xpiwknlhakhicz;
