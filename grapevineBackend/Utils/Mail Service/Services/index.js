const { sendMail } = require("../nodemailer");

const sendCodeToUserEmail = async (email, code) => {
  return sendMail(
    email,
    "Comfirmation Code",
    "",
    `<h5>Your comfirmation code is ${code} .</h5>`
  );
};

const confirmEmployment = async (
  employer_email,
  employee_email,
  fullname,
  role,
  url
) => {
  console.log(employer_email, employee_email, fullname, role, url);
  return sendMail(
    employer_email,
    "Confirm Emplooye",
    "",
    `<h5>A user registered as your emplooyer.</h5> 
    <h5>Employee Name : ${fullname}</h5>
    <h5>Employee Email : ${employee_email}</h5>
    <h5>Employee Role : ${role}</h5> 
    <h5>Please Click below link to confirm that the user is your employee</h5>
    <a href="${url}">${url}</a>  
    `
  );
};
module.exports = { sendCodeToUserEmail, confirmEmployment };
