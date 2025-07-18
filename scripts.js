document.addEventListener("DOMContentLoaded", () => {
  // --- SELETORES DO DOM ---
  const loginScreen = document.getElementById("loginScreen");
  const dashboardScreen = document.getElementById("dashboard");
  const notesScreen = document.getElementById("notesScreen");
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const navigation = document.getElementById("navigation");
  
  const moodSelectors = document.querySelectorAll(".mood-btn");
  const taskItems = document.querySelectorAll(".task-item");

  // --- LÓGICA DE LOGIN ---
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o envio real do formulário

    // Simulação de validação (use os dados de teste)
    if (
      emailInput.value === "admin@mindai.com" &&
      passwordInput.value === "admin123"
    ) {
      // Adiciona a animação de fade-out na tela de login
      loginScreen.classList.add("fade-out");

      // Após a animação, esconde a tela de login e mostra o dashboard
      setTimeout(() => {
        loginScreen.classList.remove("active");
        loginScreen.classList.remove("fade-out"); // Limpa para futuras transições
        
        dashboardScreen.classList.add("active");
        navigation.classList.add("visible"); // Mostra a barra de navegação
      }, 500); // Duração da animação de fadeOut
    } else {
      alert("E-mail ou senha incorretos. Use os dados de teste.");
    }
  });

  // --- INTERATIVIDADE DO PAINEL ---

  // 1. Seleção de Humor
  moodSelectors.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Verifica se o botão clicado já está ativo
      const isAlreadyActive = btn.classList.contains("active");

      // Remove a classe 'active' de todos os botões de humor
      moodSelectors.forEach((moodBtn) => moodBtn.classList.remove("active"));
      
      // Se o botão não estava ativo, ativa-o
      if (!isAlreadyActive) {
        btn.classList.add("active");
      }
    });
  });

  // 2. Marcar/Desmarcar Tarefas Pendentes
  taskItems.forEach((item) => {
    item.addEventListener("click", () => {
        // Alterna o estado da tarefa no elemento pai
        item.classList.toggle("checked");
        // Encontra o checkbox dentro do item e alterna seu estado visual
        const checkbox = item.querySelector('.task-checkbox');
        if (checkbox) {
            checkbox.classList.toggle('checked');
        }
    });
  });

});
