import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import InterPage from '../support/pages/InterPage';

test.describe('Site oficial do SC Internacional', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let interPage: InterPage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.internacional')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    interPage = new InterPage(page);
    await interPage.tratarBannerCookies();
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  });

  test('Deve carregar a home com as seções principais', async () => {
    await interPage.validarHome();
  });

  test('Deve acessar a página de notícias pela home', async () => {
    await interPage.acessarTodasNoticias();
    await interPage.validarPaginaNoticias();
  });

  test('Deve acessar as perguntas frequentes pelo menu', async () => {
    await interPage.acessarPerguntasFrequentes();
    await interPage.validarPerguntasFrequentes();
  });
});