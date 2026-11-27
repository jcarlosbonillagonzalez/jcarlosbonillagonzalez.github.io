/**
 * Punto de entrada del sitio.
 * Solo compone las piezas: configuración + dependencias + módulos.
 */
import { CONTACT_CONFIG } from './config.js';
import { FormSubmitSender } from './modules/emailSender.js';
import { ContactForm } from './modules/contactForm.js';

const form = document.querySelector('#contact-form');

if (form) {
  const emailSender = new FormSubmitSender(CONTACT_CONFIG.formEndpoint, CONTACT_CONFIG.emailSubject);
  new ContactForm(form, emailSender, CONTACT_CONFIG.whatsappNumber).init();
}
