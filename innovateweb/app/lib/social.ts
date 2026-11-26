export type SocialNetwork = {
  name: string;
  handle: string;
  href: string;
};

// Solo usuarios públicos: no se guardan contraseñas ni datos de acceso.
export const SOCIALS: SocialNetwork[] = [
  {
    name: "Instagram",
    handle: "@innovateacademy.site",
    href: "https://www.instagram.com/innovateacademy.site/",
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
