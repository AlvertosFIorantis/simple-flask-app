
from flask import Flask, render_template, url_for, redirect , render_template, request, flash, jsonify
from json import load
import pandas as pd
from os import getenv
import json

###imports that i need for the session
from flask_login import (
    LoginManager,
    UserMixin,
    current_user,
    login_required,
    login_user,
    logout_user,
)

app = Flask(__name__)


##### I want to create the json file if it doesnt already exists , if the file exists  it will not create a new one
file = open('users.json','a+')


### I need that for the  session
app.config["SECRET_KEY"] = getenv("SECRET_KEY", default="secret_key_example")
login_manager = LoginManager(app)
login_manager.login_view="home"





class User(UserMixin):
    def __init__(self,id, name, email):
        self.id = email
        self.name = name
        self.email = email
       

    @staticmethod
    def get(user_id):
        ########## where i would store the users
        ################## I want to read the json file every time i call the get user function from the class
        users = {}
        #### kano populate afto to dictioanrly kathe fora pou kano serach to json file
        with open("users.json") as file:
            data = load(file)
            for key in data:
                users[key] = User(
                    id=key,
                    name=data[key]["name"],
                    email=data[key]["email"]
                )
        ###########################################
        print("Users",users)
        return users.get(user_id)

    def __str__(self):
        return f"< name: {self.name}, Email: {self.email}>"

    def __repr__(self) -> str:
        return self.__str__()




@login_manager.user_loader
def load_user(user_id):
    return User.get(user_id)

#######################################

@app.route("/",methods=['GET','POST'])
def home():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        print("Email:",email)
        print("password:",password)

        ######Check if the user exists on the json file
        with open("users.json") as file:
            data = load(file)
        print("data",data)
        if(data.get(email)):
            print("email exists in the json")
        else:
            new_data = {"{0}".format(email):{"email":email,"name":email}}
            print("new data",new_data)
            new_json_data = dict(data, **new_data)
            print("new json data",new_json_data)
            ####write the new json to the file
            with open('users.json', 'w') as txtfile:
                json.dump(new_json_data, txtfile)

        ##### Now i have  to use the flask login to create the  session
        user = User.get(email)
        print("User that i start the session",user)
        login_user(user)
        ### i need the next page in case someone trys to go to protected route if i rederiect them to login screen
        #and then the route they were trying to visit
        next_page = request.args.get('next')
        print("Next page",next_page)
        return redirect(next_page) if next_page else redirect(url_for('cards'))
    else:
        return render_template('loginForm.html')

@app.route("/cards",methods=['GET'])
@login_required
def cards():
    return render_template('cards.html')

@app.route("/data_page")
@login_required
def data_page():

    list = [{"title":"first card tile","content":"Just some random content for card 1"},
            {"title":"second card tile","content":"Just some random content for card 2"}
            ]
    return render_template('another_templat.html',cards=list)

@app.route("/fetch_page")
@login_required
def fetch_page():
    return render_template('fetching_data.html')


@app.route('/get_table_data', methods=['GET'])
@login_required
def get_table_data():

    dataList = [["Alvertos",7,"male","10","blue","21/02/1993"]]*50
    columns=["Name","Progress","Gender","Rating","FavouriteColor","DateOfBirth"]
    df = pd.DataFrame(dataList,columns=columns)
    print(df.head())
    finalData =df.to_json(orient='records')
    response = jsonify(
        data=finalData
    )
    print("Currrent user email: ",current_user.email,"name: ",current_user.name)
    return response



    
@app.route('/search', methods=['GET'])
@login_required
def search():
    return render_template('search.html')
    


@app.route('/open_modal', methods=['GET'])
@login_required
def open_modal():
    return render_template('full_page_modal.html')


@app.route("/logout")
def logout():
    logout_user()
    return redirect(url_for('home'))



if __name__ == "__main__":
    app.run(debug=True)

#Comands to create the project

#python3 -m venv venv
#    . venv/bin/activate
#pip install Flask
#pip install pandas

#python3 app.py


#pip install flask_login

#prepei na diagrapso to venv folder giat einai san to node moddule exei ena skamso paragmat opote kalo tha itan na eixa ena requrement txt na eftiaksaxa ean 
#kainorugio env otan thelo na trekso to app vazo to venv kai kano install apo to requreimetn txt oal ta files