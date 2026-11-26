import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalLayout,
  LegalList,
  LegalNote,
  LegalSection,
  LegalTable,
} from "../components/LegalLayout";
import { LEGAL_INFO, titularLegal } from "../lib/legal";

export const metadata: Metadata = {
  title: "Política de privacidad | Innovate Academy",
  description:
    "Cómo tratamos los datos personales en Innovate Academy: finalidades, bases jurídicas, conservación y derechos.",
};

export default function Privacidad() {
  return (
    <LegalLayout
      title="Política de privacidad"
      current="/privacidad"
      intro="Esta política explica qué datos personales tratamos cuando usas la web, te inscribes en un curso, nos escribes o te postulas, y cómo puedes ejercer tus derechos."
    >
      <LegalSection title="1. Responsable del tratamiento">
        <p>
          El responsable del tratamiento es{" "}
          <strong className="text-foreground">{titularLegal}</strong>
          {LEGAL_INFO.nif ? `, NIF ${LEGAL_INFO.nif}` : ""}
          {LEGAL_INFO.domicilio ? `, con domicilio en ${LEGAL_INFO.domicilio}` : ""}
          . Puedes contactar en materia de privacidad en{" "}
          <a
            href={`mailto:${LEGAL_INFO.emailPrivacidad}`}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.emailPrivacidad}
          </a>
          . No hay delegado de protección de datos.
        </p>
      </LegalSection>

      <LegalSection title="2. Qué datos tratamos y para qué">
        <p>
          Tratamos los datos que nos facilitas al matricularte, contactar con
          nosotros o postularte, y los datos técnicos necesarios para que la Web
          funcione. No almacenamos números de tarjeta: el pago se gestiona por el
          medio indicado en la ficha del curso y en el correo de confirmación.
        </p>
        <LegalTable
          columns={["Finalidad", "Datos", "Base jurídica", "Conservación"]}
          rows={[
            [
              "Gestionar la inscripción y la prestación del curso",
              "Nombre, correo electrónico, foto de perfil de Google, curso, estado de la matrícula y progreso",
              "Ejecución del contrato (art. 6.1.b RGPD)",
              "Mientras dure la relación y los plazos legales posteriores",
            ],
            [
              "Facturación y obligaciones fiscales",
              "Datos de facturación",
              "Obligación legal (art. 6.1.c RGPD)",
              "Plazos legales aplicables",
            ],
            [
              "Atender consultas y reclamaciones",
              "Nombre, correo y mensaje",
              "Contrato o interés legítimo (art. 6.1.b y 6.1.f RGPD)",
              "1 año desde el cierre de la consulta",
            ],
            [
              "Gestionar candidaturas de colaboradores",
              "Nombre, correo y área de interés",
              "Medidas precontractuales y consentimiento",
              "12 meses si no se selecciona",
            ],
            [
              "Enviar novedades, solo si lo autorizas",
              "Correo electrónico",
              "Consentimiento (art. 6.1.a RGPD), que puedes retirar",
              "Hasta que te des de baja",
            ],
            [
              "Seguridad y prevención del fraude",
              "Registros técnicos de acceso y uso",
              "Interés legítimo (art. 6.1.f RGPD)",
              "Entre 6 y 12 meses",
            ],
            [
              "Acceso con Google",
              "Identificador de Google, nombre, correo y foto de perfil",
              "Ejecución del contrato",
              "Mientras exista tu cuenta en la Web",
            ],
          ]}
        />
        <LegalNote>
          La inscripción en un curso se envía desde la Web y queda registrada con
          estado «En espera» hasta que el equipo la activa. Para gestionarla
          usamos Google Sheets y enviamos avisos por Gmail. Puedes consultar el
          detalle de cookies y almacenamiento en la{" "}
          <Link
            href="/cookies"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            Política de cookies
          </Link>
          .
        </LegalNote>
      </LegalSection>

      <LegalSection title="3. Menores de edad">
        <p>
          Los menores de 14 años solo pueden participar con el consentimiento de
          su padre, madre o tutor legal, que también ejerce sus derechos. Los
          mayores de 14 pueden dar su consentimiento para el tratamiento de sus
          datos, y recomendamos que su representante legal contrate y pague. No
          publicamos imágenes, nombres ni trabajos de menores sin autorización
          expresa del representante legal.
        </p>
        <p>
          Puedes consultar las condiciones que aplicamos en la página{" "}
          <Link
            href="/familias"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            Familias
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="4. Destinatarios y encargados del tratamiento">
        <p>
          Para prestar el servicio compartimos datos con proveedores que actúan
          por nuestra cuenta y con las garantías del artículo 28 del RGPD:
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-foreground">Google</strong> (Google
              Sign-In, Gmail, Google Meet y Google Sheets/Apps Script) para el
              acceso, las comunicaciones, las clases y la gestión de
              inscripciones.
            </>,
            <>
              <strong className="text-foreground">Supabase</strong> para la base
              de datos donde se alojan los cursos.
            </>,
            <>
              <strong className="text-foreground">Vercel</strong> para el
              alojamiento de la Web.
            </>,
          ]}
        />
        <p>
          También podemos comunicar datos a las administraciones públicas cuando
          la ley lo exija. No vendemos datos personales ni los cedemos a terceros
          para publicidad.
        </p>
      </LegalSection>

      <LegalSection title="5. Transferencias internacionales">
        <p>
          Algunos proveedores pueden tratar datos fuera del Espacio Económico
          Europeo. Se amparan en las garantías que cada proveedor ofrece, como
          decisiones de adecuación (por ejemplo, el Marco de Privacidad de Datos
          UE-EE. UU. cuando resulte aplicable) o cláusulas contractuales tipo
          aprobadas por la Comisión Europea. Puedes solicitar más información
          escribiendo al correo de privacidad.
        </p>
      </LegalSection>

      <LegalSection title="6. Tus derechos">
        <p>
          Puedes solicitar acceso, rectificación, supresión, oposición,
          limitación y portabilidad escribiendo a{" "}
          <a
            href={`mailto:${LEGAL_INFO.emailPrivacidad}`}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.emailPrivacidad}
          </a>
          , indicando qué derecho ejerces y acreditando tu identidad. El ejercicio
          es gratuito y responderemos en el plazo máximo de un mes, ampliable en
          casos complejos con aviso al interesado. Cuando el tratamiento se base
          en tu consentimiento, puedes retirarlo en cualquier momento sin que ello
          afecte a la licitud del tratamiento anterior.
        </p>
        <p>
          Si crees que no hemos tratado bien tus datos, puedes reclamar ante la
          Agencia Española de Protección de Datos, en{" "}
          <a
            href="https://www.aepd.es"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            www.aepd.es
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="7. Seguridad">
        <p>
          Aplicamos medidas técnicas y organizativas razonables: conexiones
          cifradas mediante HTTPS, cookie de sesión httpOnly que no es accesible
          desde JavaScript, control de acceso por roles, copias de seguridad y
          registro de las acciones sensibles. Si se produce una brecha de
          seguridad con riesgo para las personas, la notificaremos a la AEPD sin
          demora y, cuando sea posible, en un plazo de 72 horas, e informaremos a
          las personas afectadas si el riesgo es alto.
        </p>
      </LegalSection>

      <LegalSection title="8. Conservación">
        <p>
          Conservamos los datos durante el tiempo indicado en la tabla anterior y,
          después, durante los plazos legales aplicables. Cuando dejan de ser
          necesarios, se suprimen o se anonimizan de forma segura.
        </p>
      </LegalSection>

      <LegalSection title="9. Cambios en esta política">
        <p>
          Si modificamos esta política, publicaremos la nueva versión con su
          fecha. La versión vigente es la que aparece publicada en esta página.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
