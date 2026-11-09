import { Page, expect } from '@playwright/test';
import InterElements from '../elements/InterElements';
import BasePage from './BasePage';

export default class InterPage extends BasePage {
  readonly interElements: InterElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.interElements = new InterElements(page);
  }

  async tratarBannerCookies(): Promise<void> {
    // Se o banner de cookies aparecer antes de alguma ação,
    // o Playwright clica em "Aceitar" automaticamente.
    await this.page.addLocatorHandler(
      this.interElements.getBotaoAceitarCookies(),
      async botao => {
        await botao.click();
      }
    );
  }

  async validarHome(): Promise<void> {
    await expect(this.interElements.getTituloProximosJogos()).toBeVisible();
    await expect(this.interElements.getTituloUltimasNoticias()).toBeVisible();
  }

  async acessarTodasNoticias(): Promise<void> {
    await this.interElements.getBotaoVerTodasNoticias().click();
  }

  async validarPaginaNoticias(): Promise<void> {
    await expect(this.interElements.getTituloSecaoMasculino()).toBeVisible();
  }

  async acessarPerguntasFrequentes(): Promise<void> {
    await this.interElements.getLinkPerguntasFrequentes().click();
  }

  async validarPerguntasFrequentes(): Promise<void> {
    await expect(
      this.interElements.getTituloPerguntasFrequentes()
    ).toBeVisible();
    await expect(this.interElements.getPerguntaComoAssociar()).toBeVisible();
  }
}