document.addEventListener("DOMContentLoaded", () => {
  // --- SELETORES DO DOM ---
  const loginScreen = document.getElementById("loginScreen");
  const dashboardScreen = document.getElementById("dashboard");
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const navigation = document.getElementById("navigation");
  const particlesContainer = document.querySelector(".floating-particles");

  const moodSelectors = document.querySelectorAll(".mood-btn");
  const taskItems = document.querySelectorAll(".task-item");

  // --- LÓGICA DAS PARTÍCULAS FLUTUANTES ---
  if (particlesContainer) {
    const particleCount = 80; // Aumentado para ter mais partículas!
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      
      const size = Math.random() * 4 + 2; // Tamanho entre 2px e 6px
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      
      const animationDuration = Math.random() * 8 + 5; // Duração entre 5s e 13s
      const animationDelay = Math.random() * 5; // Atraso de até 5s
      
      particle.style.animationDuration = `${animationDuration}s`;
      particle.style.animationDelay = `-${animationDelay}s`; // Delay negativo para iniciar em pontos diferentes

      particlesContainer.appendChild(particle);
    }
  }


  // --- LÓGICA DE LOGIN (CORRIGIDA) ---
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o envio e recarregamento da página

    if (
      emailInput.value === "admin@mindai.com" &&
      passwordInput.value === "admin123"
    ) {
      // 1. Aplica a animação de saída na tela de login
      loginScreen.classList.add("fade-out");

      // 2. Aguarda a animação terminar para trocar de tela
      setTimeout(() => {
        loginScreen.classList.remove("active"); // Esconde a tela de login
        loginScreen.classList.remove("fade-out"); // Limpa a classe da animação para garantir que não conflite no futuro
        dashboardScreen.classList.add("active"); // Mostra o painel
        navigation.classList.add("visible"); // Mostra a barra de navegação
      }, 500); // Duração deve ser a mesma da animação no CSS
    } else {
      alert("E-mail ou senha incorretos. Use os dados de teste.");
    }
  });

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

  // 2. Marcar/Desmarcar Tarefas Pendentes
  taskItems.forEach((item) => {
    item.addEventListener("click", () => {
        const checkbox = item.querySelector('.task-checkbox');
        item.classList.toggle("checked");
        checkbox.classList.toggle('checked');
    });
  });

});
