/*--------------------Scroll-Animation---------------------- */

const boxes = document.querySelectorAll('.about_text,.card-left, .card-right');

window.addEventListener('scroll', checkBoxes);

checkBoxes();

function checkBoxes() {
  const triggerBottom = (window.innerHeight / 5) * 4;
  boxes.forEach((box) => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add('show');
    } else {
      box.classList.remove('show');
    }
  });
}

/* --------------------Botão para voltar ao topo---------------------- */

// Mostra o botão quando o usuário rolar 20px para baixo
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  const backToTopButton = document.getElementById('backToTop');
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
}

// Rola suavemente para o topo quando o botão é clicado
document.getElementById('backToTop').onclick = function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};


/* --------------------Lógica do formulário---------------------- */

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute('action');
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
    setTimeout(() => {
      window.location.href = '/';
    }, 5000);
  }

  displayError(message) {
    const errorElement = document.createElement('p');
    errorElement.className = 'error';
    errorElement.innerText =
      message || 'Ops! Algo deu errado! Tente novamente!';
    this.form.prepend(errorElement);
    this.formButton.disabled = false;
    this.formButton.innerText = 'Enviar';
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll('[name]');
    fields.forEach((field) => {
      formObject[field.getAttribute('name')] = field.value;
    });
    return formObject;
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  onSubmission(event) {
    event.preventDefault();
    const nameField = this.form.querySelector('[name="name"]');
    const emailField = this.form.querySelector('[name="email"]');
    const messageField = this.form.querySelector('[name="message"]');

    if (!nameField.value.trim()) {
      this.displayError('Por favor, insira seu nome.');
      return false;
    }

    if (!this.validateEmail(emailField.value)) {
      this.displayError('Por favor, insira um email válido.');
      return false;
    }

    if (!messageField.value.trim()) {
      this.displayError('Por favor, insira uma mensagem.');
      return false;
    }

    event.target.disabled = true;
    event.target.innerText = 'Enviando...';
    return true;
  }

  async sendForm(event) {
    if (this.onSubmission(event)) {
      try {
        const response = await fetch(this.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(this.getFormObject())
        });
        if (response.ok) {
          this.displaySuccess();
        } else {
          throw new Error('Falha na submissão do formulário');
        }
      } catch (error) {
        this.displayError();
      }
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener('click', this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: '[data-form]',
  button: '[data-button]',
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>"
});
formSubmit.init();

/*-------------------LÓGICA DO CARROSSEL----------------- */

const swiper = new Swiper(".swiper", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  keyboard: true,
});
