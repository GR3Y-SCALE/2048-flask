from flask import Flask, render_template,request,url_for, jsonify, request
import sqlite3
from datetime import datetime
import json
import itertools


debugging = True

app = Flask(__name__)


'''items = [dict(name='Name1', description='Description1'),
         dict(name='Name2', description='Description2'),
         dict(name='Name3', description='Description3'),
         dict(name='Name2', description='Description2'),
         dict(name='Name3', description='Description3'),
         dict(name='Name2', description='Description2'),
         dict(name='Name3', description='Description3'),
         dict(name='Name2', description='Description2'),
         dict(name='Name3', description='Description3')]'''

def dbinit():
    con = sqlite3.connect("leaderboard.db")
    query = con.cursor()
    query.execute('''CREATE TABLE IF NOT EXISTS record (
                    name VARCHAR(10),
                    score int
                    );''')
    con.commit()
    if (debugging):
        print('db initiated')

def sendScoreToDB(winnerName, winnerScore):
    con = sqlite3.connect("leaderboard.db")
    query = con.cursor()
    query.execute('''INSERT INTO record (name,score)
                    VALUES (?,?);''', (winnerName, winnerScore))
    con.commit()
    if (debugging):
        print('stored: ' + winnerName + ' : ' + str(winnerScore))

def getScoreDB():
    con = sqlite3.connect("leaderboard.db")
    query = con.cursor()
    query.execute('''SELECT * FROM record;''')
    records = query.fetchall()
    if (debugging):
        print(str(records))
    return records

@app.route('/', methods=["GET"])
def home():
    dbinit()


    items = getScoreDB()
    items = items[:5] #top 5 players



    return render_template("index.html", highScore = 10, items = items)



@app.route('/score', methods=["POST"])
def score():
    dict_values = request.get_json()
    print(request)
    print(dict_values)

    return 'OK'




if __name__ == '__main__':
    app.run(use_reloader=False,debug=True)
