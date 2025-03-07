from flask import Flask, render_template, request, redirect, url_for, flash, jsonify, session
import sqlite3

app = Flask(__name__)
app.secret_key = '1234'

# Création database
def init_db():
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS form_data
              (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, email TEXT, password TEXT)''')
    conn.commit()
    conn.close()

# Lancement de la page
@app.route('/')
def index():
    return render_template('index.html')

# page connexion
@app.route('/connexion', methods=['POST', 'GET'])
def login():
    if request.method == "POST":
        data = request.get_json()
        email = data['email']
        password = data['password']

        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute("SELECT * FROM form_data WHERE email = ? AND password = ?", (email, password))
        result = c.fetchone()
        conn.close()

        if result:
            session['user_id'] = result[0]
            flash('Connexion réussie!', 'success')
            return jsonify({'message': 'Connexion réussie!'})
        else:
            return jsonify({'message': 'Email ou mot de passe incorrect!'}), 401

    return render_template('connexion.html')

# page accueil
@app.route('/accueil', methods=['POST', 'GET'])
def accueil():
    if 'user_id' not in session:
        flash('Vous devez être connecté pour accéder à cette page.', 'danger')
        return redirect(url_for('login'))

    if request.method == "POST":
        return jsonify({'message': 'Vous êtes connecté'})
    return render_template('accueil.html')

# déconnexion
@app.route('/deconnexion')
def logout():
    session.pop('user_id', None)
    flash('Vous êtes déconnecté.', 'success')
    return redirect(url_for('login'))

# collecte des données vers database
@app.route('/index', methods=['POST', 'GET'])
def submit():
    if request.method == "POST":
        data = request.get_json()
        nom = data['nom']
        email = data['email']
        password = data['password']
        password_confirmation = data['passwordConfirmation']

        if password != password_confirmation:
            return jsonify({'message': 'Les mots de passe ne correspondent pas!'}), 400

        print(f"Reçu: {data}")

        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute("SELECT * FROM form_data WHERE email = ?", (email,))
        result = c.fetchone()

        if result:
            return jsonify({'message': 'Email déjà utilisé!'}), 409
        else:
            c.execute("INSERT INTO form_data (nom, email, password) VALUES(?, ?, ?)", (nom, email, password))
        conn.commit()
        conn.close()
        return jsonify({'message': 'Inscription réussie!'}), 201
    
    return render_template('index.html')

# page de profil
@app.route('/user-data', methods=['GET'])
def user_data():
    if request.method == 'GET':
        conn = sqlite3.connect('database.db')
        c = conn.cursor()
        c.execute("SELECT * FROM form_data WHERE id = ?", (session['user_id'],))
        result = c.fetchone()
        conn.close()

        if result:
            return jsonify({'id': result[0], 'nom': result[1], 'email': result[2], 'password': result[3]})
        else:
            return jsonify({'message': 'Utilisateur non trouvé!'}), 404
        
# modifier le profil
@app.route('/modify', methods=['POST'])
def modify():
    if 'user_id' not in session:
        return jsonify({'message': 'Vous devez être connecté pour modifier votre profil!'}), 401

    data = request.get_json()
    nom = data['nom']
    email = data['email']
    password = data['password']
    password_confirmation = data['passwordConfirmation']

    if password != password_confirmation:
        return jsonify({'message': 'Les mots de passe ne correspondent pas!'}), 400

    print(f"Reçu: {data}")

    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    c.execute("UPDATE form_data SET nom = ?, email = ?, password = ? WHERE id = ?", (nom, email, password, session['user_id']))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Profil mis à jour avec succès!'})

# lancement des programmes
if __name__ == "__main__":
    init_db()
    app.run(debug=True, port=5000)