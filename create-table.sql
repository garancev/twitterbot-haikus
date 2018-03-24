
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

CREATE TABLE public.emojis
(
    name text COLLATE pg_catalog."default" NOT NULL,
    code text COLLATE pg_catalog."default",
    CONSTRAINT emojis_pkey PRIMARY KEY (name)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.emojis
    OWNER to xpiwknlhakhicz;


    ALTER TABLE public.haikus
    ADD CONSTRAINT haikus_emoji_fkey FOREIGN KEY (emoji)
    REFERENCES public.emojis (name) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;