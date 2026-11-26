import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalLayout,
  LegalList,
  LegalNote,
  LegalSection,
} from "../components/LegalLayout";
import { LEGAL_INFO } from "../lib/legal";

export const metadata: Metadata = {
  title: "Familias | Innovate Academy",
  description:
    "Información para familias sobre la matrícula de menores, autorizaciones y reglas de comunicación en Innovate Academy.",
};

export default function Familias() {
  return (
    <LegalLayout
      title="Información para familias"
      current="/familias"
      intro="Cómo funciona la matrícula de menores, qué autorizaciones pedimos y qué reglas aplica el equipo para protegerles."
    >
      <LegalSection title="1. Matrícula de menores">
        <p>
          Los menores de 18 años solo pueden matricularse con la participación de
          su madre, padre o tutor legal, que contrata, paga y acepta las
          condiciones. Para los menores de 14 años, además, el tutor consiente el
          tratamiento de sus datos y ejerce sus derechos.
        </p>
        <p>
          Pedimos solo los datos imprescindibles. No publicamos imágenes, nombres
          ni trabajos de menores sin autorización expresa.
        </p>
      </LegalSection>

      <LegalSection title="2. Autorizaciones que pedimos">
        <p>
          Antes de iniciar el curso, el tutor legal debe enviar por escrito a{" "}
          <a
            href={`mailto:${LEGAL_INFO.email}`}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.email}
          </a>{" "}
          las siguientes autorizaciones:
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-foreground">Obligatoria:</strong> declarar
              que es el padre, madre o tutor legal del menor y autorizar su
              matrícula en el curso, aceptando las{" "}
              <Link
                href="/terminos-servicios"
                className="font-semibold text-brand hover:text-brand-hover"
              >
                Condiciones de contratación
              </Link>
              .
            </>,
            <>
              <strong className="text-foreground">Obligatoria:</strong> consentir
              el tratamiento de los datos del menor para gestionar el curso,
              según la{" "}
              <Link
                href="/privacidad"
                className="font-semibold text-brand hover:text-brand-hover"
              >
                Política de privacidad
              </Link>
              .
            </>,
            <>
              <strong className="text-foreground">Opcional:</strong> autorizar la
              grabación de las clases en las que participe el menor.
            </>,
            <>
              <strong className="text-foreground">Opcional:</strong> autorizar la
              publicación de su nombre de pila o de sus trabajos en las redes y la
              web de Innovate Academy. Si no se marca, no se publica nada.
            </>,
          ]}
        />
        <LegalNote>
          Indica en el correo el nombre del menor, el curso y el tramo de edad (14
          a 17 años o menos de 14 años). Si falta alguna autorización
          obligatoria, no podremos activar la matrícula.
        </LegalNote>
      </LegalSection>

      <LegalSection title="3. Cómo nos comunicamos con los menores">
        <LegalList
          items={[
            "No enviamos mensajes privados a menores fuera de los canales oficiales.",
            "Siempre hay al menos dos adultos del equipo en los canales en los que participan menores.",
            "No pedimos ni compartimos fotos, datos de contacto personales ni redes sociales personales de los menores.",
            "No mostramos teléfonos ni correos de menores a otros alumnos.",
            "Guardamos los datos de menores solo el tiempo necesario y con acceso restringido por roles.",
          ]}
        />
        <p>
          Ante cualquier indicio de riesgo o violencia hacia un menor, avisamos de
          inmediato a Dirección y, si procede, a las autoridades (112 en caso de
          emergencia).
        </p>
      </LegalSection>

      <LegalSection title="4. Contacto">
        <p>
          Si tienes cualquier duda o preocupación sobre la participación de un
          menor, escribe a{" "}
          <a
            href={`mailto:${LEGAL_INFO.email}`}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.email}
          </a>
          . También puedes consultar la{" "}
          <Link
            href="/desistimiento"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            Política de desistimiento
          </Link>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
