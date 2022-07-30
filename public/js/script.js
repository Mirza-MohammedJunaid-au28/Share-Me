const downloadBtn = document.getElementById("download-btn");
const downloadLink = document.getElementById("download-link");
const downloadForm = document.getElementById("download-form");
const downloadURL = document.getElementById("download-url");
const closeBtn = document.getElementById("close");

downloadBtn.addEventListener("click", downloadFile);

function downloadFile() {
  const link = downloadLink.value;
  const data = {
    link
  };

  fetch("/download", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })

  .then(data => data.json())
  .then(res =>{
    const filepath = '../../uploads/'+res.filename
    console.log(filepath);
    downloadURL.href = filepath;
    downloadForm.style.display = "block";
    window.stop();
  })
}

closeBtn.addEventListener("click", () => {
  downloadForm.style.display = "none";
})

downloadURL.addEventListener('click', () => {
  downloadLink.value = ""
})