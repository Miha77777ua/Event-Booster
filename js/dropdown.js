const toggle = document.querySelector('.dropdown-toggle');
    const menu = document.querySelector('.dropdown-menu');
    const items = document.querySelectorAll('.dropdown-menu div');

    toggle.addEventListener('click', () => {
      menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
    });

    items.forEach(item => {
      item.addEventListener('click', () => {
        toggle.textContent = item.textContent;
        toggle.setAttribute('data-value', item.getAttribute('data-value'));
        menu.style.display = 'none';
        console.log('Selected:', item.getAttribute('data-value')); // для перевірки
      });
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.header__input-filter')) {
        menu.style.display = 'none';
      }
    });