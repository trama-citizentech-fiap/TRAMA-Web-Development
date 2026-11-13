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
  form.addEventListener('submit', event => {
    // Impede tanto o envio do formulario quanto a atualizacao da pagina.
    event.preventDefault();
    submittedOnce = true;
    const valid = Object.keys(fields).map(validate).every(Boolean);
    feedback.hidden = false;
    if (!valid) {
      feedback.dataset.state = 'error';
      feedback.textContent = 'Há campos incompletos ou inválidos. Corrija os itens destacados antes de continuar.';
      preview.hidden = true;
      const firstInvalid = Object.keys(fields).find(key => fields[key].getAttribute('aria-invalid') === 'true');
      if (firstInvalid) fields[firstInvalid].focus();
      return;
    }

    const selectedText = fields.profile.options[fields.profile.selectedIndex].textContent;
    document.getElementById('preview-title').textContent = `Mensagem de ${fields.name.value.trim()}`;
    document.getElementById('preview-summary').textContent =
      `${selectedText} · ${fields.email.value.trim()}`;
    document.getElementById('preview-message').textContent = fields.message.value.trim();
    preview.hidden = false;
    feedback.dataset.state = 'success';
    feedback.textContent = 'Mensagem validada com sucesso! Veja a prévia abaixo. Nada foi enviado ou armazenado.';
  });
  form.addEventListener('reset', () => {
    submittedOnce = false;
    Object.keys(fields).forEach(key => {
      fields[key].removeAttribute('aria-invalid');
      fields[key].closest('.form-field').classList.remove('has-error');
      errors[key].textContent = '';
    });
    clearResponse();
    // O browser restaura os valores de um form reset apos o listener.
    queueMicrotask(updateCounter);
  });
  updateCounter();
})();
