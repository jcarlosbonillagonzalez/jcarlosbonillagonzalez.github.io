/**
 * Configuración de contacto del sitio.
 * Único lugar donde viven el número de WhatsApp, el correo y el servicio de envío del formulario.
 */
export const CONTACT_CONFIG = Object.freeze({
  /** Número de WhatsApp en formato internacional, sin "+" ni espacios (57 = Colombia). */
  whatsappNumber: '573174547890',

  /** Correo que recibe los mensajes del formulario. */
  email: 'jcarlosbonilla.gonzalez@gmail.com',

  /**
   * Servicio que reenvía el formulario al correo (GitHub Pages no tiene servidor).
   * FormSubmit: la primera vez envía un correo de activación que hay que confirmar.
   * Tras activarlo, se puede cambiar el correo por el código alias que entrega FormSubmit.
   */
  formEndpoint: 'https://formsubmit.co/ajax/jcarlosbonilla.gonzalez@gmail.com',

  /** Asunto del correo que llega con cada mensaje. */
  emailSubject: 'Nuevo contacto desde tu sitio web',
});
