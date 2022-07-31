var rand = require("random-key");
const path = require("path");
const connection = require("../db/db");
const nodemailer = require("nodemailer");
const fs = require("fs");

function fileUpload(req, res) {
  const filename = req.file.filename;
  const randomKey = storeinDB(filename);
  res.render("key", {
    randomKey,
    name: req.name,
  });
}

function storeinDB(filename) {
  const randonmKey = rand.generate();
  const data = [filename, randonmKey];
  connection.query(`insert into files values(?,?)`, data, (error, result) => {
    if (!error) {
      console.log("File Details Entered Successfully");
    }
  });
  return randonmKey;
}

async function sendKey(req, res) {
  const data = req.body;
  const send = await sendMail(data.key, data.mail);
}

function sendMail(key, mail) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL,
      to: mail,
      subject: "Verification Code from Share Me",
      html: `
            <html>
            <body>
            <h3>Download Key : ${key}<h3>
            <a href="http://localhost:3000/" style="text-decoration:none;padding: 8px 12px;background:#fff;color:#3282b8">Go to Website</a>
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

    return {
      status: 200,
      msg: " Send Successfully ",
    };
  } catch (err) {
    return {
      status: 500,
      msg: err,
    };
  }
}

function downloadfile(req, res) {
  id = req.body;
  const data = [id.link];
  connection.query(
    `select * from files where file_id = ? `,
    data,
    (err, result) => {
      try{
        if(result.lennght != 0) {
          const rest = {
            status : 200,
            filename: result[0].file_name,
            path: __dirname,
          };
          return res.send(rest);
        } else {
          const rest = {
            status : 404,
            msg: "File Not Found",
          };
          return res.status(401).send(rest);
        }
      }
      catch(err){
        res.send(err)
      }
    }
  );
}

function deletefile(req, res) {
  const path = `uploads/` + req.body.filepath;
  console.log("path =>", path);

  try {
    fs.unlinkSync(path);
    return res.status(200).send({
      status : 200,
      msg : "File successfully deleted"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      status : 500,
      msg : "Something Went Wrong"
    });
  }

}

module.exports = { fileUpload, sendKey, downloadfile, deletefile };
