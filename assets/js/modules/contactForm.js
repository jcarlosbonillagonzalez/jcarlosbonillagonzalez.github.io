/**
 * Formulario de contacto.
 * Responsabilidad: leer y validar los campos, y mostrar el estado al visitante.
 * El envío se delega en dependencias inyectadas (correo y WhatsApp).
 */
import { buildWhatsAppUrl, formatContactMessage } from './whatsapp.js';

const REQUIRED_FIELDS = ['nombre', 'contacto', 'mensaje'];

const STATUS_COLORS = Object.freeze({
  info: '#C9D3DD',
  success: '#7CE3B5',
  error: '#FF8A8A',
});

export class ContactForm {
  /**
   * @param {HTMLFormElement} form
   * @param {{ send(data: object): Promise<void> }} emailSender
   * @param {string} whatsappNumber
   */
  constructor(form, emailSender, whatsappNumber) {
    this.form = form;
    this.emailSender = emailSender;
    this.whatsappNumber = whatsappNumber;
    this.status = form.querySelector('#form-status');
    this.submitButton = form.querySelector('[data-submit]');
    this.whatsappButton = form.querySelector('[data-send-whatsapp]');
  }

  /** Conecta los eventos del formulario. */
  init() {
    this.form.addEventListener('submit', (event) => this.handleEmail(event));
    this.whatsappButton?.addEventListener('click', () => this.handleWhatsApp());
  }

  /** @returns {{nombre: string, contacto: string, tipo: string, mensaje: string}} */
  readValues() {
    const data = new FormData(this.form);
    return {
      nombre: String(data.get('nombre') || '').trim(),
      contacto: String(data.get('contacto') || '').trim(),
      tipo: String(data.get('tipo') || '').trim(),
      mensaje: String(data.get('mensaje') || '').trim(),
      honey: String(data.get('_honey') || ''),
    };
  }

  /**
   * Marca los campos obligatorios vacíos.
   * @returns {boolean} true si todo está completo.
   */
  validate(values) {
    let valid = true;
    REQUIRED_FIELDS.forEach((name) => {
      const field = this.form.elements.namedItem(name);
      const empty = !values[name];
      field?.setAttribute('aria-invalid', String(empty));
      if (empty) valid = false;
    });
    if (!valid) this.showStatus('Completa tu nombre, cómo contactarte y tu idea.', 'error');
    return valid;
  }

  /** Envía el formulario al correo. */
  async handleEmail(event) {
    event.preventDefault();
    const values = this.readValues();
    if (values.honey) return; // Bot detectado: se ignora en silencio.
    if (!this.validate(values)) return;

    this.setBusy(true);
    this.showStatus('Enviando…', 'info');
    try {
      await this.emailSender.send(values);
      this.form.reset();
      this.showStatus('¡Gracias! Recibí tu mensaje y te responderé pronto.', 'success');
    } catch (error) {
      this.showStatus('No se pudo enviar por correo. Intenta por WhatsApp, por favor.', 'error');
      console.error('[contacto]', error);
    } finally {
      this.setBusy(false);
    }
  }

  /** Abre WhatsApp con el mensaje armado a partir del formulario. */
  handleWhatsApp() {
    const values = this.readValues();
    if (!this.validate(values)) return;
    const url = buildWhatsAppUrl(this.whatsappNumber, formatContactMessage(values));
    window.open(url, '_blank', 'noopener');
    this.showStatus('Abriendo WhatsApp…', 'info');
  }

  setBusy(busy) {
    if (!this.submitButton) return;
    this.submitButton.disabled = busy;
    this.submitButton.style.opacity = busy ? '0.7' : '1';
  }

  showStatus(message, type) {
    if (!this.status) return;
    this.status.textContent = message;
    this.status.style.color = STATUS_COLORS[type] || STATUS_COLORS.info;
  }
}
