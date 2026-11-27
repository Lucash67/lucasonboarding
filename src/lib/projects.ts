export type Project = {
  slug: string;
  name: string;
  category: "Profissional" | "Empresa" | "Sistema";
  niche: string;
  cover: string;
  coverMobile?: string;
  url: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
};

export const WHATSAPP_NUMBER = "5585996505083";

export const WHATSAPP =
  "https://wa.me/5585996505083?text=" +
  encodeURIComponent("Oi Lucas! Vi seu site e quero um orçamento para um site que converta.");

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export const projects: Project[] = [
  {
    slug: "g-steel",
    name: "G-STEEL",
    category: "Empresa",
    niche: "Produto 3D · conceito",
    cover: "/covers/relogio.webp",
    url: "https://lucas-relogio-portfolio.vercel.app/",
    problem: "Um produto técnico, difícil de entender numa foto parada.",
    solution: "Modelo 3D interativo e tipografia gigante levando o olhar até os detalhes.",
    result: "O visitante explora o produto antes de ler uma linha.",
    tags: ["3D", "Conceito"],
  },
  {
    slug: "clarissa",
    name: "Clarissa Palácio",
    category: "Profissional",
    niche: "Professora de inglês",
    cover: "/covers/clarissa.webp",
    url: "https://clarissateacher.vercel.app/",
    problem: "Cursos e experiências espalhados, sem um caminho claro até o contato.",
    solution: "Página única com identidade própria, cursos em destaque e WhatsApp em cada dobra.",
    result: "Quem chama já sabe qual curso quer.",
    tags: ["Profissional autônomo", "Landing page"],
  },
  {
    slug: "muell",
    name: "Muell Machado",
    category: "Profissional",
    niche: "Tatuagem realista",
    cover: "/covers/muell.webp",
    url: "https://muell-machado.vercel.app/",
    problem: "Trabalho forte, mas sem uma vitrine que filtrasse quem só queria preço.",
    solution: "Trabalhos em primeiro plano, processo explicado e orçamento a um clique.",
    result: "O pedido de orçamento já chega com a ideia da tattoo.",
    tags: ["Profissional autônomo", "Portfólio"],
  },
  {
    slug: "shari",
    name: "Shari",
    category: "Empresa",
    niche: "Restaurante · projeto pessoal",
    cover: "/covers/shari.webp",
    url: "https://shari-restaurante.vercel.app/",
    problem: "Balcão, rodízio e delivery disputando a atenção na mesma página.",
    solution: "Uma página-cartaz: cores que mudam por horário, cardápio em movimento e reserva em destaque.",
    result: "O visitante entende as três formas de comer e escolhe a sua.",
    tags: ["Restaurante", "Movimento"],
  },
  {
    slug: "malu-nutri",
    name: "Malu Nutri",
    category: "Profissional",
    niche: "Nutrição",
    cover: "/covers/malu-nutri.webp",
    url: "https://malu-nutri.vercel.app/",
    problem: "Marca pessoal dispersa entre rotina, cupons e parcerias — o seguidor não sabia o que fazer.",
    solution: "Uma página, uma narrativa, um único próximo passo visível em cada dobra.",
    result: "Seguidor vira contato com intenção clara.",
    tags: ["Marca pessoal", "Landing page"],
  },
  {
    slug: "arthur-anadon",
    name: "Arthur Anadon",
    category: "Profissional",
    niche: "Nutrição esportiva",
    cover: "/covers/arthur-anadon.webp",
    coverMobile: "/covers/arthur-anadon-mobile.webp",
    url: "https://arthurnutrilp.vercel.app/",
    problem: "Oferta genérica que atraía curioso e espantava quem queria resultado.",
    solution: "Promessa direta — resultado sem extremos — e CTA único, repetido no ritmo certo.",
    result: "Lead chega pronto para fechar a consulta.",
    tags: ["Landing page", "Conversão"],
  },
  {
    slug: "grupo-atlas",
    name: "Grupo Atlas",
    category: "Profissional",
    niche: "Consórcios",
    cover: "/covers/grupo-atlas.webp",
    url: "https://lpsamuel.vercel.app/",
    problem: "Carros, motos e imóveis misturados — o visitante travava na escolha.",
    solution: "Oferta segmentada por objetivo e caminho único até a conversa.",
    result: "Conversa começa no produto certo.",
    tags: ["Vendas", "Segmentação"],
  },
  {
    slug: "terus-farm",
    name: "Terus Farm",
    category: "Empresa",
    niche: "Agronegócio",
    cover: "/covers/terus-farm.webp",
    url: "https://terusfarm.vercel.app/",
    problem: "Produção, viveiros e decisão de compra espalhados em vários canais.",
    solution: "Tudo numa página institucional com caminho claro até o contato comercial.",
    result: "Comprador entende a operação em segundos.",
    tags: ["Institucional", "B2B"],
  },
  {
    slug: "lm-mall",
    name: "LM Office & Mall",
    category: "Empresa",
    niche: "Imobiliário",
    cover: "/covers/lm-mall.jpg",
    url: "https://lucash67.github.io/lm-mall/",
    problem: "Dois públicos — quem usa e quem investe — disputando a mesma mensagem.",
    solution: "Arquitetura de página com trilhas separadas para cada perfil.",
    result: "Cada público acha seu caminho sem ruído.",
    tags: ["Imobiliário", "Multi-público"],
  },
  {
    slug: "terus-tec",
    name: "Terus.TEC",
    category: "Empresa",
    niche: "SaaS / Tecnologia",
    cover: "/covers/terus-platform.webp",
    url: "https://terus-platform-web.vercel.app/",
    problem: "Plataforma complexa, difícil de explicar — demo não era pedida.",
    solution: "Proposta, módulos e prova em sequência lógica até o pedido de demonstração.",
    result: "Complexidade vira clareza comercial.",
    tags: ["SaaS", "Demo"],
  },
  {
    slug: "champions",
    name: "Champions Idiomas",
    category: "Empresa",
    niche: "Educação",
    cover: "/covers/champions-idiomas.webp",
    url: "https://champions-idiomas.vercel.app/",
    problem: "Cursos e método escondiam a ação mais importante: a aula experimental.",
    solution: "Aula experimental na frente, método como prova, cursos como apoio.",
    result: "Visitante agenda em vez de só pesquisar preço.",
    tags: ["Educação", "Agendamento"],
  },
  {
    slug: "ops-hub",
    name: "Ops Hub",
    category: "Sistema",
    niche: "Operações",
    cover: "/covers/ops-hub.webp",
    url: "https://ops-hub-portfolio-demo.vercel.app/login?next=%2F",
    problem: "Gestão multi-operação em planilhas soltas.",
    solution: "Painel único com o que importa na frente. Conta de teste na tela de login.",
    result: "Operação visível em um lugar.",
    tags: ["Sistema", "Dashboard"],
  },
  {
    slug: "odonto-finance",
    name: "Odontology Finance",
    category: "Sistema",
    niche: "Saúde / Financeiro",
    cover: "/covers/odontology-finance.webp",
    url: "https://odontology-finance.vercel.app/login",
    problem: "Financeiro de clínica sem visão clara de entradas e saídas.",
    solution: "Sistema financeiro direto ao ponto. Dados fictícios — login na tela.",
    result: "Clínica decide com número, não com achismo.",
    tags: ["Sistema", "Financeiro"],
  },
  {
    slug: "forma",
    name: "FORMA",
    category: "Sistema",
    niche: "Saúde / Fitness",
    cover: "/covers/forma.webp",
    url: "https://evolucaofisica-cursor.vercel.app/login",
    problem: "Dieta, treino e acompanhamento em apps diferentes.",
    solution: "Tudo num só app com acompanhamento contínuo. Demo começa no login.",
    result: "Aluno engajado, profissional no controle.",
    tags: ["App", "Saúde"],
  },
];

export const webProjects = projects.filter((p) => p.category !== "Sistema");
/** Projetos que têm site no ar (abrem no visualizador). */
export const liveProjects = webProjects.filter((p) => p.url);

export const bySlug = (slug: string) => projects.find((p) => p.slug === slug)!;
