import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalLayout,
  LegalList,
  LegalNote,
  LegalSection,
} from "../components/LegalLayout";
import { LEGAL_INFO, titularLegal } from "../lib/legal";

export const metadata: Metadata = {
  title: "Desistimiento y reembolsos | Innovate Academy",
  description:
    "Derecho de desistimiento de 14 días, reembolsos y formulario modelo para cancelar un curso de Innovate Academy.",
};

const ASUNTO = "Desistimiento de contrato - Innovate Academy";
const CUERPO = `A la atención de ${titularLegal}${
  LEGAL_INFO.domicilio ? `, ${LEGAL_INFO.domicilio}` : ""
}, ${LEGAL_INFO.email}:

Por la presente le comunico que desisto de mi contrato de prestación del siguiente servicio:

Curso y cohorte:
Contratado el (fecha):
Nombre del consumidor:
Domicilio del consumidor:
Correo electrónico:
Fecha:`;

const MAILTO = `mailto:${LEGAL_INFO.email}?subject=${encodeURIComponent(
  ASUNTO
)}&body=${encodeURIComponent(CUERPO)}`;

export default function Desistimiento() {
  return (
    <LegalLayout
      title="Política de desistimiento y reembolso"
      current="/desistimiento"
      intro="Tienes derecho a desistir del contrato en un plazo de 14 días naturales sin indicar el motivo. Aquí tienes el plazo, la forma de ejercerlo y cómo se calcula la devolución."
    >
      <LegalSection title="1. Derecho de desistimiento">
        <p>
          Tienes derecho a desistir de este contrato en un plazo de 14 días
          naturales sin indicar el motivo. El plazo empieza el día en que se
          celebra el contrato, es decir, cuando completas el pago y confirmamos
          tu matrícula.
        </p>
      </LegalSection>

      <LegalSection title="2. Cómo ejercerlo">
        <p>
          Escribe a{" "}
          <a
            href={`mailto:${LEGAL_INFO.email}`}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.email}
          </a>{" "}
          indicando tu decisión, o utiliza el formulario modelo que encontrarás
          más abajo. También puedes enviar tu solicitud desde el{" "}
          <Link
            href="/soporte"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            formulario de soporte
          </Link>{" "}
          con el asunto «Desistimiento». Te enviaremos un acuse de recibo sin
          demora.
        </p>
        <a
          href={MAILTO}
          className="inline-flex rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          Desistir del contrato por correo
        </a>
      </LegalSection>

      <LegalSection title="3. Efectos">
        <p>
          Te devolveremos todos los pagos recibidos, sin demora indebida y como
          máximo en 14 días naturales desde que nos comuniques tu decisión, por el
          mismo medio de pago que usaste. No se te cobrará ninguna penalización.
        </p>
      </LegalSection>

      <LegalSection title="4. Si el curso ya ha empezado">
        <p>
          Al matricularte solicitas que el curso comience en la fecha de inicio de
          la cohorte. Si desistes cuando ya ha empezado, deberás pagar la parte
          proporcional a lo prestado hasta que nos comunicas el desistimiento.
        </p>
        <LegalNote>
          <strong className="text-foreground">Cálculo:</strong> importe pagado ×
          sesiones restantes ÷ sesiones totales. Ejemplo ilustrativo: curso de
          90,00 € con 16 sesiones y 4 ya impartidas → devolución de 67,50 €. Si
          desistes antes del inicio, se devuelve el 100 %.
        </LegalNote>
      </LegalSection>

      <LegalSection title="5. Servicio completamente ejecutado">
        <p>
          Perderías el derecho de desistimiento solo si el servicio se ha
          ejecutado por completo con tu consentimiento previo y expreso. Como los
          cursos duran varios meses, esto solo ocurriría al terminar el curso.
        </p>
      </LegalSection>

      <LegalSection title="6. Reembolsos fuera del plazo de 14 días">
        <p>
          Fuera del plazo legal de desistimiento no procede reembolso, salvo
          cancelación por parte de la academia o causa de fuerza mayor. Podemos
          valorar, caso por caso, un cambio a otra cohorte cuando exista una
          circunstancia justificada y la plaza lo permita; ese cambio no genera un
          derecho automático al reembolso.
        </p>
      </LegalSection>

      <LegalSection title="7. Cancelación por la academia">
        <p>
          Si cancelamos la cohorte, devolvemos el importe íntegro o puedes pasar
          a otra cohorte, a tu elección.
        </p>
      </LegalSection>

      <LegalSection title="8. Modelo de formulario de desistimiento">
        <p>
          Cumplimenta y envía este formulario únicamente si deseas desistir del
          contrato. Puedes copiarlo en un correo electrónico.
        </p>
        <div className="rounded-lg border border-border bg-panel p-5 text-xs leading-relaxed">
          <p>
            A la atención de {titularLegal}
            {LEGAL_INFO.domicilio ? `, ${LEGAL_INFO.domicilio}` : ""},{" "}
            {LEGAL_INFO.email}:
          </p>
          <p className="mt-3">
            Por la presente le comunico que desisto de mi contrato de prestación
            del siguiente servicio:
          </p>
          <LegalList
            items={[
              "Curso y cohorte: ______________________________________",
              "Contratado el: ____ / ____ / ________",
              "Nombre del consumidor: ______________________________",
              "Domicilio del consumidor: ____________________________",
              "Correo electrónico: __________________________________",
              "Fecha: ____ / ____ / ________",
            ]}
          />
          <p className="mt-3">
            Firma (solo si se presenta en papel):
            ______________________________
          </p>
        </div>
      </LegalSection>

      <LegalSection title="9. Contacto">
        <p>
          Para cualquier duda sobre el desistimiento o un reembolso, escribe a{" "}
          <a
            href={`mailto:${LEGAL_INFO.email}`}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.email}
          </a>
          . Responderemos en un plazo máximo de 10 días hábiles.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
