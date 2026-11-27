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
    slug: "malu-nutri",
    name: "Malu Nutri",
    category: "Profissional",
    niche: "Nutrição",
    cover: "/covers/malu-nutri.png",
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
    cover: "/covers/arthur-anadon.png",
    coverMobile: "/covers/arthur-anadon-mobile.png",
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
    cover: "/covers/grupo-atlas.png",
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
    cover: "/covers/terus-farm.png",
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
    cover: "/covers/terus-platform.png",
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
    cover: "/covers/champions-idiomas.png",
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
    cover: "/covers/ops-hub.png",
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
    cover: "/covers/odontology-finance.png",
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
    cover: "/covers/forma.png",
    url: "https://evolucaofisica-cursor.vercel.app/login",
    problem: "Dieta, treino e acompanhamento em apps diferentes.",
    solution: "Tudo num só app com acompanhamento contínuo. Demo começa no login.",
    result: "Aluno engajado, profissional no controle.",
    tags: ["App", "Saúde"],
  },
];

export const webProjects = projects.filter((p) => p.category !== "Sistema");
