from flask import Flask, render_template,request,url_for, jsonify, request
import sqlite3
from datetime import datetime
import json
from flask_table import Table, Col


debugging = True

app = Flask(__name__)

class ItemTable(Table):
    name = Col('Name')
    description = Col('Description')

# Get some objects
class Item(object):
    def __init__(self, name, description):
        self.name = name
        self.description = description

items = [dict(name='Name1', description='Description1'),
         dict(name='Name2', description='Description2'),
         dict(name='Name3', description='Description3')]

# Populate the table
table = ItemTable(items)

# Print the html
print(table.__html__())
# or just {{ table }} from within a Jinja template


def dbinit():
    con = sqlite3.connect("leaderboard.db")
    query = con.cursor()
    query.execute('''CREATE TABLE IF NOT EXISTS record (
                    name VARCHAR(10),
                    score int
                    );''')
    con.commit()
    query.execute('''SELECT * FROM record;''')
    records = query.fetchall()
    if (debugging):
        print('db initiated')

def sendScoreToDB(winnerName, winnerScore):
    query.execute('''INSERT INTO record (name,score)
                    VALUES (?,?);''', (winnerName, winnerScore))
    con.commit()
    if (debugging):
        print('stored: ' + winnerName + ' : ' + winnerScore)


@app.route('/', methods=["GET"])
def home():
    dbinit()



    return render_template("index.html", highScore = 10, table = table.__html__())



@app.route('/score', methods=["POST"])
def score():
    dict_values = request.get_json()
    print(request)
    print(dict_values)

    return 'OK'




if __name__ == '__main__':
    app.run(use_reloader=False,debug=True)
