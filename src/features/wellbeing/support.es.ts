/**
 * Spanish text for the check-in's topics and resources. Links and phone numbers come from
 * support.ts; only what people read changes here.
 *
 * Spanish-language options (988 press 2 / text AYUDA, Crisis Text Line "HOLA") were current
 * when written. Check them before launch, as with the English numbers.
 */
import type { Resource, ResourceId, Topic, TopicId } from "./support";

export type TopicText = Pick<Topic, "label" | "message" | "ideas">;
export type ResourceText = Pick<Resource, "name" | "description" | "hours" | "actions">;

export const TOPIC_TEXT_ES: Record<TopicId, TopicText> = {
  grief: {
    label: "Duelo o pérdida",
    message:
      "Siento mucho tu pérdida. El duelo puede ser abrumador y no hay una forma correcta de sentirse. No tienes que cargarlo a solas.",
    ideas: [
      "Busca a alguien de confianza y cuéntale cómo estás.",
      "Sé amable contigo. Descansa, come y toma agua cuando puedas.",
      "Hablar con un consejero de duelo o un grupo de apoyo puede ayudar mucho.",
    ],
  },
  stress: {
    label: "Estrés o presión",
    message: "Eso suena como mucho que manejar. Tiene sentido que te sientas agotado.",
    ideas: [
      "Elige una sola cosa pequeña para hacer ahora, y deja que lo demás espere.",
      "Respira lento unas cuantas veces: inhala en 4, sostén en 4, exhala en 6.",
      "Una caminata corta o una taza de té caliente le pueden dar un respiro a tu mente.",
    ],
  },
  lonely: {
    label: "Me siento solo/a",
    message: "Sentirse solo es muy difícil, y mucha gente lo siente más de lo que dice. Me alegra que lo compartieras.",
    ideas: [
      "Mándale un mensaje corto a alguien, aunque sea “pensando en ti”.",
      "Pasa un rato en algún lugar con otras personas, como un café, una biblioteca o un parque.",
    ],
  },
  anxious: {
    label: "Ansiedad o preocupación",
    message: "La ansiedad puede hacer que todo se sienta urgente y pesado. No estás solo en esto.",
    ideas: [
      "Prueba anclarte: nombra 5 cosas que ves, 4 que oyes y 3 que puedes tocar.",
      "Exhala despacio, más tiempo del que inhalas.",
    ],
  },
  down: {
    label: "Triste o desanimado/a",
    message: "Siento que te sientas mal. Lo que sientes importa, y está bien pedir apoyo.",
    ideas: [
      "Cuéntale a alguien de confianza cómo te sientes hoy.",
      "Haz algo pequeño y amable por ti, como bañarte, comer algo o tomar aire fresco.",
    ],
  },
  other: {
    label: "Otra cosa",
    message: "Gracias por contármelo. Pase lo que pase, mereces apoyo.",
    ideas: ["Hablarlo con alguien, un amigo o un consejero, puede hacerlo sentir más ligero."],
  },
};

export const RESOURCE_TEXT_ES: Record<ResourceId, ResourceText> = {
  "988": {
    name: "988 Línea de Prevención del Suicidio y Crisis",
    description:
      "Apoyo gratuito y confidencial de un consejero capacitado, con atención en español. No tienes que estar en crisis para llamar: también ayudan con el duelo, el estrés y los días difíciles.",
    hours: "24/7",
    actions: [
      { label: "Llamar al 988 y oprimir 2", href: "tel:988" },
      { label: "Enviar AYUDA al 988", href: "sms:988" },
      { label: "Chat en español", href: "https://988lineadevida.org/" },
    ],
  },
  "crisis-text": {
    name: "Crisis Text Line",
    description: "Envía HOLA al 741741 para hablar por mensaje de texto con un consejero de crisis capacitado, en español.",
    hours: "24/7",
    actions: [{ label: "Enviar HOLA al 741741", href: "sms:741741" }],
  },
  nami: {
    name: "Línea de ayuda de NAMI",
    description:
      "Información, apoyo y referencias de salud mental de la Alianza Nacional de Enfermedades Mentales (NAMI).",
    hours: "Lun–vie, 10 am–10 pm hora del Este",
    actions: [
      { label: "Llamar al 1-800-950-6264", href: "tel:18009506264" },
      { label: "Enviar “helpline” al 62640", href: "sms:62640" },
    ],
  },
  griefshare: {
    name: "GriefShare",
    description: "Encuentra un grupo de apoyo para el duelo cerca de ti o en línea, guiado por personas que entienden la pérdida.",
    hours: "Los grupos se reúnen cada semana",
    actions: [{ label: "Buscar un grupo", href: "https://www.griefshare.org/findagroup" }],
  },
  emergency: {
    name: "Servicios de emergencia",
    description: "Si tú u otra persona están en peligro inmediato, llama al 911 o ve a la sala de emergencias más cercana.",
    hours: "24/7",
    actions: [{ label: "Llamar al 911", href: "tel:911" }],
  },
  international: {
    name: "¿Fuera de EE. UU.?",
    description: "Encuentra una línea de ayuda gratuita en tu país.",
    hours: "Varía",
    actions: [{ label: "Buscar una línea de ayuda", href: "https://findahelpline.com" }],
  },
};
