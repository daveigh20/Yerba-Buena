"""
Herb & Tea Benefits search.

Source: The Tea House on Los Rios, "The Power of Tea: 100 Health and Wellness Benefits"
https://theteahouseonlosrios.com/blogs/news/the-power-of-tea-100-health-and-wellness-benefits

Usage
-----
Streamlit section in your app:
    from herb_search import render
    render()                      # call anywhere in your Streamlit script

Standalone Streamlit page:   streamlit run herb_search.py
Command line:                python herb_search.py ginger
Plain Python (any framework): from herb_search import search
"""
from collections import defaultdict

SOURCE_URL = (
    "https://theteahouseonlosrios.com/blogs/news/"
    "the-power-of-tea-100-health-and-wellness-benefits"
)
DISCLAIMER = (
    "These are traditional and general wellness claims from a tea retailer, "
    "not medical advice. Talk with a healthcare professional before using herbs, "
    "especially if you're pregnant, nursing, or taking medication."
)

# Format: "Benefit|herb, herb". The blog lists benefit -> teas; build_index() inverts it
# to herb -> benefits. Generic entries ("any hot tea", "social rituals", "enjoyment") are left out.
RAW = """Help with sleep|chamomile
Settle stomach|peppermint
Relaxation and stress relief|chamomile, lavender
Digestive aid|peppermint, ginger
Hydration|green, white
Boosting immunity|echinacea, elderberry
Energy and alertness|black, green
Weight management|green, oolong
Antioxidant source|green, white
Hygiene and oral health|peppermint, green
Mood enhancement|lavender, chamomile
Mental focus and concentration|matcha
Detoxification and cleansing|dandelion root, milk thistle
Cold and flu relief|ginger
Allergy relief|nettle
Sore throat soothing|licorice root, slippery elm
Headache relief|peppermint, chamomile
Heart health support|hibiscus, green
Anti-inflammatory effects|ginger, turmeric
Skin health improvement|rooibos, green
Anti-aging properties|white, green
Respiratory health improvement|eucalyptus, thyme
Joint and muscle pain relief|turmeric, ginger
Menstrual cramp relief|chamomile, ginger
Blood sugar regulation|green, cinnamon
Caffeine replacement|rooibos, chamomile
Hangover remedy|ginger, peppermint
Kidney health support|dandelion root, nettle
Liver health support|milk thistle, dandelion root
Eye health improvement|bilberry, green
Memory and cognitive enhancement|ginseng, ginkgo biloba
Nervous system support|lemon balm, passionflower
Hormonal balance|red clover, chasteberry
Appetite control|peppermint, green
Anti-anxiety effects|lavender, chamomile
Anti-depressant effects|st. john's wort, lemon balm
Cancer prevention|green, white
Blood pressure regulation|hibiscus, green
Cholesterol reduction|green, black
Diuretic effects|dandelion root, nettle
Oral hygiene improvement|peppermint, green
Weight loss aid|green, oolong
Improved digestion|peppermint, ginger
Bone health support|nettle, chamomile
Anti-bacterial properties|green, black
Anti-viral properties|echinacea, elderberry
Anti-fungal properties|pau d'arco, chamomile
Anti-parasitic properties|wormwood, black walnut
Hangover prevention|cactus, artichoke
Alleviating motion sickness|ginger, peppermint
Detoxifying effects|dandelion root, milk thistle
Brain function improvement|ginseng, green
Relaxation before meditation or yoga|chamomile, lavender
Calming nerves before public speaking|chamomile, lemon balm
Pre- and post-workout hydration|green
Reducing sugar cravings|licorice root, cinnamon
Skin complexion improvement|rooibos, green
Reducing bloating and gas|peppermint, ginger
Easing arthritis symptoms|turmeric, ginger
Improving hair health|nettle, green
Supporting healthy weight gain|rooibos, oat straw
Boosting metabolism|green, oolong
Aid in quitting smoking|lobelia, peppermint
Alleviating morning sickness|ginger, lemon balm
Soothing sunburned skin|chamomile, green
Alleviating allergy symptoms|nettle, chamomile
Managing diabetes|green, cinnamon
Supporting healthy digestion in infants|fennel, chamomile
Easing PMS symptoms|chamomile, ginger
Supporting breastfeeding|fennel, fenugreek
Reducing inflammation in the body|ginger, turmeric
Improving circulation|ginger, hawthorn
Relieving muscle tension|peppermint, chamomile
Managing irritable bowel syndrome (IBS)|peppermint, chamomile
Easing asthma symptoms|ginger, chamomile
Boosting collagen production|rooibos, green
Supporting healthy pregnancy|red raspberry leaf, nettle
Alleviating menopause symptoms|black cohosh, red clover
Enhancing nutrient absorption|rooibos, green
Supporting liver detoxification|dandelion root, milk thistle
Aiding in weight maintenance|green
Enhancing athletic performance|matcha, beetroot
Reducing water retention|dandelion root, nettle
Promoting healthy hair growth|nettle, green
Supporting healthy aging|white, green
Enhancing metabolism during exercise|green, oolong
Boosting natural detoxification processes|dandelion root, milk thistle
Improving gut health|peppermint, chamomile
Boosting the immune response|echinacea, elderberry
Improving cardiovascular health|hibiscus, green
Enhancing respiratory function|eucalyptus, thyme
Alleviating muscle soreness after exercise|ginger, chamomile
Promoting mental clarity and focus|matcha, ginkgo biloba
Supporting a healthy gut microbiome|peppermint, ginger
Easing chronic pain|turmeric, ginger
Promoting overall well-being|green
Enhancing the body's natural defenses|green, black"""

