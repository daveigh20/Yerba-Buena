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
  },  kiku: {
    name: "Crisantemo",
    aliases: ["kiku", "té de crisantemo", "kikka", "crisantemo comestible", "shokuyo giku"],
    partsUsed: ["Flor"],
    flavor: "Ligero, floral y un poco dulce, con un amargor suave",
    summary: "Flores doradas que se preparan en un té relajante o se esparcen sobre ensaladas y sashimi.",
    description:
      "El crisantemo (kiku) es la flor imperial de Japón, y sus flores se toman en té y también se comen. El té de crisantemo es una bebida popular, que tradicionalmente se toma por la circulación, la salud del corazón y sus antioxidantes, que se cree que ayudan a que la piel se vea joven. Las variedades comestibles (shokuyō-giku) se venden en manojos amarillo brillante o morados, y es común poner flores pequeñas junto al sashimi como adorno.",
    howToUse: [
      "Para té: pon de 5 a 8 flores secas en una taza o tetera y vierte 1 taza de agua caliente, recién retirada del hervor.",
      "Deja reposar de 3 a 5 minutos, hasta que las flores se abran y el té se ponga dorado claro. Tómalo solo o con un poco de miel.",
      "Vuelve a llenar con agua caliente las mismas flores una o dos veces más. El sabor se hace más suave cada vez.",
      "Flores comestibles: quítales los pétalos a los shokuyō-giku frescos y blanquéalos en agua hirviendo con un chorrito de vinagre de arroz por unos 30 segundos. El vinagre mantiene el color brillante.",
      "Enfría los pétalos en agua fría, exprímelos con cuidado y mézclalos con salsa de soya, dashi o un aderezo de ajonjolí (ohitashi), o agrégalos a ensaladas y arroz para sushi.",
    ],
    storage:
      "Guarda las flores secas en un frasco hermético lejos de la luz; conservan su aroma por cerca de un año. Las flores comestibles frescas se marchitan rápido, así que guárdalas en una bolsa en el refrigerador y úsalas en 2 o 3 días. Usa solo flores que se vendan como alimento o té, no crisantemos de florería o de jardín, que pueden estar fumigados.",
    cautions: [
      "Evítalo si tienes alergia a plantas de la familia de las margaritas (ambrosía, crisantemos, caléndulas, margaritas).",
      "Tocar las plantas frescas puede causar sarpullido en algunas personas.",
      FOOD_AMOUNTS,
    ],
  },
  gobo: {
    name: "Raíz de bardana",
    aliases: ["gobo", "gobō", "bardana", "lampazo", "té de gobo", "kinpira gobo"],
    partsUsed: ["Raíz"],
    flavor: "Terroso y con sabor a nuez, crujiente y un poco dulce, algo parecido a la alcachofa",
    summary: "Una raíz larga y terrosa que se saltea con zanahoria, se cocina en sopas o se tuesta para té.",
    description:
      "La raíz de bardana (gobō) es una raíz larga y delgada de piel café y carne blanca que en Japón se come como verdura de todos los días. Tradicionalmente se usa para limpiar el cuerpo, ayudar a la digestión y mantener la piel sana, y es rica en fibra, como la inulina. Es más conocida por el kinpira gobō, un salteado dulce y salado con zanahoria, y también se tuesta para hacer un té con sabor tostado y sin cafeína.",
    howToUse: [
      "Talla la raíz bajo el chorro de agua con un cepillo o con el lomo de un cuchillo. No la peles, porque gran parte del sabor está justo debajo de la piel.",
      "Córtala en tiras finas o rebánala en virutas, como si le sacaras punta a un lápiz, y échalas en agua fría de inmediato para que no se pongan cafés. Déjalas remojar de 5 a 10 minutos y escúrrelas.",
      "Para kinpira gobō: saltea la bardana con tiras de zanahoria en aceite de ajonjolí unos minutos, luego agrega salsa de soya, mirin y un poco de azúcar, y cocina hasta que se consuma el líquido. Termina con ajonjolí.",
      "En sopas y guisos: agrega rebanadas a la sopa de miso, al tonjiru (sopa de cerdo y verduras) o a guisos. Se queda agradablemente crujiente.",
      "Para té de gobō: seca virutas finas en el horno a 120 °C (250 °F) o en un sartén sin aceite hasta que estén crujientes y doradas. Deja reposar 1 o 2 cucharaditas en 1 taza de agua caliente por unos 5 minutos.",
    ],
    storage:
      "Envuelve la raíz entera y sin lavar en papel periódico o una toalla de papel húmeda y guárdala en el refrigerador; dura de 1 a 2 semanas. Escoge raíces firmes que no sean muy gruesas, porque las gruesas pueden estar huecas o fibrosas.",
    cautions: [
      "Evítala si tienes alergia a plantas de la familia de las margaritas (ambrosía, crisantemos, caléndulas, margaritas).",
      "Puede ser un diurético suave y bajar el azúcar en la sangre. Si tomas medicamentos para la diabetes o diuréticos, consulta a tu médico antes de tomarla en té todos los días.",
      "No la recolectes en el campo. La bardana joven se puede confundir con plantas tóxicas como la belladona, así que cómprala en la tienda.",
      FOOD_AMOUNTS,
    ],
  },
  kombu: {
    name: "Kombu",
    aliases: ["konbu", "kelp", "alga", "alga kombu", "kombu para dashi"],
    partsUsed: ["Hoja seca (alga)"],
    flavor: "Umami profundo y sabroso, con un ligero sabor a mar",
    summary: "Alga seca que le da al dashi, la base de las sopas y salsas japonesas, su sabor profundo.",
    description:
      "El kombu es un alga gruesa y oscura que se vende seca en hojas planas. Es básico en la cocina japonesa y el ingrediente principal del dashi, el caldo de la sopa de miso, las sopas de fideos y los guisos. Es rico en yodo, vitaminas y minerales, que apoyan la función de la tiroides y un metabolismo sano. El kombu también contiene fucoidán, un compuesto que se está estudiando por sus efectos antiinflamatorios. De sus glutamatos naturales viene la palabra “umami”.",
    howToUse: [
      "Limpia la hoja con cuidado con un trapo húmedo. No la enjuagues ni la talles, porque el polvo blanco de la superficie es sabor, no suciedad.",
      "Dashi en frío: pon un trozo de 10 cm (4 pulgadas) en 4 tazas de agua y déjalo en el refrigerador unas horas o toda la noche. Saca el kombu y usa el caldo.",
      "Dashi rápido: pon el kombu en agua fría y caliéntala despacio. Sácalo justo antes de que hierva el agua, o el caldo se pone viscoso y amargo.",
      "Con frijoles y arroz: agrega un trozo pequeño a una olla de frijoles o arroz mientras se cocina para darle más sabor. También ayuda a ablandar los frijoles.",
      "No tires el kombu usado. Córtalo en tiras finas y cocínalo a fuego lento con salsa de soya y mirin para hacer tsukudani, un acompañamiento dulce y salado para el arroz.",
    ],
    storage:
      "Guarda el kombu seco en un recipiente hermético en un lugar fresco y seco; dura un año o más. Guarda el dashi casero en el refrigerador y úsalo en 3 días, o congélalo en charolas para hielo.",
    cautions: [
      "El kombu es uno de los alimentos con más yodo, y demasiado yodo puede alterar la tiroides. Disfrútalo en las cantidades normales de cocina y evita comer mucho todos los días.",
      "Si tienes un problema de tiroides, tomas medicamento para la tiroides o estás embarazada o amamantando, come porciones pequeñas y consulta a tu médico.",
      "No tomes suplementos de kelp a menos que te los recomiende un médico. Pueden tener mucho más yodo que los alimentos.",
      "Tiene mucho sodio de forma natural. Tenlo en cuenta si estás cuidando tu consumo de sal.",
    ],
  },
  ashitaba: {
    name: "Ashitaba",
    aliases: ["hoja del mañana", "angélica", "angélica japonesa", "té de ashitaba"],
    partsUsed: ["Hoja", "Tallo"],
    flavor: "Fresco y verde, un poco como el apio, con un amargor agradable",
    summary: "La “hoja del mañana”, una verdura de crecimiento rápido que se come en tempura o se toma en polvo como té.",
    description:
      "La ashitaba es originaria de las islas Izu de Japón, y su nombre significa “hoja del mañana” porque una hoja cortada vuelve a crecer al día siguiente. Esta planta verde es rica en antioxidantes, vitaminas y clorofila, y tradicionalmente se usa para limpiar el cuerpo, mejorar la circulación y apoyar al hígado. También se cree que ayuda al cuerpo a renovar sus células y mantenerse joven. Estudios de laboratorio han relacionado sus compuestos (chalconas) con una vida más larga en levaduras y gusanos, pero esto no se ha comprobado en personas.",
    howToUse: [
      "Escoge hojas y tallos tiernos. Enjuágalos y corta las puntas duras.",
      "En tempura: pasa las hojas enteras por una masa ligera y fríelas unos segundos hasta que estén crujientes. Freírlas suaviza el amargor.",
      "En ohitashi: blanquéala por 1 minuto, enfríala en agua fría, exprímela, córtala en trozos cortos y adereza con salsa de soya y hojuelas de bonito o ajonjolí.",
      "En salteados y sopas: pícala y agrégala al final de la cocción, como harías con las espinacas.",
      "En té o licuado: mezcla 1 cucharadita de ashitaba en polvo en 1 taza de agua caliente o fría, o agrégala a un licuado.",
    ],
    storage:
      "Envuelve la ashitaba fresca en una toalla de papel húmeda, ponla en una bolsa y guárdala en el refrigerador; úsala en 3 o 4 días. Las hojas blanqueadas se congelan bien. Guarda el polvo en una bolsa bien cerrada, lejos de la luz y la humedad.",
    cautions: [
      "La ashitaba es de la familia de la zanahoria y el apio. Evítala si tienes alergia al apio, al perejil o a la zanahoria.",
      "Su savia amarilla tiene compuestos que pueden hacer la piel más sensible al sol. Lávate las manos después de tocar los tallos frescos y ten cuidado con el sol si la tomas seguido.",
      "Puede hacer más lenta la coagulación de la sangre. Consulta primero a tu médico si tomas anticoagulantes o vas a tener una cirugía.",
      "No hay suficiente información sobre su seguridad en el embarazo o la lactancia, así que evita cantidades mayores o medicinales.",
    ],
  },
};
