// Initialize an empty array for students
let students = [];

// Load students from localStorage if available
if (localStorage.getItem("students")) {
    students = JSON.parse(localStorage.getItem("students"));
    displayStudents();
}

// Add Student
document.getElementById('studentForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value;
    const rollNumber = document.getElementById('rollNumber').value;
    const marks = document.getElementById('marks').value;

    // Create a student object
    const student = {
        name: name,
        rollNumber: rollNumber,
        marks: marks
    };

    // Add the student to the array
    students.push(student);

    // Save to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Display students
    displayStudents();

    // Clear form fields
    document.getElementById('studentForm').reset();
});

// Display students in the table   
function displayStudents() {
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = "";

    students.forEach((student, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${student.name}</td>
            <td>${student.rollNumber}</td>
            <td>${student.marks}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteStudent(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Edit Student
function editStudent(index) {
    const student = students[index];

    // Fill the form with the selected student's data
    document.getElementById('name').value = student.name;
    document.getElementById('rollNumber').value = student.rollNumber;
    document.getElementById('marks').value = student.marks;

    // Remove the old entry
    deleteStudent(index);
}

// Delete Student
function deleteStudent(index) {
    // Remove the student from the array
    students.splice(index, 1);

    // Save the updated array to localStorage
    localStorage.setItem("students", JSON.stringify(students));

    // Display the updated list of students
    displayStudents();
}
 