document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     ELEMENTOS
  ========================================== */

  const header =
    document.getElementById("header");

  const mouseGlow =
    document.getElementById("mouseGlow");

  const shareButton =
    document.getElementById("shareButton");

  const shareButtonFinal =
    document.getElementById("shareButtonFinal");

  const shareToast =
    document.getElementById("shareToast");

  const resultTitle =
    document.getElementById("resultTitle");

  const resultText =
    document.getElementById("resultText");

  const resultTags =
    document.getElementById("resultTags");

  const possibilityButtons =
    document.querySelectorAll(
      ".possibility-button"
    );

  const revealElements =
    document.querySelectorAll(".reveal");


  /* =========================================
     HEADER AO ROLAR
  ========================================== */

  function updateHeader() {

    if (!header) return;

    header.classList.toggle(
      "scrolled",
      window.scrollY > 30
    );

  }

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );


  /* =========================================
     ANIMAÇÕES AO ROLAR
  ========================================== */

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  if (
    "IntersectionObserver" in window &&
    !reduceMotion
  ) {

    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(entry => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.10,
          rootMargin:
            "0px 0px -40px 0px"
        }
      );


    revealElements.forEach(
      (element, index) => {

        element.style.transitionDelay =
          `${Math.min(
            (index % 4) * 70,
            210
          )}ms`;

        observer.observe(element);

      }
    );

  } else {

    revealElements.forEach(element => {
      element.classList.add("visible");
    });

  }


  /* =========================================
     SERÁ QUE DÁ PARA FAZER?
  ========================================== */

  const possibilities = {

    agenda: {

      title:
        "Sistema de agendamento",

      text:
        "Podemos criar um sistema onde seus clientes consultam horários disponíveis e realizam agendamentos diretamente pelo celular.",

      tags: [
        "Agendamento",
        "Clientes",
        "Painel"
      ]

    },


    cliente: {

      title:
        "Área exclusiva para clientes",

      text:
        "Podemos criar uma área onde cada cliente entra com seu próprio acesso e encontra informações, serviços, histórico ou recursos exclusivos do seu negócio.",

      tags: [
        "Login",
        "Área do cliente",
        "Experiência"
      ]

    },


    gestao: {

      title:
        "Painel de gestão",

      text:
        "Podemos organizar informações importantes do seu negócio em um painel para facilitar o controle de clientes, serviços, atendimentos e processos.",

      tags: [
        "Gestão",
        "Controle",
        "Organização"
      ]

    },


    site: {

      title:
        "Site profissional",

      text:
        "Podemos criar uma presença digital profissional para apresentar sua empresa, seus serviços, diferenciais, localização e facilitar o contato com novos clientes.",

      tags: [
        "Site",
        "Marca",
        "Clientes"
      ]

    },


    ideia: {

      title:
        "Projeto personalizado",

      text:
        "Nem toda ideia precisa caber em uma solução pronta. Conte o que você imaginou e podemos estudar a melhor forma de transformar essa necessidade em uma solução digital.",

      tags: [
        "Personalizado",
        "Projeto",
        "Possibilidades"
      ]

    }

  };


  possibilityButtons.forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const key =
          button.dataset.possibility;

        const data =
          possibilities[key];

        if (!data) return;


        possibilityButtons.forEach(
          item => {

            item.classList.remove(
              "active"
            );

          }
        );


        button.classList.add("active");


        const resultContent =
          document.querySelector(
            ".result-content"
          );


        if (resultContent) {

          resultContent.style.opacity =
            "0";

          resultContent.style.transform =
            "translateY(12px)";

        }


        setTimeout(() => {

          if (resultTitle) {
            resultTitle.textContent =
              data.title;
          }

          if (resultText) {
            resultText.textContent =
              data.text;
          }

          if (resultTags) {

            resultTags.innerHTML =
              data.tags
                .map(
                  tag =>
                    `<span>${tag}</span>`
                )
                .join("");

          }


          if (resultContent) {

            resultContent.style.opacity =
              "1";

            resultContent.style.transform =
              "translateY(0)";

          }

        }, 180);

      }
    );

  });


  const resultContent =
    document.querySelector(
      ".result-content"
    );

  if (resultContent) {

    resultContent.style.transition =
      "opacity .22s ease, transform .22s ease";

  }


  /* =========================================
     COMPARTILHAR APRESENTAÇÃO
  ========================================== */

  function showShareToast(message) {

    if (!shareToast) return;

    shareToast.textContent = message;

    shareToast.classList.add("show");


    clearTimeout(
      showShareToast.timeout
    );


    showShareToast.timeout =
      setTimeout(() => {

        shareToast.classList.remove(
          "show"
        );

      }, 2600);

  }


  async function copyPresentationLink() {

    try {

      await navigator.clipboard.writeText(
        window.location.href
      );

      showShareToast(
        "✓ Link da apresentação copiado"
      );

    } catch (error) {

      const temporaryInput =
        document.createElement("textarea");

      temporaryInput.value =
        window.location.href;

      temporaryInput.style.position =
        "fixed";

      temporaryInput.style.opacity =
        "0";

      document.body.appendChild(
        temporaryInput
      );

      temporaryInput.select();


      try {

        document.execCommand("copy");

        showShareToast(
          "✓ Link da apresentação copiado"
        );

      } catch (copyError) {

        showShareToast(
          "Não foi possível copiar o link"
        );

      }


      temporaryInput.remove();

    }

  }


  async function sharePresentation() {

    const shareData = {

      title:
        "Harri Novaes Digital",

      text:
        "Conheça a Harri Novaes Digital e veja soluções digitais desenvolvidas para negócios.",

      url:
        window.location.href

    };


    if (navigator.share) {

      try {

        await navigator.share(
          shareData
        );

      } catch (error) {

        if (
          error.name !== "AbortError"
        ) {

          await copyPresentationLink();

        }

      }

    } else {

      await copyPresentationLink();

    }

  }


  if (shareButton) {

    shareButton.addEventListener(
      "click",
      sharePresentation
    );

  }


  if (shareButtonFinal) {

    shareButtonFinal.addEventListener(
      "click",
      sharePresentation
    );

  }


  /* =========================================
     LUZ DO MOUSE
  ========================================== */

  const hasFinePointer =
    window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;


  if (
    mouseGlow &&
    hasFinePointer &&
    !reduceMotion
  ) {

    document.addEventListener(
      "mousemove",
      event => {

        mouseGlow.style.opacity =
          "1";

        mouseGlow.style.left =
          `${event.clientX}px`;

        mouseGlow.style.top =
          `${event.clientY}px`;

      }
    );


    document.addEventListener(
      "mouseleave",
      () => {

        mouseGlow.style.opacity =
          "0";

      }
    );

  }


  /* =========================================
     EFEITO NOS CARDS
  ========================================== */

  if (
    hasFinePointer &&
    !reduceMotion
  ) {

    const cards =
      document.querySelectorAll(
        ".business-card, .plan-card"
      );


    cards.forEach(card => {

      card.addEventListener(
        "mousemove",
        event => {

          const rect =
            card.getBoundingClientRect();

          const x =
            event.clientX -
            rect.left;

          const y =
            event.clientY -
            rect.top;

          const centerX =
            rect.width / 2;

          const centerY =
            rect.height / 2;

          const rotateY =
            (
              (x - centerX) /
              centerX
            ) * 2;

          const rotateX =
            (
              (centerY - y) /
              centerY
            ) * 2;


          card.style.transform =
            `
              perspective(900px)
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              translateY(-5px)
            `;

        }
      );


      card.addEventListener(
        "mouseleave",
        () => {

          card.style.transform = "";

        }
      );

    });

  }


  /* =========================================
     LINKS INTERNOS
  ========================================== */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
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
            document.querySelector(
              targetId
            );

          if (!target) return;


          event.preventDefault();


          target.scrollIntoView({
            behavior:
              reduceMotion
                ? "auto"
                : "smooth",

            block: "start"
          });

        }
      );

    });


  /* =========================================
     EFEITO DE CLIQUE
  ========================================== */

  document
    .querySelectorAll(
      "button, .button, .project-link"
    )
    .forEach(element => {

      element.addEventListener(
        "pointerdown",
        () => {

          element.style.scale =
            "0.98";

        }
      );


      const restore = () => {

        element.style.scale = "";

      };


      element.addEventListener(
        "pointerup",
        restore
      );

      element.addEventListener(
        "pointercancel",
        restore
      );

      element.addEventListener(
        "pointerleave",
        restore
      );

    });


});
