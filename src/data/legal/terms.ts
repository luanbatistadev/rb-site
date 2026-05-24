export type LegalBlock =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] };

export type LegalSection = {
  title: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  tag: string;
  title: string;
  subtitle: string;
  lastUpdatedLabel: string;
  lastUpdated: string;
  sections: LegalSection[];
};

export const terms: Record<"pt-BR" | "en", LegalDocument> = {
  "pt-BR": {
    tag: "Termos de Uso",
    title: "Termos de Uso",
    subtitle: "Condições para o uso deste site e dos serviços oferecidos pela RB Computing Development.",
    lastUpdatedLabel: "Última atualização",
    lastUpdated: "24 de maio de 2026",
    sections: [
      {
        title: "1. Aceitação dos Termos",
        blocks: [
          {
            kind: "p",
            text:
              'Ao acessar e usar o site da RB Computing Development ("nós", "nosso", "site"), você concorda em cumprir e ficar vinculado a estes Termos de Uso. Se não concordar com qualquer parte destes termos, não utilize o site.',
          },
        ],
      },
      {
        title: "2. Sobre a RB Computing Development",
        blocks: [
          {
            kind: "p",
            text:
              "RB - Computing Development LTDA (CNPJ 50.487.858/0001-09), sociedade empresária limitada, ME, com sede na Rua Luiza Villaça, nº 277, Bairro Canadá, Cascavel/PR, CEP 85.813-742, oferece os seguintes serviços:",
          },
          {
            kind: "list",
            items: [
              "Desenvolvimento de aplicações mobile (iOS, Android, Flutter)",
              "Desenvolvimento de aplicações web (Next.js, Front-end, Back-end)",
              "Consultoria técnica e de arquitetura",
              "Modernização de sistemas legados",
              "Manutenção e evolução de software",
            ],
          },
        ],
      },
      {
        title: "3. Uso do Site",
        blocks: [
          {
            kind: "p",
            text:
              "Você concorda em utilizar este site apenas para fins legais e de maneira que não infrinja os direitos de terceiros nem restrinja o uso por outros visitantes. É proibido:",
          },
          {
            kind: "list",
            items: [
              "Tentar obter acesso não autorizado a qualquer parte do site",
              "Utilizar o site para enviar spam ou conteúdo malicioso",
              "Realizar engenharia reversa, descompilar ou tentar extrair o código-fonte",
              "Coletar dados de outros usuários sem autorização",
            ],
          },
        ],
      },
      {
        title: "4. Formulário de Contato",
        blocks: [
          {
            kind: "p",
            text:
              "Ao enviar o formulário de contato, você confirma que os dados fornecidos são verdadeiros e nos autoriza a entrar em contato pelos meios informados. As informações enviadas são tratadas conforme a Política de Privacidade.",
          },
        ],
      },
      {
        title: "5. Propriedade Intelectual",
        blocks: [
          {
            kind: "p",
            text:
              "Todo o conteúdo deste site (textos, imagens, código, design, marca) é de propriedade da RB Computing Development ou de seus licenciadores e está protegido por leis de propriedade intelectual. É vedada a reprodução, distribuição ou uso comercial sem autorização prévia por escrito.",
          },
          {
            kind: "p",
            text:
              'Projetos de clientes apresentados na seção "Projetos" são exibidos com autorização dos respectivos titulares.',
          },
        ],
      },
      {
        title: "6. Serviços e Propostas",
        blocks: [
          {
            kind: "p",
            text:
              "As informações sobre serviços no site são apresentadas em caráter informativo. Propostas comerciais, escopos, prazos e valores específicos são definidos em contratos individuais firmados com cada cliente.",
          },
        ],
      },
      {
        title: "7. Limitação de Responsabilidade",
        blocks: [
          {
            kind: "p",
            text:
              "Empenhamo-nos para manter o site sempre disponível e com informações atualizadas, mas não garantimos a ausência de erros, interrupções ou inexatidões. Em nenhuma hipótese seremos responsáveis por danos indiretos, lucros cessantes ou perdas decorrentes do uso (ou impossibilidade de uso) do site.",
          },
        ],
      },
      {
        title: "8. Links para Terceiros",
        blocks: [
          {
            kind: "p",
            text:
              "O site pode conter links para serviços e sites de terceiros (Instagram, LinkedIn etc.). Não controlamos nem nos responsabilizamos pelo conteúdo, políticas ou práticas desses terceiros.",
          },
        ],
      },
      {
        title: "9. Modificações destes Termos",
        blocks: [
          {
            kind: "p",
            text:
              "Podemos atualizar estes Termos a qualquer momento. A versão vigente será sempre a publicada nesta página, com a data da última atualização indicada acima. O uso continuado do site após alterações configura aceitação dos novos termos.",
          },
        ],
      },
      {
        title: "10. Lei Aplicável e Foro",
        blocks: [
          {
            kind: "p",
            text:
              "Estes Termos são regidos pela legislação brasileira. Fica eleito o foro da comarca de Cascavel - PR para dirimir quaisquer questões oriundas deste documento, com renúncia a qualquer outro, por mais privilegiado que seja.",
          },
        ],
      },
      {
        title: "11. Contato",
        blocks: [
          {
            kind: "p",
            text: "Dúvidas sobre estes Termos podem ser enviadas para:",
          },
          {
            kind: "list",
            items: ["E-mail: luanbatistadev@gmail.com", "Telefone: +55 69 99295-0959"],
          },
        ],
      },
    ],
  },
  en: {
    tag: "Terms of Use",
    title: "Terms of Use",
    subtitle: "Conditions for using this website and the services offered by RB Computing Development.",
    lastUpdatedLabel: "Last updated",
    lastUpdated: "May 24, 2026",
    sections: [
      {
        title: "1. Acceptance of Terms",
        blocks: [
          {
            kind: "p",
            text:
              'By accessing and using the RB Computing Development website ("we", "our", "site"), you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use the site.',
          },
        ],
      },
      {
        title: "2. About RB Computing Development",
        blocks: [
          {
            kind: "p",
            text:
              "RB - Computing Development LTDA (CNPJ 50.487.858/0001-09), a Brazilian limited liability company (ME), headquartered at Rua Luiza Villaça, 277, Canadá district, Cascavel/PR, ZIP 85.813-742, offers the following services:",
          },
          {
            kind: "list",
            items: [
              "Mobile app development (iOS, Android, Flutter)",
              "Web application development (Next.js, Front-end, Back-end)",
              "Technical and architecture consulting",
              "Legacy system modernization",
              "Maintenance and evolution",
            ],
          },
        ],
      },
      {
        title: "3. Use of the Site",
        blocks: [
          {
            kind: "p",
            text:
              "You agree to use this site only for lawful purposes and in a way that does not infringe the rights of others or restrict their use of the site. The following is prohibited:",
          },
          {
            kind: "list",
            items: [
              "Attempting to gain unauthorized access to any part of the site",
              "Using the site to send spam or malicious content",
              "Reverse engineering, decompiling or attempting to extract source code",
              "Collecting data from other users without authorization",
            ],
          },
        ],
      },
      {
        title: "4. Contact Form",
        blocks: [
          {
            kind: "p",
            text:
              "By submitting the contact form, you confirm that the data provided is truthful and authorize us to contact you through the channels informed. Information submitted is handled in accordance with the Privacy Policy.",
          },
        ],
      },
      {
        title: "5. Intellectual Property",
        blocks: [
          {
            kind: "p",
            text:
              "All content on this site (text, images, code, design, brand) is owned by RB Computing Development or its licensors and is protected by intellectual property laws. Reproduction, distribution or commercial use without prior written authorization is forbidden.",
          },
          {
            kind: "p",
            text: 'Client projects shown in the "Projects" section are displayed with permission from the respective owners.',
          },
        ],
      },
      {
        title: "6. Services and Proposals",
        blocks: [
          {
            kind: "p",
            text:
              "Information about services on the site is presented for informational purposes. Commercial proposals, scopes, deadlines and specific values are defined in individual contracts signed with each client.",
          },
        ],
      },
      {
        title: "7. Limitation of Liability",
        blocks: [
          {
            kind: "p",
            text:
              "We strive to keep the site always available and with up-to-date information, but we do not guarantee the absence of errors, interruptions or inaccuracies. Under no circumstances will we be liable for indirect damages, lost profits or losses arising from the use (or inability to use) of the site.",
          },
        ],
      },
      {
        title: "8. Third-Party Links",
        blocks: [
          {
            kind: "p",
            text:
              "The site may contain links to third-party services and websites (Instagram, LinkedIn, etc.). We do not control nor are responsible for the content, policies or practices of these third parties.",
          },
        ],
      },
      {
        title: "9. Modifications to these Terms",
        blocks: [
          {
            kind: "p",
            text:
              "We may update these Terms at any time. The version in force will always be the one published on this page, with the date of the latest update indicated above. Continued use of the site after changes constitutes acceptance of the new terms.",
          },
        ],
      },
      {
        title: "10. Applicable Law and Jurisdiction",
        blocks: [
          {
            kind: "p",
            text:
              "These Terms are governed by Brazilian law. The jurisdiction of Cascavel - PR, Brazil, is elected to resolve any matters arising from this document, with waiver of any other, however privileged.",
          },
        ],
      },
      {
        title: "11. Contact",
        blocks: [
          {
            kind: "p",
            text: "Questions about these Terms can be sent to:",
          },
          {
            kind: "list",
            items: ["Email: luanbatistadev@gmail.com", "Phone: +55 69 99295-0959"],
          },
        ],
      },
    ],
  },
};
