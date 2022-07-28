const connection = require("../db/db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

function renderSignup(req, res) {
  res.render("signup");
}

function checkUser(req, res) {
  const param = [req.body.email];
  connection.query(
    `select * from users where email = ? `,
    param,
    (error, result) => {
      if (!error) {
        if (result == "") {
          return res.status(200).send({
            msg: "User Not Exists",
            error: false,
          });
        } else {
          return res.status(409).send({
            msg: "User Exists",
            error: true,
          });
        }
      } else {
        res.status(500).send(error);
      }
    }
  );
}

function signup(req, res) {
  console.log("body => ",req.body);
  const param = [req.body.email];
  connection.query(
    `select * from users where email = ? `,
    param,
    (error, result) => {
      if (!error) {
        if (result == "") {
          const data = [
            req.body.name,
            req.body.email,
            req.body.password,
            false,
          ];

          connection.query(
            `insert into users(name,email,password,verified) values(?,?,?,?)`,
            data,
            (error, result) => {
              if (error) {
                return res.status(500).send({
                  msg: error.message,
                  error: true,
                });
              }

              return res.status(200).send({
                msg: "User Added",
                error: false,
              });
            }
          );
        } else {
          return res.status(409).send({
            msg: "User Exists",
            error: true,
          });
        }
      } else {
        res.status(500).send(error);
      }
    }
  );
}


async function verifyEmail(req, res){
  try {
    const verifytoken = req.body
    const email = req.body.email;
    await sendMail(email,verifytoken);
    return res.status(200);
  } catch (err) {
    console.log("Login Controller Error : ", err);
  }
}

function sendMail(email,verifytoken) {
  try {
    console.log("email =>", email);

    const saltrounds = parseInt(process.env.SALTROUNDS);

    bcrypt.hash(email, saltrounds).then(function (hash) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL,
          pass: process.env.PASSWORD,
        },
      });

      const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: "Verification Code from Share Me",
        html: `
            <html>
            <body>
            <h1>Verification Link<h1>
            <a href="http://localhost:3000/verified?id=${hash} style="text-decoration:none;padding: 8px 12px;background:#fff;color:#3282b8">Click here</a>
            </body>
            <script>
            </script>
            </html>
            `,
      };

      transporter.sendMail(
        mailOptions,
        (result = (err, res) => {
          if (err) {
            const resp = {
              error: true,
              msg: err,
            };
            return resp;
          } else {
            const resp = {
              error: false,
              msg: "Ok",
            };
            return resp;
          }
        })
      );
    });

    const payload = {
      email: email,
    };

    const emailToken = jwt.sign(payload, process.env.JWTKEY, {
      expiresIn: "30d",
    });

    /* bcrypt.genSalt(saltrounds, (err, salt) => {
    bcrypt.hash(email, salt, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        console.log("hash =>",hash);
        return hash;
      }
    }).then(data => {
      console.log(data);
      const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        subject: "Verification Code from Share Me",
        html: `
              <html>
              <body>
              <h1>Verification Link<h1>
              <a href="http://localhost:3000/verified/${data}" style="text-decoration:none;padding: 8px 12px;background:#fff;color:#3282b8">Click here</a>
              </body>
              </html>
              `,
      };

      transporter.sendMail(
        mailOptions,
        (result = (err, res) => {
          if (err) {
            const resp = {
              error: true,
              msg: err,
            };
            return resp;
          } else {
            const resp = {
              error: false,
              msg: "Ok",
            };
            return resp;
          }
        })
      );
      return result();
    }
    )

  }); */
    /* await bcrypt.genSalt(saltrounds, async (err, salt) => {
    await bcrypt.hash(email, salt, (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        console.log("hash =>",hash);
        return hash;
      }
    });
  }); */
  } catch (err) {
    console.log(err);
  }
}


module.exports = { renderSignup, signup, checkUser,verifyEmail };