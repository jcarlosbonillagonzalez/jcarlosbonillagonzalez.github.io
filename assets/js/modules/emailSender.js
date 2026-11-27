/**
 * Envío de correo mediante FormSubmit.
 * Responsabilidad única: entregar los datos del formulario al servicio externo.
 * Si mañana se cambia de proveedor (Formspree, API propia), solo se reemplaza esta clase:
 * ContactForm depende de cualquier objeto con un método `send(data)`.
 */
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
      throw new Error(result.message || 'No se pudo enviar el mensaje.');
    }
  }
}
