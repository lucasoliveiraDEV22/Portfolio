const hiddenElements = document.querySelectorAll('main, section, footer');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
});

hiddenElements.forEach((el) => observer.observe(el));

// Mostra o botão quando o usuário rolar 20px para baixo
window.onscroll = function() {
  scrollFunction();
};

function scrollFunction() {
  const backToTopButton = document.getElementById("backToTop");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

// Rola suavemente para o topo quando o botão é clicado
document.getElementById("backToTop").onclick = function() {
  window.scrollTo({top: 0, behavior: 'smooth'});
};
