/**
 * Utilidades de WhatsApp.
 * Responsabilidad única: construir enlaces de chat con un mensaje ya escrito.
 */

/**
 * Crea el enlace https://wa.me para abrir un chat.
 * @param {string} phone Número en formato internacional sin "+" (ej. 573001234567).
 * @param {string} [text] Mensaje inicial.
 * @returns {string}
 */
export function buildWhatsAppUrl(phone, text = '') {
  const base = `https://wa.me/${phone}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/**
 * Convierte los datos del formulario en un mensaje legible para WhatsApp.
 * @param {{nombre: string, contacto: string, tipo: string, mensaje: string}} data
 * @returns {string}
 */
export function formatContactMessage({ nombre, contacto, tipo, mensaje }) {
  return [
    `Hola Juan Carlos, soy ${nombre}.`,
    `Necesito: ${tipo}.`,
    mensaje,
    `Mi contacto: ${contacto}`,
  ].join('\n');
}
