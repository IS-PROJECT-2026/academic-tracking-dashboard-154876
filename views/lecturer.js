const courseSelect = document.getElementById("courseSelect");

function populateCourses() {
  courseSelect.innerHTML = lecturerCourses.map((course, index) =>
    `<option value="${index}">${course.code} — ${course.name}</option>`
  ).join("");

  courseSelect.addEventListener("change", renderCourse);
  renderCourse();
  updateLecturerStats();
}

function renderCourse() {
  const course = lecturerCourses[Number(courseSelect.value)];
  document.getElementById("selectedCourseTitle").textContent = `${course.code} — ${course.name}`;
  document.getElementById("selectedCourseSubtitle").textContent = `${course.students.length} students enrolled`;

  const table = document.getElementById("gradeTable");
  table.innerHTML = "";

  course.students.forEach((student, index) => {
    const result = gradeFromMarks(student.marks);
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td><strong>${student.id}</strong></td>
      <td>${student.name}</td>
      <td>
        <input class="mark-input" type="number" min="0" max="100"
          value="${student.marks}" data-index="${index}">
      </td>
      <td><span class="grade-badge live-grade">${result.grade}</span></td>
      <td><span class="status live-status ${student.marks >= 50 ? "passed" : "failed"}">
        ${student.marks >= 50 ? "Passed" : "Failed"}
      </span></td>
    `;

    const input = row.querySelector(".mark-input");
    input.addEventListener("input", () => {
      const value = Math.max(0, Math.min(100, Number(input.value) || 0));
      student.marks = value;
      const result = gradeFromMarks(value);
      row.querySelector(".live-grade").textContent = result.grade;
      const status = row.querySelector(".live-status");
      status.textContent = value >= 50 ? "Passed" : "Failed";
      status.className = `status live-status ${value >= 50 ? "passed" : "failed"}`;
      updateCourseStats(course);
      updateLecturerStats();
    });

    table.appendChild(row);
  });

  updateCourseStats(course);
}

function updateCourseStats(course) {
  const marks = course.students.map(s => Number(s.marks));
  const average = marks.reduce((a, b) => a + b, 0) / marks.length;

  document.getElementById("classAverage").textContent = `${average.toFixed(1)}%`;
  document.getElementById("classHighest").textContent = `${Math.max(...marks)}%`;
  document.getElementById("classLowest").textContent = `${Math.min(...marks)}%`;

  const distribution = { A: 0, "B+": 0, B: 0, "C+": 0, C: 0, D: 0, F: 0 };
  marks.forEach(mark => distribution[gradeFromMarks(mark).grade]++);

  document.getElementById("distribution").innerHTML =
    Object.entries(distribution)
      .filter(([, count]) => count)
      .map(([grade, count]) => `
        <div class="dist-row">
          <span class="grade-badge">${grade}</span>
          <div class="dist-track"><div class="dist-fill" style="width:${(count / marks.length) * 100}%"></div></div>
          <strong>${count}</strong>
        </div>
      `).join("");
}

function updateLecturerStats() {
  const all = lecturerCourses.flatMap(c => c.students.map(s => Number(s.marks)));
  const average = all.reduce((a, b) => a + b, 0) / all.length;
  const passed = all.filter(mark => mark >= 50).length;

  document.getElementById("lecturerCourses").textContent = lecturerCourses.length;
  document.getElementById("studentCount").textContent =
    new Set(lecturerCourses.flatMap(c => c.students.map(s => s.id))).size;
  document.getElementById("lecturerAverage").textContent = `${average.toFixed(1)}%`;
  document.getElementById("passRate").textContent = `${((passed / all.length) * 100).toFixed(0)}%`;
}

function saveGrades() {
  alert("Grades saved successfully in this static prototype.\n\nNo database is connected, so changes exist only while this page is open.");
}

populateCourses();