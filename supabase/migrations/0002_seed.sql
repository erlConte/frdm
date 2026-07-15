-- Initial content seed. Everything here is editable later from /admin,
-- this just gives the site real content on first deploy.

-- ---------------------------------------------------------------------------
-- ESPERIENZA
-- ---------------------------------------------------------------------------
insert into public.portfolio_items
  (section, title_it, title_en, title_es, subtitle, period, description_it, description_en, description_es, external_url, sort_order)
values
(
  'esperienza',
  'Founder & IT/Digital Project Lead — Mezchila Srls',
  'Founder & IT/Digital Project Lead — Mezchila Srls',
  'Founder & IT/Digital Project Lead — Mezchila Srls',
  'Mezchila Srls',
  '2025 – oggi',
  'Fondazione e guida del progetto IT e digitale di Mezchila Srls: piattaforma di connessione B2B tra Italia e America Latina per export positioning, produzione locale e partnership strategiche. Gestione dell''identità digitale, dei siti web e della comunicazione dell''ecosistema Mezchila.',
  'Founded and lead the IT/digital side of Mezchila Srls: a B2B connection platform between Italy and Latin America for export positioning, local production and strategic partnerships. Responsible for digital identity, websites and communication across the Mezchila ecosystem.',
  'Fundación y dirección del proyecto IT y digital de Mezchila Srls: plataforma de conexión B2B entre Italia y América Latina para posicionamiento de exportación, producción local y alianzas estratégicas. Responsable de la identidad digital, los sitios web y la comunicación del ecosistema Mezchila.',
  null,
  1
),
(
  'esperienza',
  'Commis de Bar — Hotel de Russie*****S',
  'Bar Commis — Hotel de Russie*****S',
  'Commis de Bar — Hotel de Russie*****S',
  'Hotel de Russie*****S, Rocco Forte Hotels',
  'Maggio 2026 – oggi',
  'Servizio bar in un contesto di hospitality luxury a 5 stelle: mise en place, cocktail, aperitivi e caffetteria. Dall''inizio del contratto affianca il servizio con un supporto informale ai clienti in sala per la consulenza sul vino, senza titolo ufficiale.',
  'Bar service in a 5-star luxury hospitality setting: mise en place, cocktails, aperitifs and coffee service. Since the start of the role, also provides informal wine guidance to guests in the dining room, without an official title.',
  'Servicio de bar en un contexto de hospitality de lujo de 5 estrellas: mise en place, cócteles, aperitivos y cafetería. Desde el inicio del contrato, ofrece también apoyo informal a los clientes en sala para el asesoramiento sobre vino, sin título oficial.',
  null,
  2
),
(
  'esperienza',
  'Bartender — Hotel della Conciliazione****',
  'Bartender — Hotel della Conciliazione****',
  'Bartender — Hotel della Conciliazione****',
  'Hotel della Conciliazione****, 4L Collection',
  'Giugno 2025 – Aprile 2026',
  'Cocktail, caffetteria e mescita bevande in un contesto alberghiero 4 stelle, con supporto a colazioni, cene ed eventi.',
  'Cocktails, coffee service and beverage service in a 4-star hotel setting, supporting breakfasts, dinners and events.',
  'Cócteles, cafetería y servicio de bebidas en un hotel de 4 estrellas, con apoyo en desayunos, cenas y eventos.',
  null,
  3
),
(
  'esperienza',
  'PR — Teatro Centrale',
  'PR — Teatro Centrale',
  'PR — Teatro Centrale',
  'Teatro Centrale, AGM',
  'Ottobre 2022 – Giugno 2025',
  'Accoglienza clienti e gestione delle relazioni con il pubblico, con supporto all''organizzazione di eventi.',
  'Guest reception and public relations management, supporting event organisation.',
  'Recepción de clientes y gestión de relaciones con el público, con apoyo en la organización de eventos.',
  null,
  4
);

-- ---------------------------------------------------------------------------
-- PROGETTO (ecosistema Mezchila / FENAM / Enotempo)
-- ---------------------------------------------------------------------------
insert into public.portfolio_items
  (section, title_it, title_en, title_es, subtitle, period, description_it, description_en, description_es, external_url, sort_order)
