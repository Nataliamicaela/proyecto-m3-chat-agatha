import {
  chatHistory,
  addUserMessage,
  addAssistantMessage,
  getGeminiResponse,
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

      <h2>Agatha Harkness</h2>

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
        Conversá con Agatha, hacele preguntas y descubrí qué tiene para decir sobre cualquier tema.
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

      <div class="chat-header">

        <img
          src="./src/assets/agatha.jpg"
          alt="Agatha"
          class="chat-profile"
        >

        <h2 class="chat-title">
          Agatha Chat
        </h2>

        <div class="chat-status">
          🟢 En línea
        </div>

      </div>

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

      <div class="chat-actions">

      <button id="clear-chat-btn">
        Limpiar historial
      </button>

      </div>

    </section>
  `;
}
function renderAbout() {
  return `
    <section class="about-page">

      <h2>Sobre el Proyecto</h2>

      <p>
        Agatha Chat es una Single Page Application desarrollada para ComicSansCon,
        una agencia digital especializada en experiencias interactivas para fans
        de películas, series y videojuegos.
      </p>

      <p>
        La aplicación permite conversar con Agatha Harkness mediante inteligencia
        artificial, simulando su personalidad, conocimientos y estilo característico.
      </p>

      <h3>Tecnologías utilizadas</h3>

      <div class="tech-badges">

        <span>HTML</span>
        <span>CSS</span>
        <span>JavaScript</span>
        <span>History API</span>
        <span>LocalStorage</span>
        <span>Gemini AI</span>

      </div>

      <h3>Personaje seleccionado</h3>

      <p>
        Agatha Harkness fue elegida por su personalidad carismática,
        su humor irónico y su amplio conocimiento de la magia,
        características ideales para una experiencia conversacional basada en IA.
      </p>

      <div class="agatha-quote">
        "El conocimiento prohibido siempre tiene un precio."
      </div>

    </section>

    <footer class="about-footer">
      Proyecto Integrador • Módulo 3 Frontend
    </footer>
  `;
}


function renderMessages() {

  const messagesHtml = chatHistory
    .map((message) => {
      return `
        <div class="message-row ${message.role}">

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
    <div class="typing-container">

      <img
        src="./src/assets/agatha.jpg"
        alt="Agatha"
        class="typing-avatar"
      >

      <div class="typing-bubble">

        <span></span>
        <span></span>
        <span></span>

      </div>

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

document.addEventListener("submit", async (event) => {

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

  try {

    const reply =
      await getGeminiResponse(text);

    addAssistantMessage(reply);

  } catch (error) {

    console.error(error);

    addAssistantMessage(
      "Lo siento, ocurrió un problema al consultar mis conocimientos arcanos."
    );

  }

  saveHistory();

  setTyping(false);

  messages.innerHTML = renderMessages();

  scrollToBottom();
});