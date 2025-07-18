document.addEventListener("DOMContentLoaded", () => {
  // --- SELETORES DO DOM ---
  const loginScreen = document.getElementById("loginScreen");
  const dashboardScreen = document.getElementById("dashboard");
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const termsCheckbox = document.getElementById("terms");
  const navigation = document.getElementById("navigation");
  const particlesContainer = document.querySelector(".floating-particles");

  // Seletores do Dashboard e outras telas
  const allScreens = document.querySelectorAll(".screen");
  const moodSelectors = document.querySelectorAll(".mood-btn");
  const taskItems = document.querySelectorAll(".task-item");
  const biometricBtn = document.getElementById("biometricBtn");
  const chatBtn = document.querySelector(".chat-btn");
  const navButtons = document.querySelectorAll(".nav-btn");
  const quoteText = document.querySelector(".quote-text");
  const quoteAuthor = document.querySelector(".quote-author");
  const quoteContent = document.querySelector('.quote-content');
  const saveDiaryBtn = document.getElementById("saveDiaryBtn");


  // --- LÓGICA DAS PARTÍCULAS FLUTUANTES ---
  if (particlesContainer) {
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      const animationDuration = Math.random() * 8 + 5;
      const animationDelay = Math.random() * 5;
      particle.style.animationDuration = `${animationDuration}s`;
      particle.style.animationDelay = `-${animationDelay}s`;
      particlesContainer.appendChild(particle);
    }
  }

  // --- LÓGICA DE LOGIN ---
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!termsCheckbox.checked) {
      alert("Por favor, aceite os Termos de Uso e a Política de Privacidade.");
      return;
    }

    if (
      emailInput.value === "admin@mindai.com" &&
      passwordInput.value === "admin123"
    ) {
      loginScreen.classList.add("fade-out");
      setTimeout(() => {
        loginScreen.classList.remove("active");
        dashboardScreen.classList.add("active");
        navigation.classList.add("visible");

        // Anima as barras do gráfico ao entrar no dashboard
        document.querySelectorAll('.chart-bar').forEach((bar, index) => {
            bar.style.animation = `barGrow 0.8s ease-out ${index * 0.1}s both`;
        });
      }, 500);
    } else {
      alert("E-mail ou senha incorretos. Use os dados de teste.");
    }
  });

  // --- FUNCIONALIDADES DO DASHBOARD ---

  // Botão de Biometria (Simulação)
  if (biometricBtn) {
    biometricBtn.addEventListener("click", () => {
      alert("Biometria não disponível neste dispositivo (simulação).");
    });
  }

  // Botão do Chat (Simulação)
  if (chatBtn) {
    chatBtn.addEventListener("click", () => {
      alert("Chat com Dr. MindAI será aberto em breve!");
    });
  }

  // ===================================================================
  // --- ROTAÇÃO DE FRASES (LÓGICA CORRIGIDA E ROBUSTA) ---
  // ===================================================================
  const quotes = [
    { text: "Cada pequeno passo em direção ao bem-estar é uma vitória.", author: "MindAI" },
    { text: "A jornada de mil milhas começa com um único passo.", author: "Lao Tzu" },
    { text: "O que não nos mata, nos fortalece.", author: "Friedrich Nietzsche" },
    { text: "A mudança é a única constante na vida.", author: "Heráclito" }
  ];

  function rotateQuote() {
      if (!quoteContent || !quoteText || !quoteAuthor) return;

      if (quoteContent.classList.contains('quote-changing')) {
          return;
      }
      
      quoteContent.addEventListener('animationend', () => {
          quoteContent.classList.remove('quote-changing');
      }, { once: true });

      setTimeout(() => {
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          quoteText.textContent = randomQuote.text;
          quoteAuthor.textContent = "- " + randomQuote.author;
      }, 500);

      quoteContent.classList.add('quote-changing');
  }
  
  setInterval(rotateQuote, 10000);

  // ===================================================================
  // --- INTERATIVIDADE DO PAINEL E NAVEGAÇÃO ---
  // ===================================================================

  // Seleção de Humor
  moodSelectors.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isAlreadyActive = btn.classList.contains("active");
      moodSelectors.forEach((moodBtn) => moodBtn.classList.remove("active"));
      if (!isAlreadyActive) {
        btn.classList.add("active");
      }
    });
  });

  // Marcar/Desmarcar Tarefas
  taskItems.forEach((item) => {
    item.addEventListener("click", () => {
        const checkbox = item.querySelector('.task-checkbox');
        item.classList.toggle("checked");
        checkbox.classList.toggle('checked');
    });
  });
  
  // Botões de Navegação e Troca de Tela
  navButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          // 1. Atualiza o estilo do botão ativo
          navButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');

          // 2. Troca de tela
          const targetId = this.dataset.target; // Pega o ID da tela do atributo 'data-target'
          const targetScreen = document.getElementById(targetId);

          if (targetScreen) {
              allScreens.forEach(screen => {
                  screen.classList.remove('active'); // Esconde todas as telas
              });
              targetScreen.classList.add('active'); // Mostra apenas a tela alvo
          }
      });
  });

  // --- LÓGICA DA TELA DO DIÁRIO ---
  if(saveDiaryBtn) {
    saveDiaryBtn.addEventListener("click", () => {
      const diaryEntry = document.getElementById("diaryEntry");
      if (diaryEntry.value.trim() === "") {
        alert("Por favor, escreva algo em seu diário antes de salvar.");
      } else {
        alert("Entrada do diário salva com sucesso!");
        // Limpa o campo de texto após salvar (simulação)
        diaryEntry.value = ""; 
      }
    });
  }

});
