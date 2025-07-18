// MindAI - Sistema de Login e Funcionalidades Interativas

class MindAI {
  constructor() {
    this.currentScreen = "login";
    this.userTasks = [
      {
        id: 0,
        text: "Fazer exercício de respiração (5 min)",
        completed: true,
        priority: "high",
      },
      {
        id: 1,
        text: "Registrar humor do dia",
        completed: false,
        priority: "medium",
      },
      {
        id: 2,
        text: "Ler artigo sobre mindfulness",
        completed: false,
        priority: "low",
      },
      {
        id: 3,
        text: "Praticar gratidão (3 coisas)",
        completed: false,
        priority: "high",
      },
    ];
    this.quotes = [
      "Cada pequeno passo em direção ao bem-estar é uma vitória.",
      "O cuidado com a mente é o primeiro passo para uma vida plena.",
      "Seja gentil consigo mesmo, você está fazendo o melhor que pode.",
      "A jornada de autodescoberta começa com um simples respirar.",
      "Pequenas mudanças diárias criam grandes transformações.",
    ];
    this.currentQuoteIndex = 0;
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupTasks();
    this.startQuoteRotation();
    this.setupNavigation();
    this.setupMoodSelector();
  }

  setupEventListeners() {
    // Login form
    const loginForm = document.getElementById("loginForm");
    const loginBtn = document.querySelector(".login-btn");

    loginForm.addEventListener("submit", (e) => this.handleLogin(e));
    loginBtn.addEventListener("click", (e) => this.createRippleEffect(e));

    // Biometric button
    const biometricBtn = document.getElementById("biometricBtn");
    biometricBtn.addEventListener("click", () => this.handleBiometricLogin());

    // Chat button
    const chatBtn = document.querySelector(".chat-btn");
    if (chatBtn) {
      chatBtn.addEventListener("click", () => this.handleChatStart());
    }

    // Notes functionality
    this.setupNotesFeatures();
  }

