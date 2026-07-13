# Filippo Resseguier de Miremont — sito personale

Sito personale multilingua (IT/EN/ES) con due sezioni principali — **Portfolio** e
**Shop** — costruito con Next.js (App Router), TypeScript, Tailwind CSS,
Supabase e Stripe. Tutti i contenuti (portfolio e annunci shop) sono gestibili
dal pannello `/admin` senza toccare il codice.

## Stack

- Next.js 16 (App Router) + TypeScript + Tailwind CSS 4
- next-intl per l'internazionalizzazione (IT default, EN, ES)
- Supabase (Postgres + Storage) come database e storage immagini
- Stripe Checkout per i pagamenti dello shop (sessioni dinamiche, senza prodotti precreati)
- Deploy target: Vercel

## 1. Creare il progetto Supabase

1. Vai su [supabase.com](https://supabase.com) e crea un nuovo progetto.
2. In **Project Settings → API** copia:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key (segreta!) → `SUPABASE_SERVICE_ROLE_KEY`
3. Vai su **SQL Editor** ed esegui, in ordine, i file:
   - `supabase/migrations/0001_init.sql` — crea le tabelle (`portfolio_items`,
     `shop_listings`, `contact_messages`), gli enum, le policy RLS e il
     bucket di storage `media` (pubblico in lettura).
   - `supabase/migrations/0002_seed.sql` — inserisce i contenuti iniziali del
     portfolio (esperienze, formazione, certificazioni, percorso personale,
     progetti Mezchila/FENAM/Enotempo). Lo shop parte volutamente vuoto.
   - `supabase/migrations/0003_project_links.sql` — aggiorna i link dei
     progetti (necessario solo se il seed era già stato eseguito prima di
     questo aggiornamento).

   In alternativa, con la Supabase CLI collegata al progetto:

   ```bash
   supabase db push
   ```

Le policy RLS permettono solo la **lettura pubblica** (`select`) su
`portfolio_items` e `shop_listings`; tutte le scritture (creazione, modifica,
eliminazione, upload immagini) passano esclusivamente dal pannello admin
lato server con la `service_role` key, che bypassa RLS.

## 2. Configurare Stripe

1. Crea un account su [stripe.com](https://stripe.com) (modalità test per iniziare).
2. In **Developers → API keys** copia la **Secret key** → `STRIPE_SECRET_KEY`.
3. In **Developers → Webhooks** aggiungi un endpoint:
   - URL: `https://tuodominio.it/api/stripe/webhook`
   - Evento da ascoltare: `checkout.session.completed`
   - Copia il **Signing secret** generato → `STRIPE_WEBHOOK_SECRET`
4. Il checkout è dinamico: ogni annuncio genera una sessione Stripe Checkout
   con `price_data` costruito al volo dal prezzo salvato su Supabase — non
   servono prodotti o prezzi precreati su Stripe.
5. Alla ricezione dell'evento `checkout.session.completed`, il webhook marca
   automaticamente l'annuncio come `venduto`.

Per testare in locale: `stripe listen --forward-to localhost:3000/api/stripe/webhook`
(la CLI stampa un webhook secret temporaneo da usare in `.env.local`).

## 3. Variabili d'ambiente

Copia `.env.example` in `.env.local` per lo sviluppo locale, e configura le
stesse variabili su Vercel (**Project Settings → Environment Variables**):

| Variabile | Descrizione |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del progetto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Chiave anon (pubblica, sola lettura via RLS) |
| `SUPABASE_SERVICE_ROLE_KEY` | Chiave service role (segreta, solo server) |
| `STRIPE_SECRET_KEY` | Chiave segreta Stripe |
| `STRIPE_WEBHOOK_SECRET` | Signing secret del webhook Stripe |
| `ADMIN_PASSWORD` | Password unica per accedere a `/admin` |
| `NEXT_PUBLIC_SITE_URL` | URL pubblico del sito (senza slash finale) |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Email mostrata nella pagina Contatti |

## 4. Sviluppo locale

```bash
npm install
npm run dev
```

Il sito è su [http://localhost:3000](http://localhost:3000), il pannello
admin su `/admin` (password da `ADMIN_PASSWORD`).

## 5. Deploy su Vercel

```bash
npm install -g vercel   # se non già installato
vercel login
vercel link             # collega la cartella al progetto Vercel
vercel env pull .env.local   # opzionale, se le env sono già su Vercel

# imposta le variabili d'ambiente (una volta, o da dashboard Vercel):
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
vercel env add ADMIN_PASSWORD
vercel env add NEXT_PUBLIC_SITE_URL
vercel env add NEXT_PUBLIC_CONTACT_EMAIL

vercel deploy --prod
```

Dopo il primo deploy, aggiorna l'endpoint webhook Stripe con il dominio
definitivo (`https://tuodominio.it/api/stripe/webhook`) e verifica che
`NEXT_PUBLIC_SITE_URL` corrisponda allo stesso dominio.

## Design system

La palette (avorio caldo, bordeaux/terracotta, senape) è definita come CSS
custom properties in `src/app/globals.css` (`:root`): per cambiare i colori
del sito basta modificare i valori lì. La tipografia usa Fraunces (serif,
titoli) e Inter (sans, testo) via `next/font`, self-hosted in build.

Nel portfolio, esperienze/formazione/certificazioni sono divise in due
percorsi ("Tech & Digital" e "Hospitality & Vino") classificati per parole
chiave in `src/lib/portfolio-tracks.ts` — il modello dati Supabase resta
invariato. Le voci con parole chiave tech (IT, software, digital,
informatica…) finiscono nel percorso tech; liceo, musica e lingue nelle
"radici comuni"; tutto il resto in hospitality.

## Struttura del progetto

```
src/app/[locale]/        # sito pubblico (home, portfolio, shop, contact) — IT/EN/ES
src/app/admin/           # pannello admin (protetto da password, non localizzato)
src/app/api/             # route API: checkout, webhook Stripe, contact, login/logout admin
src/lib/data/            # accesso a Supabase (letture pubbliche + scritture admin)
src/lib/supabase/        # client Supabase (anon per il sito, service role per l'admin)
src/components/          # componenti UI condivisi
messages/{it,en,es}.json # testi dell'interfaccia nelle tre lingue
supabase/migrations/     # schema SQL + contenuti iniziali
```

## Gestione contenuti (senza toccare il codice)

Dal pannello `/admin` è possibile:

- Creare, modificare, riordinare ed eliminare le voci del Portfolio
  (esperienze, formazione, certificazioni, percorso personale, progetti),
  con testo separato per italiano, inglese e spagnolo.
- Creare, modificare ed eliminare gli annunci dello Shop, con upload
  multiplo di immagini su Supabase Storage e cambio di stato
  disponibile/venduto.
- Consultare ed eliminare i messaggi ricevuti dal form Contatti.

Lo shop parte vuoto: gli annunci vengono aggiunti dopo il lancio.
