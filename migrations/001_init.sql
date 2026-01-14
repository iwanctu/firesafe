-- Initial schema for Postgres

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT,
  category TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  discount NUMERIC DEFAULT 0,
  stock INTEGER DEFAULT 0,
  specs JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT DEFAULT 'layers',
  color TEXT DEFAULT 'bg-orange-500/10',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS layout_config (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  visible BOOLEAN DEFAULT TRUE,
  label TEXT NOT NULL,
  position INTEGER
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'public',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
