import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class InterElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  // Banner de cookies/consentimento (só é tratado se aparecer)
  getBotaoAceitarCookies(): Locator {
    return this.page.getByRole('button', {
      name: /aceitar|concordo|ok, entendi/i
    });
  }

  // Home
  getTituloProximosJogos(): Locator {
    return this.page
      .getByRole('heading', { name: 'Próximos jogos', exact: true })
      .first();
  }

  getTituloUltimasNoticias(): Locator {
    return this.page
      .getByRole('heading', { name: 'Últimas notícias', exact: true })
      .first();
  }

  getBotaoVerTodasNoticias(): Locator {
    return this.page
      .getByText('Ver todas as notícias', { exact: true })
      .first();
  }

  // Os links do menu existem no menu lateral (oculto) e no rodapé,
  // por isso filtramos apenas o que está visível na tela.
  getLinkPerguntasFrequentes(): Locator {
    return this.page
      .getByRole('link', { name: 'Perguntas frequentes', exact: true })
      .filter({ visible: true })
      .first();
  }

  // Página de Notícias
  getTituloSecaoMasculino(): Locator {
    return this.page
      .getByRole('heading', { name: 'Masculino', exact: true })
      .first();
  }

  // Página de Perguntas frequentes
  getTituloPerguntasFrequentes(): Locator {
    return this.page.getByRole('heading', {
      level: 1,
      name: 'Perguntas frequentes'
    });
  }

  getPerguntaComoAssociar(): Locator {
    return this.page
      .getByText('Como posso me associar ao Internacional?')
      .first();
  }
}