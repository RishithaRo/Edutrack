// JavaScript for TeacherDashboard

// Profile Image Upload
const profileImage = document.getElementById("profileImage");
const profileUpload = document.getElementById("profileUpload");
const uploadButton = document.getElementById("uploadButton");

uploadButton.addEventListener("click", () => {
  profileUpload.click();
});

profileUpload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Batch and Students List
const batchSelect = document.getElementById("batchSelect");
const studentNames = document.getElementById("studentNames");

const studentsData = {
  terv: ["Student A", "Student B", "Student C"],
  consensus: ["Student X", "Student Y", "Student Z"]
};

batchSelect.addEventListener("change", () => {
  const selectedBatch = batchSelect.value;
  studentNames.innerHTML = "";
  studentsData[selectedBatch].forEach((student) => {
    const li = document.createElement("li");
    li.textContent = student;
    studentNames.appendChild(li);
  });
});

// Initial Load
batchSelect.dispatchEvent(new Event("change"));