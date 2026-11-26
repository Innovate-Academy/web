import type { Metadata } from "next";
import Link from "next/link";
import {
  LegalLayout,
  LegalNote,
  LegalSection,
} from "../components/LegalLayout";
import { LEGAL_INFO, titularLegal } from "../lib/legal";

export const metadata: Metadata = {
  title: "Términos y servicios | Innovate Academy",
  description:
    "Condiciones generales de contratación y uso de los cursos de Innovate Academy.",
};

export default function TerminosServicios() {
  return (
    <LegalLayout
      title="Condiciones generales de contratación y uso"
      current="/terminos-servicios"
      intro="Estas condiciones regulan la solicitud de inscripción, la contratación y el desarrollo de los cursos de Innovate Academy."
    >
      <LegalSection title="1. Prestador">
        <p>
          Los cursos son prestados por{" "}
          <strong className="text-foreground">{titularLegal}</strong>
          {LEGAL_INFO.nif ? `, NIF ${LEGAL_INFO.nif}` : ""}
          {LEGAL_INFO.domicilio ? `, con domicilio en ${LEGAL_INFO.domicilio}` : ""}
          . Puedes contactar en{" "}
          <a
            href={`mailto:${LEGAL_INFO.email}`}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.email}
          </a>
          . Los datos completos del titular están en el{" "}
          <Link
            href="/aviso-legal"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            Aviso legal
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="2. Objeto">
        <p>
          Estas condiciones regulan la contratación de cursos de formación en
          línea impartidos en directo por Google Meet, con material y
          seguimiento, organizados en cohortes (grupos con fechas concretas).
          La información de cada ficha forma parte del contrato.
        </p>
      </LegalSection>

      <LegalSection title="3. Información del curso">
        <p>
          Cada ficha indica contenidos, nivel, duración, calendario, requisitos,
          programas necesarios, profesor y precio. La información de la ficha en
          el momento de la compra forma parte del contrato. Si existe alguna
          contradicción entre la ficha y estas condiciones, prevalece lo que la
          ficha indique de forma más específica y favorable al consumidor.
        </p>
      </LegalSection>

      <LegalSection title="4. Requisitos">
        <p>
          El alumno necesita un ordenador, conexión a internet y los programas
          indicados en la ficha. Para menores de edad se aplica la cláusula 11.
        </p>
      </LegalSection>

      <LegalSection title="5. Proceso de contratación">
        <p>
          El proceso es el siguiente: (1) eliges el curso; (2) accedes con tu
          cuenta de Google; (3) envías la solicitud de inscripción desde la Web;
          (4) el equipo confirma por correo la disponibilidad de plaza y el medio
          de pago; (5) realizas el pago por el medio indicado; y (6) recibes la
          confirmación y la plaza queda activada.
        </p>
        <LegalNote>
          El envío del formulario de la Web es una solicitud de inscripción y no
          genera por sí solo una obligación de pago. La obligación nace cuando el
          equipo confirma la plaza y el medio de pago, y tú aceptas esas
          condiciones. Mientras no se confirme el pago, la plaza no está
          garantizada.
        </LegalNote>
        <p>
          Antes de pagar puedes revisar y corregir tus datos. Recibirás
          confirmación por correo electrónico. El contrato se formaliza en
          español y puedes consultar el estado de tu matrícula en tu panel de
          cursos.
        </p>
      </LegalSection>

      <LegalSection title="6. Precio y pago">
        <p>
          El precio total incluye los impuestos aplicables y se indica en la ficha
          y en el resumen del pedido, en la moneda mostrada. Salvo que la ficha
          indique otra cosa, el pago es único por el curso completo. Los medios de
          pago son los que se indiquen en la ficha y en el correo de confirmación.
          No almacenamos datos de tarjeta: cuando se habilite una pasarela de pago
          en línea, será un proveedor de pagos quien procese esos datos.
        </p>
        <p>
          La plaza se confirma cuando se verifica el pago. Si el pago no se
          completa en el plazo indicado, la solicitud puede cancelarse sin
          penalización y la plaza quedar disponible para otra persona.
        </p>
      </LegalSection>

      <LegalSection title="7. Plazas, inicio y cancelación por la academia">
        <p>
          Las plazas son limitadas y no se admiten incorporaciones una vez
          iniciada la cohorte, salvo que el equipo lo autorice expresamente. Cada
          cohorte puede exigir un número mínimo de alumnos. Si no se alcanza ese
          mínimo o la cohorte se cancela, devolveremos el importe íntegro o te
          ofreceremos pasar a otra cohorte, a tu elección.
        </p>
      </LegalSection>

      <LegalSection title="8. Desarrollo del curso">
        <p>
          Las clases son en directo por Google Meet, normalmente dos sesiones
          semanales de 60 minutos, salvo que la ficha indique otra cosa. Los
          cambios de horario se avisarán con antelación razonable y las sesiones
          canceladas se reprogramarán. Las sesiones se graban para que puedas
          repasarlas; el uso de las grabaciones es personal y no puede
          difundirse.
        </p>
        <p>
          El curso incluye un proyecto final. Al terminar con aprovechamiento se
          entrega un certificado propio de Innovate Academy que acredita la
          formación recibida; no es un título oficial ni equivale a un título del
          sistema educativo. No garantizamos resultados laborales.
        </p>
      </LegalSection>

      <LegalSection title="9. Desistimiento y reembolsos">
        <p>
          Tienes derecho a desistir en 14 días naturales conforme a la{" "}
          <Link
            href="/desistimiento"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            Política de desistimiento y reembolso
          </Link>
          , que forma parte de estas condiciones. Allí se explican el plazo, la
          forma de ejercerlo, los efectos y el cálculo de la devolución si el
          curso ya ha empezado.
        </p>
      </LegalSection>

      <LegalSection title="10. Conducta del alumno">
        <p>
          El alumno se compromete a respetar a profesores y compañeros, no
          compartir enlaces privados de clase, no suplantar identidades y cumplir
          las normas de la comunidad. Ante un incumplimiento grave, el titular
          podrá suspender o dar de baja al alumno; en ese caso se devolverá la
          parte proporcional correspondiente a las sesiones no prestadas, salvo
          daños acreditados.
        </p>
      </LegalSection>

      <LegalSection title="11. Menores de edad">
        <p>
          Los menores de 18 años solo pueden matricularse con la intervención de
          su padre, madre o tutor legal, que contrata, paga y acepta estas
          condiciones, y consiente el tratamiento de datos de los menores de 14
          años. Se aplican las reglas de comunicación y protección descritas en la
          página{" "}
          <Link
            href="/familias"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            Familias
          </Link>
          .
        </p>
      </LegalSection>

      <LegalSection title="12. Propiedad intelectual">
        <p>
          El material del curso es de uso personal del alumno. Está prohibido
          copiarlo, difundirlo o revenderlo. Los proyectos que cree el alumno son
          suyos; solo se mostrarán públicamente con su autorización y, si es
          menor, con la de su tutor.
        </p>
      </LegalSection>

      <LegalSection title="13. Protección de datos">
        <p>
          El tratamiento de datos se rige por la{" "}
          <Link
            href="/privacidad"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            Política de privacidad
          </Link>
          . Puedes ejercer tus derechos en{" "}
          <a
            href={`mailto:${LEGAL_INFO.emailPrivacidad}`}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.emailPrivacidad}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection title="14. Responsabilidad">
        <p>
          El titular responde conforme a la ley. Nada en estas condiciones limita
          los derechos que la normativa reconoce a los consumidores y usuarios.
        </p>
      </LegalSection>

      <LegalSection title="15. Modificaciones">
        <p>
          Las modificaciones de estas condiciones se aplican a contratos futuros.
          Cada contrato se rige por las condiciones aceptadas en el momento de la
          compra.
        </p>
      </LegalSection>

      <LegalSection title="16. Reclamaciones">
        <p>
          Puedes escribir a{" "}
          <a
            href={`mailto:${LEGAL_INFO.email}`}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.email}
          </a>{" "}
          y responderemos en un plazo máximo de 10 días hábiles. Puedes solicitar
          la hoja de reclamaciones correspondiente conforme a la normativa de la
          comunidad autónoma donde radica el titular. También puedes acudir a la
          oficina de consumo de tu localidad o comunidad autónoma.
        </p>
        <p>
          Salvo que se indique expresamente lo contrario, Innovate Academy no
          está adherida al Sistema Arbitral de Consumo. Tampoco incluimos enlace
          a la plataforma europea de resolución de litigios en línea, suprimida
          por el Reglamento (UE) 2024/3228.
        </p>
      </LegalSection>

      <LegalSection title="17. Ley aplicable y jurisdicción">
        <p>
          Estas condiciones se rigen por la legislación española. Si eres
          consumidor, puedes acudir a los tribunales de tu domicilio.
        </p>
      </LegalSection>

      <LegalSection title="18. Contacto">
        <p>
          Para cualquier duda sobre estas condiciones, escribe a{" "}
          <a
            href={`mailto:${LEGAL_INFO.email}`}
            className="font-semibold text-brand hover:text-brand-hover"
          >
            {LEGAL_INFO.email}
          </a>{" "}
          o utiliza el{" "}
          <Link
            href="/soporte"
            className="font-semibold text-brand hover:text-brand-hover"
          >
            formulario de soporte
          </Link>
          .
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
