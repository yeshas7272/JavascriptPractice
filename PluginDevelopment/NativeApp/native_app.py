import nativemessaging as nm
message = ""
while True:
    message = nm.get_message()
    nm.send_message(nm.encode_message(message))
    if message != None:
        with open("sharedtext.txt","w") as f:
            f.write(message)
            message = None