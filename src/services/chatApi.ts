/**
 * Servicio para interactuar con la API de chat de turismo de Canarias
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_KEY = import.meta.env.VITE_CHAT_API_KEY;

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  response: string;
}

interface ErrorResponse {
  error: string;
  detail?: string;
}

/**
 * Envía un mensaje al asistente de turismo
 * @param message Mensaje del usuario
 * @returns Respuesta del asistente
 * @throws Error si hay algún problema con la API
 */
export const sendChatMessage = async (message: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error('API Key no configurada. Por favor, configura VITE_CHAT_API_KEY en tu archivo .env');
  }

  try {
    const requestBody: ChatRequest = {
      message: message.trim()
    };

    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      },
      body: JSON.stringify(requestBody)
    });

    // Manejar errores HTTP
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('API Key inválida');
      }

      // Intentar obtener el mensaje de error del servidor
      try {
        const errorData: ErrorResponse = await response.json();
        throw new Error(errorData.detail || errorData.error || 'Error en el servidor');
      } catch {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
    }

    const data: ChatResponse = await response.json();
    return data.response;

  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('El chat no se encuentra disponible en estos momentos. Inténtalo más tarde.');
  }
};

/**
 * Verifica si la API está disponible
 * @returns true si la API responde, false en caso contrario
 */
export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(5000) // timeout de 5 segundos
    });
    return response.ok;
  } catch {
    return false;
  }
};
