from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from pymongo import MongoClient
from datetime import datetime, timedelta
import os

# =====================================================
# APP INITIALIZATION
# =====================================================
app = Flask(
    __name__,
    template_folder="templates",
    static_folder="static"
)
CORS(app)

# =====================================================
# DATABASE CONNECTION (Render + Local Compatible)
# =====================================================
MONGO_URI = os.environ.get("MONGO_URI")

if MONGO_URI:
    client = MongoClient(MONGO_URI)
else:
    client = MongoClient("mongodb://localhost:27017/")

db = client["herhealth"]
users = db["users"]

# =====================================================
# HELPER FUNCTIONS
# =====================================================
def calculate_risk(score):
    if score >= 6:
        return "High"
    elif score >= 3:
        return "Moderate"
    else:
        return "Low"


def save_assessment(email, disease, inputs, score):
    risk = calculate_risk(score)

    users.update_one(
        {"email": email},
        {"$push": {
            "assessments": {
                "type": disease,
                "inputs": inputs,
                "score": score,
                "risk": risk,
                "date": datetime.now()
            }
        }}
    )

    return risk

# =====================================================
# FRONTEND ROUTES
# =====================================================
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/login")
def login_page():
    return render_template("login.html")

@app.route("/signup")
def signup_page():
    return render_template("signup.html")

@app.route("/dashboard")
def dashboard_page():
    return render_template("dashboard.html")

@app.route("/breast-cancer")
def breast_page():
    return render_template("breast-cancer.html")

@app.route("/pcos")
def pcos_page():
    return render_template("pcos.html")

@app.route("/anemia")
def anemia_page():
    return render_template("anemia.html")

@app.route("/period")
def period_page():
    return render_template("period.html")

@app.route("/nutrition")
def nutrition_page():
    return render_template("nutrition.html")

@app.route("/symptom")
def symptom_page():
    return render_template("symptom.html")

# =====================================================
# API ROUTES
# =====================================================

# REGISTER
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data received"}), 400

    if users.find_one({"email": data["email"]}):
        return jsonify({"message": "User already exists"}), 400

    users.insert_one({
        "name": data["name"],
        "age": int(data["age"]),
        "email": data["email"],
        "password": data["password"],
        "periods": [],
        "assessments": []
    })

    return jsonify({"message": "User registered successfully"}), 201


# LOGIN
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No data received"}), 400

    user = users.find_one({
        "email": data["email"],
        "password": data["password"]
    })

    if user:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


# PERIOD TRACKER
@app.route("/api/add_period", methods=["POST"])
def add_period():
    data = request.get_json()

    last_date = datetime.strptime(data["last_period"], "%Y-%m-%d")
    next_date = last_date + timedelta(days=int(data["cycle_length"]))

    users.update_one(
        {"email": data["email"]},
        {"$push": {
            "periods": {
                "last_period_date": data["last_period"],
                "cycle_length": int(data["cycle_length"]),
                "predicted_next_period": next_date.strftime("%Y-%m-%d"),
                "date_added": datetime.now()
            }
        }}
    )

    return jsonify({
        "message": "Period saved successfully",
        "predicted_next_period": next_date.strftime("%Y-%m-%d")
    }), 200


# BREAST CANCER
@app.route("/api/breast_cancer", methods=["POST"])
def breast_cancer():
    data = request.get_json()
    score = 0

    if data.get("lump") == "yes": score += 3
    if data.get("family_history") == "yes": score += 2
    if data.get("nipple_discharge") == "yes": score += 2
    if data.get("pain") == "yes": score += 1
    if data.get("skin_dimpling") == "yes": score += 2
    if data.get("swelling") == "yes": score += 1
    if data.get("redness") == "yes": score += 1

    risk = save_assessment(data["email"], "Breast Cancer", data, score)

    return jsonify({"risk": risk, "score": score})


# PCOS
@app.route("/api/pcos", methods=["POST"])
def pcos():
    data = request.get_json()
    score = 0

    if data.get("irregular_periods") == "yes": score += 2
    if data.get("acne") == "yes": score += 2
    if data.get("weight_gain") == "yes": score += 2
    if data.get("hair_thinning") == "yes": score += 1
    if data.get("mood_swings") == "yes": score += 1
    if data.get("dark_patches") == "yes": score += 2

    risk = save_assessment(data["email"], "PCOS", data, score)

    return jsonify({"risk": risk, "score": score})


# PCOD
@app.route("/api/pcod", methods=["POST"])
def pcod():
    data = request.get_json()
    score = 0

    if data.get("irregular_periods") == "yes": score += 2
    if data.get("acne") == "yes": score += 2
    if data.get("weight_gain") == "yes": score += 2
    if data.get("hair_growth") == "yes": score += 2

    risk = save_assessment(data["email"], "PCOD", data, score)

    return jsonify({"risk": risk, "score": score})


# IRON DEFICIENCY
@app.route("/api/iron_deficiency", methods=["POST"])
def iron_deficiency():
    data = request.get_json()
    score = 0

    if data.get("fatigue") == "yes": score += 2
    if data.get("pale_skin") == "yes": score += 2
    if data.get("dizziness") == "yes": score += 2
    if data.get("hair_fall") == "yes": score += 1
    if data.get("shortness_of_breath") == "yes": score += 2
    if data.get("heavy_periods") == "yes": score += 2
    if data.get("brittle_nails") == "yes": score += 1

    risk = save_assessment(data["email"], "Iron Deficiency", data, score)

    return jsonify({"risk": risk, "score": score})


# =====================================================
# RUN
# =====================================================
if __name__ == "__main__":
    app.run()