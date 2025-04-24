document.addEventListener('DOMContentLoaded', function() {
  const plusButtons = document.querySelectorAll('.plus-button');
  const closeDetailButtons = document.querySelectorAll('.close-detail-button');

  function closeCard(card) {
      if (!card) return;
      card.classList.remove('details-visible');
      const toggleButton = card.querySelector('.plus-button');
      if (toggleButton) {
          toggleButton.classList.remove('active');
          toggleButton.setAttribute('aria-pressed', 'false');
          toggleButton.setAttribute('aria-label', 'Show details');
      }
  }

  plusButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          event.stopPropagation();
          button.classList.toggle('active');
          const sportsCard = button.closest('.sports-card');
          if (sportsCard) {
              sportsCard.classList.toggle('details-visible');
          }
          const isPressed = button.classList.contains('active');
          button.setAttribute('aria-pressed', isPressed);
          if (isPressed) {
              button.setAttribute('aria-label', 'Close details');
          } else {
              button.setAttribute('aria-label', 'Show details');
          }
      });
  });

  closeDetailButtons.forEach(button => {
      button.addEventListener('click', (event) => {
          event.stopPropagation();
          const sportsCard = button.closest('.sports-card');
          closeCard(sportsCard);
      });
  });

  document.addEventListener('click', (event) => {
      const visibleCards = document.querySelectorAll('.sports-card.details-visible');
      visibleCards.forEach(card => {
          const toggleButton = card.querySelector('.plus-button');
          const detailCardContent = card.querySelector('.product-detail-card');

          if (
              detailCardContent && !detailCardContent.contains(event.target) &&
              toggleButton && !toggleButton.contains(event.target)
          ) {
               closeCard(card);
          }
      });
  });
});