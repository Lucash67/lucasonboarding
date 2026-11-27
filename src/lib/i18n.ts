export type Lang = "pt" | "en";

export const LANGS: { id: Lang; label: string; html: string }[] = [
  { id: "en", label: "English", html: "en" },
  { id: "pt", label: "Português", html: "pt-BR" },
];

export const STORAGE_KEY = "lh-lang";

type ProjectCopy = {
  niche: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
};

type Dict = {
  metaTitle: string;
  metaDescription: string;
  nav: { problems: string; work: string; process: string; faq: string; cta: string };
  hero: {
    chip: string;
    line1: string;
    line2: string;
    rotating: string[];
    lead: string;
    leadStrong: string;
    cta: string;
    secondary: string;
  };
  live: string;
  loaderRole: string;
  skip: string;
  reveal: {
    plain: string;
    motion: string;
    hint: string;
    fakeNav: string[];
    fakeH: string;
    fakeP: string;
    fakeBtn: string;
    fakeCards: string[];
    motionH: string;
    motionSub: string;
    motionBtn: string;
  };
  themes: { preto: string; branco: string; cinza: string; concreto: string; label: string };
  pain: string[];
  manifestoKicker: string;
  manifesto: string;
  solvesKicker: string;
  solvesH2a: string;
  solvesH2b: string;
  solvesLead: string;
  solves: [string, string][];
  workKicker: string;
  workH2a: string;
  workH2b: string;
  workH2c: string;
  workLead: string;
  nextKicker: string;
  nextTitle: string;
  nextCta: string;
  problemLabel: string;
  numbers: [number, string, string][];
  nichesKicker: string;
  niches: string[];
  compareH2a: string;
  compareVs: string;
  compareH2b: string;
  compare: [string, string][];
  processKicker: string;
  processH2: string;
  process: [string, string][];
  faqKicker: string;
  faqH2: string;
  faq: [string, string][];
  finalKicker: string;
  finalH2: string;
  finalLead: string;
  finalCta: string;
  footerTag: string;
  floatCta: string;
  floatAria: string;
  viewer: {
    loading: string;
    desktop: string;
    mobile: string;
    close: string;
    problem: string;
    solution: string;
    result: string;
    want: string;
    prev: string;
    next: string;
  };
  waText: string;
  projects: Record<string, ProjectCopy>;
};

