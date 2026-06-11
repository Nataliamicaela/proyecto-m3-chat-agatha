/* =========================
   IMPORTS
========================= */

import { getCurrentTime } from "./utils.js";

/* =========================
   CONSTANTS
========================= */

const STORAGE_KEY = "agatha-chat-history";

/* =========================
   CHAT STATE
========================= */

export const chatHistory = [];

export let isTyping = false;

/* =========================
   CHARACTER DATA
========================= */

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

/* =========================
   MESSAGE HELPERS
========================= */

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

export function setTyping(value) {
    isTyping = value;
}

/* =========================
   LOCAL STORAGE
========================= */

export function saveHistory() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(chatHistory)
    );
}

export function loadHistory() {
    const saved =
        localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return;
    }

    const parsed = JSON.parse(saved);

    chatHistory.length = 0;

    chatHistory.push(...parsed);
}

export function clearHistory() {
    chatHistory.length = 0;

    localStorage.removeItem(STORAGE_KEY);
}

/* =========================
   GEMINI API
========================= */

export async function getGeminiResponse(
    message
) {
    const response = await fetch(
        "/api/functions",
        {
            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify({
                message,
                history: chatHistory
            })
        }
    );

    if (!response.ok) {
        const errorData =
            await response
                .json()
                .catch(() => ({}));

        throw new Error(
            errorData.error ||
            "Error al obtener respuesta"
        );
    }

    const data =
        await response.json();

    return data.reply;
}