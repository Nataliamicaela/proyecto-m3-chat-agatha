export const chatHistory = [];

export function addUserMessage(text) {
    chatHistory.push({
        role: "user",
        content: text,
        time: getCurrentTime()
    });
}

export function addAssistantMessage(text) {
    chatHistory.push({
        role: "assistant",
        content: text,
        time: getCurrentTime()
    });
}

export let isTyping = false;

export function setTyping(value) {
    isTyping = value;
}

export function saveHistory() {
    localStorage.setItem(
        "agatha-chat-history",
        JSON.stringify(chatHistory)
    );
}

export function loadHistory() {
    const saved = localStorage.getItem(
        "agatha-chat-history"
    );

    if (!saved) return;

    const parsed = JSON.parse(saved);

    chatHistory.length = 0;

    chatHistory.push(...parsed);
}

export function clearHistory() {

    chatHistory.length = 0;

    localStorage.removeItem(
        "agatha-chat-history"
    );
}

export function getCurrentTime() {

    return new Date().toLocaleTimeString(
        [],
        {
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}

export const character = {
  name: "Agatha Harkness",

  description:
    "Poderosa bruja del universo Marvel.",

  personality: [
    "inteligente",
    "irónica",
    "segura",
    "misteriosa"
  ]
};

export async function getGeminiResponse(message) {

    const response = await fetch("/api/functions", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            message
        })
    });

    if (!response.ok) {
        throw new Error(
            "Error al obtener respuesta"
        );
    }

    const data = await response.json();

    return data.reply;
}