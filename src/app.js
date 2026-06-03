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

      <h2>🧙‍♀️ Agatha Harkness</h2>

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

      <p>
        Este proyecto fue desarrollado como una Single Page Application
        que permite conversar con Agatha mediante inteligencia artificial.
      </p>

      <p>
        Tecnologías utilizadas:
      </p>

      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>History API</li>
        <li>Gemini AI (próximamente)</li>
      </ul>

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

  document.addEventListener("click", (event) => {

    if (event.target.id === "clear-chat-btn") {

      clearHistory();

      const messages =
        document.querySelector("#messages");

      if (messages) {
        messages.innerHTML =
          renderMessages();
      }
    }

  });

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