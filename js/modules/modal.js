function openModal(modalSelector, modalTimerId) {
  const modal = document.querySelector(modalSelector); 
  modal.style.display = 'block'; 
  document.body.style.overflow = 'hidden';
  
  if (modalTimerId) {
    clearInterval(modalTimerId); 
  }
}

function closeModal(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.style.display = 'none'; 
  document.body.style.overflow = '';
}

function modal(triggerSlector, modalSelector, modalTimerId) {
    const modalOpen = document.querySelectorAll(triggerSlector), 
          modal = document.querySelector(modalSelector);


modalOpen.forEach(btn => {
  btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
});

modal.addEventListener('click', (e) => { 
  if (e.target === modal || e.target.getAttribute('data-close') == '') {
      closeModal(modalSelector);
  }
});

document.addEventListener('keydown', (e) => { 
  if (e.code === 'Escape' && (modal.style.display = 'block')) {
      closeModal(modalSelector);
  }
});

function showModalByScroll() {
  let scrolled = window.pageYOffset + document.documentElement.clientHeight;
  if (scrolled >= document.documentElement.scrollHeight - 2) {
      openModal(modalSelector, modalTimerId);
      window.removeEventListener('scroll', showModalByScroll);
  }
}

window.addEventListener('scroll', showModalByScroll);


// window.onscroll = function() { ***это просто еще один вариант реализации
//     let scrolled = window.pageYOffset || document.documentElement.scrollTop;
//     if (scrolled > 2440) {
//         openModal();
//     } else closeModal();
// };
}
export default modal;
export {closeModal};
export {openModal};