let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 150;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
    }
  });

  let header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 100);

 
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};


ScrollReveal({
  reset: true,
  distance: "80px",
  duration: 2000,
  delay: 200,
});

ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
ScrollReveal().reveal(
  ".home-img, .services-container, .portfolio-box, .contact form",
  { origin: "bottom" }
);
ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });

const typed = new Typed(".multiple-text", {
  strings: ["Frontend Developer", "Content Creator", "UI/UX Designer"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop: true,
});
(function () {
        const modal = document.getElementById('gallery-modal');
        const backdrop = document.getElementById('gallery-backdrop');
        const imgEl = document.getElementById('gallery-image');
        const closeBtn = document.getElementById('gallery-close');
        const nextBtn = document.getElementById('gallery-next');
        const prevBtn = document.getElementById('gallery-prev');

        let currentList = [];
        let currentIndex = 0;

        function openGallery(list, index = 0) {
          if (!Array.isArray(list) || !list.length) return;
          currentList = list;
          currentIndex = index;
          imgEl.src = currentList[currentIndex];
          modal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
          closeBtn.focus();
        }

        function closeGallery() {
          modal.style.display = 'none';
          imgEl.src = '';
          currentList = [];
          currentIndex = 0;
          document.body.style.overflow = '';
        }

        function showNext() {
          if (!currentList.length) return;
          currentIndex = (currentIndex + 1) % currentList.length;
          imgEl.src = currentList[currentIndex];
        }

        function showPrev() {
          if (!currentList.length) return;
          currentIndex = (currentIndex - 1 + currentList.length) % currentList.length;
          imgEl.src = currentList[currentIndex];
        }
        document.querySelectorAll('.project .open-gallery').forEach((btn) => {
          btn.addEventListener('click', function (e) {
            e.stopPropagation();
            const project = this.closest('.project');
            try {
              const list = JSON.parse(project.getAttribute('data-images') || '[]');
              openGallery(list, 0);
            } catch (err) { console.error(err); }
          });
        });
        document.querySelectorAll('.project').forEach((project) => {
          project.addEventListener('click', function (e) {
            if (e.target.closest('.open-gallery')) return;
            try {
              const list = JSON.parse(this.getAttribute('data-images') || '[]');
              if (list.length) openGallery(list, 0);
            } catch (err) { console.error(err); }
          });
        });

        closeBtn.addEventListener('click', closeGallery);
        backdrop.addEventListener('click', closeGallery);
        nextBtn.addEventListener('click', showNext);
        prevBtn.addEventListener('click', showPrev);

        document.addEventListener('keydown', (e) => {
          if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowRight') showNext();
            if (e.key === 'ArrowLeft') showPrev();
          }
        });

        let startX = 0;
        let endX = 0;
        imgEl.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
        }, { passive: true });
        imgEl.addEventListener('touchmove', (e) => {
          endX = e.touches[0].clientX;
        }, { passive: true });
        imgEl.addEventListener('touchend', () => {
          const diff = startX - endX;
          if (Math.abs(diff) > 40) {
            if (diff > 0) showNext();
            else showPrev();
          }
          startX = endX = 0;
        });

      })();