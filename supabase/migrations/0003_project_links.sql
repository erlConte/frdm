-- Aggiunge i link verificati ai progetti dell'ecosistema.
-- Idempotente: aggiorna per titolo, senza toccare altri campi.

update public.portfolio_items
set external_url = 'https://www.mezchila.it'
where section = 'progetto' and title_it = 'Mezchila';

update public.portfolio_items
set external_url = 'https://fenam.website'
where section = 'progetto' and title_it = 'FENAM';

update public.portfolio_items
set external_url = 'https://www.enotempo.it'
where section = 'progetto' and title_it = 'Enotempo';
