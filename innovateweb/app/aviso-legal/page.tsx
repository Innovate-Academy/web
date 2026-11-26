import type { Metadata } from "next";
import {
  LegalLayout,
  LegalList,
  LegalSection,
} from "../components/LegalLayout";
import { LEGAL_INFO, titularLegal } from "../lib/legal";

export const metadata: Metadata = {
  title: "Aviso legal | Innovate Academy",
  description:
    "Información legal del titular de Innovate Academy y condiciones de uso del sitio web.",
};

export default function AvisoLegal() {
  return (
    <LegalLayout
      title="Aviso legal"
      current="/aviso-legal"
      intro="Información sobre el titular de este sitio web y las reglas básicas de uso, conforme al artículo 10 de la LSSI-CE."
    >
      <LegalSection title="1. Titular del sitio web">
        <p>
          En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de
          servicios de la sociedad de la información y de comercio electrónico
          (LSSI-CE), se informa de que el titular del sitio web{" "}
          <a
            href={LEGAL_INFO.web}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.web}
          </a>{" "}
          (en adelante, la «Web») es:
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-foreground">Nombre comercial:</strong>{" "}
              {LEGAL_INFO.nombreComercial}
            </>,
            ...(LEGAL_INFO.titular
              ? [
                  <>
                    <strong className="text-foreground">
                      Nombre o denominación social:
                    </strong>{" "}
                    {titularLegal}
                  </>,
                ]
              : []),
            ...(LEGAL_INFO.nif
              ? [
                  <>
                    <strong className="text-foreground">NIF:</strong>{" "}
                    {LEGAL_INFO.nif}
                  </>,
                ]
              : []),
            ...(LEGAL_INFO.domicilio
              ? [
                  <>
                    <strong className="text-foreground">Domicilio:</strong>{" "}
                    {LEGAL_INFO.domicilio}
                  </>,
                ]
              : []),
            <>
              <strong className="text-foreground">
                Correo electrónico de contacto:
              </strong>{" "}
              <a
                href={`mailto:${LEGAL_INFO.email}`}
                className="font-semibold text-brand hover:text-brand-hover"
              >
                {LEGAL_INFO.email}
              </a>
            </>,
            <>
              <strong className="text-foreground">Actividad:</strong> formación
              en programación y tecnología impartida en línea.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection title="2. Objeto">
        <p>
          La Web da información sobre los cursos de Innovate Academy y permite
          solicitar la inscripción en ellos. El acceso y uso de la Web atribuye
          la condición de usuario e implica la aceptación de este Aviso Legal,
          sin perjuicio de las Condiciones de contratación y de la Política de
          privacidad, que también resultan aplicables.
        </p>
      </LegalSection>

      <LegalSection title="3. Uso de la Web">
        <p>
          El usuario se compromete a usar la Web de forma lícita, sin dañar su
          funcionamiento ni los derechos de terceros, y a no suplantar la
          identidad de otras personas. Queda prohibido intentar acceder a áreas
          restringidas, alterar la seguridad del sitio o introducir código
          malicioso.
        </p>
      </LegalSection>

      <LegalSection title="4. Propiedad intelectual e industrial">
        <p>
          Los textos, materiales, diseño, logotipos y demás contenidos de la Web
          pertenecen a {titularLegal} o a terceros que han autorizado su uso.
          Queda prohibida su reproducción, distribución o transformación sin
          autorización, salvo lo permitido por la ley. Los nombres y logotipos
          de terceros pertenecen a sus titulares.
        </p>
      </LegalSection>

      <LegalSection title="5. Enlaces y servicios de terceros">
        <p>
          La Web utiliza servicios de terceros necesarios para su
          funcionamiento: Google (inicio de sesión con Google, correo
          electrónico, Google Meet y Google Sheets para la gestión de
          inscripciones), Supabase (base de datos de cursos) y Vercel
          (alojamiento). También puede enlazar a redes sociales u otros sitios.
          Innovate Academy no controla ni responde de los contenidos o políticas
          de esos servicios, que se rigen por sus propias condiciones.
        </p>
      </LegalSection>

      <LegalSection title="6. Responsabilidad">
        <p>
          Innovate Academy procura que la información de la Web sea exacta y esté
          actualizada, pero no garantiza la disponibilidad permanente del sitio
          ni la ausencia de errores. Esta cláusula no limita los derechos que la
          ley reconoce a los consumidores y usuarios.
        </p>
      </LegalSection>

      <LegalSection title="7. Legislación y jurisdicción">
        <p>
          Este Aviso Legal se rige por la legislación española. Si el usuario es
          consumidor, podrá acudir a los juzgados y tribunales de su domicilio
          conforme a la normativa de consumidores y usuarios.
        </p>
      </LegalSection>

      <LegalSection title="8. Contacto">
        <p>
          Para cualquier consulta relacionada con este Aviso Legal puedes
          escribir a{" "}
          <a
            href={`mailto:${LEGAL_INFO.email}`}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.email}
          </a>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
