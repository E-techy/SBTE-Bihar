# SBTE-Bihar

This is a simple website which resembles the website https://sbteonline.in

# It contains a simple homepage .
# In this users can register to the website using their email ID. It uses OTP to verify the users . 
Then the entered details are saved in a mongoDB database. If the user correctly verifies the OTP.

It contains a page where notices can pe set and a page where the syllabus of different semesters can be seen.


# How to start

Clone the repository
run npm install
then create a .env file containing the required credentials
1.PORT
2.MONGO_DB_USERNAME
3.MONGO_DB_PASSWORD
4.GMAIL_PASSWORD   It is the password for using your gmail account from a third party website. You can create this password using your gmail account.
5.GMAIL_ID          Your gmail ID which is used to send OTP to users to verify them
to log in to the mongoDB database.
then after saving the env file run
#npm start

Now the server will be listening on port you have specified in the .env file 
go to that port using http://localhost:PORT;
