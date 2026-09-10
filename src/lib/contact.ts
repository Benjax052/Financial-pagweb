export const WHATSAPP_NUMBER = "56954419466";
export const CONTACT_EMAIL = "grupofinancial06@gmail.com";

export const whatsappLink = (message: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

export const DIAGNOSTICO_WHATSAPP_LINK = whatsappLink(
  "Hola, quiero agendar un diagnóstico para mi municipio."
);
