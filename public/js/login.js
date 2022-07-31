const email = getById("email");
const password = getById("password");
const submitBtn = getById("login-submit");
const error = document.getElementsByClassName("form-error")[0];

function getById(id) {
  return document.getElementById(id);
}
