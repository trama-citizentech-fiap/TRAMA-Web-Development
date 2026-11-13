/* Testes estaticos sem bibliotecas externas: execute `node --test testes/verificar.mjs`. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = path => readFileSync(resolve(root, path), 'utf-8');
const html = read('index.html');
const slider = read('assets/js/galeria.js');
const form = read('assets/js/formulario.js');

const originalSections = ['problema','tecnologia','objetivos','publico','beneficios'];
test('mantem todas as cinco secoes da landing original', () => {
  for (const id of originalSections) assert.match(html, new RegExp(`id="${id}"`));
});

test('inclui galeria e formulario com seletores acessiveis', () => {
  for (const id of ['galeria','trama-slideshow','slide-prev','slide-next','participe','contact-form','contact-name','contact-email','contact-message']) {
    assert.match(html, new RegExp(`id="${id}"`));
  }
});

test('carrossel usa 3 imagens locais existentes', () => {
  const images = [...slider.matchAll(/src: '([^']+\.svg)'/g)].map(item => item[1]);
  assert.equal(images.length, 3);
  for (const source of images) assert.ok(existsSync(resolve(root, source)), `${source} precisa existir`);
});

test('valida campos, previne envio e cria previa com textContent', () => {
  assert.match(form, /event\.preventDefault\(\)/);
  assert.match(form, /getError\(key\)/);
  assert.match(form, /preview-message'\)\.textContent/);
});

test('mantem assets CSS e scripts organizados sem frameworks', () => {
  for (const path of ['assets/css/styles.css','assets/css/dinamico.css','assets/js/script.js','assets/js/galeria.js','assets/js/formulario.js','equipe.txt','AI.md']) {
    assert.ok(existsSync(resolve(root, path)), `${path} ausente`);
  }
  assert.doesNotMatch(html, /src="https:\/\/(?:cdn|unpkg|jsdelivr)/);
});
