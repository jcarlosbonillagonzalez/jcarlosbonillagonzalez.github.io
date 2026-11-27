/**
 * Menú móvil.
 * Responsabilidad única: abrir y cerrar el menú principal en pantallas pequeñas.
 */
export class MobileMenu {
  /**
   * @param {HTMLButtonElement} toggle Botón que abre/cierra.
   * @param {HTMLElement} nav Menú controlado.
   */
  constructor(toggle, nav) {
    this.toggle = toggle;
    this.nav = nav;
  }

  init() {
    this.toggle.addEventListener('click', () => this.setOpen(!this.isOpen()));
    // Al elegir una opción, el menú se cierra para mostrar la sección.
    this.nav.addEventListener('click', (event) => {
      if (event.target.closest('a')) this.setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && this.isOpen()) {
        this.setOpen(false);
        this.toggle.focus();
      }
    });
  }

  isOpen() {
    return this.nav.classList.contains('is-open');
  }

  setOpen(open) {
    this.nav.classList.toggle('is-open', open);
    this.toggle.setAttribute('aria-expanded', String(open));
    this.toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
}
