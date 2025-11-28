// Script léger pour la navigation mobile et les interactions simples.
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navList = document.querySelector('nav ul');

  if (burger && navList) {
    burger.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
  }
});
