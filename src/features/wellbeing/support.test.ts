import { describe, expect, it } from "vitest";
import { assess, detectCrisis, detectTopics } from "./support";

describe("detectTopics", () => {
  it("finds grief in plain sentences", () => {
    expect(detectTopics("I'm feeling bad because my mother died")).toContain("grief");
    expect(detectTopics("We lost my dad last week")).toContain("grief");
    expect(detectTopics("my grandma passed away")).toContain("grief");
  });

  it("finds other topics", () => {
    expect(detectTopics("So stressed about work deadlines")).toEqual(["stress"]);
    expect(detectTopics("I feel so alone")).toEqual(["lonely"]);
    expect(detectTopics("panic attacks again")).toEqual(["anxious"]);
    expect(detectTopics("been down all week")).toEqual(["down"]);
  });

  it("avoids common false matches", () => {
    expect(detectTopics("I'm passing my classes")).toEqual([]);
    expect(detectTopics("I need to calm down")).toEqual([]);
    expect(detectTopics("")).toEqual([]);
  });
});

describe("detectCrisis", () => {
  it("flags thoughts of suicide or self-harm", () => {
    expect(detectCrisis("I want to die")).toBe(true);
    expect(detectCrisis("thinking about killing myself")).toBe(true);
    expect(detectCrisis("I don't want to be here anymore")).toBe(true);
    expect(detectCrisis("Suicidal thoughts")).toBe(true);
    expect(detectCrisis("I keep hurting myself")).toBe(true);
  });

  it("does not flag ordinary sadness", () => {
    expect(detectCrisis("my mother died")).toBe(false);
    expect(detectCrisis("rough day at work")).toBe(false);
  });
});

describe("assess", () => {
  it("offers grief support when someone has lost a loved one", () => {
    const r = assess([], "I'm feeling bad because my mother died");
    expect(r.crisis).toBe(false);
    expect(r.topics).toEqual(["grief"]);
    expect(r.resources).toEqual(["988", "crisis-text", "griefshare", "international"]);
  });

  it("combines picked chips with what was written", () => {
    expect(assess(["stress"], "and I'm lonely").topics).toEqual(["stress", "lonely"]);
  });

  it("drops 'something else' when a specific topic applies", () => {
    expect(assess(["other"], "my dog died").topics).toEqual(["grief"]);
  });

  it("always includes 988 and international help, even with nothing shared", () => {
    const r = assess([], "");
    expect(r.topics).toEqual([]);
    expect(r.resources).toContain("988");
    expect(r.resources).toContain("international");
  });

  it("adds emergency resources in a crisis", () => {
    const r = assess(["grief"], "my mom died and I want to end my life");
    expect(r.crisis).toBe(true);
    expect(r.resources).toEqual(expect.arrayContaining(["988", "crisis-text", "emergency"]));
  });
});

describe("Spanish text", () => {
  it("flags thoughts of suicide or self-harm", () => {
    expect(detectCrisis("Me quiero morir")).toBe(true);
    expect(detectCrisis("pienso en quitarme la vida")).toBe(true);
    expect(detectCrisis("ya no quiero vivir")).toBe(true);
    expect(detectCrisis("a veces me lastimo")).toBe(true);
    expect(detectCrisis("pensamientos suicidas")).toBe(true);
    expect(detectCrisis("se murió mi abuela")).toBe(false);
  });

  it("finds topics", () => {
    expect(detectTopics("Me siento mal porque murió mi mamá")).toContain("grief");
    expect(detectTopics("Perdí a mi perro")).toContain("grief");
    expect(detectTopics("Estoy muy estresada con el trabajo")).toEqual(["stress"]);
    expect(detectTopics("me siento sola")).toEqual(["lonely"]);
    expect(detectTopics("tengo mucha ansiedad")).toEqual(["anxious"]);
    expect(detectTopics("estoy triste")).toEqual(["down"]);
    expect(detectTopics("solo quiero dormir")).toEqual([]);
  });
});

describe("Japanese text", () => {
  it("flags thoughts of suicide or self-harm", () => {
    expect(detectCrisis("もう死にたい")).toBe(true);
    expect(detectCrisis("消えたいと思ってしまう")).toBe(true);
    expect(detectCrisis("生きていたくない")).toBe(true);
    expect(detectCrisis("自分を傷つけてしまう")).toBe(true);
    expect(detectCrisis("祖母が亡くなりました")).toBe(false);
  });

  it("finds topics", () => {
    expect(detectTopics("母が亡くなって、つらいです")).toEqual(["grief", "down"]);
    expect(detectTopics("仕事のストレスがひどい")).toEqual(["stress"]);
    expect(detectTopics("とても寂しい")).toEqual(["lonely"]);
    expect(detectTopics("将来が不安です")).toEqual(["anxious"]);
    expect(detectTopics("ずっと落ち込んでいる")).toEqual(["down"]);
    expect(detectTopics("ただ眠りたい")).toEqual([]);
  });
});

describe("Chinese text", () => {
  it("flags thoughts of suicide or self-harm", () => {
    expect(detectCrisis("我想死")).toBe(true);
    expect(detectCrisis("我不想活了")).toBe(true);
    expect(detectCrisis("我真的活不下去了")).toBe(true);
    expect(detectCrisis("我會傷害自己")).toBe(true);
    expect(detectCrisis("我奶奶去世了")).toBe(false);
  });

  it("finds topics", () => {
    expect(detectTopics("我妈妈去世了")).toEqual(["grief"]);
    expect(detectTopics("工作压力好大")).toEqual(["stress"]);
    expect(detectTopics("我觉得很孤独")).toEqual(["lonely"]);
    expect(detectTopics("我很焦虑")).toEqual(["anxious"]);
    expect(detectTopics("最近心情很低落")).toEqual(["down"]);
    expect(detectTopics("只想睡觉")).toEqual([]);
  });
});
