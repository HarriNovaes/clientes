/* ==========================================================
   HARRI NOVAES DIGITAL — SCRIPT V2
   Interações, animações e experiência
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ========================================================
     ELEMENTOS
  ======================================================== */

  const introScreen = document.getElementById("introScreen");
  const header = document.getElementById("header");
  const nav = document.getElementById("nav");
  const menuButton = document.getElementById("menuButton");

  const revealElements = document.querySelectorAll(".reveal");
  const sections = document.querySelectorAll(".section-observer");
  const navLinks = document.querySelectorAll(".nav-link");

  const possibilityButtons =
    document.querySelectorAll(".possibility-option");

  const possibilityText =
    document.getElementById("possibilityText");

  const possibilityTags =
    document.getElementById("possibilityTags");

  const planButtons =
    document.querySelectorAll(".plan-button");

  const selectedPlan =
    document.getElementById("selectedPlan");

  const selectedPlanName =
    document.getElementById("selectedPlanName");

  const whatsappButton =
    document.getElementById("whatsappButton");

  const mouseGlow =
    document.getElementById("mouseGlow");

  const customCursor =
    document.getElementById("customCursor");


  /* ========================================================
     INTRO DA LOGO
  ======================================================== */

  document.body.classList.add("intro-active");

  function closeIntro() {

    if (!introScreen) return;

    introScreen.classList.add("hide");

    document.body.classList.remove("intro-active");

    setTimeout(() => {
      introScreen.style.display = "none";
    }, 900);

  }

  setTimeout(closeIntro, 2300);


  /* ========================================================
     HEADER AO ROLAR
  ======================================================== */

  function updateHeader() {

    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* ========================================================
     MENU MOBILE
  ======================================================== */

  if (menuButton && nav) {

    menuButton.addEventListener("click", () => {

      const isOpen =
        nav.classList.toggle("open");

      menuButton.classList.toggle(
        "active",
        isOpen
      );

      menuButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    });


    navLinks.forEach(link => {

      link.addEventListener("click", () => {

        nav.classList.remove("open");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      });

    });


    document.addEventListener("click", event => {

      if (
        !nav.contains(event.target) &&
        !menuButton.contains(event.target)
      ) {

        nav.classList.remove("open");

        menuButton.classList.remove("active");

        menuButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    });

  }


  /* ========================================================
     ANIMAÇÃO DE ENTRADA AO ROLAR
  ======================================================== */

  if ("IntersectionObserver" in window) {

    const revealObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.12,
          rootMargin: "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(element => {
      revealObserver.observe(element);
    });

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* ========================================================
     MENU DESTACA SEÇÃO ATUAL
  ======================================================== */

  if ("IntersectionObserver" in window) {

    const sectionObserver =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const id = entry.target.id;

            if (!id) return;

            navLinks.forEach(link => {

              link.classList.remove("active");

              const href =
                link.getAttribute("href");

              if (href === `#${id}`) {
                link.classList.add("active");
              }

            });

          });

        },
        {
          rootMargin: "-35% 0px -55% 0px",
          threshold: 0
        }
      );


    sections.forEach(section => {
      sectionObserver.observe(section);
    });

  }


  /* ========================================================
     "SERÁ QUE É POSSÍVEL?"
  ======================================================== */

  const possibilities = {

    agenda: {
      text:
        "Podemos criar um sistema onde seus clientes consultam horários disponíveis e realizam agendamentos diretamente pelo celular.",

      tags: [
        "Agendamento",
        "Clientes",
        "Painel"
      ]
    },

    gestao: {
      text:
        "Podemos desenvolver um painel para organizar clientes, atendimentos, informações e processos importantes do seu negócio em um só lugar.",

      tags: [
        "Gestão",
        "Dados",
        "Controle"
      ]
    },

    area: {
      text:
        "Podemos criar uma área exclusiva onde cada cliente entra com seu próprio acesso e visualiza apenas as informações e recursos destinados a ele.",

      tags: [
        "Login",
        "Área do cliente",
        "Experiência"
      ]
    },

    ideia: {
      text:
        "Nem toda ideia precisa caber em uma solução pronta. Podemos entender o que você imaginou, estudar a possibilidade e desenvolver um projeto personalizado.",

      tags: [
        "Personalizado",
        "Projeto",
        "Solução"
      ]
    }

  };


  possibilityButtons.forEach(button => {

    button.addEventListener("click", () => {

      const key =
        button.dataset.possibility;

      const data =
        possibilities[key];

      if (!data) return;


      possibilityButtons.forEach(item => {
        item.classList.remove("active");
      });

      button.classList.add("active");


      if (possibilityText) {

        possibilityText.style.opacity = "0";
        possibilityText.style.transform =
          "translateY(8px)";

        setTimeout(() => {

          possibilityText.textContent =
            data.text;

          possibilityText.style.opacity = "1";
          possibilityText.style.transform =
            "translateY(0)";

        }, 180);

      }


      if (possibilityTags) {

        possibilityTags.style.opacity = "0";

        setTimeout(() => {

          possibilityTags.innerHTML =
            data.tags
              .map(tag => `<span>${tag}</span>`)
              .join("");

          possibilityTags.style.opacity = "1";

        }, 180);

      }

    });

  });


  /* ========================================================
     TRANSIÇÃO SUAVE DO RESULTADO
  ======================================================== */

  if (possibilityText) {

    possibilityText.style.transition =
      "opacity .2s ease, transform .2s ease";

  }

  if (possibilityTags) {

    possibilityTags.style.transition =
      "opacity .2s ease";

  }


  /* ========================================================
     PLANOS → WHATSAPP
  ======================================================== */

  const baseWhatsapp =
    "https://wa.me/5516988033045";

  planButtons.forEach(button => {

    button.addEventListener("click", () => {

      const plan =
        button.dataset.plan;

      if (!plan) return;


      if (
        selectedPlan &&
        selectedPlanName
      ) {

        selectedPlan.hidden = false;

        selectedPlanName.textContent =
          plan;

      }


      if (whatsappButton) {

        const message =
          `Olá! Conheci a Harri Novaes Digital pelo site e me interessei pelo plano ${plan}. Gostaria de conversar sobre meu projeto.`;

        whatsappButton.href =
          `${baseWhatsapp}?text=${encodeURIComponent(message)}`;

      }

    });

  });


  /* ========================================================
     EFEITO 3D NOS CARDS
  ======================================================== */

  const tiltCards =
    document.querySelectorAll("[data-tilt]");

  const canTilt =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  if (canTilt) {

    tiltCards.forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX - rect.left;

          const y =
            event.clientY - rect.top;

          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;

          const rotateY =
            ((x - centerX) / centerX) * 4;

          const rotateX =
            ((centerY - y) / centerY) * 4;

          card.style.transform =
            `perspective(1000px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-3px)`;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform =
            "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

        }
      );

    });

  }


  /* ========================================================
     BOTÕES MAGNÉTICOS
  ======================================================== */

  const magneticElements =
    document.querySelectorAll(".magnetic");


  if (canTilt) {

    magneticElements.forEach(element => {

      element.addEventListener(
        "mousemove",
        event => {

          const rect =
            element.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left -
            rect.width / 2;

          const y =
            event.clientY -
            rect.top -
            rect.height / 2;

          element.style.transform =
            `translate(${x * 0.08}px, ${y * 0.08}px)`;

        }
      );


      element.addEventListener(
        "mouseleave",
        () => {

          element.style.transform =
            "translate(0, 0)";

        }
      );

    });

  }


  /* ========================================================
     LUZ ACOMPANHANDO O MOUSE
  ======================================================== */

  if (
    mouseGlow &&
    canTilt
  ) {

    document.addEventListener(
      "mousemove",
      event => {

        mouseGlow.style.opacity = "1";

        mouseGlow.style.left =
          `${event.clientX}px`;

        mouseGlow.style.top =
          `${event.clientY}px`;

      }
    );

  }


  /* ========================================================
     CURSOR DECORATIVO
  ======================================================== */

  if (
    customCursor &&
    canTilt
  ) {

    document.addEventListener(
      "mousemove",
      event => {

        customCursor.style.opacity = "1";

        customCursor.style.left =
          `${event.clientX}px`;

        customCursor.style.top =
          `${event.clientY}px`;

      }
    );


    const interactiveElements =
      document.querySelectorAll(
        "a, button, [data-tilt]"
      );


    interactiveElements.forEach(element => {

      element.addEventListener(
        "mouseenter",
        () => {
          customCursor.classList.add("hover");
        }
      );

      element.addEventListener(
        "mouseleave",
        () => {
          customCursor.classList.remove("hover");
        }
      );

    });


    document.addEventListener(
      "mouseleave",
      () => {
        customCursor.style.opacity = "0";
      }
    );

  }


  /* ========================================================
     EFEITO DE CLIQUE
  ======================================================== */

  document
    .querySelectorAll("button, .button, .plan-button")
    .forEach(element => {

      element.addEventListener(
        "pointerdown",
        () => {

          element.style.scale = "0.98";

        }
      );


      const restoreScale = () => {
        element.style.scale = "";
      };


      element.addEventListener(
        "pointerup",
        restoreScale
      );

      element.addEventListener(
        "pointercancel",
        restoreScale
      );

      element.addEventListener(
        "pointerleave",
        restoreScale
      );

    });


  /* ========================================================
     PARALLAX MUITO LEVE NO HERO
  ======================================================== */

  const heroExperience =
    document.querySelector(".hero-experience");


  if (
    heroExperience &&
    canTilt
  ) {

    window.addEventListener(
      "scroll",
      () => {

        if (window.scrollY > window.innerHeight) {
          return;
        }

        const movement =
          window.scrollY * 0.045;

        heroExperience.style.translate =
          `0 ${movement}px`;

      },
      { passive: true }
    );

  }


  /* ========================================================
     LINKS INTERNOS
  ======================================================== */

  document
    .querySelectorAll('a[href^="#"]')
    .forEach(link => {

      link.addEventListener(
        "click",
        event => {

          const targetId =
            link.getAttribute("href");

          if (
            !targetId ||
            targetId === "#"
          ) {
            return;
          }

          const target =
            document.querySelector(targetId);

          if (!target) return;

          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });


  /* ========================================================
     ACESSIBILIDADE
  ======================================================== */

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (reduceMotion) {

    if (introScreen) {

      introScreen.style.display = "none";

      document.body.classList.remove(
        "intro-active"
      );

    }

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* ========================================================
     PORTFÓLIO V3 — TROCA DE TELAS DOS PROJETOS
  ======================================================== */

  const projectSwitchers =
    document.querySelectorAll(".project-switcher");

  projectSwitchers.forEach(switcher => {

    const group =
      switcher.dataset.switcher;

    const buttons =
      switcher.querySelectorAll(".project-switch");

    buttons.forEach(button => {

      button.addEventListener("click", () => {

        const target =
          button.dataset.target;

        buttons.forEach(item => {

          item.classList.toggle(
            "active",
            item === button
          );

        });


        document
          .querySelectorAll(
            `[data-preview-group="${group}"]`
          )
          .forEach(preview => {

            preview.classList.toggle(
              "active",
              preview.dataset.preview === target
            );

          });

      });

    });

  });


});