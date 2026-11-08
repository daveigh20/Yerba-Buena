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
