/* const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
const uploadBtn = document.querySelector("#upload-btn")

let file; 

button.onclick = ()=>{
  input.click();
}

input.addEventListener("change", function(){
  file = this.files[0];
  dropArea.classList.add("active");
  showFile();
});


dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); 
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});


dropArea.addEventListener("drop", (event)=>{
  event.preventDefault(); 
  file = event.dataTransfer.files[0];
  showFile();
});

function showFile(){
  uploadBtn.style.display = 'block';
  let fileType = file.type; 
  let validExtensions = ["image/jpeg", "image/jpg", "image/png","application/pdf","video/mp4"]; 
  if(validExtensions.includes(fileType)){ 
    let fileReader = new FileReader(); 
    fileReader.onload = ()=>{
      let fileURL = fileReader.result;
      if((fileType == "image/jpeg") || (fileType == "image/png") || (fileType == "image/jpg")){
        let Tag = `<img src="${fileURL}" alt="image">`;
        dropArea.innerHTML = Tag;
      }
      else if(fileType == "video/mp4"){
        let Tag = `<video src="${fileURL}" alt="video"></video>`;
        dropArea.innerHTML = Tag;
      }
      else if(fileType == "application/pdf"){
        let Tag = `<img src="../assets/pdf.png" alt="image">`;
        dropArea.innerHTML = Tag;
      }
    }
    fileReader.readAsDataURL(file);
  }else{
    alert("!!! This File Format Not Supported !!!");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
  }
} */