import hashlib
import random

def find_input_value():
    while True:
        input_value = ("zero2hero+" + str(random.randint(0, 1000000000000))).encode('utf-8')  # generate random input value (int)
        hash_value = hashlib.sha256(input_value).hexdigest()
        if hash_value[:5] == '00000':  # check if the hash has 5 leading zeros
            return input_value.decode('utf-8')  # return the input value as a string


result = find_input_value()
print(result)

# check_hash = hashlib.sha256(("PASTE_YOUR_RESULT").encode('utf-8')).hexdigest()
# print(check_hash)