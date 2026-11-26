import type { Metadata } from "next";
import {
  LegalLayout,
  LegalList,
  LegalNote,
  LegalSection,
  LegalTable,
} from "../components/LegalLayout";

export const metadata: Metadata = {
  title: "Política de cookies | Innovate Academy",
  description:
    "Cookies y almacenamiento técnico que utiliza Innovate Academy y cómo puedes gestionarlos.",
};

export default function Cookies() {
  return (
    <LegalLayout
      title="Política de cookies"
      current="/cookies"
      intro="Esta Web utiliza únicamente cookies y almacenamiento técnicos o estrictamente necesarios para funcionar. No usamos cookies de analítica, publicidad ni seguimiento."
    >
      <LegalSection title="1. Qué son las cookies">
        <p>
          Las cookies son pequeños archivos que se guardan en tu dispositivo al
          visitar una web. También puede utilizarse almacenamiento local del
          navegador con finalidades técnicas similares. Algunas cookies son
          necesarias para que la web funcione; otras, como las de analítica o
          publicidad, requieren tu consentimiento.
        </p>
      </LegalSection>

      <LegalSection title="2. Cookies que utilizamos">
        <p>
          En la fecha de esta política, la Web solo utiliza los siguientes
          elementos técnicos:
        </p>
        <LegalTable
          columns={["Nombre", "Titularidad", "Finalidad", "Duración"]}
          rows={[
            [
              <code key="session" className="font-mono text-[11px] text-foreground">
                session
              </code>,
              "Propia",
              "Mantener tu sesión iniciada después de acceder con Google. Es una cookie técnica, httpOnly y SameSite=Lax.",
              "30 días",
            ],
            [
              "Cookies de Google",
              "Terceros (Google)",
              "Se generan en el dominio de Google durante el proceso de inicio de sesión con Google. Son necesarias para completar el acceso y se rigen por la política de Google.",
              "Según Google",
            ],
          ]}
        />
        <p>
          Estas cookies no requieren consentimiento conforme al artículo 22.2 de
          la LSSI-CE, porque son estrictamente necesarias para prestar el
          servicio que solicitas. Por eso no mostramos un banner de cookies.
        </p>
        <LegalNote>
          No utilizamos Google Analytics, píxeles publicitarios ni cookies de
          redes sociales. Si en el futuro incorporamos cookies de analítica o
          publicidad, pediremos tu consentimiento antes de instalarlas y
          actualizaremos esta página.
        </LegalNote>
      </LegalSection>

      <LegalSection title="3. Cómo gestionar las cookies">
        <p>
          Puedes bloquear o borrar las cookies desde la configuración de tu
          navegador. Si bloqueas la cookie de sesión, algunas funciones dejarán
          de funcionar, como mantener la sesión iniciada o acceder a tu panel de
          cursos.
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-foreground">Chrome:</strong> Configuración
              → Privacidad y seguridad → Cookies y otros datos de sitios.
            </>,
            <>
              <strong className="text-foreground">Firefox:</strong> Ajustes →
              Privacidad y seguridad → Cookies y datos del sitio.
            </>,
            <>
              <strong className="text-foreground">Safari:</strong> Preferencias →
              Privacidad → Gestionar datos de sitios web.
            </>,
            <>
              <strong className="text-foreground">Edge:</strong> Configuración →
              Cookies y permisos del sitio → Cookies y datos almacenados.
            </>,
          ]}
        />
        <p>
          También puedes cerrar sesión desde la Web para eliminar la cookie de
          sesión y volver a iniciarla cuando quieras.
        </p>
      </LegalSection>

      <LegalSection title="4. Cambios en esta política">
        <p>
          Si cambiamos las cookies que utilizamos, publicaremos la nueva versión
          con su fecha. La versión vigente es la que aparece publicada en esta
          página.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
