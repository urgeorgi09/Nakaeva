-- Bookings table
create table bookings (
  id uuid primary key default gen_random_uuid(),
  room_id text,
  guest_name text not null,
  guest_email text not null,
  guest_phone text not null,
  check_in date not null,
  check_out date not null,
  guests integer not null,
  total_price numeric not null,
  is_whole_house boolean default false,
  notes text,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled')),
  created_at timestamptz default now()
);

-- Blocked dates table
create table blocked_dates (
  id uuid primary key default gen_random_uuid(),
  room_id text,
  date date not null,
  reason text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table bookings enable row level security;
alter table blocked_dates enable row level security;

-- Public can insert bookings
create policy "Anyone can create booking" on bookings for insert with check (true);

-- Public can read blocked dates
create policy "Anyone can read blocked dates" on blocked_dates for select using (true);
