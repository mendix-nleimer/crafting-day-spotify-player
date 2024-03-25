ALTER TABLE "myfirstmodule$myentity" RENAME TO "myfirstmodule$spotifywebplayer";
ALTER TABLE "myfirstmodule$spotifywebplayer" ALTER COLUMN "mystring" RENAME TO "token";
ALTER TABLE "myfirstmodule$spotifywebplayer" ADD "uri" VARCHAR_IGNORECASE(2147483647) NULL;
UPDATE "mendixsystem$entity" SET "entity_name" = 'MyFirstModule.SpotifyWebPlayer', "table_name" = 'myfirstmodule$spotifywebplayer', "superentity_id" = NULL, "remote" = false, "remote_primary_key" = false WHERE "id" = '42917621-8d47-4764-af53-69cbd5d6ca1e';
UPDATE "mendixsystem$attribute" SET "entity_id" = '42917621-8d47-4764-af53-69cbd5d6ca1e', "attribute_name" = 'Token', "column_name" = 'token', "type" = 30, "length" = 0, "default_value" = '', "is_auto_number" = false WHERE "id" = 'a72213ed-b58c-4d34-bcc8-2a8cee601bcb';
INSERT INTO "mendixsystem$attribute" ("id", "entity_id", "attribute_name", "column_name", "type", "length", "default_value", "is_auto_number") VALUES ('46cab062-a0af-4169-be12-f30d8bc534c4', '42917621-8d47-4764-af53-69cbd5d6ca1e', 'URI', 'uri', 30, 0, '', false);
UPDATE "mendixsystem$version" SET "versionnumber" = '4.2', "lastsyncdate" = '20240307 14:31:05';
