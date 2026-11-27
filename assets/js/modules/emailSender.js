/**
 * Envío de correo mediante FormSubmit.
 * Responsabilidad única: entregar los datos del formulario al servicio externo.
 * Si mañana se cambia de proveedor (Formspree, API propia), solo se reemplaza esta clase:
 * ContactForm depende de cualquier objeto con un método `send(data)`.
 */

/** Error que indica que FormSubmit aún espera la activación desde el correo del dueño. */
export class ActivationRequiredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ActivationRequiredError';
  }
}

export class FormSubmitSender {
  /**
   * @param {string} endpoint URL AJAX de FormSubmit.
   * @param {string} subject Asunto del correo.
   */
  constructor(endpoint, subject) {
    this.endpoint = endpoint;
    this.subject = subject;
  }

  /**
   * Envía los datos al correo configurado.
   * @param {{nombre: string, contacto: string, tipo: string, mensaje: string}} data
   * @returns {Promise<void>} Se rechaza si el servicio no confirma el envío.
   */
  async send(data) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        Nombre: data.nombre,
        Contacto: data.contacto,
        'Tipo de proyecto': data.tipo,
        Mensaje: data.mensaje,
        _subject: this.subject,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const result = await response.json().catch(() => ({}));
    if (!response.ok || String(result.success) !== 'true') {
      const message = result.message || `Respuesta ${response.status} del servicio de correo.`;
      if (/activat/i.test(message)) throw new ActivationRequiredError(message);
      throw new Error(message);
    }
  }
}
