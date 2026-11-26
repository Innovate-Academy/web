// Datos del titular que aparecen en las páginas legales.
// Completa los campos vacíos cuando estén disponibles: son obligatorios para
// el aviso legal (art. 10 LSSI) y para las hojas de reclamaciones.
// Mientras estén vacíos, la web no muestra huecos entre corchetes.
export const LEGAL_INFO = {
  nombreComercial: "Innovate Academy",
  titular: "", // Nombre y apellidos o denominación social
  nif: "", // NIF / CIF
  domicilio: "", // Calle, número, código postal, localidad, provincia
  comunidad: "", // Comunidad autónoma del titular
  email: "innovatesoporte2026@gmail.com",
  emailPrivacidad: "innovatesoporte2026@gmail.com",
  web: "https://innovateweb.vercel.app",
  fecha: "25 de noviembre de 2026",
  version: "1.0",
} as const;

export const titularLegal = LEGAL_INFO.titular || LEGAL_INFO.nombreComercial;
