# Proyecto: Sitio web de Kódika Software — hoja de vida comercial de Juan Carlos Bonilla Gonzalez

## Objetivo
Sitio web para dar a conocer mis servicios de **desarrollo de páginas web y sistemas de información a la medida**.
Funciona como hoja de vida comercial. Se publicará en **GitHub Pages** (sitio estático, sin servidor).

## Reglas de trabajo (obligatorias)
- Aplicar siempre **arquitectura limpia y principios SOLID**, también en el frontend: cada cosa en su lugar,
  responsabilidades separadas, nada de código duplicado ni estilos sueltos.
- Respetar las descripciones y notas que se dejen en el proyecto (este archivo, README, comentarios).
- Mantener la estructura de carpetas definida abajo. Si algo nuevo no encaja, proponer dónde va antes de crearlo.
- Pedir confirmación antes de hacer `git push`.

## Marca
- Nombre: **Kódika Software** (la ó siempre con el degradado #3DDC97 → #5AA9FF). Firma: "por Juan Carlos Bonilla".
- Logo: "K de nodos" (barra + dos diagonales con nodos verdes y azules). Archivos en `assets/img/marca/`:
  `kodika-icon.svg` (oscuro), `kodika-icon-light.svg`, `kodika-logo.svg` / `kodika-logo-light.svg` (horizontal, texto en trazos),
  PNG del logo, `favicon-32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `og-kodika.png` (vista previa al compartir, 1200×630).
- No deformar el logo ni cambiar sus colores; sobre fondo claro usar las versiones `-light`.

## Estado actual
- `index.html` contiene el diseño aprobado completo en **un solo archivo** (estilos en línea + `<style>` en el head).
  Viene de un diseño hecho en Claude (Cowork). Es la referencia visual: **no cambiar el look**, solo reorganizar.
- Estilo: "tech oscuro". Fondo `#070B12`, superficies `#0E1520`, bordes `#1E2A3A`, texto `#E8EEF5`, texto secundario `#A3B0BF`/`#B5C1CE`.
  Acento principal `#3DDC97` (verde), acento 2 `#5AA9FF` (azul). Colores de apoyo: `#FFB547`, `#B892FF`, `#FF7AB6`, `#4FD1E8`.
- Tipografías (Google Fonts): Space Grotesk (títulos), Inter (texto), JetBrains Mono (código/etiquetas).
- Animaciones ya incluidas: aparición escalonada del hero, texto con degradado animado, cursor parpadeante,
  luces de fondo que se desplazan, maqueta flotante, barras animadas, franja de tecnologías en bucle (marquee),
  brillo en botones, elevación de tarjetas al pasar el mouse, aparición al hacer scroll (`animation-timeline: view()`),
  y respeto a `prefers-reduced-motion`.

## Secciones
1. Navegación  2. Hero con maqueta de sistema  3. Franja de cifras + empresas  4. Marquee de tecnologías
5. Servicios (6)  6. Soluciones (Landing, Sitio Empresarial *recomendado*, Sistema a la Medida) — SIN PRECIOS: todo es "Cotización a la medida"  7. Proceso en 4 pasos
8. Portafolio: destacados **Gym Fiamma** (gymfiamma.com, en producción) y **HydroScan** (en desarrollo); MassyTracks, GABI, Alza la mano y Semana de la Innovación **solo se nombran** (propiedad de empresas, confidenciales)  9. Sobre mí  10. Testimonios
11. Preguntas frecuentes  12. Contacto (WhatsApp, correo, LinkedIn, formulario)  13. Footer

## Estructura objetivo
```
/
├── index.html
├── assets/
│   ├── css/
│   │   ├── base.css         (variables CSS / tokens, reset, tipografía)
│   │   ├── layout.css       (contenedores, grids, secciones)
│   │   ├── components.css   (botones, tarjetas, chips, formularios)
│   │   └── animations.css   (keyframes y clases de animación)
│   ├── js/
│   │   ├── main.js          (punto de entrada: solo compone)
│   │   ├── config.js        (WhatsApp, correo, endpoint del formulario)
│   │   └── modules/
│   │       ├── whatsapp.js      (enlaces y mensaje para WhatsApp)
│   │       ├── emailSender.js   (envío por FormSubmit; reemplazable)
│   │       ├── contactForm.js   (validación y estado del formulario)
│   │       └── mobileMenu.js    (menú móvil)
│   ├── img/                 (foto, capturas de proyectos)
│   └── docs/                (hoja de vida en PDF)
├── CLAUDE.md
└── README.md
```

## Tareas pendientes (en orden sugerido)
1. Refactorizar `index.html` a la estructura objetivo: mover estilos en línea a clases reutilizables con variables CSS.
   El resultado visual debe quedar idéntico.
2. ~~Menú hamburguesa en celular~~ HECHO (`assets/js/modules/mobileMenu.js`). Falta revisar el resto de secciones en móvil.
3. ~~Botón flotante de WhatsApp~~ HECHO.
4. ~~Formulario de contacto~~ HECHO (FormSubmit + WhatsApp). El JS usa módulos ES: funciona en GitHub Pages o con un servidor local, no abriendo el archivo con doble clic.
5. SEO básico: meta tags, Open Graph, favicon, `sitemap.xml`, `robots.txt`.
6. Publicar en GitHub Pages (repo `<usuario>.github.io`, rama `main`).
7. Ideas a futuro: formulario de cotización guiado (sin precios), páginas de detalle por proyecto, selector español/inglés, modo claro.

## Datos que faltan (marcados entre [CORCHETES] en el HTML)
- Ya cargadas: foto (`assets/img/juan-carlos-bonilla.jpg`) y capturas en `assets/img/proyectos/`.
- WhatsApp configurado: 317 454 7890 (`assets/js/config.js`).
- Formulario: envío por correo con FormSubmit (requiere activación única desde el correo) y opción de enviar por WhatsApp.
- Falta:
  testimonios reales ([TESTIMONIO], [NOMBRE], [CARGO · EMPRESA]), enlace al PDF de la hoja de vida.
- La promesa "respondo en menos de 24 horas" está en Contacto: confirmar o cambiar.
- No inventar cifras, testimonios ni clientes.
- **No mostrar precios**: todo proyecto se cotiza.
- **No mostrar detalles ni capturas de proyectos corporativos** (Massy Energy, F. U. Panamericana): solo el nombre.
- Repositorio de GitHub: `jcarlosbonillagonzalez/jcarlosbonillagonzalez.github.io` → https://jcarlosbonillagonzalez.github.io

## Perfil (fuente: LinkedIn)
- Ingeniero de Sistemas (F. U. Panamericana, 2019–2021). Tecnólogo en Análisis y Desarrollo de Sistemas de Información (2018–2019).
  Técnico Profesional en Análisis y Diseño de Bases de Datos (2014–2016). Inglés, Michigan Master (2020–2021).
- Massy Energy Colombia — Profesional I Aplicaciones IT (ene 2023–actual): backend .NET, APIs, arquitectura limpia, DDD, Azure DevOps CI/CD.
  Proyectos: MassyTracks (API de gestión de bodegas y logística), GABI (modernización de sistemas heredados con SOLID/Clean Code).
- Fagor Electrónica, España — Desarrollador web (ene–oct 2022): PHP (PDO), JavaScript, SQL Server, Scrum con Jira, Git.
- Massy Energy — Consultor Técnico en Informática (sep 2020–ene 2022): C# MVC, .NET Core/Blazor, PHP, ScriptCase, SQL Server, MySQL.
- F. U. Panamericana — Desarrollador junior (2018–2020): front end, Power Apps / Power Automate / SharePoint (app "Alza la mano"),
  landing de la Semana de la Innovación, sistema bibliotecario.
- Soporte técnico (2012–2018).
- Certificaciones: Scrum Master, Scrum Product Owner (POPC), Scrum Developer, Scrum Foundation (SFPC), ITIL Fundamentos,
  OWASP Top 10, POO, Introducción a la IA.
- Contacto: jcarlosbonilla.gonzalez@gmail.com · linkedin.com/in/juan-carlos-bonilla-gonzalez-76242a76
