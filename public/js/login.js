const email = getById("email");
const password = getById("password");
const submitBtn = getById("login-submit");
const error = document.getElementsByClassName("form-error")[0];

// submitBtn.addEventListener("click", async () => {
//   const emailVal = email.value;
//   const passwordVal = password.value;

//   const data = {
//     email: emailVal,
//     password: passwordVal,
//   };

//   fetch("/login", {
//     method: "POST",
//     body: JSON.stringify(data),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   })
//     .then((data) => {
//       if (data.status == 200) {
//         return data.json();
//       } else if (data.status == 401) {
//         error.innerHTML = "Invalid Credentials";
//       } else if (data.status == 404) {
//         error.innerHTML = "User Not Found";
//       } else {
//         throw new Error(data.statusText);
//       }
//     })
//     .then((res) => {
//       setCookie(res.token);
//       error.innerHTML = "";
//       const token = "Bearer " + res.token;
//       console.log(token);
//       fetch("/dashboard", { headers: { Authorization: `${token}` } }).then(
//         (resp) => {
//           if (resp.status == 200) {
//             console.log(resp);
//             /* window.location.href = '/dashboard'; */
//           }
//         }
//       );
//     });

//   /* .then((resp) => {
//       headers = {
//         "Content-Type": "application/json",
//         authorization: "Bearer " + localStorage.getItem("token"),
//       };
//       localStorage.setItem("token", resp.token);
//       fetch("/dashboard", {}).then((data) => {
//         if (data.status == 200) {
//           window.location.href = "/dashboard";
//         } else {
//           throw new Error(data.statusText);
//         }
//       });
//     })
//     .catch((err) => {
//       error.innerHTML = "Invalid Credentials";
//     }); */
// });

// function setCookie(token) {
//   var d = new Date();
//   d.setTime(d.getTime() + 60*60*24*30);
//   var expires = "expires=" + d.toGMTString();
//   document.cookie = "token =" + token + ";"+ "expires =" + expires + ";path=/";
// }

function getById(id) {
  return document.getElementById(id);
}
