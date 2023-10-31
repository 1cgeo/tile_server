@echo off
SET DATABASE_URL=postgresql://postgres:postgres@localhost/mvt_teste
cd pg_tileserv &  pg_tileserv.exe
