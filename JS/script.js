
function hideSidebar() {
  document.querySelector('.sidebar').style.display = 'none';
}

function showSidebar() {
  document.querySelector('.sidebar').style.display = 'block';
}




// Appointments handling 
// Define a mapping of doctor names to their display names
const doctorNames = {
  'Dr. Patel - Nobel Hospital': 'Dr. Patel - Nobel Hospital',
  'Dr. Deshmukh - Sahyadri Hospital': 'Dr. Deshmukh - Sahyadri Hospital',
  'Dr. Gupta - Jahangir Hospital': 'Dr. Gupta - Jahangir Hospital',
  'Dr. Rao - Sasoon Hospital': 'Dr. Rao - Sasoon Hospital',
  'Dr. Mehta - Nobel Hospital': 'Dr. Mehta - Nobel Hospital',
  'Dr. Joshi - Sahyadri Hospital': 'Dr. Joshi - Sahyadri Hospital',
  'Dr. Sharma - Jahangir Hospital': 'Dr. Sharma - Jahangir Hospital',
  'Dr. Kumar - Sasoon Hospital': 'Dr. Kumar - Sasoon Hospital'
};


// Function to get the current date in YYYY-MM-DD format
function getCurrentDate() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

// Function to update the table with stored appointments
function updateTable() {
  const appointmentTableBody = document.querySelector('#appointmentTable tbody');
  appointmentTableBody.innerHTML = '';

  const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

  appointments.forEach((appointment, index) => {
    console.log('Updating Table with:', appointment); // Add this line

    const doctorName = doctorNames[appointment.doctor] || 'Unknown';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${appointment.name}</td>
      <td>${appointment.email}</td>
      <td>${doctorName}</td>
      <td>${appointment.date}</td>
      <td>${appointment.time}</td>
      <td><button class="btn delete-btn" data-index="${index}">Delete</button></td>
    `;
    appointmentTableBody.appendChild(row);
  });
}



// Handle form submission
document.getElementById('appointmentForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const name = document.getElementById('patientName').value;
  const email = document.getElementById('patientEmail').value;
  const date = document.getElementById('appointmentDate').value;
  const time = document.getElementById('appointmentTime').value;
  const doctor = document.getElementById('doctor').value;

  if (name && email && date && time && doctor) {
      const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

      // Add new appointment
      appointments.push({ name, email, date, time, doctor });

      // Save to localStorage
      localStorage.setItem('appointments', JSON.stringify(appointments));

      // Update the table
      updateTable();

      // Clear form fields
      document.getElementById('appointmentForm').reset();
  } else {
      alert('Please fill in all fields.');
  }
});

// Reset form functionality
document.getElementById('resetForm').addEventListener('click', function () {
  document.getElementById('appointmentForm').reset();
});

// Handle delete button click
document.querySelector('#appointmentTable').addEventListener('click', function (event) {
  if (event.target && event.target.classList.contains('delete-btn')) {
      const index = event.target.getAttribute('data-index');
      const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

      // Remove appointment
      appointments.splice(index, 1);

      // Save updated appointments
      localStorage.setItem('appointments', JSON.stringify(appointments));

      // Update the table
      updateTable();
  }
});

// Disable past dates
document.getElementById('appointmentDate').setAttribute('min', getCurrentDate());

// Initialize table on page load
updateTable();



document.getElementById('disease-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const symptom = document.getElementById('symptom').value.toLowerCase();
  const result = document.getElementById('resultDis');

  let disease;

  // Simple decision tree based on predefined rules
  if (symptom.includes('fever') || symptom.includes('cough')) {
    disease = 'Flu';
  } else if (symptom.includes('runny nose') || symptom.includes('sore throat')) {
    disease = 'Cold';
  } else {
    disease = 'Disease not recognized. Please consult a healthcare professional.';
  }

  resultDis.textContent = 'Predicted Disease: ' + disease;
});




document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('wellness-quiz').addEventListener('submit', function(event) {
      event.preventDefault();
      const formData = new FormData(this);
      const responses = Array.from(formData.values()).map(Number);
      const totalScore = responses.reduce((a, b) => a + b, 0);
      const averageScore = totalScore / responses.length;
      let healthLevel;

      if (averageScore <= 1.5) {
          healthLevel = 'Excellent';
      } else if (averageScore <= 2.5) {
          healthLevel = 'Good';
      } else if (averageScore <= 3.5) {
          healthLevel = 'Moderate';
      } else {
          healthLevel = 'Needs Attention';
      }

      document.getElementById('result').innerText = `Your wellness level is: ${healthLevel}`;

      // Generate the chart
      const ctx = document.getElementById('wellness-chart').getContext('2d');
      new Chart(ctx, {
          type: 'pie',
          data: {
              labels: ['Excellent', 'Good', 'Moderate', 'Needs Attention'],
              datasets: [{
                  label: 'Wellness Level',
                  data: [
                      averageScore <= 1.5 ? 1 : 0,
                      averageScore <= 2.5 && averageScore > 1.5 ? 1 : 0,
                      averageScore <= 3.5 && averageScore > 2.5 ? 1 : 0,
                      averageScore > 3.5 ? 1 : 0
                  ],
                  backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#f44336']
              }]
          }
      });
  });
});

document.getElementById("registerBtn").addEventListener("click", function() {
  // Show the iframe container
  document.getElementById("iframeContainer").style.display = "flex";

  // Load the form into the iframe
  document.getElementById("registrationIframe").src = "register.html";
});

document.getElementById("closeIframe").addEventListener("click", function() {
  // Hide the iframe container
  document.getElementById("iframeContainer").style.display = "none";
  
  // Clear the iframe src to stop loading
  document.getElementById("registrationIframe").src = "";
});



document.getElementById("registerBtnTop").addEventListener("click", function() {
  // Show the iframe container
  document.getElementById("iframeContainer").style.display = "flex";

  // Load the form into the iframe
  document.getElementById("registrationIframe").src = "register.html";
});

document.getElementById("closeIframe").addEventListener("click", function() {
  // Hide the iframe container
  document.getElementById("iframeContainer").style.display = "none";
  
  // Clear the iframe src to stop loading
  document.getElementById("registrationIframe").src = "";
});



//appointments
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('appointmentForm');
    const bookAppointmentButton = document.getElementById('BookAppointment');
    const responseMessage = document.getElementById('responseMessage');

    bookAppointmentButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);

        fetch('book_appointment.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log('Response Status:', response.status); // Log response status
            return response.text(); // or response.json() if you return JSON
        })
        .then(data => {
            console.log('Response Data:', data); // Log response data
            if (responseMessage) {
                responseMessage.innerHTML = data; // Update the message
            } else {
                console.error('responseMessage element not found');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            if (responseMessage) {
                responseMessage.innerHTML = 'An error occurred. Please try again.';
            } else {
                console.error('responseMessage element not found');
            }
        });
    });

    document.getElementById('resetForm').addEventListener('click', function() {
        form.reset(); // Reset the form fields
    });
});
