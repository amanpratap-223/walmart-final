# ai-search-engine-flask/app.py

from dotenv import load_dotenv
import os, pickle
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
from io import BytesIO
from sklearn.metrics.pairwise import cosine_similarity
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Model

# ─── CONFIG ────────────────────────────────────────────────────────────────────
load_dotenv()
OUTPUT_FILE = "product_embeddings.pkl"

# ─── FLASK SETUP ───────────────────────────────────────────────────────────────
app = Flask(__name__)
CORS(app)

# ─── LOAD RESNET50 FOR INFERENCE ────────────────────────────────────────────────
base_model = ResNet50(weights="imagenet", include_top=False, pooling="avg")
model      = Model(inputs=base_model.input, outputs=base_model.output)

# ─── LOAD PRE-COMPUTED EMBEDDINGS ───────────────────────────────────────────────
with open(OUTPUT_FILE, "rb") as f:
    product_db = pickle.load(f)
# product_db: { productId: (features_array, imageUrl) }

# stack features into one NumPy array for fast vec search
ids, feats, urls = zip(*[
    (pid, data[0], data[1]) for pid, data in product_db.items()
])
feats = np.stack(feats, axis=0)

# ─── HELPERS ────────────────────────────────────────────────────────────────────
def extract_query_features(img_bytes):
    img = Image.open(BytesIO(img_bytes)).convert("RGB").resize((224,224))
    x   = image.img_to_array(img)
    x   = np.expand_dims(x, axis=0)
    x   = preprocess_input(x)
    return model.predict(x, verbose=0).flatten()

# ─── ENDPOINT ───────────────────────────────────────────────────────────────────
@app.route("/search", methods=["POST"])
def search_image():
    if "image" not in request.files:
        return jsonify({ "error": "Image file is missing" }), 400

    img_file      = request.files["image"]
    query_feat    = extract_query_features(img_file.read())
    sims          = cosine_similarity([query_feat], feats)[0]
    top_indices   = np.argsort(-sims)[:5]

    results = []
    for idx in top_indices:
        results.append({
            "productId": ids[idx],
            "imageUrl":  urls[idx],
            "score":     float(sims[idx])
        })
    return jsonify(results)

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5002))
    app.run(host="0.0.0.0", port=port)