  setupTasks() {
    const taskCheckboxes = document.querySelectorAll(".task-checkbox");
    taskCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => this.toggleTask(e));
    });
  }

  setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.handleNavigation(e));
    });
  }

  setupMoodSelector() {
    const moodBtns = document.querySelectorAll(".mood-btn");
    moodBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => this.selectMood(e));
    });
  }

  setupNotesFeatures() {
    const saveBtn = document.getElementById("saveNoteBtn");
    const clearBtn = document.getElementById("clearNoteBtn");

    if (saveBtn) saveBtn.addEventListener("click", () => this.saveNote());
    if (clearBtn) clearBtn.addEventListener("click", () => this.clearNote());
  }

  handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const terms = document.getElementById("terms").checked;

    // Validação simples
    if (!email || !password) {
      this.showMessage("Por favor, preencha todos os campos.", "error");
      return;
    }

    if (!terms) {
      this.showMessage("Por favor, aceite os termos de uso.", "error");
      return;
    }

    // Simulação de login (aceita qualquer email/senha para demo)
    this.showLoadingLogin();

    setTimeout(() => {
      this.loginSuccess();
    }, 1500);
  }

  handleBiometricLogin() {
    this.showMessage("Funcionalidade biométrica em desenvolvimento.", "info");
  }

  showLoadingLogin() {
    const loginBtn = document.querySelector(".login-btn");
    const originalText = loginBtn.querySelector("span").textContent;

    loginBtn.querySelector("span").textContent = "ENTRANDO...";
    loginBtn.disabled = true;
    loginBtn.style.opacity = "0.7";

    // Adiciona animação de loading
    loginBtn.style.background =
      "linear-gradient(90deg, #f79931, #e88820, #f79931)";
    loginBtn.style.backgroundSize = "200% 100%";
    loginBtn.style.animation = "loginLoading 1s ease-in-out infinite";

    // Adiciona CSS da animação se não existir
    if (!document.querySelector("#loginLoadingStyle")) {
      const style = document.createElement("style");
      style.id = "loginLoadingStyle";
      style.textContent = `
                @keyframes loginLoading {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `;
      document.head.appendChild(style);
    }
  }

  loginSuccess() {
    const loginScreen = document.getElementById("loginScreen");
    const dashboard = document.getElementById("dashboard");
    const navigation = document.getElementById("navigation");

    // Animação de saída da tela de login
    loginScreen.style.transform = "scale(0.9)";
    loginScreen.style.opacity = "0";
    loginScreen.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";

    setTimeout(() => {
      loginScreen.style.display = "none";

      // Mostra dashboard com animação
      dashboard.style.display = "block";
      dashboard.style.opacity = "0";
      dashboard.style.transform = "translateY(20px)";

      navigation.style.display = "flex";
      navigation.style.opacity = "0";
      navigation.style.transform = "translateY(100%)";

      // Animação de entrada do dashboard
      setTimeout(() => {
        dashboard.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
        dashboard.style.opacity = "1";
        dashboard.style.transform = "translateY(0)";

        navigation.style.transition =
          "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s";
        navigation.style.opacity = "1";
        navigation.style.transform = "translateY(0)";
      }, 100);

      this.currentScreen = "dashboard";
    }, 500);
  }

  toggleTask(e) {
    const checkbox = e.target;
    const taskId = parseInt(checkbox.dataset.task);
    const taskText = checkbox.nextElementSibling;

    // Atualiza o estado da tarefa
    const task = this.userTasks.find((t) => t.id === taskId);
    if (task) {
      task.completed = !task.completed;
    }

    // Animação de toggle
    checkbox.style.transform = "scale(1.3)";
    checkbox.style.transition = "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)";

    setTimeout(() => {
      if (task.completed) {
        checkbox.classList.add("checked");
        taskText.style.textDecoration = "line-through";
        taskText.style.opacity = "0.5";

        // Animação de conclusão
        checkbox.style.animation = "taskComplete 0.5s ease-out";

        // Efeito de partículas (simulado com múltiplas animações)
        this.createTaskCompleteEffect(checkbox);
      } else {
        checkbox.classList.remove("checked");
        taskText.style.textDecoration = "none";
        taskText.style.opacity = "1";
      }

      checkbox.style.transform = "scale(1)";
    }, 100);

    // Remove a animação depois de completar
    setTimeout(() => {
      checkbox.style.animation = "";
    }, 500);
  }

  createTaskCompleteEffect(element) {
    // Cria pequenas partículas que "explodem" da checkbox
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement("div");
      particle.style.position = "absolute";
      particle.style.width = "4px";
      particle.style.height = "4px";
      particle.style.backgroundColor = "#3accf9";
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "1000";

      const rect = element.getBoundingClientRect();
      particle.style.left = rect.left + rect.width / 2 + "px";
      particle.style.top = rect.top + rect.height / 2 + "px";

      document.body.appendChild(particle);

      // Animação das partículas
      const angle = (i * 60 * Math.PI) / 180;
      const distance = 30 + Math.random() * 20;
      const finalX = Math.cos(angle) * distance;
      const finalY = Math.sin(angle) * distance;

      particle.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      particle.style.transform = `translate(${finalX}px, ${finalY}px)`;
      particle.style.opacity = "0";

      setTimeout(() => {
        particle.remove();
      }, 600);
    }
  }

  selectMood(e) {
    const moodBtns = document.querySelectorAll(".mood-btn");
    const selectedBtn = e.target;

    // Remove active de todos
    moodBtns.forEach((btn) => btn.classList.remove("active"));

    // Adiciona active ao selecionado
    selectedBtn.classList.add("active");

    // Animação de seleção
    selectedBtn.style.animation = "pulse 0.5s ease-out";
    setTimeout(() => {
      selectedBtn.style.animation = "";
    }, 500);

    // Feedback visual
    const mood = selectedBtn.dataset.mood;
    this.showMessage(`Humor registrado: ${this.getMoodText(mood)}`, "success");
  }

  getMoodText(mood) {
    const moodTexts = {
      great: "Excelente",
      good: "Bom",
      neutral: "Neutro",
      sad: "Triste",
      stressed: "Estressado",
    };
    return moodTexts[mood] || "Desconhecido";
  }

  handleNavigation(e) {
    const navBtns = document.querySelectorAll(".nav-btn");
    const selectedBtn = e.target.closest(".nav-btn");
    const targetScreen = selectedBtn.dataset.screen;

    // Remove active de todos
    navBtns.forEach((btn) => btn.classList.remove("active"));

    // Adiciona active ao selecionado
    selectedBtn.classList.add("active");

    // Animação de seleção
    selectedBtn.style.transform = "translateY(-5px)";

    // Gerencia as telas
    this.switchScreen(targetScreen);
  }

  switchScreen(targetScreen) {
    const screens = {
      dashboard: document.getElementById("dashboard"),
      notes: document.getElementById("notesScreen"),
    };

    // Esconde todas as telas
    Object.values(screens).forEach((screen) => {
      if (screen) {
        screen.style.display = "none";
      }
    });

    // Mostra a tela selecionada
    if (screens[targetScreen]) {
      screens[targetScreen].style.display = "block";
      screens[targetScreen].style.opacity = "0";
      screens[targetScreen].style.transform = "translateY(20px)";

      setTimeout(() => {
        screens[targetScreen].style.transition =
          "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        screens[targetScreen].style.opacity = "1";
        screens[targetScreen].style.transform = "translateY(0)";
      }, 50);
    } else {
      // Para telas não implementadas
      this.showMessage(
        `Funcionalidade "${targetScreen}" em desenvolvimento.`,
        "info"
      );
    }

    this.currentScreen = targetScreen;
  }

  handleChatStart() {
    this.showMessage("Chat com Dr. MindAI em desenvolvimento.", "info");
  }

  saveNote() {
    const title = document.getElementById("noteTitle").value.trim();
    const content = document.getElementById("noteContent").value.trim();

    if (!title || !content) {
      this.showMessage(
        "Por favor, preencha o título e o conteúdo da nota.",
        "error"
      );
      return;
    }

    // Simulação de salvamento
    this.showMessage("Nota salva com sucesso!", "success");
    this.clearNote();
  }

  clearNote() {
    document.getElementById("noteTitle").value = "";
    document.getElementById("noteContent").value = "";
  }

  startQuoteRotation() {
    setInterval(() => {
      this.rotateQuote();
    }, 8000); // Troca a cada 8 segundos
  }

  rotateQuote() {
    const quoteContent = document.querySelector(".quote-content");
    const quoteText = document.querySelector(".quote-text");

    // Animação de saída
    quoteContent.classList.add("quote-changing");

    setTimeout(() => {
      this.currentQuoteIndex =
        (this.currentQuoteIndex + 1) % this.quotes.length;
      quoteText.textContent = this.quotes[this.currentQuoteIndex];
      quoteContent.classList.remove("quote-changing");
    }, 500);
  }

  createRippleEffect(e) {
    const button = e.target;
    const ripple = button.querySelector(".btn-ripple");

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.style.transform = "scale(0)";
    ripple.style.animation = "ripple 0.6s linear";

    setTimeout(() => {
      ripple.style.animation = "";
    }, 600);
  }

  showMessage(message, type = "info") {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector(".toast-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // Cria nova mensagem
    const toast = document.createElement("div");
    toast.className = `toast-message toast-${type}`;
    toast.textContent = message;

    // Estilos da mensagem
    toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(300px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        `;

    // Cores baseadas no tipo
    const colors = {
      success: "#4CAF50",
      error: "#F44336",
      info: "#2196F3",
      warning: "#FF9800",
    };

    toast.style.backgroundColor = colors[type] || colors.info;

    document.body.appendChild(toast);

    // Animação de entrada
    setTimeout(() => {
      toast.style.transform = "translateX(0)";
    }, 100);

    // Remove após 3 segundos
    setTimeout(() => {
      toast.style.transform = "translateX(300px)";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  }
}

// Inicializa a aplicação quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", () => {
  new MindAI();
});

// Adiciona suporte para PWA (Progressive Web App)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