export const copy: Record<Lang, Dict> = {
  pt: {
    metaTitle: "Lucas Henrique — Sites que convertem visita em orçamento fechado",
    metaDescription:
      "Landing pages e sites institucionais que resolvem conversão. Copy, visual e um próximo passo — veja os projetos ao vivo.",
    nav: { problems: "Problemas", work: "Projetos", process: "Processo", faq: "FAQ", cta: "Pedir orçamento" },
    hero: {
      chip: "Novembro · briefing aberto",
      line1: "Seu site não precisa ser bonito.",
      line2: "Precisa",
      rotating: ["vender", "converter", "fechar", "lotar a agenda"],
      lead: "Eu não entrego “um site”. Eu resolvo o que faz sua visita ir embora sem chamar: oferta confusa, CTA escondido, lead frio.",
      leadStrong: "Você recebe uma máquina de orçamento.",
      cta: "Quero meu orçamento",
      secondary: "Ver projetos ao vivo",
    },
    live: "Abrir ao vivo",
    loaderRole: "Designer e desenvolvedor de landing pages",
    skip: "Pular para os projetos",
    reveal: {
      plain: "Site comum",
      motion: "Com motion",
      hint: "Passe o cursor",
      fakeNav: ["Início", "Sobre", "Serviços", "Contato"],
      fakeH: "Bem-vindo à nossa empresa",
      fakeP: "Somos uma empresa com anos de experiência no mercado. Entre em contato para saber mais sobre nossos serviços.",
      fakeBtn: "Saiba mais",
      fakeCards: ["Serviço 1", "Serviço 2", "Serviço 3"],
      motionH: "Seu site, em movimento.",
      motionSub: "A mesma empresa. Outra primeira impressão.",
      motionBtn: "Quero esse",
    },
    themes: { preto: "Preto", branco: "Branco", cinza: "Cinza", concreto: "Cinza claro", label: "Tema" },
    pain: ["Visita sem clique", "Lead frio", "Orçamento perdido", "Oferta confusa", "CTA escondido", "Curioso pedindo preço"],
    manifestoKicker: "— A verdade que ninguém te conta",
    manifesto:
      "Tráfego você já tem. O que falta é uma página que *explica* a oferta em 5 segundos, *filtra* quem não serve e *empurra* quem serve para um único próximo passo. É isso que eu construo.",
    solvesKicker: "01 · O que eu resolvo",
    solvesH2a: "Não vendo sites.",
    solvesH2b: "Resolvo conversão.",
    solvesLead: "Site bonito que não converte é despesa. Cada bloco que eu entrego existe para resolver um destes problemas.",
    solves: [
      ["Ninguém entende o que você vende", "Reescrevo a oferta até caber numa frase. Quem chega entende em 5 segundos — ou sai sem gastar seu tempo."],
      ["Visita entra e sai sem chamar", "Um CTA, repetido no ritmo certo, em cada dobra. Zero becos sem saída."],
      ["Lead chega frio, só pedindo preço", "A página faz a venda antes do WhatsApp. Você conversa com quem já quer fechar."],
      ["Seu site parece amador", "Visual premium e motion que comunicam valor — e justificam o seu preço."],
      ["No celular, quebra tudo", "Pensado mobile-first e testado em tela real antes de ir ao ar."],
      ["Você não tem texto pronto", "Copy é comigo. Você traz a marca; eu traduzo em argumento de venda."],
    ],
    workKicker: "02 · Projetos ao vivo",
    workH2a: "Clique.",
    workH2b: "Navegue.",
    workH2c: "Sem sair daqui.",
    workLead: "Cada projeto abre o site de verdade aqui dentro — no computador ou no celular — com o problema que ele resolveu.",
    nextKicker: "Próximo projeto",
    nextTitle: "O seu pode ser o próximo.",
    nextCta: "Chamar no WhatsApp",
    problemLabel: "Problema:",
    numbers: [
      [7, "", "projetos no ar"],
      [3, "", "etapas até publicar"],
      [100, "%", "pensado pro celular"],
      [1, "", "próximo passo por página"],
    ],
    nichesKicker: "Marcas pessoais e empresas",
    niches: ["Nutrição", "Imobiliário", "Agro", "Educação", "Clínicas", "Consórcio", "Advocacia", "Estética", "Restaurantes", "Fitness", "Consultoria", "Arquitetura"],
    compareH2a: "Site comum",
    compareVs: "vs",
    compareH2b: "site que vende",
    compare: [
      ["Template genérico", "Estrutura pensada pra sua oferta"],
      ["Você escreve o texto", "Copy de venda feita por mim"],
      ["Vários botões, nenhum foco", "Um próximo passo, sempre visível"],
      ["Bonito no PC, quebrado no celular", "Testado em celular real"],
      ["Visitante pede preço e some", "Lead chega querendo fechar"],
    ],
    processKicker: "03 · Como funciona",
    processH2: "Três passos. Zero burocracia.",
    process: [
      ["Diagnóstico", "Uma conversa. Entendo a oferta, o público e o que a pessoa precisa fazer no site. Você não precisa chegar com texto pronto."],
      ["Construção", "Copy, visual, CTA e motion. Cada bloco existe para converter ou filtrar — nada é enfeite."],
      ["No ar", "Página publicada, testada no celular e pronta para receber tráfego real."],
    ],
    faqKicker: "04 · Perguntas frequentes",
    faqH2: "Antes de chamar.",
    faq: [
      [
        "Preciso ter o texto pronto?",
        "Não. Eu escrevo toda a copy de marketing e propaganda — da oferta ao CTA. O que eu preciso de você são as especificações da marca: o que você vende, para quem, tom de voz, fotos ou referências se já tiver. Se for profissional autônomo, o mesmo: você traz o ofício, eu traduzo em argumento de venda.",
      ],
      [
        "Em quanto tempo o site fica pronto?",
        "Não prometo data fechada — cada projeto depende do material e das validações. Na média, um site é entregue em 5 a 7 dias úteis a partir do pagamento da primeira metade.",
      ],
      [
        "Como funciona o pagamento?",
        "Depois da proposta alinhada, o trabalho começa com 50% na entrada. A outra metade é paga quando você valida o site pronto — não antes. Assim o risco fica dividido e o ritmo fica claro para os dois lados.",
      ],
      [
        "Que tipo de site você faz?",
        "Landing pages e sites institucionais: conversão, portfólio, apresentação, ou a mistura — modalidades, depoimentos, FAQ e um fechamento com um único próximo passo.",
      ],
      [
        "O site funciona no celular?",
        "Sim. Cada página é pensada mobile-first e testada em tela real antes de publicar.",
      ],
      [
        "Como funcionam os ajustes e o suporte?",
        "Durante a construção, você revisa a primeira versão e eu ajusto até a página refletir o que combinamos. O restante do pagamento entra quando você valida o site pronto. Depois de publicado, correções de erro ficam comigo; mudanças de conteúdo, novas seções ou redirecionamentos combinamos à parte — sem surpresa no meio do caminho.",
      ],
      [
        "Você também cuida de anúncios e tráfego?",
        "Não. Meu trabalho é a página: copy, estrutura, visual e o próximo passo. Tráfego e redes são outra frente — a página fica pronta para receber o que você já investe.",
      ],
      [
        "Atende autônomo e empresa?",
        "Sim. Marca pessoal ou empresa: o método é o mesmo. Você traz o ofício e as especificações da marca; eu construo a página que vende.",
      ],
      [
        "O que eu preciso enviar para começar?",
        "Nome da marca, o que vende, para quem, e o que a pessoa deveria fazer no site. Logo, fotos e referências ajudam, mas não são bloqueio. O resto da comunicação eu construo.",
      ],
      [
        "Como começa o trabalho?",
        "Uma conversa no WhatsApp. Você conta o negócio; eu devolvo o formato e o caminho. Com a proposta aceita, a primeira metade inicia o projeto.",
      ],
    ],
    finalKicker: "Próximo passo",
    finalH2: "Pare de perder orçamento.",
    finalLead: "Me mande no WhatsApp: o que você vende, pra quem, e o que a pessoa deveria fazer no seu site. Eu respondo com o formato e o caminho.",
    finalCta: "Chamar no WhatsApp",
    footerTag: "Landing pages e sites institucionais que convertem.",
    floatCta: "Pedir orçamento",
    floatAria: "Pedir orçamento no WhatsApp",
    viewer: {
      loading: "carregando o site ao vivo…",
      desktop: "Ver no computador",
      mobile: "Ver no celular",
      close: "Fechar",
      problem: "O problema",
      solution: "A solução",
      result: "O resultado",
      want: "Quero um assim",
      prev: "Anterior",
      next: "Próximo",
    },
    waText: "Oi Lucas! Vi seu site e quero um orçamento para um site que converta.",
    projects: {
      "malu-nutri": {
        niche: "Nutrição",
        problem: "Marca pessoal dispersa entre rotina, cupons e parcerias — o seguidor não sabia o que fazer.",
        solution: "Uma página, uma narrativa, um único próximo passo visível em cada dobra.",
        result: "Seguidor vira contato com intenção clara.",
        tags: ["Marca pessoal", "Landing page"],
      },
      "arthur-anadon": {
        niche: "Nutrição esportiva",
        problem: "Oferta genérica que atraía curioso e espantava quem queria resultado.",
        solution: "Promessa direta — resultado sem extremos — e CTA único, repetido no ritmo certo.",
        result: "Lead chega pronto para fechar a consulta.",
        tags: ["Landing page", "Conversão"],
      },
      "grupo-atlas": {
        niche: "Consórcios",
        problem: "Carros, motos e imóveis misturados — o visitante travava na escolha.",
        solution: "Oferta segmentada por objetivo e caminho único até a conversa.",
        result: "Conversa começa no produto certo.",
        tags: ["Vendas", "Segmentação"],
      },
      "terus-farm": {
        niche: "Agronegócio",
        problem: "Produção, viveiros e decisão de compra espalhados em vários canais.",
        solution: "Tudo numa página institucional com caminho claro até o contato comercial.",
        result: "Comprador entende a operação em segundos.",
        tags: ["Institucional", "B2B"],
      },
      "lm-mall": {
        niche: "Imobiliário",
        problem: "Dois públicos — quem usa e quem investe — disputando a mesma mensagem.",
        solution: "Arquitetura de página com trilhas separadas para cada perfil.",
        result: "Cada público acha seu caminho sem ruído.",
        tags: ["Imobiliário", "Multi-público"],
      },
      "terus-tec": {
        niche: "SaaS / Tecnologia",
        problem: "Plataforma complexa, difícil de explicar — demo não era pedida.",
        solution: "Proposta, módulos e prova em sequência lógica até o pedido de demonstração.",
        result: "Complexidade vira clareza comercial.",
        tags: ["Institucional", "Demo"],
      },
      champions: {
        niche: "Educação",
        problem: "Cursos e método escondiam a ação mais importante: a aula experimental.",
        solution: "Aula experimental na frente, método como prova, cursos como apoio.",
        result: "Visitante agenda em vez de só pesquisar preço.",
        tags: ["Educação", "Agendamento"],
      },
    },
  },
  en: {
    metaTitle: "Lucas Henrique — Sites that turn a visit into a closed quote",
    metaDescription:
      "Landing pages and institutional sites built to convert. Copy, design, one next step — browse the live work.",
    nav: { problems: "Problems", work: "Work", process: "Process", faq: "FAQ", cta: "Request a quote" },
    hero: {
      chip: "November · briefing open",
      line1: "Your site doesn’t need to look pretty.",
      line2: "It must",
      rotating: ["sell", "convert", "close", "fill the calendar"],
      lead: "I don’t deliver “a website”. I fix what makes a visit leave without calling: a fuzzy offer, a hidden CTA, a cold lead.",
      leadStrong: "You get a quote-making machine.",
      cta: "I want my quote",
      secondary: "See live projects",
    },
    live: "Open live",
    loaderRole: "Landing page designer & developer",
    skip: "Skip to projects",
    reveal: {
      plain: "Plain site",
      motion: "With motion",
      hint: "Move your cursor",
      fakeNav: ["Home", "About", "Services", "Contact"],
      fakeH: "Welcome to our company",
      fakeP: "We are a company with years of experience in the market. Get in touch to learn more about our services.",
      fakeBtn: "Learn more",
      fakeCards: ["Service 1", "Service 2", "Service 3"],
      motionH: "Your site, in motion.",
      motionSub: "Same company. A different first impression.",
      motionBtn: "I want this",
    },
    themes: { preto: "Black", branco: "White", cinza: "Gray", concreto: "Light gray", label: "Theme" },
    pain: ["Visit, no click", "Cold lead", "Lost quote", "Fuzzy offer", "Hidden CTA", "Tire-kickers asking price"],
    manifestoKicker: "— The part nobody says out loud",
    manifesto:
      "You already have traffic. What’s missing is a page that *explains* the offer in 5 seconds, *filters* who doesn’t fit, and *pushes* who does to a single next step. That’s what I build.",
    solvesKicker: "01 · What I fix",
    solvesH2a: "I don’t sell websites.",
    solvesH2b: "I fix conversion.",
    solvesLead: "A pretty site that doesn’t convert is an expense. Every block I ship exists to solve one of these.",
    solves: [
      ["Nobody gets what you sell", "I rewrite the offer until it fits in one sentence. Arrivals get it in 5 seconds — or they leave without wasting your time."],
      ["They come in and leave without calling", "One CTA, repeated at the right rhythm, on every fold. No dead ends."],
      ["Leads arrive cold, asking for a price", "The page sells before WhatsApp. You talk to people who already want to close."],
      ["Your site looks amateur", "Premium look and motion that signal value — and justify your price."],
      ["On mobile, it breaks", "Mobile-first, tested on a real phone before it goes live."],
      ["You don’t have the copy ready", "Copy is on me. You bring the brand; I turn it into a sales argument."],
    ],
    workKicker: "02 · Live work",
    workH2a: "Click.",
    workH2b: "Browse.",
    workH2c: "Without leaving.",
    workLead: "Each project opens the real site in here — desktop or phone — with the problem it solved.",
    nextKicker: "Next project",
    nextTitle: "Yours can be next.",
    nextCta: "Message on WhatsApp",
    problemLabel: "Problem:",
    numbers: [
      [7, "", "live projects"],
      [3, "", "steps to publish"],
      [100, "%", "built for mobile"],
      [1, "", "next step per page"],
    ],
    nichesKicker: "Personal brands and companies",
    niches: ["Nutrition", "Real estate", "Agribusiness", "Education", "Clinics", "Consortia", "Law", "Aesthetics", "Restaurants", "Fitness", "Consulting", "Architecture"],
    compareH2a: "A usual site",
    compareVs: "vs",
    compareH2b: "a site that sells",
    compare: [
      ["Generic template", "Structure built around your offer"],
      ["You write the copy", "Sales copy written by me"],
      ["Several buttons, no focus", "One next step, always visible"],
      ["Fine on desktop, broken on mobile", "Tested on a real phone"],
      ["Visitor asks the price and vanishes", "Lead arrives ready to close"],
    ],
    processKicker: "03 · How it works",
    processH2: "Three steps. No bureaucracy.",
    process: [
      ["Diagnosis", "One conversation. I learn the offer, the audience, and what someone should do on the site. You don’t need copy ready."],
      ["Build", "Copy, visual, CTA, motion. Every block converts or filters — nothing is decoration."],
      ["Live", "Published, tested on mobile, ready for real traffic."],
    ],
    faqKicker: "04 · FAQ",
    faqH2: "Before you message.",
    faq: [
      [
        "Do I need the copy ready?",
        "No. I write all the marketing copy — from the offer to the CTA. What I need from you are the brand specifics: what you sell, who it’s for, tone, photos or references if you have them. Same if you’re a solo professional: you bring the craft, I turn it into a sales argument.",
      ],
      [
        "How long until the site is ready?",
        "I don’t lock a hard date — each project depends on materials and approvals. On average, a site is delivered in 5 to 7 business days after the first half of the payment.",
      ],
      [
        "How does payment work?",
        "Once the proposal is agreed, work starts with 50% upfront. The remaining half is due when you validate the finished site — not before. The risk stays split and the pace stays clear for both sides.",
      ],
      [
        "What kind of site do you build?",
        "Landing pages and institutional sites: conversion, portfolio, presentation, or a mix — services, testimonials, FAQ, and a close with one next step.",
      ],
      [
        "Does it work on mobile?",
        "Yes. Every page is mobile-first and tested on a real screen before it goes live.",
      ],
      [
        "How do revisions and support work?",
        "During the build you review the first version and I refine it until the page matches what we agreed. The remaining payment is due when you validate the finished site. After launch, bug fixes are on me; content changes, new sections or redirects are scoped separately — no surprises mid-project.",
      ],
      [
        "Do you also run ads and traffic?",
        "No. My work is the page: copy, structure, visual and the next step. Traffic and social are a separate front — the page is ready to receive what you already invest.",
      ],
      [
        "Do you work with solo professionals and companies?",
        "Yes. Personal brand or company: the method is the same. You bring the craft and the brand specifics; I build the page that sells.",
      ],
      [
        "What do I need to send to start?",
        "Brand name, what you sell, who it’s for, and what someone should do on the site. Logo, photos and references help, but they aren’t a blocker. I build the rest of the communication.",
      ],
      [
        "How does the work start?",
        "A WhatsApp conversation. You describe the business; I come back with the format and the path. Once the proposal is accepted, the first half starts the project.",
      ],
    ],
    finalKicker: "Next step",
    finalH2: "Stop losing quotes.",
    finalLead: "Message me on WhatsApp: what you sell, who it’s for, and what someone should do on your site. I’ll reply with the format and the path.",
    finalCta: "Message on WhatsApp",
    footerTag: "Landing pages and institutional sites that convert.",
    floatCta: "Request a quote",
    floatAria: "Request a quote on WhatsApp",
    viewer: {
      loading: "loading the live site…",
      desktop: "View on desktop",
      mobile: "View on mobile",
      close: "Close",
      problem: "The problem",
      solution: "The solution",
      result: "The result",
      want: "I want one like this",
      prev: "Previous",
      next: "Next",
    },
    waText: "Hi Lucas! I saw your site and I want a quote for a page that converts.",
    projects: {
      "malu-nutri": {
        niche: "Nutrition",
        problem: "A personal brand scattered across routine, coupons and partnerships — the follower didn’t know what to do.",
        solution: "One page, one story, one next step visible on every fold.",
        result: "The follower becomes a contact with clear intent.",
        tags: ["Personal brand", "Landing page"],
      },
      "arthur-anadon": {
        niche: "Sports nutrition",
        problem: "A generic offer that attracted the curious and pushed away people who wanted results.",
        solution: "A direct promise — results without extremes — and one CTA, repeated at the right rhythm.",
        result: "The lead arrives ready to book.",
        tags: ["Landing page", "Conversion"],
      },
      "grupo-atlas": {
        niche: "Consortia",
        problem: "Cars, bikes and property mixed together — the visitor froze on the choice.",
        solution: "An offer segmented by goal and a single path into the conversation.",
        result: "The talk starts on the right product.",
        tags: ["Sales", "Segmentation"],
      },
      "terus-farm": {
        niche: "Agribusiness",
        problem: "Production, nurseries and the buying decision spread across channels.",
        solution: "Everything on one institutional page with a clear path to commercial contact.",
        result: "The buyer reads the operation in seconds.",
        tags: ["Institutional", "B2B"],
      },
      "lm-mall": {
        niche: "Real estate",
        problem: "Two audiences — users and investors — fighting for the same message.",
        solution: "Page architecture with a separate trail for each profile.",
        result: "Each audience finds its path without noise.",
        tags: ["Real estate", "Multi-audience"],
      },
      "terus-tec": {
        niche: "SaaS / Technology",
        problem: "A complex platform, hard to explain — demos weren’t being requested.",
        solution: "Pitch, modules and proof in a logical sequence up to the demo ask.",
        result: "Complexity becomes commercial clarity.",
        tags: ["Institutional", "Demo"],
      },
      champions: {
        niche: "Education",
        problem: "Courses and method hid the most important action: the trial class.",
        solution: "Trial class up front, method as proof, courses as support.",
        result: "The visitor books instead of only shopping price.",
        tags: ["Education", "Booking"],
      },
    },
  },
};

export function detectLang(): Lang {
  if (typeof window === "undefined") return "pt";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "en" || stored === "pt") return stored;
  const nav = (window.navigator.language || "").toLowerCase();
  return nav.startsWith("en") ? "en" : "pt";
}