TRUE_TEAS = {"green", "white", "black", "oolong", "rooibos", "matcha"}


def build_index(raw: str = RAW) -> list[dict]:
    """Invert 'benefit -> herbs' lines into a sorted list of herb records."""
    herbs = defaultdict(list)
    for line in raw.strip().splitlines():
        benefit, names = line.split("|")
        for name in names.split(","):
            herbs[name.strip()].append(benefit.strip())
    index = []
    for key, benefits in herbs.items():
        is_tea = key in TRUE_TEAS
        index.append(
            {
                "key": key,
                "name": key.title() + (" Tea" if is_tea else ""),
                "type": "True tea" if is_tea else "Herbal",
                "benefits": benefits,
            }
        )
    return sorted(index, key=lambda h: h["name"])


INDEX = build_index()


def search(query: str) -> list[dict]:
    """
    Match herbs by name or by benefit text (case-insensitive).
    Each result has 'benefits' (what to display) and 'total_benefits'.
    If the herb name matched, all its benefits are shown; otherwise only matching ones.
    """
    q = query.strip().lower()
    if not q:
        return [{**h, "total_benefits": len(h["benefits"])} for h in INDEX]
    results = []
    for h in INDEX:
        name_hit = q in h["key"] or q in h["name"].lower()
        matched = [b for b in h["benefits"] if q in b.lower()]
        if name_hit or matched:
            results.append(
                {
                    **h,
                    "benefits": h["benefits"] if name_hit else matched,
                    "total_benefits": len(h["benefits"]),
                }
            )
    return results


# ---------------------------------------------------------------- Streamlit UI
def render(key_prefix: str = "herb") -> None:
    """Drop-in Streamlit section: search box + result cards."""
    import streamlit as st

    st.subheader("Herb & Tea Benefits")
    st.caption('Search by herb (e.g. "ginger") or by benefit (e.g. "sleep", "digestion").')
    query = st.text_input("Search herbs or benefits", key=f"{key_prefix}_query",
                          placeholder="Search herbs or benefits…")
    results = search(query)
    st.caption(f"{len(results)} result{'s' if len(results) != 1 else ''}")

    if not results:
        st.info("No matches. Try a different herb or benefit.")

    cols = st.columns(2)
    for i, h in enumerate(results):
        with cols[i % 2].container(border=True):
            st.markdown(f"**{h['name']}**  \n:green-badge[{h['type']}]")
            st.markdown("\n".join(f"- {b}" for b in h["benefits"]))
            extra = h["total_benefits"] - len(h["benefits"])
            if extra > 0:
                st.caption(f"+{extra} more benefits")

    st.caption(
        f"Source: [The Tea House on Los Rios, “The Power of Tea: 100 Health and "
        f"Wellness Benefits”]({SOURCE_URL}). {DISCLAIMER}"
    )


# ------------------------------------------------------------------------ CLI
def _cli(argv: list[str]) -> None:
    query = " ".join(argv)
    results = search(query)
    print(f"{len(results)} result(s)\n")
    for h in results:
        print(f"{h['name']} ({h['type']})")
        for b in h["benefits"]:
            print(f"  - {b}")
        extra = h["total_benefits"] - len(h["benefits"])
        if extra > 0:
            print(f"  (+{extra} more)")
        print()
    print(f"Source: {SOURCE_URL}\n{DISCLAIMER}")


def _running_in_streamlit() -> bool:
    try:
        from streamlit.runtime.scriptrunner import get_script_run_ctx
        return get_script_run_ctx() is not None
    except Exception:
        return False


if __name__ == "__main__" or _running_in_streamlit():
    import sys

    if _running_in_streamlit():
        render()
    else:
        _cli(sys.argv[1:])
