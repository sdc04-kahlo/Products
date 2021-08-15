# send all csv files to EC2 instance
scp -i secret_key.pem -r csv-full ubuntu@3.144.72.44:~/Products/
