export const locales = ["it", "en", "es"] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export const profile = {
  name: "Filippo Resseguier de Miremont",
  shortName: "FRDM",
  email: "filippo.redemi@gmail.com",
  phone: "+39 393 7337 324",
  phoneHref: "tel:+393937337324",
  emailHref: "mailto:filippo.redemi@gmail.com",
  location: "Rome, Italy",
  cvPath: "/cv.pdf",
  links: {
    linkedin: "https://www.linkedin.com/in/INSERISCI-IL-TUO-LINKEDIN",
    github: "https://github.com/INSERISCI-IL-TUO-GITHUB",
    indeed: "https://www.indeed.com/INSERISCI-IL-TUO-LINK",
    paypal: "https://www.paypal.com/paypalme/INSERISCI-IL-TUO-LINK",
  },
};

const dictionaries = {
  it: {
    nav: {
      home: "Home",
      about: "Chi sono",
      contact: "Contatti",
      donate: "Supporta",
    },
    common: {
      contact: "Contatti",
      downloadCv: "Scarica CV",
      support: "Supporta FRDM",
      goToDonate: "Vai alla pagina donate",
      basedIn: "Base",
      reachOut: "Contatto",
      openProfile: "Apri profilo",
      phone: "Telefono",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      indeed: "Indeed",
    },
    home: {
      eyebrow: "Portfolio personale",
      headline: "Uno spazio personale costruito con ambizione, struttura e direzione.",
      intro:
        "FRDM è il mio punto di presenza online: ordinato, essenziale, pensato per raccogliere chi sono, come lavoro e la traiettoria che sto costruendo.",
      heroAsideTitle: "Tono",
      heroAsideText: "Editoriale, pulito, costruito per crescere.",
      whoEyebrow: "Chi sono",
      whoTitle: "Una presenza chiara, non rumorosa.",
      whoText:
        "Non uso questo sito per sembrare arrivato. Lo uso per presentarmi con precisione: ordine, coerenza e intenzione.",
      readMore: "Leggi il profilo completo",
      pathEyebrow: "Percorso",
      pathTitle: "Dalla persona alle esperienze, senza perdere coerenza.",
      path: [
        {
          title: "Persona",
          body: "Ambizione, serietà e attenzione al modo in cui mi presento e lavoro.",
        },
        {
          title: "Direzione",
          body: "Mi interessa costruire qualcosa di solido nel tempo, non solo apparire bene oggi.",
        },
        {
          title: "Esperienze",
          body: "Hospitality, ruoli operativi, contatto diretto con le persone e disciplina sul campo.",
        },
        {
          title: "Visione",
          body: "Una traiettoria che unisce presenza, lavoro reale, crescita personale e digitale.",
        },
      ],
      snapshotEyebrow: "Sintesi",
      snapshotTitle: "I punti essenziali, in vista rapida.",
      snapshot: [
        {
          eyebrow: "Experience",
          title: "Hospitality e ruoli front-facing",
          body: "Servizio, operatività, attenzione all’esperienza e responsabilità concreta.",
        },
        {
          eyebrow: "Education",
          title: "F&B management + base informatica",
          body: "Una combinazione non comune tra formazione hospitality e struttura tecnica.",
        },
        {
          eyebrow: "Range",
          title: "Competenze, certificazioni, interessi",
          body: "Dalla sala al digitale, con una base culturale e professionale in costruzione.",
        },
        {
          eyebrow: "Contact",
          title: "Presenza diretta e ordinata",
          body: "Contatti chiari, CV scaricabile e una pagina dedicata per scrivermi.",
        },
      ],
      contactEyebrow: "Contatto diretto",
      contactTitle: "Contattami senza passaggi inutili.",
      supportEyebrow: "Supporto",
      supportTitle: "Supporta il progetto dietro FRDM.",
    },
    about: {
      eyebrow: "Chi sono",
      title: "Una biografia costruita per blocchi, non per slogan.",
      intro:
        "Più che una bio unica, qui c’è un percorso: dalla persona alle esperienze, fino alla direzione che sto costruendo.",
      sections: [
        {
          title: "La persona",
          body:
            "Sono Filippo Resseguier de Miremont. Mi interessa costruire una presenza che sia ordinata, credibile e coerente con ciò che sto facendo nella vita reale. Non mi interessa sembrare finito; mi interessa sembrare serio.",
        },
        {
          title: "La direzione",
          body:
            "Ambizione e struttura sono le due parole che tengono insieme il mio percorso. Voglio crescere molto, farlo bene, e costruire qualcosa che abbia valore nel tempo.",
        },
        {
          title: "Le esperienze",
          body:
            "Il lavoro a contatto con le persone mi ha dato disciplina, presenza, ritmo e capacità di tenere standard alti anche in contesti dinamici. È una scuola concreta, che vale molto più di tante parole.",
        },
        {
          title: "Il lavoro",
          body:
            "Mi muovo dentro il mondo hospitality, ma non soltanto lì. Porto con me anche una base tecnica e digitale, che mi permette di ragionare in modo più strutturato, operativo e orientato alla costruzione.",
        },
        {
          title: "La visione",
          body:
            "FRDM nasce proprio per questo: non come vetrina casuale, ma come uno spazio personale in cui raccogliere identità, contatti e direzione. Pulito, essenziale, pensato per crescere con me.",
        },
      ],
    },
    contact: {
      eyebrow: "Contatti",
      title: "Parliamone in modo semplice.",
      intro:
        "Puoi scrivermi direttamente via email o telefono, oppure usare il form per aprire una bozza messaggio.",
      directLinks: "Link diretti",
      message: "Messaggio",
      messageTitle: "Scrivi qui e apri la bozza email.",
      form: {
        name: "Nome",
        subject: "Oggetto",
        message: "Messaggio",
        submit: "Apri email",
        placeholderName: "Il tuo nome",
        placeholderSubject: "Oggetto",
        placeholderMessage: "Scrivi qui il messaggio",
        fallbackSubject: "Messaggio dal sito",
      },
    },
    donate: {
      eyebrow: "Supporta",
      title: "Un modo semplice per sostenere il progetto.",
      intro:
        "FRDM è un progetto personale, costruito con cura e pensato per crescere nel tempo. Se ti va di sostenerlo, puoi farlo qui.",
      whyTitle: "Perché esiste",
      whyText1:
        "FRDM non è un dominio parcheggiato: è una base personale e professionale che voglio rendere sempre più curata, utile e completa.",
      whyText2:
        "Il supporto aiuta questo processo. Senza retorica, senza scene: solo un modo diretto per dare una mano.",
      cardTitle: "PayPal",
      cardText: "Usa il pulsante qui sotto per aprire la pagina di supporto.",
    },
    modal: {
      eyebrow: "Supporta",
      title: "Supporta il progetto dietro FRDM",
      close: "Chiudi",
      open: "Apri donate",
      paypal: "Supporta con PayPal",
    },
    footer: {
      tagline:
        "Una presenza digitale personale, costruita con ordine e margine di crescita.",
    },
  },

  en: {
    nav: {
      home: "Home",
      about: "About",
      contact: "Contact",
      donate: "Donate",
    },
    common: {
      contact: "Contact",
      downloadCv: "Download CV",
      support: "Support FRDM",
      goToDonate: "Go to donate page",
      basedIn: "Based in",
      reachOut: "Reach out",
      openProfile: "Open profile",
      phone: "Phone",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      indeed: "Indeed",
    },
    home: {
      eyebrow: "Personal portfolio",
      headline: "A personal space shaped by ambition, structure, and direction.",
      intro:
        "FRDM is my digital point of presence: ordered, essential, and built to collect who I am, how I work, and the direction I am building.",
      heroAsideTitle: "Tone",
      heroAsideText: "Editorial, clean, built to grow.",
      whoEyebrow: "About",
      whoTitle: "A clear presence, not a noisy one.",
      whoText:
        "I’m not using this site to look finished. I’m using it to present myself with precision: order, coherence, and intent.",
      readMore: "Read the full profile",
      pathEyebrow: "Path",
      pathTitle: "From the person to experience, without losing coherence.",
      path: [
        {
          title: "Person",
          body: "Ambition, seriousness, and strong attention to how I present and carry my work.",
        },
        {
          title: "Direction",
          body: "I care about building something solid over time, not just looking good today.",
        },
        {
          title: "Experience",
          body: "Hospitality, operational roles, direct human contact, and discipline shaped in real environments.",
        },
        {
          title: "Vision",
          body: "A trajectory that brings together presence, real work, personal growth, and digital thinking.",
        },
      ],
      snapshotEyebrow: "Snapshot",
      snapshotTitle: "The essentials, in one quick view.",
      snapshot: [
        {
          eyebrow: "Experience",
          title: "Hospitality and front-facing roles",
          body: "Service, operations, attention to experience, and real responsibility.",
        },
        {
          eyebrow: "Education",
          title: "F&B management + technical foundation",
          body: "An uncommon combination of hospitality training and structured digital thinking.",
        },
        {
          eyebrow: "Range",
          title: "Skills, certifications, interests",
          body: "From service to digital work, with a professional and cultural range in motion.",
        },
        {
          eyebrow: "Contact",
          title: "Direct and ordered presence",
          body: "Clear contacts, downloadable CV, and a dedicated contact page.",
        },
      ],
      contactEyebrow: "Direct contact",
      contactTitle: "Reach out without unnecessary steps.",
      supportEyebrow: "Support",
      supportTitle: "Support the project behind FRDM.",
    },
    about: {
      eyebrow: "About",
      title: "A biography built in sections, not slogans.",
      intro:
        "More than a single bio, this page is a path: from the person to experience, and then to the direction I’m building.",
      sections: [
        {
          title: "The person",
          body:
            "I’m Filippo Resseguier de Miremont. I care about building a presence that feels ordered, credible, and aligned with what I’m actually doing in real life. I’m not interested in looking finished; I’m interested in looking serious.",
        },
        {
          title: "The direction",
          body:
            "Ambition and structure are the two ideas holding my path together. I want to grow significantly, do it well, and build something that will still matter over time.",
        },
        {
          title: "The experiences",
          body:
            "Work in direct contact with people has taught me discipline, presence, rhythm, and the ability to maintain standards in dynamic environments. That kind of training is worth more than a lot of words.",
        },
        {
          title: "The work",
          body:
            "I move within hospitality, but not only there. I also carry a technical and digital foundation that helps me think in a more structured, operational, and building-oriented way.",
        },
        {
          title: "The vision",
          body:
            "That is why FRDM exists: not as a random showcase, but as a personal space to gather identity, contacts, and direction. Clean, essential, and meant to grow with me.",
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let’s keep it simple.",
      intro:
        "You can reach me directly by email or phone, or use the form below to open an email draft.",
      directLinks: "Direct links",
      message: "Message",
      messageTitle: "Write here and open the email draft.",
      form: {
        name: "Name",
        subject: "Subject",
        message: "Message",
        submit: "Open email",
        placeholderName: "Your name",
        placeholderSubject: "Subject",
        placeholderMessage: "Write your message here",
        fallbackSubject: "Message from website",
      },
    },
    donate: {
      eyebrow: "Donate",
      title: "A simple way to support the project.",
      intro:
        "FRDM is a personal project, built with care and meant to grow over time. If you’d like to support it, you can do that here.",
      whyTitle: "Why it exists",
      whyText1:
        "FRDM is not a parked domain. It is a personal and professional base I want to make more refined, useful, and complete over time.",
      whyText2:
        "Support helps that process move forward. No dramatic speech, no performance — just a direct way to back the work.",
      cardTitle: "PayPal",
      cardText: "Use the button below to open the support page.",
    },
    modal: {
      eyebrow: "Donate",
      title: "Support the project behind FRDM",
      close: "Close",
      open: "Open donate",
      paypal: "Support via PayPal",
    },
    footer: {
      tagline:
        "A personal digital presence built with order and room to grow.",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Sobre mí",
      contact: "Contacto",
      donate: "Apoya",
    },
    common: {
      contact: "Contacto",
      downloadCv: "Descargar CV",
      support: "Apoyar FRDM",
      goToDonate: "Ir a la página donate",
      basedIn: "Base",
      reachOut: "Contacto",
      openProfile: "Abrir perfil",
      phone: "Teléfono",
      email: "Email",
      linkedin: "LinkedIn",
      github: "GitHub",
      indeed: "Indeed",
    },
    home: {
      eyebrow: "Portfolio personal",
      headline: "Un espacio personal construido con ambición, estructura y dirección.",
      intro:
        "FRDM es mi punto de presencia digital: ordenado, esencial y pensado para reunir quién soy, cómo trabajo y la dirección que estoy construyendo.",
      heroAsideTitle: "Tono",
      heroAsideText: "Editorial, limpio, hecho para crecer.",
      whoEyebrow: "Sobre mí",
      whoTitle: "Una presencia clara, no ruidosa.",
      whoText:
        "No uso este sitio para parecer terminado. Lo uso para presentarme con precisión: orden, coherencia e intención.",
      readMore: "Leer el perfil completo",
      pathEyebrow: "Recorrido",
      pathTitle: "De la persona a la experiencia, sin perder coherencia.",
      path: [
        {
          title: "Persona",
          body: "Ambición, seriedad y atención a la forma en que me presento y trabajo.",
        },
        {
          title: "Dirección",
          body: "Me interesa construir algo sólido con el tiempo, no solo verme bien hoy.",
        },
        {
          title: "Experiencia",
          body: "Hospitality, roles operativos, contacto directo con personas y disciplina real.",
        },
        {
          title: "Visión",
          body: "Una trayectoria que une presencia, trabajo real, crecimiento personal y mirada digital.",
        },
      ],
      snapshotEyebrow: "Síntesis",
      snapshotTitle: "Lo esencial, en una vista rápida.",
      snapshot: [
        {
          eyebrow: "Experiencia",
          title: "Hospitality y roles cara al público",
          body: "Servicio, operatividad, atención a la experiencia y responsabilidad real.",
        },
        {
          eyebrow: "Formación",
          title: "F&B management + base técnica",
          body: "Una combinación poco común entre formación hospitality y pensamiento digital estructurado.",
        },
        {
          eyebrow: "Rango",
          title: "Habilidades, certificaciones, intereses",
          body: "Del servicio al trabajo digital, con un perfil profesional y cultural en construcción.",
        },
        {
          eyebrow: "Contacto",
          title: "Presencia directa y ordenada",
          body: "Contactos claros, CV descargable y una página dedicada para escribirme.",
        },
      ],
      contactEyebrow: "Contacto directo",
      contactTitle: "Contáctame sin pasos innecesarios.",
      supportEyebrow: "Apoyo",
      supportTitle: "Apoya el proyecto detrás de FRDM.",
    },
    about: {
      eyebrow: "Sobre mí",
      title: "Una biografía construida por bloques, no por slogans.",
      intro:
        "Más que una sola bio, aquí hay un recorrido: desde la persona hasta las experiencias y la dirección que estoy construyendo.",
      sections: [
        {
          title: "La persona",
          body:
            "Soy Filippo Resseguier de Miremont. Me interesa construir una presencia ordenada, creíble y coherente con lo que estoy haciendo en la vida real. No me interesa parecer terminado; me interesa parecer serio.",
        },
        {
          title: "La dirección",
          body:
            "Ambición y estructura son las dos ideas que sostienen mi camino. Quiero crecer mucho, hacerlo bien y construir algo que siga teniendo valor con el tiempo.",
        },
        {
          title: "Las experiencias",
          body:
            "El trabajo en contacto directo con las personas me ha dado disciplina, presencia, ritmo y la capacidad de mantener estándares altos en contextos dinámicos. Esa formación vale más que muchas palabras.",
        },
        {
          title: "El trabajo",
          body:
            "Me muevo dentro del mundo hospitality, pero no solo ahí. También llevo conmigo una base técnica y digital que me permite pensar de forma más estructurada, operativa y orientada a construir.",
        },
        {
          title: "La visión",
          body:
            "Por eso existe FRDM: no como escaparate casual, sino como un espacio personal donde reunir identidad, contactos y dirección. Limpio, esencial y pensado para crecer conmigo.",
        },
      ],
    },
    contact: {
      eyebrow: "Contacto",
      title: "Hablemos de forma simple.",
      intro:
        "Puedes escribirme directamente por email o teléfono, o usar el formulario para abrir un borrador de correo.",
      directLinks: "Links directos",
      message: "Mensaje",
      messageTitle: "Escribe aquí y abre el borrador del email.",
      form: {
        name: "Nombre",
        subject: "Asunto",
        message: "Mensaje",
        submit: "Abrir email",
        placeholderName: "Tu nombre",
        placeholderSubject: "Asunto",
        placeholderMessage: "Escribe aquí tu mensaje",
        fallbackSubject: "Mensaje desde el sitio",
      },
    },
    donate: {
      eyebrow: "Apoya",
      title: "Una forma simple de apoyar el proyecto.",
      intro:
        "FRDM es un proyecto personal, construido con cuidado y pensado para crecer con el tiempo. Si quieres apoyarlo, puedes hacerlo aquí.",
      whyTitle: "Por qué existe",
      whyText1:
        "FRDM no es un dominio vacío: es una base personal y profesional que quiero volver cada vez más cuidada, útil y completa.",
      whyText2:
        "El apoyo ayuda a mover ese proceso. Sin dramatismo y sin discursos: solo una forma directa de contribuir.",
      cardTitle: "PayPal",
      cardText: "Usa el botón aquí abajo para abrir la página de apoyo.",
    },
    modal: {
      eyebrow: "Apoya",
      title: "Apoya el proyecto detrás de FRDM",
      close: "Cerrar",
      open: "Abrir donate",
      paypal: "Apoyar con PayPal",
    },
    footer: {
      tagline:
        "Una presencia digital personal, construida con orden y espacio para crecer.",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