values
(
  'progetto',
  'Mezchila',
  'Mezchila',
  'Mezchila',
  'Ponte commerciale Italia – America Latina',
  '2025 – oggi',
  'Piattaforma di connessione B2B tra Italia e America Latina: export positioning, produzione locale e partnership strategiche. Il progetto capofila dell''ecosistema imprenditoriale.',
  'A B2B connection platform between Italy and Latin America: export positioning, local production and strategic partnerships. The flagship project of the entrepreneurial ecosystem.',
  'Plataforma de conexión B2B entre Italia y América Latina: posicionamiento de exportación, producción local y alianzas estratégicas. El proyecto insignia del ecosistema empresarial.',
  'https://www.mezchila.it',
  1
),
(
  'progetto',
  'FENAM',
  'FENAM',
  'FENAM',
  'Federazione Nazionale Associazioni Multiculturali',
  '2025 – oggi',
  'Federazione nazionale delle associazioni multiculturali, progetto in fase iniziale, pensato per dare struttura e rappresentanza alle realtà interculturali collegate a Mezchila.',
  'A national federation of multicultural associations, still in its early stages, designed to give structure and representation to the intercultural communities linked to Mezchila.',
  'Federación nacional de asociaciones multiculturales, proyecto en fase inicial, pensado para dar estructura y representación a las realidades interculturales vinculadas a Mezchila.',
  'https://fenam.website',
  2
),
(
  'progetto',
  'Enotempo',
  'Enotempo',
  'Enotempo',
  'Eventi enogastronomici interculturali Italia–LatAm',
  '2025 – oggi',
  'Eventi enogastronomici interculturali che uniscono Italia e America Latina, collegato a FENAM per l''accesso alla rete delle associazioni.',
  'Intercultural food-and-wine events connecting Italy and Latin America, linked to FENAM for access to the associations'' network.',
  'Eventos enogastronómicos interculturales que unen Italia y América Latina, vinculado a FENAM para el acceso a la red de asociaciones.',
  'https://www.enotempo.it',
  3
);

-- ---------------------------------------------------------------------------
-- FORMAZIONE
-- ---------------------------------------------------------------------------
insert into public.portfolio_items
  (section, title_it, title_en, title_es, subtitle, period, description_it, description_en, description_es, external_url, sort_order)
values
(
  'formazione',
  'Ingegneria Informatica',
  'Computer Engineering',
  'Ingeniería Informática',
  'Università Unimercatorum',
  '2024 – in corso',
  'Percorso di laurea in Ingegneria Informatica, parallelo alla formazione in ambito Food & Beverage.',
  'Bachelor''s path in Computer Engineering, pursued in parallel with the Food & Beverage education.',
  'Grado en Ingeniería Informática, cursado en paralelo con la formación en Food & Beverage.',
  null,
  1
),
(
  'formazione',
  'Food & Beverage Management',
  'Food & Beverage Management',
  'Food & Beverage Management',
  'ITS Turismo Academy Roma',
  '2024 – 2026',
  'Formazione superiore in Food & Beverage Management, con focus su gestione operativa e servizio nell''hospitality.',
  'Higher education in Food & Beverage Management, focused on operational management and hospitality service.',
  'Formación superior en Food & Beverage Management, con foco en gestión operativa y servicio en hospitality.',
  null,
  2
),
(
  'formazione',
  'Applied Computer Science and Artificial Intelligence (ACSAI)',
  'Applied Computer Science and Artificial Intelligence (ACSAI)',
  'Applied Computer Science and Artificial Intelligence (ACSAI)',
  'Sapienza Università di Roma',
  '2022 – 2024',
  'Esami rilevanti: Programming & OOP (Python, Java), Computer Architecture & Systems (incl. Assembly/RISC-V), Mathematics & Probability.',
  'Relevant exams: Programming & OOP (Python, Java), Computer Architecture & Systems (incl. Assembly/RISC-V), Mathematics & Probability.',
  'Exámenes relevantes: Programming & OOP (Python, Java), Computer Architecture & Systems (incl. Assembly/RISC-V), Mathematics & Probability.',
  null,
  3
),
(
  'formazione',
  'Diploma di Maturità Scientifica',
  'Scientific High School Diploma',
  'Bachillerato Científico',
  'Liceo Scientifico "S. Cannizzaro", Roma',
  '2017 – 2022',
  'Diploma di maturità scientifica, base del percorso successivo tra tecnologia e scienze.',
  'Scientific high school diploma, the foundation for the later path between technology and science.',
  'Diploma de bachillerato científico, base del recorrido posterior entre tecnología y ciencias.',
  null,
  4
);

-- ---------------------------------------------------------------------------
-- CERTIFICAZIONE
-- ---------------------------------------------------------------------------
insert into public.portfolio_items
  (section, title_it, title_en, title_es, subtitle, period, description_it, description_en, description_es, external_url, sort_order)
