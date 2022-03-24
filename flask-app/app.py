from flask import Flask, render_template,request,url_for, jsonify
import sqlite3
from datetime import datetime
import json


app = Flask(__name__)


@app.route('/', methods=["GET","POST"])
def home():
    winnerScore = 500
    winnerName = ''

    con = sqlite3.connect("leaderboard.db")
    query = con.cursor()
    query.execute('''CREATE TABLE IF NOT EXISTS record (
                    name VARCHAR(10),
                    score int
                    );''')
    con.commit()
    query.execute('''INSERT INTO record (name,score)
                    VALUES (?,?);''', (winnerName, winnerScore))
    con.commit()
    query.execute('''SELECT * FROM record;''')
    records = query.fetchall()

    return render_template("index.html")



@app.route('/score', methods=["POST"])
def score():
    received = request.get_json()
    score = json.loads(received) #converts JSON into python dictionary



if __name__ == '__main__':
    app.run(use_reloader=False,debug=True)
