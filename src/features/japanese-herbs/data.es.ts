import type { JapaneseHerbId, JapaneseHerbText } from "./data";

const FOOD_AMOUNTS =
  "Disfrútala en las cantidades que se usan al cocinar. Si estás embarazada o amamantando, no la tomes en cantidades mayores o medicinales.";

/** Spanish text for every Japanese herb. Japanese and scientific names stay the same in both languages. */
export const JAPANESE_HERB_TEXT_ES: Record<JapaneseHerbId, JapaneseHerbText> = {
  shiso: {
    name: "Shiso",
    aliases: ["perilla", "hoja de perilla", "albahaca japonesa", "shiso rojo"],
    partsUsed: ["Hoja", "Semilla"],
    flavor: "Fresco y herbal, como menta y albahaca con un toque cítrico",
    summary: "Una hoja de la familia de la menta que se usa entera con sushi, picada sobre fideos o frita en tempura.",
    description:
      "El shiso, también llamado perilla o albahaca japonesa, es de la familia de la menta y una de las hierbas más comunes en la cocina japonesa. El shiso verde se usa fresco como adorno y para envolver, mientras que el shiso rojo (akajiso) es el que les da a los umeboshi (ciruelas encurtidas) su color rosa morado. Sus semillas son una de las siete especias del shichimi togarashi.",
    howToUse: [
      "Como adorno: apila unas hojas, enróllalas bien y córtalas en tiras finas. Espárcelas sobre fideos fríos, arroz, pescado asado o sopa justo antes de servir.",
      "Con sushi y sashimi: pon una hoja fresca entera debajo del sashimi, o métela dentro de un rollo de mano o alrededor de una bola de arroz (onigiri).",
      "En tempura: pasa solo un lado de la hoja por una masa ligera y fríela unos segundos hasta que quede crujiente.",
      "Shiso rojo: úsalo para dar color y sabor a las ciruelas encurtidas (umeboshi), o compra hojuelas secas de shiso rojo (yukari) para espolvorear sobre el arroz.",
      "Como té sencillo: deja reposar 4 o 5 hojas frescas en 1 taza de agua caliente por unos 5 minutos.",
    ],
    storage:
      "Las hojas frescas se marchitan rápido. Envuélvelas en una toalla de papel húmeda, guárdalas en un recipiente en el refrigerador y úsalas en 3 a 5 días.",
    cautions: [
      "La alergia a la perilla es poco común pero posible, sobre todo a las semillas. Deja de usarla si notas comezón o hinchazón.",
      FOOD_AMOUNTS,
    ],
  },
  wasabi: {
    name: "Wasabi",
    aliases: ["wasabi verdadero", "rábano picante japonés"],
    partsUsed: ["Rizoma (raíz)", "Tallo", "Hoja"],
    flavor: "Picor intenso y limpio que sube a la nariz y se va rápido, con un toque dulce",
    summary: "Una raíz que se ralla fresca y se sirve con sushi, sashimi y fideos fríos.",
    description:
      "El wasabi verdadero es el tallo parecido a una raíz de una planta que crece en arroyos frescos de montaña. En los restaurantes más finos se ralla al momento y se sirve con sushi, sashimi y soba o udon fríos. La mayoría de la pasta verde que se vende como “wasabi” en realidad es rábano picante y mostaza teñidos de verde. El wasabi fresco pierde su sabor después de unos 15 minutos al aire, por eso se ralla justo antes de comer.",
    howToUse: [
      "Enjuaga la raíz y quítale la piel oscura y nudosa de la parte de arriba.",
      "Rállala en un rallador muy fino (lo ideal es un rallador tradicional de piel de tiburón) con movimientos circulares pequeños. Entre más fino, más picante.",
      "Junta la pasta en un montoncito y déjala reposar como un minuto para que se desarrolle el sabor.",
      "Cómela en unos 15 minutos. Pon un poquito directo sobre el pescado o en la salsa para fideos fríos, en lugar de mezclar mucho en la salsa de soya.",
      "Envuelve el extremo cortado en plástico y refrigera el resto. La próxima vez, ralla desde el mismo extremo.",
      "Los tallos y las hojas se pueden encurtir (wasabi-zuke) o picar en aderezos para un picor más suave.",
    ],
    storage:
      "Envuelve la raíz fresca en una toalla de papel húmeda y refrigérala. Enjuágala y cambia la toalla cada pocos días, y puede durar de 2 a 3 semanas. Al comprar pasta o polvo, revisa la etiqueta: el wasabi verdadero dice Wasabia japonica o Eutrema japonicum.",
    cautions: [
      "Es muy picante. Empieza con poquito, sobre todo con niños.",
      "En grandes cantidades puede irritar el estómago. Si tienes reflujo o úlceras, usa porciones pequeñas.",
      "El wasabi es de la familia de la mostaza. Evítalo si tienes alergia a la mostaza o al rábano picante.",
    ],
  },
  yomogi: {
    name: "Yomogi",
    aliases: ["artemisa japonesa", "artemisa", "hierba de kusa mochi"],
    partsUsed: ["Hoja tierna"],
    flavor: "Fresco, herbáceo y primaveral, con un amargor suave",
    summary: "Artemisa japonesa que da a los pasteles de arroz y dulces su color verde brillante y aroma de primavera.",
    description:
      "El yomogi es la artemisa japonesa. Se ha usado como hierba medicinal por siglos y es un ingrediente favorito de la primavera. Las hojas molidas de yomogi le dan al kusa mochi, un pastel de arroz verde, su color y aroma. También se usa en otros dulces japoneses (wagashi), sopas, tés y platillos de arroz.",
    howToUse: [
      "Usa hojas jóvenes y tiernas de las puntas. Enjuágalas bien y quítales los tallos duros.",
      "Blanquea las hojas en agua hirviendo con una pizca de bicarbonato por 1 o 2 minutos. Esto las suaviza y les quita algo de amargor.",
      "Enfríalas en agua fría, exprímelas lo más que puedas y pícalas finamente o muélelas hasta hacer una pasta.",
      "Para kusa mochi o yomogi daifuku: amasa la pasta con la masa de harina de arroz (mochi) hasta que quede verde parejo.",
      "Para platillos salados: mezcla las hojas picadas con arroz o sopa de miso, o fríe hojas frescas en tempura.",
      "Como té: deja reposar 1 cucharadita de yomogi seco en 1 taza de agua caliente por unos 5 minutos.",
    ],
    storage:
      "El yomogi blanqueado y exprimido se congela bien. Divídelo en bolitas y congélalo hasta por unos meses. También se consigue seco o en polvo.",
    cautions: [
      "Evita el yomogi si estás embarazada o amamantando. Tradicionalmente se cree que la artemisa estimula el útero.",
      "Evítalo si tienes alergia a plantas de la familia de las margaritas (ambrosía, crisantemos, caléndulas, margaritas).",
      "Recoléctalo en el campo solo si estás seguro de que es la planta correcta. Hay varias parecidas que son tóxicas.",
    ],
  },
  mitsuba: {
    name: "Mitsuba",
    aliases: ["perejil japonés", "trébol japonés", "perejil silvestre japonés"],
    partsUsed: ["Hoja", "Tallo"],
    flavor: "Suave y fresco, entre perejil, apio y acedera",
    summary: "Una hierba delicada de tres hojas que se agrega cruda a sopas y flan de huevo al vapor.",
    description:
      "Mitsuba significa “tres hojas”, por sus hojas en forma de trébol sobre tallos largos y delgados. Se parece un poco al perejil liso y tiene un sabor sutil. Es más conocida como adorno del chawanmushi, un flan salado de huevo al vapor, y se agrega seguido a sopas y guisos. Al cocinarla puede volverse amarga, así que por lo general se agrega cruda como adorno.",
    howToUse: [
      "Agrégala al final. Pica las hojas y los tallos y espárcelos sobre sopa, chawanmushi o tazones de arroz justo antes de servir.",
      "En sopa clara (suimono) o sopa de miso: echa unas ramitas enteras justo al retirar la olla del fuego.",
      "Como adorno: haz un nudo sencillo con un tallo largo y ponlo a flotar sobre la sopa.",
      "Para una guarnición rápida: sumérgela en agua hirviendo de 5 a 10 segundos, enfríala, exprímela y mézclala con salsa de soya y ajonjolí (ohitashi).",
      "No la dejes hervir, porque se amarga y pierde su aroma.",
    ],
    storage:
      "Pon los tallos en un vaso con un poco de agua, cúbrelos con una bolsa de plástico sin apretar y guárdalos en el refrigerador. Úsala en pocos días.",
    cautions: [
      "La mitsuba es de la familia de la zanahoria y el apio. Evítala si tienes alergia al apio, al perejil o a la zanahoria.",
      "En general es segura en las cantidades que se usan al cocinar.",
    ],
  },
  kuromoji: {
    name: "Kuromoji",
    aliases: ["lindera", "arbusto de especia japonés"],
    partsUsed: ["Rama", "Corteza", "Hoja"],
    flavor: "Amaderado y dulce, con un aroma cítrico y floral parecido a la canela",
    summary: "Un árbol aromático de la familia del laurel cuyas ramas se preparan en un té relajante.",
    description:
      "El kuromoji es un árbol pequeño de la familia del laurel, pariente de la canela. Tradicionalmente se cree que su aroma fuerte y agradable ayuda a relajarse, y sus ramas se han preparado como té por mucho tiempo. Con su madera también se tallan los palillos pequeños que se usan para comer dulces japoneses (wagashi).",
    howToUse: [
      "Para té: pon de 3 a 5 gramos de trocitos de rama seca de kuromoji (como un puñito) en una olla con 2 tazas de agua.",
      "Deja que hierva, luego baja el fuego y cocina a fuego lento de 5 a 10 minutos. Entre más tiempo, más color y aroma.",
      "Cuélalo y tómalo caliente, o enfríalo para té helado. No necesita endulzante.",
      "Por lo general puedes volver a usar los mismos trocitos 2 o 3 veces más.",
      "Si tienes bolsitas de té de kuromoji, deja reposar una en 1 taza de agua caliente por al menos 5 minutos.",
      "Usa palillos de kuromoji para cortar y comer mochi y otros wagashi. La madera les da un aroma ligero.",
    ],
    storage: "Guarda las ramas secas en un recipiente hermético, lejos del calor y la luz. Conservan su aroma por meses.",
    cautions: [
      "Hay poca investigación sobre su seguridad en cantidades grandes. Consulta primero a tu médico si estás embarazada, amamantando o tomas medicamentos.",
      "Compra kuromoji que se venda como alimento o té, no como aceite esencial. No tomes el aceite esencial.",
    ],
  },
  sansho: {
    name: "Sansho",
    aliases: ["pimienta sansho", "pimienta japonesa", "fresno espinoso japonés", "kinome"],
    partsUsed: ["Cáscara de la semilla", "Hoja tierna (kinome)"],
    flavor: "Intenso y alimonado, con una sensación de cosquilleo que adormece un poco",
    summary: "Una “pimienta” cítrica y cosquilleante que se espolvorea sobre anguila asada, fideos y sopa.",
    description:
      "El sansho viene de las vainas de semillas del fresno espinoso japonés, un árbol de la familia de los cítricos. Aunque le dicen pimienta, no es una pimienta verdadera. Tiene un sabor cítrico e intenso y deja un cosquilleo en la lengua, muy parecido a la pimienta de Sichuan. Es una de las siete especias del shichimi togarashi, y hay registros de su uso en Japón desde los siglos VIII y IX.",
    howToUse: [
      "Espolvorea una pizca de sansho molido sobre anguila asada (unagi), yakitori u otros alimentos ricos y grasosos en la mesa.",
      "Agrega una pizca a udon, soba o sopa de miso justo antes de comer.",
      "Para el sabor más fresco, compra las cáscaras secas enteras y muélelas en un molcajete o molino de especias cuando las necesites.",
      "Kinome (hojas tiernas): pon una hoja en la palma de tu mano y da una palmada para liberar el aroma; luego colócala sobre sopa, pescado asado o verduras guisadas.",
      "Mézclalo con chile, ajonjolí y alga para hacer tu propio shichimi togarashi.",
    ],
    storage:
      "El sansho molido pierde su aroma rápido. Compra frascos pequeños, ciérralos bien y guárdalos en un lugar fresco y oscuro, o guarda los frascos abiertos en el refrigerador.",
    cautions: [
      "El cosquilleo o adormecimiento es normal. Usa solo una pizca, porque mucho puede ser demasiado.",
      "Evítalo si tienes alergia a plantas de la familia de los cítricos o a la pimienta de Sichuan.",
      FOOD_AMOUNTS,
    ],
  },
};
