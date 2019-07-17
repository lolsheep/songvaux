from os import listdir
from os.path import isfile, join
import json
mypath = "C:/wamp64/www/vscode/main/music/"
onlyfiles = [f for f in listdir(mypath) if isfile(join(mypath,f))]

obj = open("songs.txt", "wb")

jsonstring =json.dumps(onlyfiles)
obj.write(jsonstring)
obj.close
