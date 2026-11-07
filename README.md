# Herb & Tea Benefits Search

A searchable lookup of herbs and teas and their traditional wellness benefits.
Search by herb (e.g. "ginger") or by benefit (e.g. "sleep").

## Files
- `herb_search.py` – Python version (search logic, Streamlit section, command-line tool)
- `HerbSearch.jsx` – React version (uses Tailwind classes)
- `requirements.txt` – Python dependencies (Streamlit)

## Python usage
```bash
pip install -r requirements.txt
streamlit run herb_search.py        # standalone page
python herb_search.py ginger        # command line
```
In an existing Streamlit app:
```python
from herb_search import render
render()
```
For other frameworks, use `from herb_search import search`.

## React usage
Copy `HerbSearch.jsx` into your project and render `<HerbSearch />`.

## Source
Data adapted from The Tea House on Los Rios, "The Power of Tea: 100 Health and Wellness Benefits":
https://theteahouseonlosrios.com/blogs/news/the-power-of-tea-100-health-and-wellness-benefits

These are traditional and general wellness claims from a tea retailer, not medical advice.
Talk with a healthcare professional before using herbs, especially if you're pregnant,
nursing, or taking medication.
