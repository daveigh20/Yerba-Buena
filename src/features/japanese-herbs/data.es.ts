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
  "naginata-koju": {
    name: "Naginata kōju",
    aliases: ["naginata koju", "elsholtzia", "menta de fin de verano", "bálsamo vietnamita", "kinh gioi"],
    partsUsed: ["Hoja", "Sumidad florida"],
    flavor: "Mentolado y cálido, con un aroma alimonado y un poco medicinal",
    summary: "Una hierba de la familia de la menta que calienta el cuerpo y se toma en té para los resfriados y el frío.",
    description:
      "La naginata kōju es una hierba silvestre de la familia de la menta. Su nombre viene de sus espigas de flores, que se curvan hacia un lado como la hoja de una naginata (una alabarda japonesa). Desde hace mucho se usa en todo Japón en tés para calentar el cuerpo, aliviar los resfriados y mejorar la circulación.",
    howToUse: [
      "En té: pon 1 o 2 cucharaditas de la hierba seca en una taza o tetera y vierte 1 taza de agua caliente, justo después de hervir.",
      "Tapa y deja reposar 5 minutos para que los aceites aromáticos se queden en la taza, y luego cuela.",
      "Tómala caliente cuando sientas frío o al empezar un resfriado. Un poco de miel suaviza el toque mentolado.",
      "Para una mezcla que calienta: combina partes iguales de naginata kōju, ibuki jakōsō y yomogi, y prepara 1 o 2 cucharaditas de la mezcla de la misma forma.",
      "Las hojas frescas se pueden agregar en poca cantidad a sopas o ensaladas, como las hierbas vietnamitas (en mercados vietnamitas se vende como kinh giới).",
    ],
    storage:
      "Guarda la hierba seca en un frasco hermético, lejos del calor y la luz, y úsala dentro de un año. Envuelve las ramitas frescas en una toalla de papel húmeda, guárdalas en el refrigerador y úsalas en pocos días.",
    cautions: [
      "Evítala si tienes alergia a las plantas de la familia de la menta.",
      "Hay poca investigación sobre su seguridad en cantidades mayores. Consulta primero a tu médico si tomas medicamentos.",
      FOOD_AMOUNTS,
    ],
  },
  "ibuki-jakoso": {
    name: "Ibuki jakōsō",
    aliases: ["ibuki jakoso", "tomillo japonés", "tomillo silvestre", "serpol japonés"],
    partsUsed: ["Hoja", "Sumidad florida"],
    flavor: "Herbal y sabroso como el tomillo de jardín, pero más suave y floral",
    summary: "El tomillo silvestre nativo de Japón, que se toma en té para aliviar la garganta y la nariz.",
    description:
      "La ibuki jakōsō es el tomillo silvestre nativo de Japón. Es una planta baja y rastrera con flores rosas diminutas, y su nombre viene del monte Ibuki y de su aroma almizclado (jakō significa almizcle). Igual que el tomillo de jardín, tiene propiedades antibacterianas naturales, y tradicionalmente se usa para el dolor de garganta, la tos y la nariz tapada.",
    howToUse: [
      "En té: deja reposar 1 cucharadita de la hierba seca (o unas ramitas frescas) en 1 taza de agua caliente de 5 a 10 minutos, tapada.",
      "Para el dolor de garganta: agrega una cucharada de miel y tómalo despacio mientras está caliente.",
      "Para la nariz tapada: vierte agua caliente sobre un puñado de la hierba en un tazón, inclínate sobre él con una toalla sobre la cabeza y respira el vapor unos minutos. Mantén la cara a una distancia segura del agua caliente.",
      "En la cocina: úsala como el tomillo de jardín, con verduras asadas, pollo o pescado.",
      "Para una mezcla que calienta: combínala con naginata kōju y yomogi y prepárala como té.",
    ],
    storage:
      "Guarda las hojas secas en un frasco hermético, lejos de la luz, hasta por un año. Las ramitas frescas duran como una semana en el refrigerador, envueltas en una toalla de papel húmeda.",
    cautions: [
      "Evítala si tienes alergia al tomillo o a otras plantas de la familia de la menta.",
      "Las hierbas de la familia del tomillo pueden hacer más lenta la coagulación en cantidades grandes. Deja de tomarla como té medicinal 2 semanas antes de una cirugía.",
      FOOD_AMOUNTS,
    ],
  },
  toki: {
    name: "Tōki",
    aliases: ["toki", "touki", "raíz de angélica japonesa", "yamato toki", "dong quai"],
    partsUsed: ["Raíz"],
    flavor: "Terroso y parecido al apio, con un final agridulce y un poco picante",
    summary: "Una raíz que calienta el cuerpo y que en Japón se valora como hierba para la mujer: cólicos, frío y ciclos.",
    description:
      "El tōki es la raíz de la angélica japonesa, pariente cercana del dong quai chino. Es una de las hierbas más importantes del kampō (la medicina tradicional japonesa) y tradicionalmente se usa para calentar el cuerpo, mejorar la circulación y apoyar la salud de la mujer: aliviar los cólicos menstruales y los ciclos irregulares, el frío y la retención de líquidos.",
    howToUse: [
      "El tōki casi siempre se vende en rodajas de raíz seca. Enjuágalas rápido antes de usarlas.",
      "En decocción: hierve a fuego lento de 3 a 5 gramos (unas 2 o 3 rodajas) en 2 tazas de agua de 15 a 20 minutos, hasta que el líquido se reduzca como un tercio.",
      "Cuela y tómalo caliente. Su sabor es fuerte, así que puedes agregar jengibre o un poco de miel, o mezclarlo con hierbas más suaves.",
      "En la cocina: agrega una rodaja a un caldo de pollo o de cerdo mientras se cocina, como se hace en muchas sopas tónicas del este de Asia.",
      "Las hojas de tōki son más suaves y se pueden usar en té o en el baño.",
    ],
    storage:
      "Guarda las rodajas de raíz seca en un recipiente hermético en un lugar fresco y seco. Duran como un año. Revisa que no tengan moho ni insectos si llevan mucho tiempo guardadas.",
    cautions: [
      "No lo tomes si estás embarazada, buscas embarazarte o estás amamantando. Tradicionalmente se cree que la raíz de angélica estimula el útero.",
      "Puede hacer más lenta la coagulación de la sangre. Consulta primero a tu médico si tomas anticoagulantes (como warfarina) o vas a tener una cirugía.",
      "Evítalo si tienes una condición sensible a las hormonas, como endometriosis o ciertos tipos de cáncer, a menos que tu médico lo apruebe.",
      "Es de la familia de la zanahoria y el apio. Evítalo si tienes alergia al apio, al perejil o a la zanahoria. También puede hacer la piel más sensible al sol.",
    ],
  },
  tachibana: {
    name: "Naranja tachibana",
    aliases: ["tachibana", "naranja silvestre japonesa", "cítrico silvestre"],
    partsUsed: ["Cáscara del fruto", "Hoja", "Flor"],
    flavor: "Muy ácido y brillante, con una cáscara aromática y un poco amarga",
    summary: "El único cítrico silvestre nativo de Japón, cuya cáscara aromática se prepara en un té afrutado para la mañana.",
    description:
      "La tachibana es una naranja pequeña y ácida, y el único cítrico silvestre nativo de Japón. Aparece en las crónicas más antiguas del país y en el Palacio Imperial, donde hay un árbol de tachibana junto a la sala principal. El fruto es demasiado ácido para comerlo fresco, pero su cáscara seca se usa en tés y es rica en nobiletina, un compuesto cítrico que se está estudiando por sus efectos en el metabolismo.",
    howToUse: [
      "En té: deja reposar 1 cucharadita de cáscara seca de tachibana en 1 taza de agua caliente por unos 5 minutos.",
      "Tómalo en la mañana como un estimulante sin cafeína en lugar del café.",
      "Para una mezcla afrutada: combina la cáscara con hojas de gettō y pétalos de hamanasu, y prepara 1 o 2 cucharaditas de la mezcla.",
      "Para secar tu propia cáscara: usa fruta sin cera, quita lo más que puedas de la parte blanca y seca la cáscara en tiras finas en un lugar tibio y ventilado o en el horno a temperatura baja hasta que truene.",
      "En la cocina: ralla un poco de cáscara fresca sobre pescado asado, aderezos o postres, como harías con la ralladura de yuzu.",
    ],
    storage:
      "Guarda la cáscara seca en un frasco hermético, lejos de la luz. Tiene más aroma en los primeros 6 meses. La fruta fresca dura de 1 a 2 semanas en el refrigerador.",
    cautions: [
      "Evítala si tienes alergia a los cítricos.",
      "La tachibana silvestre es rara y está protegida en partes de Japón. Compra cáscara seca o fruta de árboles cultivados y no la recolectes.",
      FOOD_AMOUNTS,
    ],
  },
  getto: {
    name: "Gettō",
    aliases: ["getto", "gettou", "jengibre de concha", "sannin", "lirio de porcelana"],
    partsUsed: ["Hoja", "Semilla"],
    flavor: "Fresco y dulce picante, con un aroma parecido al jengibre y un poco floral",
    summary: "Una hoja de Okinawa de la familia del jengibre, rica en antioxidantes, que se toma en té o envuelve pasteles de arroz.",
    description:
      "El gettō, también llamado jengibre de concha, es una planta alta de la familia del jengibre que crece silvestre en Okinawa, donde se le conoce como sannin. Sus hojas son ricas en polifenoles, que son antioxidantes, y se aprecian por su aroma fresco y especiado. En Okinawa las hojas se usan para envolver muchī, pasteles de arroz al vapor que se hacen para una fiesta de invierno, y también se preparan en té.",
    howToUse: [
      "En té: deja reposar 1 o 2 cucharaditas de hoja de gettō seca y picada en 1 taza de agua caliente por 5 minutos.",
      "Para un sabor más fuerte, mejor hierve la hoja seca a fuego lento de 5 a 10 minutos.",
      "Tómalo caliente o frío como té helado. Combina bien con la cáscara de tachibana y los pétalos de hamanasu.",
      "Para envolver muchī: envuelve masa dulce de harina de arroz en hojas frescas y cocínala al vapor de 15 a 20 minutos. Las hojas dan su aroma pero no se comen.",
      "Pon hojas frescas debajo del arroz o del pescado mientras se cocina al vapor para perfumar la comida.",
    ],
    storage:
      "Guarda las hojas secas en un recipiente hermético, lejos de la humedad y la luz. Duran hasta un año. Las hojas frescas duran varios días en el refrigerador, envueltas en una toalla húmeda.",
    cautions: [
      "Evítalo si tienes alergia al jengibre o a la cúrcuma.",
      "El aceite esencial de gettō es solo para aromatizar. No lo tomes.",
      FOOD_AMOUNTS,
    ],
  },
  hamanasu: {
    name: "Rosa hamanasu",
    aliases: ["hamanasu", "rosa de playa", "rosa rugosa", "rosa japonesa", "escaramujo", "té de pétalos de rosa"],
    partsUsed: ["Pétalos", "Escaramujos (fruto)"],
    flavor: "Pétalos dulces y florales, y escaramujos ácidos y afrutados",
    summary: "Una rosa silvestre de playa cuyos pétalos aromáticos y escaramujos ricos en vitamina C hacen un té relajante.",
    description:
      "La hamanasu es una rosa silvestre que crece en las playas de arena del norte de Japón, sobre todo en Hokkaido. Sus pétalos rosa intenso tienen un aroma dulce y fuerte, y sus escaramujos rojos y redondos son ricos en vitamina C. Tradicionalmente se usa para apoyar una piel sana y calmar el cuerpo y la mente.",
    howToUse: [
      "Té de pétalos: deja reposar 1 o 2 cucharaditas de pétalos secos (o un puñito de pétalos frescos sin fumigar) en 1 taza de agua caliente de 3 a 5 minutos.",
      "Té de escaramujos: machaca 1 o 2 cucharaditas de escaramujos secos y hiérvelos a fuego lento en 1 taza de agua por unos 10 minutos.",
      "Cuela el té de escaramujos con un colador fino o un filtro de papel. Las semillas tienen pelitos que pueden irritar la garganta.",
      "Para una mezcla de noche: combina los pétalos con hojas de gettō, cáscara de tachibana y un poco de dokudami.",
      "Los escaramujos frescos, sin semillas, se pueden cocinar en mermelada o jarabe.",
    ],
    storage:
      "Guarda los pétalos y escaramujos secos en frascos herméticos, lejos de la luz, y úsalos dentro de un año. Los pétalos pierden su aroma más rápido, así que compra poca cantidad.",
    cautions: [
      "Usa solo rosas que no hayan sido fumigadas. Las de florería casi siempre lo están.",
      "Evítala si tienes alergia a las rosas.",
      FOOD_AMOUNTS,
    ],
  },
  dokudami: {
    name: "Dokudami",
    aliases: ["houttuynia", "menta de pescado", "hoja de pescado", "planta camaleón", "juuyaku", "té de dokudami"],
    partsUsed: ["Hoja", "Tallo", "Flor"],
    flavor: "Fuerte y con olor a pescado cuando está fresca, pero suave, terrosa y un poco dulce como té seco",
    summary: "Una hoja en forma de corazón, la de las “diez medicinas”, que se prepara en un té depurativo.",
    description:
      "La dokudami es una planta de hojas en forma de corazón que crece en lugares húmedos y sombreados en todo Japón. También se le llama jūyaku, “diez medicinas”, porque se usaba para muchísimos malestares. El té de dokudami seca es uno de los remedios caseros más conocidos de Japón, y tradicionalmente se usa para depurar el cuerpo, aliviar la retención de líquidos y el estreñimiento, y apoyar una piel sana.",
    howToUse: [
      "Úsala siempre seca para el té. Al secarse pierde el fuerte olor a pescado de las hojas frescas.",
      "En té: hierve a fuego lento 1 cucharada (unos 5 gramos) de dokudami seca en 2 o 3 tazas de agua de 5 a 10 minutos, y luego cuela.",
      "Tómalo caliente o frío, entre comidas. Empieza con 1 taza al día.",
      "Mézclala con té de cebada tostada (mugicha) o con otras hierbas, como gettō y hamanasu, para un sabor más suave.",
      "En la cocina vietnamita las hojas frescas (diếp cá) se comen crudas con carne asada y fideos, si te gusta un sabor intenso.",
    ],
    storage:
      "Guarda la hierba seca en un recipiente hermético, lejos de la humedad. Dura como un año. Guarda el té preparado en el refrigerador y tómalo en 2 días.",
    cautions: [
      "Es un diurético y laxante suave. Toma mucha agua y no la uses si tomas diuréticos, a menos que tu médico lo apruebe.",
      "Tiene mucho potasio. Si tienes problemas de los riñones o tomas medicamentos que suben el potasio, consulta primero a tu médico.",
      "No la uses si estás embarazada o amamantando, porque no hay suficiente información sobre su seguridad.",
    ],
  },  "sakura-leaf": {
    name: "Hoja de cerezo",
    aliases: ["hoja de sakura", "sakura no ha", "cerezo yoshino", "somei yoshino", "hoja de sakuramochi"],
    partsUsed: ["Hoja"],
    flavor: "Dulce y con sabor a almendra, con un suave aroma a vainilla cuando la hoja está encurtida en sal",
    summary: "La hoja salada con aroma a almendra que envuelve los dulces rosas de sakuramochi.",
    description:
      "Las hojas de cerezo son más conocidas como la envoltura encurtida en sal del sakuramochi, los pasteles de arroz rosas que se comen en primavera. El encurtido resalta la cumarina, el compuesto detrás de su aroma dulce, como de almendra. ORIFUSI incluye un extracto de hojas de cerezo Yoshino (Somei-yoshino) como ingrediente para calmar la piel sensible. La mayoría de las hojas que se venden para cocinar vienen del cerezo Ōshima, que es muy parecido.",
    howToUse: [
      "Compra hojas de cerezo encurtidas en sal (sakura no ha shiozuke) en una tienda japonesa en lugar de cortarlas de un árbol.",
      "Remoja las hojas en agua fría de 10 a 15 minutos para quitarles un poco de sal y sécalas con cuidado.",
      "Para el sakuramochi: envuelve cada pastel de arroz relleno con una hoja, con las venas hacia afuera. La hoja se puede comer o quitar.",
      "Pica finamente una hoja remojada y agrégala al arroz, a galletas de mantequilla o a la masa de un panqué para un suave aroma a cerezo.",
      "Para un té rápido: deja reposar una hoja enjuagada con unas flores de cerezo encurtidas (sakurayu) en agua caliente.",
    ],
    storage:
      "Guarda las hojas encurtidas bien cerradas en el refrigerador, donde duran varios meses. Una vez remojadas, úsalas el mismo día.",
    cautions: [
      "No comas hojas de cerezo frescas y crudas. Como otras partes del cerezo, tienen compuestos naturales que pueden ser dañinos en grandes cantidades. Usa solo hojas preparadas y encurtidas.",
      "Las hojas encurtidas son saladas. Remójalas primero y modera su uso si cuidas tu consumo de sal.",
      "En grandes cantidades, la cumarina puede aumentar el efecto de los anticoagulantes. Una o dos hojas con un dulce está bien.",
    ],
  },
  hatomugi: {
    name: "Semilla de coix",
    aliases: ["hatomugi", "lágrimas de job", "lagrimas de job", "adlay", "yokuinin", "cebada perlada china", "té de hatomugi"],
    partsUsed: ["Semilla"],
    flavor: "A nuez y tostado, como la cebada tostada, con una textura masticable cuando está cocida",
    summary: "Un grano que se prepara en té tostado de hatomugi y que tradicionalmente se usa para una piel suave.",
    description:
      "El hatomugi, también llamado lágrimas de Job, es un pasto alto cuyas semillas peladas parecen granos de cebada grandes y llenitos. En Japón, las semillas tostadas se preparan en un té popular sin cafeína, y las semillas se cocinan como cualquier grano. En la medicina tradicional japonesa y china (donde se le llama yokuinin) se ha usado por mucho tiempo para una piel limpia y suave. ORIFUSI usa extracto de semilla de coix como ingrediente humectante para la piel.",
    howToUse: [
      "En té: hierve a fuego lento 1 o 2 cucharadas de hatomugi tostado en 4 tazas de agua de 5 a 10 minutos y cuela. También sirven las bolsitas de té.",
      "Tómalo caliente o frío, a cualquier hora, porque no tiene cafeína. Combina bien con el té de cebada tostada (mugicha).",
      "Para tostar semillas crudas: tuéstalas en un sartén seco a fuego medio, moviendo, hasta que estén doradas y aromáticas.",
      "Como grano: enjuaga y remoja las semillas crudas por unas horas, y luego cocínalas a fuego lento unos 40 minutos hasta que estén suaves. Agrégalas a sopas, ensaladas o arroz.",
      "Mezcla unas cucharadas con arroz blanco antes de cocerlo para darle una textura masticable y a nuez.",
    ],
    storage:
      "Guarda las semillas o el té en un recipiente hermético en un lugar fresco y seco, y úsalos dentro de 6 meses. Guarda el té preparado en el refrigerador y tómalo en 2 días.",
    cautions: [
      "No lo uses si estás embarazada. Tradicionalmente se evita en el embarazo porque puede afectar el útero.",
      "Puede bajar el azúcar en la sangre. Si tomas medicamento para la diabetes, vigila tus niveles.",
      "Evítalo si tienes alergia a los granos o a los pastos.",
    ],
  },
  tsubaki: {
    name: "Camelia",
    aliases: ["tsubaki", "camelia japonesa", "camellia japonica", "aceite de camelia", "aceite de tsubaki", "tsubaki abura", "flor de camelia"],
    partsUsed: ["Aceite de la semilla", "Flor"],
    flavor: "El aceite para cocinar es ligero y suave, casi sin sabor",
    summary: "Una flor de invierno cuyo aceite de semilla ha cuidado el cabello y la piel en Japón por siglos.",
    description:
      "La tsubaki, o camelia japonesa, florece en rojo, rosa o blanco en invierno y a principios de la primavera. El aceite que se extrae de sus semillas, tsubaki abura, se ha usado por siglos para dar brillo al cabello, suavizar la piel y freír tempura ligera. Las islas Gotō, en Nagasaki, son famosas por él. ORIFUSI usa un extracto de flores de camelia de Gotō para dar humedad y luminosidad a la piel.",
    howToUse: [
      "Para el cabello: calienta 2 o 3 gotas de aceite de camelia entre las palmas y pásalas por las puntas del cabello húmedo o seco.",
      "Para la piel: presiona 1 o 2 gotas sobre la cara después del tónico, o frota un poco en manos, codos y talones resecos.",
      "Para cocinar: usa solo aceite de camelia de grado alimenticio. Es suave y estable al calentarse, así que pruébalo para tempura o en aderezos.",
      "Las flores son sobre todo para admirarlas. Pon una flor fresca a flotar en un tazón de agua poco profundo, la forma tradicional de exhibirla.",
    ],
    storage:
      "Guarda el aceite bien cerrado en un lugar fresco y oscuro. Dura como un año después de abierto. Si huele fuerte o rancio, cámbialo.",
    cautions: [
      "Haz una prueba antes de usar el aceite en la cara: pon un poco en la parte interna del brazo y espera un día.",
      "El aceite de camelia cosmético no es para comer. Cocina solo con aceite que diga que es para alimentos.",
      "Evítala si tienes alergia a la camelia o a la planta del té.",
    ],
  },
};
