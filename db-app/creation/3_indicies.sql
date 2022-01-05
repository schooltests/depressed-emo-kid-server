create unique index uniq_vk_user_movie_item_idx on show_time_library (vk_user_id, movie_db_id);
create index lib_vk_user_idx on show_time_library (vk_user_id);

create index eco_vk_user_id_idx on eco_subscribe (vk_user_id);
create index eco_city_id_idx on eco_subscribe (city_id);

create unique index uniq_vk_user_movie_rating_idx on show_time_rating (vk_user_id, movie_db_id);
create index rating_vk_user_idx on show_time_rating (vk_user_id);