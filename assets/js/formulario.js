/* TRAMA — Front-end Dinamico. Formulario local sem API, envio ou armazenamento. */
(() => {
  'use strict';
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: document.getElementById('contact-name'),
    email: document.getElementById('contact-email'),
    profile: document.getElementById('contact-profile'),
    message: document.getElementById('contact-message')
  };
  const errors = {
    name: document.getElementById('error-name'),
    email: document.getElementById('error-email'),
    profile: document.getElementById('error-profile'),
    message: document.getElementById('error-message')
  };
  const feedback = document.getElementById('form-feedback');
  const preview = document.getElementById('form-preview');
  const counter = document.getElementById('message-count');
  let submittedOnce = false;

  function getError(key) {
    const value = fields[key].value.trim();
    if (!value) return 'Este campo é obrigatório.';
    if (key === 'name' && value.length < 3) return 'Digite seu nome com pelo menos 3 caracteres.';
    if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) return 'Informe um endereço de e-mail válido.';
    if (key === 'profile' && !['artista','instituicao','apoiador'].includes(value)) return 'Selecione uma opção de participação.';
    if (key === 'message' && value.length < 10) return 'Escreva uma mensagem com pelo menos 10 caracteres.';
    return '';
  }

  function validate(key) {
    const error = getError(key);
    const input = fields[key];
    errors[key].textContent = error;
    input.setAttribute('aria-invalid', String(Boolean(error)));
    input.closest('.form-field').classList.toggle('has-error', Boolean(error));
    return !error;
  }

  function clearResponse() {
    feedback.hidden = true;
    preview.hidden = true;
  }

  function updateCounter() {
    counter.textContent = `${fields.message.value.length} / 500`;
  }

  Object.entries(fields).forEach(([key, element]) => {
    element.addEventListener('blur', () => validate(key));
    element.addEventListener(key === 'profile' ? 'change' : 'input', () => {
      if (key === 'message') updateCounter();
      if (submittedOnce || element.getAttribute('aria-invalid') === 'true') validate(key);
      clearResponse();
    });
  });
  updateCounter();
})();
