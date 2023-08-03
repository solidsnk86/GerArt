
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**---------------------------------------------------------
   * Mobile nav toggle
   -----------------------------------------------------------*/
    // Función para cerrar el menú de navegación móvil si se hace clic fuera de él
    function closeMobileNavOnClickOutside(event) {
      const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
      const mobileNavMenu = document.querySelector('.mobile-nav');
  
      // Verificar si el clic ocurrió fuera del menú de navegación móvil y del botón de alternancia
      if (!event.target.closest('.mobile-nav') && !event.target.closest('.mobile-nav-toggle')) {
        document.body.classList.remove('mobile-nav-active');
        mobileNavToggle.classList.remove('bi-x');
        mobileNavToggle.classList.add('bi-list');
      }
    }
  
    // Agregar evento de clic al botón de alternancia del menú de navegación móvil
    document.querySelector('.mobile-nav-toggle').addEventListener('click', function(e) {
      document.body.classList.toggle('mobile-nav-active');
      this.classList.toggle('bi-list');
      this.classList.toggle('bi-x');
    });
  
    // Agregar evento de clic al documento para cerrar el menú de navegación móvil en clics fuera de él
    document.addEventListener('click', closeMobileNavOnClickOutside);

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 1000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

/** ------> Contacts */

document.getElementById('correo').onclick = function() {
  window.open('mailto:gerardocalcagni@gmail.com');
};

document.getElementById('telefono').onclick = function() {
  window.open('tel:+5492604586538');
}

/** -------> Social Media Links */
document.getElementById('instagram').onclick = function() {
  const instagramUrl = 'instagram://user?username=calcagnigerart';
  const fallbackUrl = 'https://instagram.com/calcagnigerart?igshid=NTc4MTIwNjQ2YQ==';
  const win = window.open(instagramUrl, '_blank');
  if (!win || win.closed || typeof win.closed === 'undefined') {
    window.location.href = fallbackUrl;
  }
};

document.getElementById('facebook').onclick = function() {
  window.open('https://www.facebook.com/');
};

document.getElementById('linkedIn').onclick = function() {
  window.open('https://www.linkedin.com/');
};

/** -----> Get the fecha */
const currentDateElement = document.getElementById('current-date');

const currentDate = new Date();

const options = { weekday: 'long', month: 'numeric', year: 'numeric' };
const fullDate = currentDate.toLocaleDateString('es-ES', options);

currentDateElement.textContent = fullDate;

/** -----> Sharer Social-Media */
function compartirFacebook() {
  window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href));
};

function compartirWhatsapp() {
  var mensaje = "Mirá este excelente portfolio de dibujos: " + window.location.href;
  window.open('https://wa.me/?text=' + encodeURIComponent(mensaje));
};

function compartirTwitter() {
  window.open('https://twitter.com/share?url=' + encodeURIComponent(window.location.href));
};

function compartirLinkedIn() {
  var url = encodeURIComponent(window.location.href);
  var title = encodeURIComponent(document.title);
  var shareUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`';
  window.open(shareUrl, '_blank');
}

/** ----------------------------------------------------------
                  ------> IMAGE CARD <-------
 -------------------------------------------------------------*/

 /**
   * Initiate glightbox
   */
 const glightbox = GLightbox({
  selector: '.glightbox'
});

/**
 * Porfolio isotope and filter
 */
let portfolionIsotope = document.querySelector('.portfolio-isotope');

if (portfolionIsotope) {

  let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
  let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
  let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

  window.addEventListener('load', () => {
    let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
      itemSelector: '.portfolio-item',
      layoutMode: portfolioLayout,
      filter: portfolioFilter,
      sortBy: portfolioSort
    });

    let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
    menuFilters.forEach(function(el) {
      el.addEventListener('click', function() {
        document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aos_init === 'function') {
          aos_init();
        }
      }, false);
    });

  });

}

/**
 * Init swiper slider with 1 slide at once in desktop view
 */
new Swiper('.slides-1', {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});

/**
 * Init swiper slider with 2 slides at once in desktop view
 */
new Swiper('.slides-2', {
  speed: 600,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },
  slidesPerView: 'auto',
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },

    1200: {
      slidesPerView: 2,
      spaceBetween: 20
    }
  }
});
 
/** ----------------------------------------------------------
                  ------> COMENTARIOS <-------
 -------------------------------------------------------------*/

const commentForm = document.getElementById("comment-form");
const commentList = document.getElementById("comment-list");
 
   // Función para cargar los comentarios desde el servidor
   function loadComments() {
     fetch("/api/comments")
       .then((response) => response.json())
       .then((data) => {
         commentList.innerHTML = ""; // Limpiamos la lista antes de agregar los nuevos comentarios
         data.forEach((comment) => {
           const li = document.createElement("li");
           li.innerHTML = `<strong>${comment.username}:</strong> ${comment.content}`;
           commentList.appendChild(li);
         });
       })
       .catch((error) => console.error("Error al cargar comentarios:", error));
   }
 
   // Función para enviar un nuevo comentario al servidor
function addComment(username, content) {
     fetch("/api/comments", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify({ username, content }),
     })
       .then(() => {
         loadComments(); // Actualizamos los comentarios después de agregar uno nuevo
       })
       .catch((error) => console.error("Error al agregar comentario:", error));
   }
 
   commentForm.addEventListener("submit", (event) => {
     event.preventDefault();
     const username = document.getElementById("username").value;
     const comment = document.getElementById("comment").value;
     addComment(username, comment);
     commentForm.reset();
   });
 
   // Cargar comentarios al cargar la página
   loadComments();

