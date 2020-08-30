import pyrebase
import re
import time
import requests
import json
import os
from subprocess import Popen
import sys

Config = {
    "apiKey": "AIzaSyDMjAr_PAC0W1HPDAirQOeF7G_amYlyXew",
    "authDomain": "fireapp-193e2.firebaseapp.com",
    "databaseURL": "https://fireapp-193e2.firebaseio.com",
    "projectId": "fireapp-193e2",
    "storageBucket": "fireapp-193e2.appspot.com",
    "messagingSenderId": "1086523287217",
    "appId": "1:1086523287217:web:015231585f5a27c2056490"
}
firefoxCommand = "web-ext run --firefox-profile={} --start-url=https://www.youtube.com/playlist?list=WL"
Email = ""
db = None
def UploadLinkToFirebase(link, db):
    global Email
    print("email ID ", Email, link)
    db.child(Email).update({"WLPlaylistLink": link})

def readLinkFromFile():
    global db
    i = 1
    while(i):
        try:
            with open("sharedtext.txt","r+") as f:
                link = f.read()
                if(len(link) > 3):
                    i = 0
                    UploadLinkToFirebase(link, db)
        except:
            pass

def ExtractLink(event):
    global Email
    fpath = None
    Email = event["path"].split("/")[1]
    if("rathiammaar@gmaildotcom" == Email):
        fpath = os.path.join(os.getcwd(), "rathiammagmaildotcom.bat")
    elif("yeshasyesodharan@gmaildotcom == email"):
        fpath = os.path.join(os.getcwd(), "yeshasyesodharandotcom.bat")
    elif("yyesodharanyeshas93@gmaildotcom == email"):
        fpath = os.path.join(os.getcwd(), "yesodharanyeshas93dotcom.bat")
    sys.stdout.buffer.flush()
    print(fpath)
    if(fpath is not None): 
        os.system("start cmd /K {}".format(fpath))
    time.sleep(10)
    readLinkFromFile()


def ExtractWLLink(event):
    if event["event"] == "put" and event["data"] == True:
        ExtractLink(event)
    else:
        print("condition failed")


def listener(event):
    print(event["event"], event["path"], event["data"])
    ExtractWLLink(event)

def init():
    global db
    # initialize firebase app
    firebase = pyrebase.initialize_app(Config)

    # initialize database variable
    db = firebase.database()

    # assign a change listener for the root element for the database
    db.child().stream(listener)

    # to be removed later: just printing the data in the database
    dbbData = db.child().get()
    for ele in dbbData.each():
        print(ele.key(), ele.val())

init()
