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
  const chatBtn = document.querySelector(".chat-btn");
  const navButtons = document.querySelectorAll(".nav-btn");
  const quoteText = document.querySelector(".quote-text");
  const quoteAuthor = document.querySelector(".quote-author");

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

  // --- LÓGICA DE LOGIN (FUNCIONALIDADE DE CERTO.HTML INTEGRADA) ---
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

  // --- FUNCIONALIDADES DE CERTO.HTML ---

  // 1. Botão de Biometria (Simulação)
  if (biometricBtn) {
    biometricBtn.addEventListener("click", () => {
      alert("Biometria não disponível neste dispositivo (simulação).");
    });
  }

  // 2. Botão do Chat (Simulação)
  if (chatBtn) {
    chatBtn.addEventListener("click", () => {
      alert("Chat com Dr. MindAI será aberto em breve!");
    });
  }

  // 3. Rotação de Frases (MODIFICADO)
  const quotes = [
    { text: "Cada pequeno passo em direção ao bem-estar é uma vitória.", author: "MindAI" },
    { text: "A jornada de mil milhas começa com um único passo.", author: "Lao Tzu" },
    { text: "O que não nos mata, nos fortalece.", author: "Friedrich Nietzsche" },
    { text: "A mudança é a única constante na vida.", author: "Heráclito" }
  ];

  function rotateQuote() {
    if (quoteText && quoteAuthor) {
      const quoteContent = document.querySelector('.quote-content');

      // Impede que a animação seja acionada novamente se já estiver em andamento
      if (quoteContent.classList.contains('quote-changing')) {
        return;
      }
      
      // Adiciona a classe para iniciar a animação
      quoteContent.classList.add('quote-changing');

      // No meio da animação (quando o texto está invisível), troca o conteúdo
      setTimeout(() => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteText.textContent = randomQuote.text;
        quoteAuthor.textContent = "- " + randomQuote.author;
      }, 500); // Metade da duração da animação de 1s do CSS

      // Ao final da animação, remove a classe para que ela possa ser reativada depois
      setTimeout(() => {
        quoteContent.classList.remove('quote-changing');
      }, 1000); // Duração total da animação
    }
  }
  setInterval(rotateQuote, 10000); // Rotaciona a cada 10 segundos

  // --- INTERATIVIDADE DO PAINEL ---

  // 1. Seleção de Humor
  moodSelectors.forEach((btn) => {
    btn.addEventListener("click", () => {
      const isAlreadyActive = btn.classList.contains("active");
      moodSelectors.forEach((moodBtn) => moodBtn.classList.remove("active"));
      if (!isAlreadyActive) {
        btn.classList.add("active");
      }
    });
  });

  // 2. Marcar/Desmarcar Tarefas (Funcionalidade melhorada)
  taskItems.forEach((item) => {
    item.addEventListener("click", () => {
        const checkbox = item.querySelector('.task-checkbox');
        item.classList.toggle("checked");
        checkbox.classList.toggle('checked');
    });
  });

  // 3. Botões de Navegação
  navButtons.forEach(btn => {
      btn.addEventListener('click', function() {
          navButtons.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          // Adicione aqui a lógica para trocar de tela se necessário
      });
  });

});
