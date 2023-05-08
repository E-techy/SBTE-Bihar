function checkRegistrationValidity(req) {
    let emailAddress=req.query.email;
    let phoneNumber=req.query.phone;
    let registrationNumber=req.query.regnumber;
    let name=req.query.name;
    let dateOfBirth=req.query.dob;
    let username=req.query.username;
    let password=req.query.password;
    let registrationTime=new Date().getTime();
   
     user={
      email_address: emailAddress,
      phone_number: phoneNumber,
      registration_number: registrationNumber,
      name: name,
      date_of_birth: dateOfBirth,
      username: username,
      password: password,
      registration_time: registrationTime
    }
  
    return user;
  }

  module.exports= checkRegistrationValidity;