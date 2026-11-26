export type SocialNetwork = {
  name: string;
  handle: string;
  href: string;
  directMessage?: boolean;
};

export const INSTAGRAM_DM_MESSAGE =
  "Hola, estoy interesado en sus servicios. ¿Me pueden dar más información?";

// Instagram no permite rellenar el mensaje desde una URL. Este enlace abre
// directamente el chat con la cuenta; el mensaje se copia al portapapeles.
export const INSTAGRAM_DM_URL = "https://ig.me/m/innovateacademy.site";

// Solo usuarios públicos: no se guardan contraseñas ni datos de acceso.
export const SOCIALS: SocialNetwork[] = [
  {
    name: "Instagram",
    handle: "@innovateacademy.site",
    href: INSTAGRAM_DM_URL,
    directMessage: true,
  },
  {
    name: "X",
    handle: "@Innovate_acsite",
    href: "https://x.com/Innovate_acsite",
  },
  {
    name: "TikTok",
    handle: "@innovateacademy.site",
    href: "https://www.tiktok.com/@innovateacademy.site",
  },
  {
    name: "Twitch",
    handle: "innovate_acsite",
    href: "https://www.twitch.tv/innovate_acsite",
  },
  {
    name: "Kick",
    handle: "innovate_acsite",
    href: "https://kick.com/innovate_acsite",
  },
];
