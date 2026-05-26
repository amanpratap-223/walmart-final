# ai-search-engine-flask/generate_embeddings.py

from dotenv import load_dotenv
import os, pickle
import requests
from io import BytesIO
from PIL import Image
import numpy as np
from pymongo import MongoClient
from tensorflow.keras.applications.resnet50 import ResNet50, preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.models import Model

# ─── CONFIG ────────────────────────────────────────────────────────────────────
load_dotenv()  # load MONGO_URI into os.environ
MONGO_URI    = os.getenv("MONGO_URI")
OUTPUT_FILE  = "product_embeddings.pkl"

if not MONGO_URI:
    raise RuntimeError("MONGO_URI not set in .env")

# ─── MONGO SETUP ────────────────────────────────────────────────────────────────
client        = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
db            = client["walmart"]           # your DB name
products_col  = db["products"]              # your products collection

# ─── MODEL SETUP ────────────────────────────────────────────────────────────────
base_model = ResNet50(weights="imagenet", include_top=False, pooling="avg")
model      = Model(inputs=base_model.input, outputs=base_model.output)

# ─── LOAD EXISTING EMBEDDINGS ───────────────────────────────────────────────────
if os.path.exists(OUTPUT_FILE):
    with open(OUTPUT_FILE, "rb") as f:
        embeddings = pickle.load(f)
    print(f"🔁 Loaded {len(embeddings)} existing embeddings")
else:
    embeddings = {}

# ─── FEATURE EXTRACTION ──────────────────────────────────────────────────────────
def extract_features(img_url):
    try:
        resp = requests.get(img_url, timeout=10)
        resp.raise_for_status()
        img = Image.open(BytesIO(resp.content)).convert("RGB").resize((224,224))
        x   = image.img_to_array(img)
        x   = np.expand_dims(x, axis=0)
        x   = preprocess_input(x)
        feat = model.predict(x, verbose=0)
        return feat.flatten()
    except Exception as e:
        print(f"❌ Error on {img_url}: {e}")
        return None

# ─── MAIN: EMBED NEW PRODUCTS ───────────────────────────────────────────────────
new_count = 0
for doc in products_col.find({}, {"_id":1, "image":1}):
    pid = str(doc["_id"])
    url = doc.get("image")
    if not url or pid in embeddings:
        continue
    feat = extract_features(url)
    if feat is not None:
        embeddings[pid] = (feat, url)
        new_count += 1
        print(f"✅ Embedded {pid}")

# ─── SAVE BACK TO DISK ───────────────────────────────────────────────────────────
with open(OUTPUT_FILE, "wb") as f:
    pickle.dump(embeddings, f)

print(f"🎉 Total embeddings: {len(embeddings)} (+{new_count} new)")
