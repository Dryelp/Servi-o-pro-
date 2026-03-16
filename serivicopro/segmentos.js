
const SEGMENTOS = {

  construcao: {
    keywords: ['construção','construcao','reforma',
               'elétrica','eletrica','hidráulica',
               'hidraulica','pintura','manutenção',
               'manutencao','pedreiro','encanador',
               'eletricista','carpinteiro','gesseiro'],
    icone: '⚒️',
    paleta: {
      org: '#e07b2a',
      org2: '#f59642',
      orgBg: '#fff4eb',
      brn: '#1e0f00',
      bg: '#faf7f3'
    },
    labels: {
      servico: 'Serviço',
      servicos: 'Serviços',
      cliente: 'Cliente',
      clientes: 'Clientes',
      orcamento: 'Orçamento',
      orcamentos: 'Orçamentos',
      materiais: 'Materiais',
      status: ['Agendado','Em andamento','Realizado','Cancelado']
    }
  },

  frete: {
    keywords: ['frete','transporte','caminhão',
               'caminhao','entrega','motorista',
               'mudança','mudanca','logística','logistica'],
    icone: '🚛',
    paleta: {
      org: '#1d6fa4',
      org2: '#2d8fc4',
      orgBg: '#e8f4fd',
      brn: '#0a1f30',
      bg: '#f5faff'
    },
    labels: {
      servico: 'Frete',
      servicos: 'Fretes',
      cliente: 'Contratante',
      clientes: 'Contratantes',
      orcamento: 'Proposta',
      orcamentos: 'Propostas',
      materiais: 'Custos da viagem',
      status: ['Agendado','Em rota','Entregue','Cancelado']
    }
  },

  confeitaria: {
    keywords: ['doces','confeitaria','bolo','brigadeiro',
               'festa','candy','doceira','chocolate',
               'torta','cupcake','bem casado'],
    icone: '🍰',
    paleta: {
      org: '#e879a0',
      org2: '#f59bc0',
      orgBg: '#fff0f5',
      brn: '#2d0a1a',
      bg: '#fff8fb'
    },
    labels: {
      servico: 'Pedido',
      servicos: 'Pedidos',
      cliente: 'Cliente',
      clientes: 'Clientes',
      orcamento: 'Proposta',
      orcamentos: 'Propostas',
      materiais: 'Ingredientes',
      status: ['Recebido','Em produção','Pronto','Entregue']
    }
  },

  cerimonial: {
    keywords: ['cerimonial','cerimônia','cerimonia',
               'eventos','casamento','formatura',
               'buffet','decoração','decoracao',
               'festa infantil','aniversário','aniversario'],
    icone: '🎊',
    paleta: {
      org: '#c9a84c',
      org2: '#e0c068',
      orgBg: '#fdf8ec',
      brn: '#1a1200',
      bg: '#fdfaf0'
    },
    labels: {
      servico: 'Evento',
      servicos: 'Eventos',
      cliente: 'Contratante',
      clientes: 'Contratantes',
      orcamento: 'Proposta',
      orcamentos: 'Propostas',
      materiais: 'Fornecedores',
      status: ['Proposta enviada','Contrato assinado',
               'Em preparação','Realizado']
    }
  },

  artesanato: {
    keywords: ['papelaria','artesanato','bíblia','biblia',
               'portaretrato','porta retrato','scrapbook',
               'personalizado','personalizada','feltro',
               'crochê','croche','bordado','costura'],
    icone: '✂️',
    paleta: {
      org: '#4a9b6f',
      org2: '#6ab88a',
      orgBg: '#f0faf4',
      brn: '#0a1f12',
      bg: '#f5faf7'
    },
    labels: {
      servico: 'Encomenda',
      servicos: 'Encomendas',
      cliente: 'Cliente',
      clientes: 'Clientes',
      orcamento: 'Orçamento',
      orcamentos: 'Orçamentos',
      materiais: 'Materiais',
      status: ['Recebido','Em produção','Pronto','Entregue']
    }
  },

  embalagens: {
    keywords: ['embalagens','caixas','balões','baloes',
               'lembrança','lembranca','kit','presente',
               'mimo','laço','laco','ribbon'],
    icone: '🎁',
    paleta: {
      org: '#9b6fd4',
      org2: '#b48ee0',
      orgBg: '#f5f0fd',
      brn: '#1a0a2d',
      bg: '#faf7ff'
    },
    labels: {
      servico: 'Pedido',
      servicos: 'Pedidos',
      cliente: 'Cliente',
      clientes: 'Clientes',
      orcamento: 'Orçamento',
      orcamentos: 'Orçamentos',
      materiais: 'Materiais',
      status: ['Recebido','Em produção','Pronto','Entregue']
    }
  },

  beleza: {
    keywords: ['cabelo','unha','estética','estetica',
               'manicure','cabeleireiro','makeup',
               'maquiagem','sobrancelha','lash','depilação',
               'depilacao','massagem','nail'],
    icone: '💅',
    paleta: {
      org: '#b06fd4',
      org2: '#c98ee0',
      orgBg: '#faf0fd',
      brn: '#200a2d',
      bg: '#fdf7ff'
    },
    labels: {
      servico: 'Atendimento',
      servicos: 'Atendimentos',
      cliente: 'Cliente',
      clientes: 'Clientes',
      orcamento: 'Orçamento',
      orcamentos: 'Orçamentos',
      materiais: 'Produtos',
      status: ['Agendado','Em atendimento','Concluído','Cancelado']
    }
  },

  fotografia: {
    keywords: ['foto','fotografia','ensaio','fotografo',
               'fotógrafo','vídeo','video','filmagem',
               'drone','retratos','casamento foto'],
    icone: '📷',
    paleta: {
      org: '#4a5568',
      org2: '#6b7280',
      orgBg: '#f3f4f6',
      brn: '#0a0c10',
      bg: '#f9fafb'
    },
    labels: {
      servico: 'Sessão',
      servicos: 'Sessões',
      cliente: 'Cliente',
      clientes: 'Clientes',
      orcamento: 'Proposta',
      orcamentos: 'Propostas',
      materiais: 'Equipamentos',
      status: ['Agendado','Em andamento','Editando','Entregue']
    }
  },

  geral: {
    keywords: [],
    icone: '🛠️',
    paleta: {
      org: '#e07b2a',
      org2: '#f59642',
      orgBg: '#fff4eb',
      brn: '#1e0f00',
      bg: '#faf7f3'
    },
    labels: {
      servico: 'Serviço',
      servicos: 'Serviços',
      cliente: 'Cliente',
      clientes: 'Clientes',
      orcamento: 'Orçamento',
      orcamentos: 'Orçamentos',
      materiais: 'Materiais',
      status: ['Agendado','Em andamento','Realizado','Cancelado']
    }
  }

}

function detectarSegmento(tipoServico){
  if(!tipoServico) return 'geral';
  const texto = tipoServico.toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g,'');
  for(const [key, seg] of Object.entries(SEGMENTOS)){
    if(key === 'geral') continue;
    const encontrou = seg.keywords.some(p =>
      texto.includes(
        p.normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      )
    );
    if(encontrou) return key;
  }
  return 'geral';
}
