function ChangeStudent() {
  const courses = studentData.courses;
  let weightedPoints = 0;
  let totalCredits = 0;

  const table = document.getElementById("courseTable");
  table.innerHTML = "";

  courses.forEach((course) => {
    const result = gradeFromMarks(course.marks);
    weightedPoints += result.points * course.credits;
    totalCredits += course.credits;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td><strong>${course.code}</strong></td>
      <td>${course.name}</td>
      <td>${course.credits}</td>
      <td><strong>${course.marks}%</strong></td>
      <td><span class="grade-badge">${result.grade}</span></td>
      <td>${result.points.toFixed(1)}</td>
      <td><span class="status ${course.marks >= 50 ? "passed" : "failed"}">${course.marks >= 50 ? "Passed" : "Failed"}</span></td>
    `;
    table.appendChild(row);
  });

  const average = courses.reduce((sum, c) => sum + c.marks, 0) / courses.length;
  const gpa = weightedPoints / totalCredits;
  const passed = courses.filter(c => c.marks >= 50).length;

  document.getElementById("gpa").textContent = gpa.toFixed(2);
  document.getElementById("average").textContent = `${average.toFixed(1)}%`;
  document.getElementById("courseCount").textContent = courses.length;
  document.getElementById("passedCount").textContent = passed;
  document.getElementById("highest").textContent = `${Math.max(...courses.map(c => c.marks))}%`;
  document.getElementById("lowest").textContent = `${Math.min(...courses.map(c => c.marks))}%`;
  document.getElementById("credits").textContent = totalCredits;
  document.getElementById("passedSummary").textContent = `${passed} / ${courses.length}`;

  const bars = document.getElementById("bars");
  bars.innerHTML = courses.map(course => `
    <div class="bar-row">
      <span>${course.code}</span>
      <div class="bar-track"><div class="bar-fill" style="width:${course.marks}%"></div></div>
      <strong>${course.marks}%</strong>
    </div>
  `).join("");
}

ChangeStudent();