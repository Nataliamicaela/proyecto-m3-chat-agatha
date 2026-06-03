import {
  chatHistory,
  addUserMessage,
  addAssistantMessage,
  getMockResponse,
  isTyping,
  setTyping,
  saveHistory,
  loadHistory,
  clearHistory
} from "./chat.js";

const app = document.querySelector("#app");

function renderHome() {
  return `
    <section class="home-page">

      <img
        src="./src/assets/agatha.jpg"
        alt="Agatha Harkness"
        class="character-image"
      >

      <h2>🧙‍♀️ Agatha Harkness</h2>

      <p class="character-subtitle">
        Bruja legendaria del universo Marvel
      </p>

      <div class="character-info">

        <span>🔮 Magia</span>

        <span>📚 Conocimiento ancestral</span>

        <span>✨ Inteligente</span>

        <span>😏 Irónica</span>

        <span>🌙 Misteriosa</span>

      </div>

      <p>
        Una de las brujas más poderosas del universo Marvel.
        Conversa con Agatha, haz preguntas y descubre qué tiene para decir sobre cualquier tema.
      </p>

      <button id="start-chat-btn">
        Comenzar Chat
      </button>

    </section>
  `;
}

function renderChat() {
  return `
    <section class="chat-page">

      <h2>🧙‍♀️ Chat con Agatha</h2>

      <button id="clear-chat-btn">
       🗑️ Limpiar conversación
      </button>

      <div id="messages" class="messages">
        ${renderMessages()}
      </div>

      <form id="chat-form">

        <input
          type="text"
          id="message-input"
          placeholder="Escribe un mensaje..."
        />

        <button type="submit">
          Enviar
        </button>

      </form>

    </section>
  `;
}

function renderAbout() {
  return `
    <section class="about-page">

      <h2>🧙‍♀️ Sobre Agatha Harkness</h2>

      <p>
        Agatha Harkness es una poderosa bruja del universo Marvel,
        conocida por su inteligencia, su humor irónico y su enorme conocimiento de la magia.
      </p>

      <div class="about-badges">

        <span>🔮 Bruja legendaria</span>
        <span>📚 Conocimiento ancestral</span>
        <span>✨ Inteligente</span>
        <span>😏 Irónica</span>
        <span>🌙 Misteriosa</span>

      </div>

      <h3>⚡ Sobre el proyecto</h3>

      <p>
        Este proyecto fue desarrollado como una Single Page Application
        que permite conversar con Agatha mediante inteligencia artificial.
      </p>

      <h3>💻 Tecnologías utilizadas</h3>

      <div class="tech-badges">

        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>History API</span>
        <span>LocalStorage</span>
        <span>Gemini AI</span>

      </div>

      <p class="project-note">
        Proyecto Integrador - Módulo 3 Frontend
      </p>

    </section>
  `;
}

function renderMessages() {

  const messagesHtml = chatHistory
    .map((message) => {
      const avatar =
        message.role === "assistant"
          ? "🧙‍♀️"
          : "👤";

      return `
        <div class="message-row ${message.role}">

        <div class="avatar">
          ${avatar}
        </div>

        <div class="message ${message.role}">

        <div>
          ${message.content}
        </div>

        <small>
          ${message.time ?? ""}
        </small>

        </div>

        </div>
`;
    })
    .join("");

  const typingHtml = isTyping
    ? `
      <div class="message assistant">
        🧙‍♀️ Agatha está escribiendo...
      </div>
    `
    : "";

  return messagesHtml + typingHtml;
}

function scrollToBottom() {
  const messages = document.querySelector("#messages");

  if (!messages) return;

  messages.scrollTop = messages.scrollHeight;
}

function router() {
  const path = window.location.pathname;

  if (path === "/" || path === "/home") {
    app.innerHTML = renderHome();
    return;
  }

  if (path === "/chat") {
    app.innerHTML = renderChat();
    return;
  }

  if (path === "/about") {
    app.innerHTML = renderAbout();
    return;
  }

  app.innerHTML = `
    <h2>404</h2>
    <p>Página no encontrada</p>
  `;
}

function navigate(path) {
  history.pushState({}, "", path);
  router();
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-link]");

  if (!link) return;

  event.preventDefault();

  navigate(link.getAttribute("href"));
});

document.addEventListener("click", (event) => {

  if (event.target.id === "start-chat-btn") {
    navigate("/chat");
  }

  if (event.target.id === "clear-chat-btn") {

    const confirmed = confirm(
      "¿Seguro que deseas borrar la conversación?"
    );

    if (!confirmed) {
      return;
    }

    clearHistory();

    const messages =
      document.querySelector("#messages");

    if (messages) {
      messages.innerHTML =
        renderMessages();
    }

  }

});

window.addEventListener("popstate", router);

loadHistory();

router();

document.addEventListener("submit", (event) => {

  if (event.target.id !== "chat-form") return;

  event.preventDefault();

  const input = document.querySelector("#message-input");

  const text = input.value.trim();

  if (!text) return;

  const messages = document.querySelector("#messages");

  addUserMessage(text);

  saveHistory();

  setTyping(true);

  messages.innerHTML = renderMessages();

  scrollToBottom();

  input.value = "";

  setTimeout(() => {

    addAssistantMessage(
      getMockResponse()
    );

    saveHistory();

    setTyping(false);

    messages.innerHTML = renderMessages();

    scrollToBottom();

  }, 1000);
});