values
(
  'certificazione',
  'Sommelier del Vino, Terzo Livello',
  'Wine Sommelier, Third Level',
  'Sommelier de Vino, Tercer Nivel',
  'FIS — Federazione Italiana Sommelier',
  null,
  'Certificazione di terzo livello come sommelier del vino.',
  'Third-level wine sommelier certification.',
  'Certificación de tercer nivel como sommelier de vino.',
  null,
  1
),
(
  'certificazione',
  'Sommelier Olio',
  'Olive Oil Sommelier',
  'Sommelier de Aceite',
  'FIS — Federazione Italiana Sommelier',
  null,
  'Certificazione come sommelier dell''olio.',
  'Sommelier certification for olive oil.',
  'Certificación como sommelier de aceite.',
  null,
  2
),
(
  'certificazione',
  'Sommelier Formaggi',
  'Cheese Sommelier',
  'Sommelier de Quesos',
  'FIS — Federazione Italiana Sommelier',
  null,
  'Certificazione come sommelier dei formaggi.',
  'Sommelier certification for cheese.',
  'Certificación como sommelier de quesos.',
  null,
  3
),
(
  'certificazione',
  'HACCP',
  'HACCP',
  'HACCP',
  null,
  '2025',
  'Certificazione HACCP per la sicurezza alimentare.',
  'HACCP food safety certification.',
  'Certificación HACCP de seguridad alimentaria.',
  null,
  4
),
(
  'certificazione',
  'Professional Bartender – Mixology',
  'Professional Bartender – Mixology',
  'Professional Bartender – Mixology',
  null,
  '2023',
  'Certificazione professionale in mixology e bartending.',
  'Professional certification in mixology and bartending.',
  'Certificación profesional en mixología y bartending.',
  null,
  5
),
(
  'certificazione',
  'English PET Cambridge',
  'Cambridge English PET',
  'Cambridge English PET',
  null,
  '2021',
  'Certificazione Cambridge English PET.',
  'Cambridge English PET certification.',
  'Certificación Cambridge English PET.',
  null,
  6
),
(
  'certificazione',
  'ABRSM Grade 8 Piano',
  'ABRSM Grade 8 Piano',
  'ABRSM Grade 8 de Piano',
  null,
  '2021',
  'Grade 8 pianoforte, ABRSM.',
  'ABRSM Grade 8 Piano.',
  'ABRSM Grade 8 de piano.',
  null,
  7
),
(
  'certificazione',
  'ABRSM Grade 5 Music Theory',
  'ABRSM Grade 5 Music Theory',
  'ABRSM Grade 5 de Teoría Musical',
  null,
  '2021',
  'Grade 5 teoria musicale, ABRSM.',
  'ABRSM Grade 5 Music Theory.',
  'ABRSM Grade 5 de teoría musical.',
  null,
  8
),
(
  'certificazione',
  'ABRSM Grade 5 Piano',
  'ABRSM Grade 5 Piano',
  'ABRSM Grade 5 de Piano',
  null,
  '2018',
  'Grade 5 pianoforte, ABRSM.',
  'ABRSM Grade 5 Piano.',
  'ABRSM Grade 5 de piano.',
  null,
  9
);

-- ---------------------------------------------------------------------------
-- PERCORSO_PERSONALE
-- ---------------------------------------------------------------------------
insert into public.portfolio_items
  (section, title_it, title_en, title_es, subtitle, period, description_it, description_en, description_es, external_url, sort_order)
values
(
  'percorso_personale',
  'Musica e pianoforte classico',
  'Music and classical piano',
  'Música y piano clásico',
  null,
  null,
  'Studio del pianoforte classico fino al Grade 8 ABRSM, insieme alla teoria musicale: una passione che accompagna il percorso tra vino, hospitality e tecnologia.',
  'Classical piano studies up to ABRSM Grade 8, alongside music theory: a passion that runs alongside the path through wine, hospitality and technology.',
  'Estudio de piano clásico hasta el Grade 8 de ABRSM, junto con teoría musical: una pasión que acompaña el recorrido entre vino, hospitality y tecnología.',
  null,
  1
),
(
  'percorso_personale',
  'Liceo Scientifico',
  'Scientific high school',
  'Bachillerato científico',
  'Liceo Scientifico "S. Cannizzaro", Roma',
  null,
  'Il percorso liceale scientifico come contrappunto razionale e analitico al lato creativo di hospitality e vino.',
  'The scientific high school path as a rational, analytical counterpoint to the creative side of hospitality and wine.',
  'El recorrido de bachillerato científico como contrapunto racional y analítico al lado creativo de hospitality y vino.',
  null,
  2
),
(
  'percorso_personale',
  'Lingue parlate',
  'Spoken languages',
  'Idiomas hablados',
  null,
  null,
  'Italiano madrelingua, inglese fluente, spagnolo intermedio.',
  'Native Italian, fluent English, intermediate Spanish.',
  'Italiano nativo, inglés fluido, español intermedio.',
  null,
  3
);
