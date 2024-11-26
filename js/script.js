/* Lógica do Swiper */

let swiper = new Swiper('.mySwiper', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

/*--------------------Scroll-Animation---------------------- */
document.addEventListener('DOMContentLoaded', function () {
  const sections = document.querySelectorAll('.scroll-fade');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;

    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Rolando para baixo
        if (currentScrollY + window.innerHeight > sectionTop) {
          section.classList.add('visible');
          section.classList.remove('hidden');
        }
      } else {
        // Rolando para cima
        if (
          currentScrollY + window.innerHeight <
          sectionTop + section.offsetHeight
        ) {
          section.classList.add('hidden');
          section.classList.remove('visible');
        }
      }
    });
    lastScrollY = currentScrollY;
  });
});

/*--------------------Boxes Scroll Animation---------------------- */
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

/*--------------------Carousel-Animation---------------------- */

let count = 1;
document.getElementById('radio1').checked = true;
setInterval(function () {
  nextImage();
}, 5000);

function nextImage() {
  count++;
  if (count > 4) {
    count = 1;
  }

  document.getElementById('radio' + count).checked = true;
}

/* --------------------Função para trocar as skills---------------------- */
function showTitle(element) {
  const icon = element.querySelector('.icon');
  const content = element.querySelector('.skill-content');
  // Mostra o conteúdo e esconde o ícone
  // icon.style.display = 'none';
  // content.style.display = 'flex';
  // Mostra o conteúdo e aplica a transição para o ícone
  // Aplicar transições com verificação
  if (icon && content) {
    icon.style.opacity = '0';
    content.style.opacity = '1';
  }
}

function showIcon(element) {
  const icon = element.querySelector('.icon');
  const content = element.querySelector('.skill-content');

  // Restaurar o ícone quando o mouse sair
  // content.style.display = 'none';
  // icon.style.display = 'block';
  // Esconde o conteúdo e aplica a transição para o ícone
  if (icon && content) {
    content.style.opacity = '0';
    icon.style.opacity = '1';
  }
}

/* --------------------Função para substituir as os elementos dos cards por texto---------------------- */
function showText(element) {
  const text = element.querySelector('.card_text_elements');
  const cardContent = element.querySelector('.card-content');

  if (text && cardContent) {
    text.style.opacity = '0';
    text.style.visibility = 'hidden';
    cardContent.style.opacity = '1';
    cardContent.style.visibility = 'visible';
  }
}

function showContent(element) {
  const text = element.querySelector('.card_text_elements');
  const cardContent = element.querySelector('.card-content');
  if (text && cardContent) {
    text.style.opacity = '1';
    text.style.visibility = 'visible';
    cardContent.style.opacity = '0';
    cardContent.style.visibility = 'hidden';
  }
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

// LÓGICA PARA SWITCH MODE
// const themeToggle = document.getElementById('themeToggle');
// const rootElement = document.documentElement;

// themeToggle.addEventListener('click', () => {
//   rootElement.classList.toggle('theme-light');

//   // Salva a preferência no localStorage para manter entre recarregamentos
//   const isLightTheme = rootElement.classList.contains('theme-light');
//   localStorage.setItem('theme', isLightTheme ? 'light' : 'dark');
// });

// // Carrega o tema salvo no localStorage
// const savedTheme = localStorage.getItem('theme');
// if (savedTheme === 'light') {
//   rootElement.classList.add('theme-light');
// }
