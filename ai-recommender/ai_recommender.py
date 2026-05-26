from flask import Flask, request, jsonify
from flask_cors import CORS                        # ← 1) import
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
import requests, threading, time, os

app = Flask(__name__)
CORS(app)                                          # ← 2) enable

# load your embedding model once
model = SentenceTransformer('all-MiniLM-L6-v2')

def fetch_catalog():
    try:
        api_url = os.environ.get("MAIN_API_URL", "http://localhost:9000")
        resp = requests.get(f"{api_url}/api/products/titles")
        return resp.json()['titles']
    except Exception as e:
        print("⚠️ fetch_catalog failed:", e)
        return []

# initial embed
catalog = fetch_catalog()
catalog_emb = model.encode(catalog)

# refresh every 10 min (optional)
def _refresher():
    global catalog, catalog_emb
    while True:
        catalog = fetch_catalog()
        catalog_emb = model.encode(catalog)
        time.sleep(600)
threading.Thread(target=_refresher, daemon=True).start()

@app.route('/recommend', methods=['POST'])
def recommend():
    wishlist = request.json.get('wishlist', [])
    if not wishlist or not catalog:
        return jsonify([])

    wish_emb = model.encode(wishlist)
    wish_emb = np.mean(wish_emb, axis=0, keepdims=True)
    sims = cosine_similarity(wish_emb, catalog_emb)[0]
    idxs = np.argsort(-sims)

    out = []
    for i in idxs:
        name = catalog[i]
        if name not in wishlist:
            out.append(name)
        if len(out) == 3:
            break
    return jsonify(out)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5001))
    app.run(host="0.0.0.0", port=port)
