from flask import Flask, url_for, render_template, request, redirect, make_response, jsonify, flash
import json
from flaskext.mysql import MySQL
import yaml
import threading
from flask import request
from flask import jsonify

app = Flask(__name__, static_folder='static',
            template_folder='templates')

db = yaml.safe_load(open('db.yaml'))
app.config['MYSQL_DATABASE_HOST'] = db['mysql_host']
app.config['MYSQL_DATABASE_USER'] = db['mysql_user']
app.config['MYSQL_DATABASE_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DATABASE_DB'] = db['mysql_db']
app.config['MYSQL_DATABASE_AUTH_PLUGIN'] = db['mysql_auth_plugin']

mysql = MySQL()

mysql.init_app(app)
connection = mysql.connect()
mouseList = []

lock = threading.Lock()
count = 0

@app.route('/')
@app.route('/Willkommen', methods=['GET', 'POST'])


def index():
    return render_template('Einfuehrung.html')



@app.route('/Aufgabenstellung1', methods=['GET', 'POST'])
def Aufgabenstellung1():

    req = request.get_json()
    str = json.dumps(req);
    ipAddress = request.remote_addr
    mergeIpEntry(str, ipAddress)
    return render_template("Aufgabenstellung1.html")


@app.route('/Aufgabe1', methods=['GET', 'POST'])
def Aufgabe1():
    req = request.get_json()
    str = json.dumps(req);
    ipAddress = request.remote_addr
    mergeIpEntry(str,ipAddress)
    return render_template("Aufgabe1.html")


@app.route('/Aufgabe1_geschafft', methods=['GET', 'POST'])
def Aufgabe1_geschafft():
    req = request.get_json()
    str = json.dumps(req);
    ipAddress = request.remote_addr
    mergeIpEntry(str, ipAddress)
    return render_template("Aufgabe1_geschafft.html")


@app.route('/Aufgabenstellung2', methods=['GET', 'POST'])
def Aufgabenstellung2():
    req = request.get_json()
    str = json.dumps(req);
    ipAddress = request.remote_addr
    mergeIpEntry(str, ipAddress)
    return render_template("Aufgabenstellung2.html")


@app.route('/Aufgabe2', methods=['GET', 'POST'])
def Aufgabe2():
    req = request.get_json()
    str = json.dumps(req);
    ipAddress = request.remote_addr
    mergeIpEntry(str, ipAddress)
    return render_template("Aufgabe2.html")


@app.route('/Aufgabe2_geschafft', methods=['GET', 'POST'])
def Aufgabe2_geschafft():
    req = request.get_json()
    str = json.dumps(req);
    ipAddress = request.remote_addr
    mergeIpEntry(str, ipAddress)
    return render_template("Aufgabe2_geschafft.html")


@app.route('/Aufgabenstellung3', methods=['GET', 'POST'])
def Aufgabenstellung3():
    req = request.get_json()
    str = json.dumps(req);
    ipAddress = request.remote_addr
    mergeIpEntry(str, ipAddress)
    return render_template("Aufgabenstellung3.html")


@app.route('/Aufgabe3', methods=['GET', 'POST'])
def Aufgabe3():
    req = request.get_json()
    str = json.dumps(req);
    ipAddress = request.remote_addr
    mergeIpEntry(str, ipAddress)
    return render_template("Aufgabe3.html")


@app.route('/Aufgabe3_geschafft', methods=['GET', 'POST'])
def Aufgabe3_geschafft():
    return render_template("Aufgabe3_geschafft.html")

#parse the merged rawdata
def parseEntry(mData):
    lock.acquire()
    mData2 = mData
    a = ""
    user_ID = ""
    event_type = ""
    element_ID = ""
    timestamp = ""
    coordinates = ""
    textinput_length = ""
    imageFile_name = ""
    slider_range = ""
    checkbox_state = ""

    a = parseElement(mData)
    user_ID = a[0]
    mData = a[1]
    a = parseElement(mData)
    event_type = a[0]
    mData = a[1]
    a = parseElement(mData)
    element_ID = a[0]
    mData = a[1]
    a = parseElement(mData)
    timestamp = a[0]
    mData = a[1]
    a = parseElement(mData)
    coordinates = a[0]
    mData = a[1]
    a = parseElement(mData)
    textinput_length = a[0]
    mData = a[1]
    a = parseElement(mData)
    imageFile_name = a[0]
    mData = a[1]
    a = parseElement(mData)
    slider_range = a[0]
    mData = a[1]
    if mData == "":
        checkbox_state = None
    else:
        checkbox_state = mData
    cursor = connection.cursor()
    if user_ID is None:
        user_ID = ""
#send the parsed data to mysql
    cursor.execute(
        "INSERT INTO dataentry(user_ID, event_type, element_ID, timestamp, coordinates, textinput_length, imageFile_name, slider_range, checkbox_state)"
        "VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s)", (
        user_ID, event_type, element_ID, timestamp, coordinates, textinput_length, imageFile_name, slider_range,
        checkbox_state))
    connection.commit()
    cursor.close()
    lock.release()


def mergeIpEntry(str, ipAddress):
    ip2 = ""
    for i in ipAddress:
        ip2 = ip2 + i
    if str != 'null':
        str = str[1:]
        str = str[:-1]
        stra = ip2 + str
        print(stra)
        parseEntry(stra)

def parseElement(mData2):
    element = ""
    if mData2[0] == ",":
        element = None
        mData2 = mData2[1:]
    else:
        for i in range(len(mData2)):
            if mData2[i] != ',':
                continue
            if mData2[i] == ",":
                element = mData2[:i]
                mData2 = mData2[i+1:]
            break;
    return [element, mData2]


if __name__ == '__main__':
    
    app.run(host='0.0.0.0')

