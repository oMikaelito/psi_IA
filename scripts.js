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

  // Seletores do Dashboard
  const moodSelectors = document.querySelectorAll(".mood-btn");
  const taskItems = document.querySelectorAll(".task-item");
  const biometricBtn = document.getElementById("biometricBtn");
  const navButtons = document.querySelectorAll(".nav-btn");
  const quoteText = document.querySelector(".quote-text");
  const quoteAuthor = document.querySelector(".quote-author");
  const quoteContent = document.querySelector('.quote-content');
  const diaryTextarea = document.getElementById("diary-entry");


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
  
  // --- LÓGICA DO DIÁRIO PESSOAL ---
  if (diaryTextarea) {
      // Carrega anotações salvas do localStorage ao iniciar a página
      const savedNotes = localStorage.getItem('mindAiDiary');
      if (savedNotes) {
          diaryTextarea.value = savedNotes;
      }

      // Salva as anotações no localStorage sempre que o usuário digita
      diaryTextarea.addEventListener('input', () => {
          localStorage.setItem('mindAiDiary', diaryTextarea.value);
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

      // Previne acionamentos múltiplos se a animação já estiver ocorrendo
      if (quoteContent.classList.contains('quote-changing')) {
          return;
      }

      // 1. Ouve pelo evento 'animationend', que ocorre quando a animação do CSS termina.
      // A opção { once: true } faz com que o listener seja removido automaticamente após ser usado.
      quoteContent.addEventListener('animationend', () => {
          quoteContent.classList.remove('quote-changing');
      }, { once: true });

      // 2. Troca o texto no meio da animação (500ms), quando está invisível.
      setTimeout(() => {
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
          quoteText.textContent = randomQuote.text;
          quoteAuthor.textContent = "- " + randomQuote.author;
      }, 500); // Metade da duração da animação (1s)

      // 3. Adiciona a classe para iniciar a animação.
      quoteContent.classList.add('quote-changing');
  }
  
  // Aciona a função a cada 10 segundos
  setInterval(rotateQuote, 10000);

  // ===================================================================
  // --- INTERATIVIDADE DO PAINEL ---
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

  // Botões de Navegação
  navButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          navButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
      });
  });

});
