
  create table "public"."stonks" (
    "id" integer not null,
    "selection" json,
    "created_at" date
      );


CREATE UNIQUE INDEX stonks_pkey ON public.stonks USING btree (id);

alter table "public"."stonks" add constraint "stonks_pkey" PRIMARY KEY using index "stonks_pkey";

grant delete on table "public"."stonks" to "anon";

grant insert on table "public"."stonks" to "anon";

grant references on table "public"."stonks" to "anon";

grant select on table "public"."stonks" to "anon";

grant trigger on table "public"."stonks" to "anon";

grant truncate on table "public"."stonks" to "anon";

grant update on table "public"."stonks" to "anon";

grant delete on table "public"."stonks" to "authenticated";

grant insert on table "public"."stonks" to "authenticated";

grant references on table "public"."stonks" to "authenticated";

grant select on table "public"."stonks" to "authenticated";

grant trigger on table "public"."stonks" to "authenticated";

grant truncate on table "public"."stonks" to "authenticated";

grant update on table "public"."stonks" to "authenticated";

grant delete on table "public"."stonks" to "service_role";

grant insert on table "public"."stonks" to "service_role";

grant references on table "public"."stonks" to "service_role";

grant select on table "public"."stonks" to "service_role";

grant trigger on table "public"."stonks" to "service_role";

grant truncate on table "public"."stonks" to "service_role";

grant update on table "public"."stonks" to "service_role";


