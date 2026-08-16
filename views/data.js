// Static demo data. Changes made by the lecturer are kept in memory
// while the page is open; no database is required.

const studentData = {
  id: "ST001",
  name: "Bravin Oduor",
  programme: "BSc Informatics",
  year: "Year 3",
  semester: "Semester 2",
  courses: [
    { code: "ICS 301", name: "Distributed Systems", credits: 3, marks: 82 },
    { code: "ICS 302", name: "Machine Learning", credits: 3, marks: 76 },
    { code: "ICS 303", name: "Database Systems", credits: 3, marks: 88 },
    { code: "ICS 304", name: "Human Computer Interaction", credits: 2, marks: 71 },
    { code: "ICS 305", name: "Internet of Things", credits: 3, marks: 67 },
    { code: "ICS 306", name: "Software Engineering", credits: 3, marks: 79 }
  ]
};

const lecturerCourses = [
  {
    code: "ICS 301",
    name: "Distributed Systems",
    credits: 3,
    students: [
      { id: "ST001", name: "Bravin Oduor", marks: 82 },
      { id: "ST002", name: "Jane Wanjiku", marks: 74 },
      { id: "ST003", name: "Peter Otieno", marks: 68 },
      { id: "ST004", name: "Amina Hassan", marks: 91 },
      { id: "ST005", name: "Brian Kamau", marks: 56 },
      { id: "ST006", name: "Faith Njeri", marks: 79 },
      { id: "ST007", name: "Kevin Mwangi", marks: 47 },
      { id: "ST008", name: "Lucy Achieng", marks: 84 }
    ]
  },
  {
    code: "ICS 302",
    name: "Machine Learning",
    credits: 3,
    students: [
      { id: "ST001", name: "Bravin Oduor", marks: 76 },
      { id: "ST002", name: "Jane Wanjiku", marks: 81 },
      { id: "ST003", name: "Peter Otieno", marks: 63 },
      { id: "ST004", name: "Amina Hassan", marks: 88 },
      { id: "ST005", name: "Brian Kamau", marks: 59 },
      { id: "ST006", name: "Faith Njeri", marks: 72 }
    ]
  },
  {
    code: "ICS 303",
    name: "Database Systems",
    credits: 3,
    students: [
      { id: "ST001", name: "Bravin Oduor", marks: 88 },
      { id: "ST002", name: "Jane Wanjiku", marks: 69 },
      { id: "ST003", name: "Peter Otieno", marks: 74 },
      { id: "ST004", name: "Amina Hassan", marks: 93 },
      { id: "ST005", name: "Brian Kamau", marks: 61 }
    ]
  }
];

function gradeFromMarks(mark) {
  if (mark >= 70) return { grade: "A", points: 4.0 };
  if (mark >= 65) return { grade: "B+", points: 3.5 };
  if (mark >= 60) return { grade: "B", points: 3.0 };
  if (mark >= 55) return { grade: "C+", points: 2.5 };
  if (mark >= 50) return { grade: "C", points: 2.0 };
  if (mark >= 45) return { grade: "D", points: 1.0 };
  return { grade: "F", points: 0.0 };
}

