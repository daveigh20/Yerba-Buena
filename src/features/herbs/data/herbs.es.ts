import type { HerbProfile } from "../types";
import type { HerbId } from "./herbs";

/** The parts of an herb profile that change with language. */
export type HerbText = Pick<HerbProfile, "name" | "aliases" | "partsUsed" | "flavor" | "description" | "howToUse" | "cautions" | "remedyNote">;

const CAFFEINE = "Contiene cafeína. Limítala más tarde en el día si afecta tu sueño.";
const DAISY_FAMILY =
  "Evita esta hierba si tienes alergia a plantas de la familia de las margaritas (ambrosía, crisantemos, caléndulas, margaritas).";
const GUIDED_ONLY =
  "No incluimos un remedio casero para esta hierba. Por lo general se toma como producto estandarizado con la orientación de un profesional de la salud.";
const SUPPLEMENT = "Por lo general se toma como suplemento estandarizado. Sigue la etiqueta y los consejos de tu proveedor de salud.";

/**
 * Spanish text for every herb. Aliases are Spanish names people might search for; the English
 * name and aliases are added automatically, so searching in either language works.
 */
export const HERB_TEXT_ES: Record<HerbId, HerbText> = {
  artichoke: {
    name: "Alcachofa",
    aliases: ["alcaucil", "hoja de alcachofa"],
    partsUsed: ["Hoja"],
    flavor: "Amargo y terroso",
    description:
      "Además de la conocida verdura, las hojas de alcachofa se han usado por mucho tiempo como hierba amarga digestiva. Tradicionalmente se toman para apoyar el hígado y la vesícula, y para ayudar a digerir comidas pesadas y grasosas.",
    howToUse:
      "Deja reposar 1 cucharadita de hoja seca de alcachofa en 1 taza de agua recién hervida por 10 minutos. Es bastante amarga, así que mucha gente la mezcla con menta o le agrega miel.",
    cautions: [DAISY_FAMILY, "Habla primero con tu médico si tienes cálculos biliares o una obstrucción de las vías biliares."],
  },
  beetroot: {
    name: "Betabel",
    aliases: ["remolacha", "betarraga", "betabeles"],
    partsUsed: ["Raíz"],
    flavor: "Terroso y dulce",
    description:
      "El betabel es rico en nitratos, que el cuerpo convierte en óxido nítrico, una molécula que ayuda a relajar los vasos sanguíneos. Por eso el jugo de betabel es popular entre deportistas antes de entrenar.",
    howToUse:
      "Tómalo como jugo fresco, licúalo en batidos o usa betabel en polvo (alrededor de 1 cucharadita) mezclado en agua o té.",
    cautions: [
      "El betabel puede teñir la orina o las heces de rosa o rojo. Es inofensivo.",
      "Tiene mucho oxalato. Si tiendes a tener piedras en los riñones, come porciones moderadas.",
    ],
  },
  bilberry: {
    name: "Arándano europeo",
    aliases: ["mirtilo", "arándano azul", "ráspano"],
    partsUsed: ["Baya", "Hoja"],
    flavor: "Ácido y afrutado",
    description:
      "Pariente europeo pequeño y oscuro del arándano azul, el mirtilo está lleno de antocianinas, los pigmentos de su color azul intenso. Tradicionalmente se asocia con la salud de los ojos y la visión nocturna.",
    howToUse:
      "Hierve a fuego lento 1 cucharada de bayas secas en 1½ tazas de agua por 10 minutos, o come las bayas frescas o congeladas.",
    cautions: [
      "No se recomienda usar la hoja de mirtilo por largo tiempo.",
      "Puede afectar el azúcar en la sangre y la coagulación. Consulta a tu médico si tomas medicina para la diabetes o anticoagulantes.",
    ],
  },
  "black-cohosh": {
    name: "Cohosh negro",
    aliases: ["cimicífuga", "hierba de la chinche"],
    partsUsed: ["Raíz", "Rizoma"],
    flavor: "Amargo",
    description:
      "Planta de los bosques de Norteamérica de la familia de los ranúnculos. El cohosh negro se usa sobre todo para síntomas de la menopausia, como bochornos y sudores nocturnos.",
    howToUse: SUPPLEMENT,
    cautions: [
      "Se han reportado casos raros de daño al hígado. Suspéndelo y busca atención médica si notas orina oscura, piel u ojos amarillos o dolor de estómago.",
      "No se debe usar durante el embarazo ni la lactancia.",
      "Habla con tu médico si tienes una condición sensible a las hormonas.",
    ],
    remedyNote: GUIDED_ONLY,
  },
  "black-tea": {
    name: "Té negro",
    aliases: ["té inglés", "assam", "darjeeling", "té de ceilán"],
    partsUsed: ["Hoja"],
    flavor: "Malteado, vivo e intenso",
    description:
      "El té negro se hace con hojas de la planta del té totalmente oxidadas, lo que le da un color más oscuro y un sabor más fuerte que el té verde o blanco. Es rico en polifenoles llamados teaflavinas y es el té común con más cafeína.",
    howToUse: "Deja reposar 1 cucharadita de hojas (o 1 bolsita) en 1 taza de agua hirviendo por 3–5 minutos.",
    cautions: [
      CAFFEINE,
      "El té puede reducir la absorción del hierro de los alimentos. Si tienes el hierro bajo, tómalo entre comidas y no con ellas.",
    ],
  },
  "black-walnut": {
    name: "Nogal negro",
    aliases: ["nuez negra", "cáscara de nuez"],
    partsUsed: ["Cáscara verde"],
    flavor: "Muy amargo y astringente",
    description:
      "Las cáscaras verdes de la nuez negra tienen muchos taninos y un compuesto llamado juglona. Tradicionalmente se han usado contra parásitos intestinales e infecciones de la piel por hongos.",
    howToUse: "Solo se usa como preparación comercial. Sigue la etiqueta y los consejos de tu proveedor de salud.",
    cautions: [
      "No se debe usar durante el embarazo ni la lactancia.",
      "Evítalo si tienes alergia a las nueces de árbol.",
      "Sus taninos fuertes pueden caer pesados al estómago.",
    ],
    remedyNote: GUIDED_ONLY,
  },
  chamomile: {
    name: "Manzanilla",
    aliases: ["camomila", "manzanilla alemana"],
    partsUsed: ["Flor"],
    flavor: "Suave, floral y con notas de manzana",
    description:
      "La manzanilla es uno de los tés de hierbas más populares del mundo. Sus florecitas, parecidas a margaritas, se han usado por siglos para relajarse, dormir y calmar el estómago.",
    howToUse:
      "Deja reposar 1 cucharada de flores secas (o 1 bolsita) en 1 taza de agua recién hervida, tapada, por 5–10 minutos.",
    cautions: [
      DAISY_FAMILY,
      "Puede interactuar con anticoagulantes como la warfarina y sumar a los efectos de los sedantes.",
    ],
  },
  chasteberry: {
    name: "Sauzgatillo",
    aliases: ["vitex", "árbol casto", "pimienta de monje"],
    partsUsed: ["Baya"],
    flavor: "Picante, como la pimienta",
    description:
      "El sauzgatillo es el fruto del árbol casto, un arbusto del Mediterráneo. Se usa principalmente para síntomas del síndrome premenstrual, como sensibilidad en los senos, y para ciclos menstruales irregulares.",
    howToUse: SUPPLEMENT,
    cautions: [
      "Puede interactuar con anticonceptivos hormonales, terapia hormonal y medicinas que afectan la dopamina.",
      "No se debe usar durante el embarazo ni la lactancia.",
    ],
    remedyNote: GUIDED_ONLY,
  },
  cinnamon: {
    name: "Canela",
    aliases: ["canela de ceilán", "casia"],
    partsUsed: ["Corteza"],
    flavor: "Cálido, dulce y especiado",
    description:
      "La canela es la corteza interna seca de varios árboles tropicales. Además de ser una especia favorita que calienta, se ha estudiado por su papel en el control del azúcar en la sangre.",
    howToUse:
      "Hierve a fuego lento 1 raja de canela en 1½ tazas de agua por 10 minutos, o agrega ¼ de cucharadita de canela molida al té, café o avena.",
    cautions: [
      "La casia, la canela más común en el supermercado, contiene cumarina, que puede dañar el hígado en grandes cantidades. Elige canela de Ceilán si la usas a diario.",
      "En grandes cantidades puede bajar el azúcar en la sangre. Ten cuidado si usas medicina para la diabetes.",
    ],
  },
  "dandelion-root": {
    name: "Raíz de diente de león",
    aliases: ["diente de león", "achicoria amarga"],
    partsUsed: ["Raíz", "Hoja"],
    flavor: "Amargo y terroso; la raíz tostada sabe a café",
    description:
      "Esta hierba común del jardín es una hierba amarga tradicional para el hígado y la digestión. Sus hojas son un diurético tradicional, y la raíz tostada es un sustituto del café sin cafeína muy popular.",
    howToUse:
      "Hierve a fuego lento 1 cucharada de raíz seca o tostada en 1½ tazas de agua por 10–15 minutos y luego cuela.",
    cautions: [
      DAISY_FAMILY,
      "Puede interactuar con diuréticos, litio y algunos antibióticos.",
      "Habla primero con tu médico si tienes problemas de la vesícula.",
    ],
  },
  echinacea: {
    name: "Equinácea",
    aliases: ["equinacea", "rudbeckia púrpura"],
    partsUsed: ["Raíz", "Flor", "Hoja"],
    flavor: "Terroso, con un cosquilleo en la lengua",
    description:
      "La equinácea es una flor silvestre de Norteamérica que mucha gente toma al primer síntoma de un resfriado. El cosquilleo en la lengua viene de compuestos llamados alquilamidas.",
    howToUse:
      "Hierve a fuego lento 1 cucharadita de raíz seca en 1 taza de agua por 10–15 minutos, o deja reposar 1–2 cucharaditas de flores y hojas secas en agua recién hervida por 10 minutos.",
    cautions: [
      DAISY_FAMILY,
      "Si tienes una enfermedad autoinmune o tomas medicinas que suprimen el sistema inmune, habla primero con tu médico.",
      "En general es para uso a corto plazo.",
    ],
  },
  elderberry: {
    name: "Saúco",
    aliases: ["sauco", "bayas de saúco", "sambucus"],
    partsUsed: ["Baya (cocida)", "Flor"],
    flavor: "Ácido, oscuro y afrutado",
    description:
      "Las bayas de saúco, de color morado oscuro, se han cocido por mucho tiempo en jarabes y tés durante la temporada de resfriados y gripe. Son ricas en antocianinas y vitamina C.",
    howToUse:
      "Siempre cocina las bayas. Hierve a fuego lento 1 cucharada de bayas secas en 1½ tazas de agua por 15 minutos, o prepara el jarabe de saúco de abajo.",
    cautions: [
      "Las bayas crudas o verdes, y las hojas, tallos y semillas, pueden causar náuseas, vómito y diarrea. Siempre cocina bien las bayas.",
      "Si tienes una enfermedad autoinmune o tomas medicinas que suprimen el sistema inmune, habla primero con tu médico.",
    ],
  },
  eucalyptus: {
    name: "Eucalipto",
    aliases: ["eucalipto azul", "ocalito"],
    partsUsed: ["Hoja"],
    flavor: "Fuerte, refrescante y alcanforado",
    description:
      "Las hojas de eucalipto están llenas de un compuesto aromático llamado eucaliptol (también conocido como 1,8-cineol). Respirar su aroma en vaporizaciones o ungüentos para el pecho es una forma clásica de despejar las vías respiratorias.",
    howToUse: "Se usa sobre todo en vaporizaciones (ver abajo). El té de hoja debe ser suave y ocasional.",
    cautions: [
      "Nunca tragues aceite esencial de eucalipto. Es venenoso aun en cantidades pequeñas.",
      "Mantén los vapores y aceites de eucalipto lejos de bebés y niños pequeños.",
      "Los aromas fuertes pueden provocar asma en algunas personas.",
    ],
  },
  fennel: {
    name: "Hinojo",
    aliases: ["semillas de hinojo", "anís dulce"],
    partsUsed: ["Semilla"],
    flavor: "Dulce, parecido al anís",
    description:
      "En muchas culturas se mastican semillas de hinojo después de comer para refrescar el aliento y aliviar los gases y la hinchazón. Las semillas también son un apoyo tradicional para la lactancia.",
    howToUse:
      "Machaca un poco 1 cucharadita de semillas y déjalas reposar en 1 taza de agua recién hervida, tapada, por 10 minutos.",
    cautions: [
      "No le des té de hinojo ni ningún té de hierbas a un bebé sin la aprobación de tu pediatra.",
      "Evita el uso concentrado o prolongado durante el embarazo.",
      "Evítalo si tienes alergia al apio, la zanahoria o la artemisa.",
    ],
  },
  fenugreek: {
    name: "Fenogreco",
    aliases: ["alholva", "methi"],
    partsUsed: ["Semilla", "Hoja"],
    flavor: "Amargo, con notas de nuez y de miel de maple",
    description:
      "El fenogreco es una especia común en la cocina del sur de Asia y Medio Oriente. Sus semillas se usan tradicionalmente para apoyar la producción de leche materna y se han estudiado para el control del azúcar en la sangre.",
    howToUse:
      "Machaca un poco 1 cucharadita de semillas y hiérvelas a fuego lento en 1½ tazas de agua por 10 minutos. Remojarlas la noche anterior suaviza el amargor.",
    cautions: [
      "No se debe usar durante el embarazo. Puede provocar contracciones.",
      "Puede bajar el azúcar en la sangre. Ten cuidado si usas medicina para la diabetes.",
      "Puede causar gases y hacer que el sudor y la orina huelan a miel de maple.",
      "Si tienes alergia al cacahuate o al garbanzo, también podrías reaccionar al fenogreco.",
    ],
  },
  ginger: {
    name: "Jengibre",
    aliases: ["raíz de jengibre", "kion"],
    partsUsed: ["Rizoma (raíz)"],
    flavor: "Picante, cálido y vivo",
    description:
      "El jengibre es una de las hierbas más estudiadas para las náuseas, incluido el mareo en viajes y las náuseas del embarazo. También es un básico de la cocina para la digestión, los resfriados y los dolores.",
    howToUse:
      "Hierve a fuego lento 4–5 rodajas delgadas de jengibre fresco en 1½ tazas de agua por 10 minutos. Déjalo más tiempo para un té más picante.",
    cautions: [
      "En grandes cantidades puede causar agruras o malestar estomacal.",
      "Habla con tu médico si tomas anticoagulantes.",
      "Si estás embarazada, pregunta a tu proveedor de salud cuánto es adecuado para ti.",
    ],
  },
  ginkgo: {
    name: "Ginkgo biloba",
    aliases: ["ginkgo", "árbol de los cuarenta escudos"],
    partsUsed: ["Hoja"],
    flavor: "Ligeramente amargo",
    description:
      "El ginkgo es una de las especies de árboles vivos más antiguas de la Tierra. Sus hojas en forma de abanico se han estudiado para la memoria y la circulación.",
    howToUse:
      "Por lo general se toma como extracto estandarizado de la hoja. También puedes dejar reposar 1 cucharadita de hoja seca en agua recién hervida por 10 minutos.",
    cautions: [
      "Puede aumentar el riesgo de sangrado. Evítalo si tomas anticoagulantes y suspéndelo antes de una cirugía.",
      "Nunca comas semillas de ginkgo crudas ni tostadas. Pueden ser venenosas.",
      "Puede causar dolor de cabeza, mareos o malestar estomacal.",
    ],
  },
  ginseng: {
    name: "Ginseng",
    aliases: ["ginseng coreano", "ginseng americano", "panax"],
    partsUsed: ["Raíz"],
    flavor: "Agridulce y terroso",
    description:
      "La raíz de ginseng ha sido muy valorada en la medicina china y coreana por miles de años. Se le conoce como adaptógeno y se toma para la energía, la resistencia y la agilidad mental.",
    howToUse:
      "Hierve a fuego lento 3–4 rodajas delgadas de raíz seca en 1½ tazas de agua por 15 minutos. Tómalo temprano en el día.",
    cautions: [
      "Puede afectar el azúcar en la sangre y la presión arterial.",
      "Puede interactuar con la warfarina, la medicina para la diabetes, los antidepresivos y los estimulantes.",
      "Puede dificultar el sueño. No se debe usar durante el embarazo.",
    ],
  },
  "green-tea": {
    name: "Té verde",
    aliases: ["sencha", "té pólvora"],
    partsUsed: ["Hoja"],
    flavor: "Fresco, herbáceo y vegetal",
    description:
      "El té verde se hace con hojas de té que se calientan poco después de cosecharse para detener la oxidación. Así conserva sus catequinas, sobre todo el EGCG. Es una de las bebidas más estudiadas del mundo.",
    howToUse:
      "Deja reposar 1 cucharadita de hojas en 1 taza de agua justo antes de hervir (unos 80 °C / 175 °F) por 2–3 minutos. El agua demasiado caliente lo amarga.",
    cautions: [
      CAFFEINE,
      "Los suplementos concentrados de extracto de té verde se han relacionado con daño al hígado. El té preparado se considera seguro en general.",
    ],
  },
  hawthorn: {
    name: "Espino blanco",
    aliases: ["tejocote", "majuelo", "baya de espino"],
    partsUsed: ["Baya", "Hoja", "Flor"],
    flavor: "Ácido y ligeramente dulce",
    description:
      "El espino es un arbusto espinoso de la familia de las rosas. Sus bayas, hojas y flores tienen una larga historia como tónico tradicional para el corazón y la circulación.",
    howToUse: "Hierve a fuego lento 1 cucharada de bayas secas en 1½ tazas de agua por 15 minutos.",
    cautions: [
      "Puede interactuar con medicinas para el corazón y la presión, como la digoxina y los betabloqueadores. Habla con tu médico si tienes una condición del corazón.",
    ],
  },
  hibiscus: {
    name: "Flor de jamaica",
    aliases: ["jamaica", "hibisco", "rosa de jamaica", "saril"],
    partsUsed: ["Cáliz (flor)"],
    flavor: "Ácido, parecido al arándano rojo",
    description:
      "La jamaica da una bebida de un rojo rubí intenso que se disfruta caliente o fría en todo el mundo, incluida el agua de jamaica en México. Se ha estudiado por su efecto en la presión arterial.",
    howToUse:
      "Deja reposar 1–2 cucharaditas de flores secas en 1 taza de agua recién hervida por 5–10 minutos. Deliciosa con hielo.",
    cautions: ["Puede bajar la presión arterial. Ten cuidado si tomas medicina para la presión.", "Evítala durante el embarazo."],
  },
  lavender: {
    name: "Lavanda",
    aliases: ["espliego", "alhucema"],
    partsUsed: ["Flor"],
    flavor: "Floral y ligeramente amargo",
    description:
      "El aroma calmante de la lavanda la ha vuelto favorita para relajarse en tés, baños y aromaterapia. Con un poquito basta.",
    howToUse:
      "Deja reposar ¼–½ cucharadita de lavanda culinaria seca en 1 taza de agua recién hervida por 5 minutos. Si usas demasiada, sabe a jabón.",
    cautions: [
      "Nunca tragues aceite esencial de lavanda.",
      "Puede sumar a los efectos de sedantes y medicinas para dormir.",
    ],
  },
  "lemon-balm": {
    name: "Toronjil",
    aliases: ["melisa", "hierba limonera"],
    partsUsed: ["Hoja"],
    flavor: "A limón, ligeramente mentolado",
    description:
      "El toronjil es un miembro de la familia de la menta con aroma a limón. Es una hierba calmante tradicional para los nervios alterados, el sueño inquieto y el estómago nervioso.",
    howToUse:
      "Deja reposar 1–2 cucharaditas de hoja seca (o un puñito de hojas frescas) en 1 taza de agua recién hervida, tapada, por 10 minutos.",
    cautions: [
      "Puede sumar a los efectos de sedantes y medicinas para dormir.",
      "Habla con tu médico si tienes una condición de la tiroides.",
    ],
  },
  "licorice-root": {
    name: "Raíz de regaliz",
    aliases: ["regaliz", "orozuz", "palo dulce"],
    partsUsed: ["Raíz"],
    flavor: "Intensamente dulce",
    description:
      "La raíz de regaliz debe su dulzor a la glicirricina, que es muchas veces más dulce que el azúcar. Es un ingrediente clásico de los tés para el dolor de garganta y la tos.",
    howToUse:
      "Hierve a fuego lento ½–1 cucharadita de raíz picada en 1½ tazas de agua por 10 minutos. Mejor para uso ocasional y de corto plazo.",
    cautions: [
      "En grandes cantidades, o a diario por más de unas semanas, puede subir la presión arterial y bajar el potasio.",
      "Evítala si tienes presión alta o enfermedad del corazón o de los riñones, y durante el embarazo.",
      "Los productos DGL (regaliz desglicirricinado) no contienen glicirricina.",
    ],
  },
  lobelia: {
    name: "Lobelia",
    aliases: ["tabaco indio"],
    partsUsed: ["Hoja", "Flor", "Semilla"],
    flavor: "Acre",
    description:
      "La lobelia contiene lobelina, un compuesto que actúa un poco como la nicotina. Históricamente se usó para el asma y para ayudar a dejar de fumar.",
    howToUse: "No se recomienda para uso en casa.",
    cautions: [
      "Puede ser tóxica. Puede causar náuseas, vómito, latidos acelerados y, en dosis altas, efectos peligrosos.",
      "No deben usarla embarazadas, niños ni personas con condiciones del corazón.",
    ],
    remedyNote:
      "No incluimos un remedio casero con lobelia porque puede ser tóxica. Úsala solo bajo el cuidado de un profesional calificado.",
  },
  matcha: {
    name: "Matcha",
    aliases: ["té matcha", "té verde en polvo"],
    partsUsed: ["Hoja entera, molida en piedra"],
    flavor: "Intenso, herbáceo y sabroso (umami)",
    description:
      "El matcha es té verde cultivado a la sombra, molido hasta un polvo fino y batido en agua. Como tomas la hoja entera, obtienes más cafeína y L-teanina que con el té verde preparado, y mucha gente describe el efecto como una concentración tranquila.",
    howToUse:
      "Cierne 1 cucharadita de matcha en un tazón, agrega 60 ml (2 oz) de agua a unos 80 °C / 175 °F y bate con energía hasta que haga espuma.",
    cautions: [CAFFEINE + " Una porción típica tiene más o menos lo mismo que una taza pequeña de café."],
  },
  "milk-thistle": {
    name: "Cardo mariano",
    aliases: ["silimarina", "cardo lechero"],
    partsUsed: ["Semilla"],
    flavor: "Ligeramente amargo, con notas de nuez",
    description:
      "Las semillas de cardo mariano contienen silimarina, un grupo de compuestos estudiados por proteger el hígado. Es una de las hierbas tradicionales para el hígado más conocidas.",
    howToUse:
      "Machaca 1 cucharadita de semillas y hiérvelas a fuego lento en 1½ tazas de agua por 15 minutos. La silimarina no se disuelve bien en agua, por eso las investigaciones suelen usar extractos estandarizados.",
    cautions: [DAISY_FAMILY, "Puede bajar el azúcar en la sangre. Ten cuidado si usas medicina para la diabetes."],
  },
  nettle: {
    name: "Ortiga",
    aliases: ["ortiga mayor", "ortiga verde"],
    partsUsed: ["Hoja", "Raíz"],
    flavor: "Verde, terroso, parecido a la espinaca",
    description:
      "La ortiga fresca pica, pero secarla o cocinarla le quita el piquete por completo. Sus hojas, ricas en minerales, son un tónico tradicional de primavera y se usan a menudo para las alergias de temporada.",
    howToUse:
      "Deja reposar 1 cucharada de hoja seca en 1 taza de agua recién hervida por 10–15 minutos, o prepara una infusión larga durante la noche.",
    cautions: [
      "Usa guantes al manejar ortiga fresca.",
      "Puede interactuar con anticoagulantes, diuréticos, litio y medicinas para la diabetes o la presión.",
      "Habla con tu proveedor de salud antes de usarla durante el embarazo.",
    ],
  },
  "oat-straw": {
    name: "Paja de avena",
    aliases: ["avena verde", "avena lechosa"],
    partsUsed: ["Tallo verde y puntas"],
    flavor: "Suave, dulce y herbáceo",
    description:
      "La paja de avena son los tallos y hojas de la planta de avena, cosechados todavía verdes. Es una hierba suave y nutritiva que tradicionalmente se usa para apoyar la calma y el bienestar general.",
    howToUse: "Deja reposar 2 cucharadas en 1 taza de agua recién hervida por 15 minutos o más.",
    cautions: [
      "Por lo general se tolera bien.",
      "La avena a menudo se contamina con gluten. Elige una certificada sin gluten si tienes enfermedad celíaca.",
    ],
  },
  "oolong-tea": {
    name: "Té oolong",
    aliases: ["oolong", "wulong", "té azul"],
    partsUsed: ["Hoja"],
    flavor: "Tostado, floral y suave",
    description:
      "El oolong es un té parcialmente oxidado, por lo que queda entre el té verde y el negro en color, sabor y cafeína. Las buenas hojas de oolong se pueden infusionar varias veces.",
    howToUse:
      "Deja reposar 1–2 cucharaditas en agua a unos 90 °C / 195 °F por 3–5 minutos. Vuelve a infusionar las hojas 2–3 veces más.",
    cautions: [CAFFEINE],
  },
  passionflower: {
    name: "Pasiflora",
    aliases: ["pasionaria", "flor de la pasión", "maracuyá silvestre"],
    partsUsed: ["Hoja", "Tallo", "Flor"],
    flavor: "Suave y herbáceo",
    description:
      "La pasiflora es una enredadera con llamativas flores moradas. Se usa tradicionalmente para la ansiedad, la inquietud y los problemas para dormir.",
    howToUse:
      "Deja reposar 1 cucharadita de hierba seca en 1 taza de agua recién hervida por 10 minutos. Tómala en la noche.",
    cautions: [
      "Puede causar somnolencia. No manejes después de tomarla.",
      "Puede sumar a los efectos de sedantes y medicinas para dormir.",
      "Evítala durante el embarazo.",
    ],
  },
  "pau-darco": {
    name: "Pau d'arco",
    aliases: ["lapacho", "taheebo", "tabebuia"],
    partsUsed: ["Corteza interna"],
    flavor: "Amargo y leñoso",
    description:
      "El pau d'arco es la corteza interna de un árbol con flores de Sudamérica. Se ha usado tradicionalmente para infecciones, incluidas las causadas por hongos, pero no se ha estudiado bien en personas.",
    howToUse: "Por lo general se toma como preparación comercial. Sigue la etiqueta y los consejos de tu proveedor de salud.",
    cautions: [
      "Contiene lapachol, que en dosis altas puede causar náuseas, vómito y sangrado.",
      "Evítalo si tomas anticoagulantes y durante el embarazo o la lactancia.",
    ],
    remedyNote: GUIDED_ONLY,
  },
  peppermint: {
    name: "Menta piperita",
    aliases: ["menta", "piperita"],
    partsUsed: ["Hoja"],
    flavor: "Fresco y refrescante",
    description:
      "El mentol refrescante de la menta relaja los músculos del tubo digestivo. Por eso es una opción clásica para el malestar estomacal, los gases y la hinchazón, y las cápsulas de aceite de menta se han estudiado para el síndrome de colon irritable.",
    howToUse:
      "Deja reposar 1 cucharadita de hoja seca (o un puñito de hojas frescas) en 1 taza de agua recién hervida, tapada, por 5–10 minutos.",
    cautions: [
      "Puede empeorar las agruras o el reflujo ácido (ERGE).",
      "Nunca pongas aceite de menta en la cara de un bebé o niño pequeño, ni cerca de ella.",
    ],
  },
  "prickly-pear": {
    name: "Nopal",
    aliases: ["nopales", "tuna", "cactus", "chumbera", "opuntia"],
    partsUsed: ["Penca (nopal)", "Fruto (tuna)"],
    flavor: "Suave y verde (pencas); dulce, parecido al melón (fruto)",
    description:
      'Nuestra fuente lo menciona simplemente como "cactus". Lo más probable es que se refiera al nopal, cuyo extracto se ha estudiado para aliviar los síntomas de la cruda. Las pencas son una verdura común en la cocina mexicana.',
    howToUse: "Come nopales cocidos o la tuna, o toma jugo de tuna.",
    cautions: [
      "Puede bajar el azúcar en la sangre. Ten cuidado si usas medicina para la diabetes.",
      "Puede causar un leve malestar digestivo.",
    ],
  },
  "red-clover": {
    name: "Trébol rojo",
    aliases: ["trebol rojo", "trébol"],
    partsUsed: ["Flor"],
    flavor: "Suave y dulce",
    description:
      "Las flores de trébol rojo contienen isoflavonas, compuestos de plantas que actúan un poco como el estrógeno. Se ha usado para síntomas de la menopausia.",
    howToUse: SUPPLEMENT,
    cautions: [
      "Como actúa parecido al estrógeno, evítalo si tienes una condición sensible a las hormonas (como algunos cánceres de mama o endometriosis).",
      "No se debe usar durante el embarazo ni la lactancia.",
      "Puede aumentar el riesgo de sangrado si tomas anticoagulantes.",
    ],
    remedyNote: GUIDED_ONLY,
  },
  "red-raspberry-leaf": {
    name: "Hoja de frambuesa",
    aliases: ["hoja de frambuesa roja", "frambueso"],
    partsUsed: ["Hoja"],
    flavor: "Suave, como un té negro sin cafeína",
    description:
      "Las parteras han recomendado por mucho tiempo el té de hoja de frambuesa al final del embarazo para tonificar el útero. También se usa para los cólicos menstruales.",
    howToUse: "Deja reposar 1 cucharada de hoja seca en 1 taza de agua recién hervida por 10–15 minutos.",
    cautions: [
      "Si estás embarazada, habla primero con tu partera o médico. Por lo general solo se sugiere en el tercer trimestre.",
    ],
  },
  rooibos: {
    name: "Rooibos",
    aliases: ["té rojo", "arbusto rojo"],
    partsUsed: ["Hoja (aguja)"],
    flavor: "Dulce, con notas de nuez y vainilla",
    description:
      'El rooibos ("arbusto rojo") viene de un arbusto de Sudáfrica y no tiene cafeína de forma natural. A menudo se le llama té rojo, pero no es pariente de la planta del té. Es rico en antioxidantes como la aspalatina.',
    howToUse:
      "Deja reposar 1 cucharada en 1 taza de agua hirviendo por 5–10 minutos. No se amarga si lo dejas más tiempo.",
    cautions: ["Se considera seguro para la mayoría de las personas."],
  },
  "slippery-elm": {
    name: "Olmo rojo",
    aliases: ["olmo americano", "corteza de olmo"],
    partsUsed: ["Corteza interna"],
    flavor: "Suave, dulce y sedoso",
    description:
      "Mezclada con agua, la corteza interna del olmo rojo forma un gel resbaloso (llamado mucílago) que cubre y alivia la garganta irritada y el estómago.",
    howToUse: "Bate 1 cucharadita de corteza en polvo en 1 taza de agua caliente hasta que quede uniforme.",
    cautions: [
      "Su capa protectora puede hacer más lenta la absorción de otras medicinas. Tómalo con al menos 2 horas de diferencia.",
      "Evítalo durante el embarazo.",
    ],
  },
  "st-johns-wort": {
    name: "Hierba de San Juan",
    aliases: ["hipérico", "hiperico", "corazoncillo"],
    partsUsed: ["Puntas floridas"],
    flavor: "Amargo",
    description: "La hierba de San Juan es una planta de flores amarillas que se ha estudiado para la depresión leve a moderada.",
    howToUse: "Úsala solo con la orientación de tu médico o farmacéutico.",
    cautions: [
      "Interactúa con muchas medicinas y puede hacer que dejen de funcionar, incluidos anticonceptivos, antidepresivos, anticoagulantes y medicamentos para el VIH y trasplantes.",
      "Tomada con antidepresivos, puede causar una reacción peligrosa llamada síndrome serotoninérgico.",
      "Hace tu piel más sensible al sol.",
      "No la uses en lugar del tratamiento para la depresión.",
    ],
    remedyNote:
      "No incluimos un remedio casero con hierba de San Juan porque interactúa con muchísimas medicinas. Habla primero con tu médico o farmacéutico.",
  },
  thyme: {
    name: "Tomillo",
    aliases: ["tomillo común"],
    partsUsed: ["Hoja"],
    flavor: "Sabroso y herbal",
    description:
      "Esta hierba de cocina debe su aroma al timol, que tiene propiedades antisépticas. El té de tomillo es un remedio tradicional para la tos y la congestión del pecho.",
    howToUse:
      "Deja reposar 1 cucharadita de tomillo seco (o 3 ramitas frescas) en 1 taza de agua recién hervida, tapada, por 10 minutos.",
    cautions: [
      "Las cantidades que se usan en la cocina y en el té son seguras para la mayoría de las personas.",
      "Nunca tragues aceite esencial de tomillo.",
      "Evítalo si tienes alergia al orégano u otras plantas de la familia de la menta.",
    ],
  },
  turmeric: {
    name: "Cúrcuma",
    aliases: ["curcuma", "curcumina", "azafrán de la india", "haldi"],
    partsUsed: ["Rizoma (raíz)"],
    flavor: "Terroso, cálido y ligeramente amargo",
    description:
      "La cúrcuma es la especia dorada que le da su color al curry. Su compuesto principal, la curcumina, se ha estudiado mucho para la inflamación. La pimienta negra y un poco de grasa ayudan a que tu cuerpo la absorba.",
    howToUse:
      "Hierve a fuego lento ½ cucharadita de cúrcuma molida (o un trozo de 2–3 cm de raíz fresca) con una pizca de pimienta negra en leche o agua por 5–10 minutos.",
    cautions: [
      "Los suplementos en dosis altas pueden causar malestar estomacal y, en casos raros, se han relacionado con daño al hígado.",
      "Habla con tu médico si tomas anticoagulantes o tienes problemas de la vesícula.",
    ],
  },
  "white-tea": {
    name: "Té blanco",
    aliases: ["aguja de plata", "peonía blanca", "bai mudan"],
    partsUsed: ["Brote joven", "Hoja"],
    flavor: "Delicado, dulce y floral",
    description:
      "El té blanco se hace con brotes y hojas jóvenes que solo se marchitan y se secan. Es el té menos procesado, con un sabor suave y sutil.",
    howToUse: "Deja reposar 2 cucharaditas en agua a unos 80 °C / 175 °F por 4–5 minutos.",
    cautions: [CAFFEINE],
  },
  wormwood: {
    name: "Ajenjo",
    aliases: ["artemisa amarga", "absintio"],
    partsUsed: ["Hoja", "Puntas floridas"],
    flavor: "Extremadamente amargo",
    description:
      "El ajenjo es una de las hierbas más amargas que existen. Tradicionalmente se usó contra las lombrices intestinales y es famoso como saborizante de la absenta.",
    howToUse: "Solo para uso a corto plazo con la orientación de un profesional calificado.",
    cautions: [
      "Contiene tuyona, que en dosis altas puede causar convulsiones y daño a los riñones.",
      "No deben usarlo embarazadas, mujeres que amamantan ni personas con epilepsia.",
      DAISY_FAMILY,
    ],
    remedyNote: GUIDED_ONLY,
  },
};
