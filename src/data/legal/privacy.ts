import type { LegalDocument } from "./terms";

export const privacy: Record<"pt-BR" | "en", LegalDocument> = {
  "pt-BR": {
    tag: "Privacidade",
    title: "Política de Privacidade",
    subtitle:
      "Como tratamos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados (LGPD).",
    lastUpdatedLabel: "Última atualização",
    lastUpdated: "24 de maio de 2026",
    sections: [
      {
        title: "Visão geral",
        blocks: [
          {
            kind: "p",
            text:
              'Esta Política de Privacidade explica como a RB - Computing Development LTDA ("nós", "nosso") coleta, utiliza, compartilha e protege seus dados pessoais quando você acessa nosso site ou entra em contato conosco, em conformidade com a Lei nº 13.709/2018 (LGPD).',
          },
        ],
      },
      {
        title: "1. Controlador dos Dados",
        blocks: [
          {
            kind: "p",
            text:
              "A RB - Computing Development LTDA atua como controladora dos dados pessoais coletados por meio deste site.",
          },
          {
            kind: "list",
            items: [
              "Razão social: RB - Computing Development LTDA",
              "CNPJ: 50.487.858/0001-09",
              "Endereço: Rua Luiza Villaça, 277, Bairro Canadá, Cascavel/PR, CEP 85.813-742",
              "E-mail para questões de privacidade: luanbatistadev@gmail.com",
              "Telefone: +55 69 99295-0959",
            ],
          },
        ],
      },
      {
        title: "2. Dados que Coletamos",
        blocks: [
          {
            kind: "p",
            text:
              "Coletamos somente os dados que você nos fornece voluntariamente, principalmente pelo formulário de contato:",
          },
          {
            kind: "list",
            items: [
              "Nome completo",
              "E-mail",
              "Telefone (opcional)",
              "Tipo de projeto de interesse",
              "Faixa de orçamento estimado (opcional)",
              "Conteúdo da mensagem",
            ],
          },
          {
            kind: "p",
            text:
              "Não coletamos automaticamente dados de navegação para perfilamento, nem utilizamos cookies de rastreamento ou ferramentas de analytics que identifiquem usuários individualmente.",
          },
        ],
      },
      {
        title: "3. Cookies",
        blocks: [
          {
            kind: "p",
            text: "Utilizamos um único cookie técnico de funcionalidade:",
          },
          {
            kind: "list",
            items: [
              "NEXT_LOCALE: armazena sua preferência de idioma (pt-BR ou en) para mantê-la entre visitas. Validade: 1 ano. Não rastreia nem identifica você.",
            ],
          },
          {
            kind: "p",
            text:
              "Você pode desabilitar cookies nas configurações do navegador; o site continuará funcionando e passará a usar o idioma padrão a cada visita.",
          },
        ],
      },
      {
        title: "4. Finalidade do Tratamento",
        blocks: [
          {
            kind: "p",
            text: "Os dados coletados são utilizados para:",
          },
          {
            kind: "list",
            items: [
              "Responder à sua solicitação enviada pelo formulário de contato",
              "Avaliar propostas e oportunidades comerciais",
              "Cumprir obrigações legais, regulatórias ou determinações de autoridades competentes",
            ],
          },
          {
            kind: "p",
            text:
              "Não utilizamos seus dados para marketing direto, criação de perfis comportamentais ou venda a terceiros.",
          },
        ],
      },
      {
        title: "5. Base Legal (LGPD art. 7º)",
        blocks: [
          {
            kind: "p",
            text: "O tratamento dos dados se baseia em:",
          },
          {
            kind: "list",
            items: [
              "Consentimento (art. 7º, I): você fornece os dados voluntariamente ao preencher o formulário",
              "Execução de contrato ou procedimentos preliminares (art. 7º, V): para responder e eventualmente formalizar prestação de serviços",
              "Cumprimento de obrigação legal (art. 7º, II): quando aplicável",
            ],
          },
        ],
      },
      {
        title: "6. Compartilhamento com Terceiros",
        blocks: [
          {
            kind: "p",
            text:
              "Para operar o site e processar contatos, compartilhamos dados estritamente necessários com:",
          },
          {
            kind: "list",
            items: [
              "Resend (resend.com): processa o envio do e-mail do formulário de contato para nossa caixa",
              "Vercel (vercel.com): hospeda o site; recebe logs técnicos do servidor",
              "Hostinger (hostinger.com): operadora do DNS do domínio",
            ],
          },
          {
            kind: "p",
            text:
              "Esses prestadores atuam como operadores e seguem suas próprias políticas de privacidade, alinhadas a padrões internacionais como LGPD e GDPR. Não vendemos, alugamos nem cedemos seus dados pessoais a terceiros para fins comerciais.",
          },
        ],
      },
      {
        title: "7. Retenção dos Dados",
        blocks: [
          {
            kind: "p",
            text:
              "Mantemos os dados do formulário de contato pelo tempo necessário para responder à sua solicitação e avaliar eventual oportunidade comercial, geralmente até 24 meses. Após esse prazo, ou antes mediante solicitação sua, os dados são eliminados de nossas bases.",
          },
          {
            kind: "p",
            text:
              "E-mails recebidos pelo Resend permanecem disponíveis no histórico do nosso provedor conforme as políticas dele (tipicamente até 30 dias para metadados).",
          },
        ],
      },
      {
        title: "8. Direitos do Titular (LGPD art. 18)",
        blocks: [
          {
            kind: "p",
            text: "Você tem direito a, a qualquer momento:",
          },
          {
            kind: "list",
            items: [
              "Confirmar a existência de tratamento dos seus dados",
              "Acessar os dados que mantemos sobre você",
              "Corrigir dados incompletos, inexatos ou desatualizados",
              "Solicitar anonimização, bloqueio ou eliminação de dados",
              "Solicitar portabilidade dos dados",
              "Revogar o consentimento e ser informado sobre as consequências",
              "Apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD)",
            ],
          },
          {
            kind: "p",
            text:
              'Para exercer qualquer desses direitos, envie sua solicitação para luanbatistadev@gmail.com com o assunto "LGPD - Direitos do Titular". Responderemos em até 15 dias.',
          },
        ],
      },
      {
        title: "9. Segurança",
        blocks: [
          {
            kind: "p",
            text:
              "Adotamos medidas técnicas e organizacionais razoáveis para proteger seus dados contra acesso não autorizado, perda, alteração ou destruição:",
          },
          {
            kind: "list",
            items: [
              "Conexão HTTPS em todo o site (TLS 1.3)",
              "Servidores em infraestrutura corporativa (Vercel) com padrões internacionais de segurança",
              "Proteção anti-spam e anti-abuso (rate limiting + honeypot) no formulário de contato",
              "Acesso restrito aos dados coletados",
            ],
          },
          {
            kind: "p",
            text:
              "Nenhum sistema é 100% seguro; em caso de incidente que possa acarretar risco a você, comunicaremos conforme exigido pela LGPD (art. 48) e pela ANPD.",
          },
        ],
      },
      {
        title: "10. Crianças e Adolescentes",
        blocks: [
          {
            kind: "p",
            text:
              "Nossos serviços são direcionados a empresas e profissionais. Não coletamos intencionalmente dados de menores de 18 anos. Caso identifiquemos coleta inadvertida, eliminaremos os dados imediatamente.",
          },
        ],
      },
      {
        title: "11. Alterações a esta Política",
        blocks: [
          {
            kind: "p",
            text:
              "Esta Política pode ser atualizada periodicamente. A versão vigente será sempre a publicada nesta página, com a data da última atualização indicada acima. Alterações significativas serão comunicadas por meios razoáveis (banner no site ou e-mail, quando aplicável).",
          },
        ],
      },
      {
        title: "12. Contato",
        blocks: [
          {
            kind: "p",
            text: "Dúvidas, solicitações ou denúncias relacionadas a este documento:",
          },
          {
            kind: "list",
            items: ["E-mail: luanbatistadev@gmail.com", "Telefone: +55 69 99295-0959"],
          },
          {
            kind: "p",
            text: "Você também tem o direito de contatar a ANPD diretamente: https://www.gov.br/anpd",
          },
        ],
      },
    ],
  },
  en: {
    tag: "Privacy",
    title: "Privacy Policy",
    subtitle:
      "How we handle your personal data, in compliance with Brazilian data protection law (LGPD).",
    lastUpdatedLabel: "Last updated",
    lastUpdated: "May 24, 2026",
    sections: [
      {
        title: "Overview",
        blocks: [
          {
            kind: "p",
            text:
              'This Privacy Policy explains how RB - Computing Development LTDA ("we", "our") collects, uses, shares and protects your personal data when you access our website or contact us, in compliance with Brazilian Law No. 13.709/2018 (LGPD).',
          },
        ],
      },
      {
        title: "1. Data Controller",
        blocks: [
          {
            kind: "p",
            text:
              "RB - Computing Development LTDA acts as the controller of personal data collected through this site.",
          },
          {
            kind: "list",
            items: [
              "Legal name: RB - Computing Development LTDA",
              "CNPJ: 50.487.858/0001-09",
              "Address: Rua Luiza Villaça, 277, Canadá district, Cascavel/PR, ZIP 85.813-742, Brazil",
              "Privacy contact email: luanbatistadev@gmail.com",
              "Phone: +55 69 99295-0959",
            ],
          },
        ],
      },
      {
        title: "2. Data We Collect",
        blocks: [
          {
            kind: "p",
            text:
              "We only collect data you voluntarily provide to us, primarily through the contact form:",
          },
          {
            kind: "list",
            items: [
              "Full name",
              "Email",
              "Phone (optional)",
              "Project type of interest",
              "Estimated budget range (optional)",
              "Message content",
            ],
          },
          {
            kind: "p",
            text:
              "We do not automatically collect browsing data for profiling, nor do we use tracking cookies or analytics tools that individually identify users.",
          },
        ],
      },
      {
        title: "3. Cookies",
        blocks: [
          {
            kind: "p",
            text: "We use a single technical functional cookie:",
          },
          {
            kind: "list",
            items: [
              "NEXT_LOCALE: stores your language preference (pt-BR or en) to keep it across visits. Valid for 1 year. Does not track or identify you.",
            ],
          },
          {
            kind: "p",
            text:
              "You can disable cookies in your browser settings; the site will continue to work and will use the default language on each visit.",
          },
        ],
      },
      {
        title: "4. Purpose of Processing",
        blocks: [
          {
            kind: "p",
            text: "Collected data is used to:",
          },
          {
            kind: "list",
            items: [
              "Respond to your request submitted through the contact form",
              "Evaluate proposals and commercial opportunities",
              "Comply with legal, regulatory or competent authority determinations",
            ],
          },
          {
            kind: "p",
            text:
              "We do not use your data for direct marketing, behavioral profiling or sale to third parties.",
          },
        ],
      },
      {
        title: "5. Legal Basis (LGPD art. 7)",
        blocks: [
          {
            kind: "p",
            text: "Data processing is based on:",
          },
          {
            kind: "list",
            items: [
              "Consent (art. 7, I): you voluntarily provide data when filling out the form",
              "Contract execution or preliminary procedures (art. 7, V): to respond and eventually formalize services",
              "Compliance with legal obligation (art. 7, II): when applicable",
            ],
          },
        ],
      },
      {
        title: "6. Sharing with Third Parties",
        blocks: [
          {
            kind: "p",
            text:
              "To operate the site and process contacts, we share strictly necessary data with:",
          },
          {
            kind: "list",
            items: [
              "Resend (resend.com): processes sending the contact form email to our inbox",
              "Vercel (vercel.com): hosts the site; receives technical server logs",
              "Hostinger (hostinger.com): operates the domain DNS",
            ],
          },
          {
            kind: "p",
            text:
              "These providers act as processors and follow their own privacy policies, aligned with international standards such as LGPD and GDPR. We do not sell, rent or transfer your personal data to third parties for commercial purposes.",
          },
        ],
      },
      {
        title: "7. Data Retention",
        blocks: [
          {
            kind: "p",
            text:
              "We retain contact form data for the time necessary to respond to your request and evaluate any commercial opportunity, generally up to 24 months. After this period, or earlier upon your request, data is deleted from our systems.",
          },
          {
            kind: "p",
            text:
              "Emails received through Resend remain available in our provider's history according to their policies (typically up to 30 days for metadata).",
          },
        ],
      },
      {
        title: "8. Data Subject Rights (LGPD art. 18)",
        blocks: [
          {
            kind: "p",
            text: "You are entitled, at any time, to:",
          },
          {
            kind: "list",
            items: [
              "Confirm the existence of processing of your data",
              "Access the data we hold about you",
              "Correct incomplete, inaccurate or outdated data",
              "Request anonymization, blocking or deletion of data",
              "Request data portability",
              "Revoke consent and be informed of the consequences",
              "File a complaint with the National Data Protection Authority (ANPD)",
            ],
          },
          {
            kind: "p",
            text:
              'To exercise any of these rights, send your request to luanbatistadev@gmail.com with the subject "LGPD - Data Subject Rights". We will respond within 15 days.',
          },
        ],
      },
      {
        title: "9. Security",
        blocks: [
          {
            kind: "p",
            text:
              "We adopt reasonable technical and organizational measures to protect your data against unauthorized access, loss, alteration or destruction:",
          },
          {
            kind: "list",
            items: [
              "HTTPS connection across the site (TLS 1.3)",
              "Servers on enterprise infrastructure (Vercel) with international security standards",
              "Anti-spam and anti-abuse protection (rate limiting + honeypot) on the contact form",
              "Restricted access to collected data",
            ],
          },
          {
            kind: "p",
            text:
              "No system is 100% secure; in the event of an incident that may pose a risk to you, we will communicate as required by LGPD (art. 48) and ANPD.",
          },
        ],
      },
      {
        title: "10. Children and Adolescents",
        blocks: [
          {
            kind: "p",
            text:
              "Our services are aimed at companies and professionals. We do not intentionally collect data from minors under 18 years of age. If we identify inadvertent collection, we will delete the data immediately.",
          },
        ],
      },
      {
        title: "11. Changes to this Policy",
        blocks: [
          {
            kind: "p",
            text:
              "This Policy may be updated periodically. The version in force will always be the one published on this page, with the date of the last update indicated above. Significant changes will be communicated by reasonable means (site banner or email, when applicable).",
          },
        ],
      },
      {
        title: "12. Contact",
        blocks: [
          {
            kind: "p",
            text: "Questions, requests or complaints related to this document:",
          },
          {
            kind: "list",
            items: ["Email: luanbatistadev@gmail.com", "Phone: +55 69 99295-0959"],
          },
          {
            kind: "p",
            text: "You also have the right to contact ANPD directly: https://www.gov.br/anpd",
          },
        ],
      },
    ],
  },
};
