// Selecciona solo las imágenes que tengan data-alt
const productImages = document.querySelectorAll(".product-img[data-alt]");

setInterval(() => {
  productImages.forEach((img) => {
    const original = img.getAttribute("data-original") || img.src;
    const alt = img.getAttribute("data-alt");

    // Guardamos el src original en data-original si no existe
    if (!img.getAttribute("data-original")) {
      img.setAttribute("data-original", original);
    }

    // Alterna entre original y alt
    img.src = img.src === original ? alt : original;
  });
}, 2000); // 2000 ms = 2 segundos

// Seleccionamos todas las tarjetas de producto
document.querySelectorAll(".product-card").forEach((card) => {
  const tabs = card.querySelectorAll(".tab-btn");
  const panels = card.querySelectorAll(".tab-panel");
  const img = card.querySelector(".product-img");

  tabs.forEach((tab) => {
    // 🚫 NO tocar UNITALLA
    if (tab.classList.contains("unitalla-btn")) return;

    tab.addEventListener("click", () => {
      const talla = tab.getAttribute("data-talla");

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      panels.forEach((panel) => {
        const panelTalla = panel.getAttribute("data-talla");
        panel.classList.toggle("active", panelTalla === talla);
      });

      if (img) {
        const nueva = img.getAttribute(`data-${talla}`);
        if (nueva) img.src = nueva;
      }

      card.classList.remove("green-active", "orange-active");

      if (card.querySelector(".green-text")) {
        card.classList.add("green-active");
      }

      if (card.querySelector(".orange-text")) {
        card.classList.add("orange-active");
      }
    });
  });
});

document.querySelectorAll(".unitalla-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    const img = card.querySelector(".unitalla-img");

    // 🔥 alternar estado
    btn.classList.toggle("active");

    const isActive = btn.classList.contains("active");

    if (img) {
      img.src = isActive
        ? img.getAttribute("data-base") // verde = base
        : img.getAttribute("data-active"); // blanco = otra imagen
    }
  });
});

document.querySelectorAll(".btn-wsp").forEach((btn) => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".product-card");
    const producto = btn.getAttribute("data-producto");

    // detectar talla activa
    const activeTab = card.querySelector(".tab-btn.active");
    let talla = "";

    if (activeTab && !activeTab.classList.contains("unitalla-btn")) {
      talla = activeTab.innerText.toLowerCase();
    } else {
      talla = "unitalla";
    }
    // mensaje
    const mensaje = `Hola, quiero información sobre ${producto} talla ${talla}`;

    const url = `https://wa.me/525573824400?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");
  });

  //Video
  const video = document.getElementById("miVideo");

  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      video.controls = true; // aparecen controles
    } else {
      video.pause();
    }
  });

  video.addEventListener("ended", () => {
    video.controls = false;
  });
});


const slides = document.querySelectorAll('.delivery-card');
let currentIndex = 0;

function showNextSlide() {
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add('active');
}

// Cambia cada 5 segundos para dar tiempo a leer el texto más grande
setInterval(showNextSlide, 5000);

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const faqItem = button.parentElement;
    
    // Opcional: Cerrar otros acordeones al abrir uno nuevo
    // document.querySelectorAll('.faq-item').forEach(item => {
    //   if(item !== faqItem) item.classList.remove('active');
    // });

    faqItem.classList.toggle('active');
  });
});

const boton = document.getElementById('btnFlotante');
const footer = document.querySelector('.footer');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            boton.classList.add('subir');
        } else {
            boton.classList.remove('subir');
        }
    });
}, {
    threshold: 0.1 // Se activa en cuanto asoma el 10% del footer
});

observer.observe(footer);