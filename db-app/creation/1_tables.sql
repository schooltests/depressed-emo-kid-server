create table show_time_library (
  show_time_library_id bigserial,
  vk_user_id int4 not null,
  movie_db_id int4 not null,
  watched boolean not null,
  primary key (show_time_library_id)
);

create table eco_subscribe (
  eco_subscribe_id bigserial,
  vk_user_id int4 not null,
  city_id text not null,
  subscribed boolean not null,
  primary key (eco_subscribe_id)
);

create table show_time_rating (
  show_time_rating_id bigserial,
  vk_user_id int4 not null,
  movie_db_id int4 not null,
  rating numeric(12, 2) not null,
  primary key (show_time_rating_id)
);
