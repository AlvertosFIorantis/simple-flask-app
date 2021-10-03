
from flask import Flask, render_template, url_for, redirect , render_template, request, flash, jsonify
import json
import pandas as pd

app = Flask(__name__)

@app.route("/")
def home():
    return render_template('index.html')

@app.route("/data_page")
def data_page():

    list = [{"title":"first card tile","content":"Just some random content for card 1"},
            {"title":"second card tile","content":"Just some random content for card 2"}
            ]
    return render_template('another_templat.html',cards=list)

@app.route("/fetch_page")
def fetch_page():
    return render_template('fetching_data.html')


@app.route('/get_table_data', methods=['GET'])
def get_table_data():

    dataList = [["Alvertos",7,"male","10","blue","21/02/1993"]]*50
    columns=["Name","Progress","Gender","Rating","FavouriteColor","DateOfBirth"]
    df = pd.DataFrame(dataList,columns=columns)
    print(df.head())
    finalData =df.to_json(orient='records')
    response = jsonify(
        data=finalData
    )
    return response

if __name__ == "__main__":
    app.run(debug=True)

#Comands to create the project

#python3 -m venv venv
#    . venv/bin/activate
#pip install Flask


#python3 app.py


#prepei na diagrapso to venv folder giat einai san to node moddule exei ena skamso paragmat opote kalo tha itan na eixa ena requrement txt na eftiaksaxa ean 
#kainorugio env otan thelo na trekso to app vazo to venv kai kano install apo to requreimetn txt oal ta files