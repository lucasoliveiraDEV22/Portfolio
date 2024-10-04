// const hiddenElements = document.querySelectorAll('main, section, footer');

// const observer = new IntersectionObserver((entries) => {
//   entries.forEach((entry) => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('show');
//     } else {
//       entry.target.classList.remove('show');
//     }
//   });
// });

// hiddenElements.forEach((el) => observer.observe(el));

// document.addEventListener("DOMContentLoaded", function() {
//   const elements = document.querySelectorAll("main, section, footer");

//   function checkScroll() {
//     const triggerBottom = window.innerHeight / 5 * 4;

//     elements.forEach((element) => {
//       const elementTop = element.getBoundingClientRect().top;

//       if (elementTop < triggerBottom) {
//         element.classList.add("show");
//       } else {
//         element.classList.remove("show");
//       }
//     });
//   }

//   window.addEventListener("scroll", checkScroll);
//   checkScroll(); // Executa ao carregar a página para verificar a posição inicial
// });

// document.addEventListener("scroll", function () {
//   // Pega o valor da rolagem vertical
//   let scrollY = window.scrollY;

//   // Calcula o quanto os cards se moverão horizontalmente
//   let horizontalScroll = scrollY * 0.5; // Ajuste o fator multiplicador conforme necessário

//   // Aplica a transformação horizontal aos cards
//   document.querySelector(".cards-container").style.transform = `translateX(-${horizontalScroll}px)`;
// });

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
