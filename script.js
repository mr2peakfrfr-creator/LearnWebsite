// Course details live here so the cards and modal stay in sync.
const courses = [
  {
    id: "web-development",
    title: "Web Development",
    category: "Development",
    shortDescription: "Build responsive websites from your first line of HTML to a polished portfolio.",
    description: "Learn the building blocks of the web and put them together in projects you can actually share. No experience needed, just a browser and a little curiosity.",
    level: "Beginner",
    duration: "8 weeks",
    instructor: "Maya Chen",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=82",
    learnings: ["Write clear, semantic HTML and modern CSS", "Make layouts work on every screen size", "Add useful interactions with JavaScript"],
    modules: ["How the web works", "HTML foundations", "CSS and responsive layouts", "JavaScript essentials", "Your portfolio project"]
  },
  {
    id: "python-programming",
    title: "Python Programming",
    category: "Programming",
    shortDescription: "Get comfortable with Python and turn everyday problems into small programs.",
    description: "Start with the fundamentals, then use Python to work with files, data, and simple automation. Each concept is introduced through hands-on exercises.",
    level: "Beginner",
    duration: "6 weeks",
    instructor: "Jordan Ellis",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&w=900&q=82",
    learnings: ["Use variables, loops, and functions with confidence", "Organize programs into reusable pieces", "Build useful scripts for everyday tasks"],
    modules: ["Getting started with Python", "Working with data", "Decisions and loops", "Functions and files", "A practical mini project"]
  },
  {
    id: "data-science",
    title: "Data Science",
    category: "Data",
    shortDescription: "Find the story in data using analysis, visualisation, and clear thinking.",
    description: "Build a practical foundation in data science. You'll learn how to ask better questions, explore datasets, and explain what the evidence says.",
    level: "Intermediate",
    duration: "10 weeks",
    instructor: "Priya Nair",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=82",
    learnings: ["Clean and explore real-world datasets", "Create charts that make patterns clear", "Summarize findings for different audiences"],
    modules: ["Asking good data questions", "Preparing a dataset", "Exploratory analysis", "Visualising results", "Communicating your findings"]
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    category: "Marketing",
    shortDescription: "Connect the right message with the right people across digital channels.",
    description: "Learn how modern digital campaigns come together, from understanding an audience to measuring what worked and deciding what to try next.",
    level: "Beginner",
    duration: "5 weeks",
    instructor: "Sam Rivera",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=82",
    learnings: ["Define an audience and a clear campaign goal", "Plan content for search and social channels", "Read campaign metrics and improve results"],
    modules: ["Digital marketing foundations", "Audience and positioning", "Content and search", "Social campaigns", "Measurement and iteration"]
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    category: "Creative",
    shortDescription: "Use colour, type, and composition to make ideas easier to see.",
    description: "Explore core design principles and apply them to visual work with purpose. You'll practise making thoughtful choices and explaining why they work.",
    level: "Beginner",
    duration: "7 weeks",
    instructor: "Alex Morgan",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=82",
    learnings: ["Build balanced layouts with visual hierarchy", "Pair colour and typography with intention", "Develop a consistent visual identity"],
    modules: ["Seeing like a designer", "Layout and composition", "Colour and contrast", "Typography in practice", "A mini brand identity"]
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    category: "Technology",
    shortDescription: "Understand common online risks and learn the habits that reduce them.",
    description: "Build practical security awareness for a connected world. Learn how common threats work and how thoughtful everyday practices help protect people and systems.",
    level: "Intermediate",
    duration: "6 weeks",
    instructor: "Taylor Brooks",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?auto=format&fit=crop&w=900&q=82",
    learnings: ["Recognize common security threats", "Apply safer account and device practices", "Understand the basics of incident response"],
    modules: ["Security mindset and threat models", "Passwords and identity", "Networks and common attacks", "Safer devices and data", "Responding to an incident"]
  }
];

const courseGrid = document.querySelector("#course-grid");
const courseDialog = document.querySelector("#course-dialog");
const enrollButton = document.querySelector("#enroll-button");
const enrollmentForm = document.querySelector("#enrollment-form");
const enrollMessage = document.querySelector("#enroll-message");
const interestOptions = document.querySelector("#interest-options");
const submitEnrollmentButton = document.querySelector("#submit-enrollment");
const enrollmentEndpoint = "https://formspree.io/f/xdekqoja";

function createCourseCard(course, index) {
  const card = document.createElement("article");
  card.className = "course-card";
  card.innerHTML = `
    <div class="course-image">
      <img src="${course.image}" alt="" loading="lazy">
      <span class="course-number">0${index + 1}</span>
    </div>
    <div class="course-body">
      <p class="course-tags"><span>${course.category}</span><span>${course.level}</span></p>
      <h3>${course.title}</h3>
      <p class="course-description">${course.shortDescription}</p>
      <p class="course-instructor">With <strong>${course.instructor}</strong></p>
      <div class="course-card-footer">
        <span class="duration">${course.duration}</span>
        <button class="detail-button" type="button" data-course-id="${course.id}" aria-label="View details for ${course.title}">View details <span aria-hidden="true">→</span></button>
      </div>
    </div>`;
  return card;
}

function renderCourses() {
  courses.forEach((course, index) => courseGrid.append(createCourseCard(course, index)));
}

function fillList(listElement, items) {
  listElement.replaceChildren(...items.map((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    return listItem;
  }));
}

function openCourseDetails(courseId) {
  const course = courses.find((item) => item.id === courseId);
  if (!course) return;

  document.querySelector("#dialog-category").textContent = `${course.category} / ${course.level}`;
  document.querySelector("#dialog-title").textContent = course.title;
  document.querySelector("#dialog-description").textContent = course.description;
  document.querySelector("#dialog-meta").innerHTML = `
    <span>Instructor: <strong>${course.instructor}</strong></span>
    <span>Duration: <strong>${course.duration}</strong></span>
    <span>Level: <strong>${course.level}</strong></span>`;
  fillList(document.querySelector("#dialog-learnings"), course.learnings);
  fillList(document.querySelector("#dialog-modules"), course.modules);
  enrollmentForm.reset();
  enrollmentForm.hidden = true;
  enrollButton.hidden = false;
  enrollMessage.textContent = "";
  enrollMessage.classList.remove("form-error");
  submitEnrollmentButton.disabled = false;
  interestOptions.replaceChildren(...courses
    .filter((item) => item.id !== course.id)
    .map((item) => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.name = "interestedCourses";
      checkbox.value = item.id;
      label.append(checkbox, document.createTextNode(` ${item.title}`));
      return label;
    }));
  courseDialog.dataset.courseId = course.id;
  courseDialog.showModal();
}

courseGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-course-id]");
  if (button) openCourseDetails(button.dataset.courseId);
});

document.querySelectorAll("[data-close-dialog]").forEach((button) => {
  button.addEventListener("click", () => courseDialog.close());
});

courseDialog.addEventListener("click", (event) => {
  if (event.target === courseDialog) courseDialog.close();
});

enrollButton.addEventListener("click", () => {
  enrollmentForm.hidden = false;
  enrollButton.hidden = true;
  enrollmentForm.querySelector('[name="firstName"]').focus();
});

document.querySelector("#cancel-enrollment").addEventListener("click", () => {
  enrollmentForm.hidden = true;
  enrollButton.hidden = false;
});

enrollmentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(enrollmentForm);
  const selectedCourse = courses.find((item) => item.id === courseDialog.dataset.courseId);

  if (!selectedCourse) {
    enrollMessage.textContent = "Please select a course and try again.";
    enrollMessage.classList.add("form-error");
    return;
  }

  const interestedCourses = formData.getAll("interestedCourses").map((courseId) =>
    courses.find((course) => course.id === courseId)?.title
  ).filter(Boolean);
  formData.delete("interestedCourses");
  formData.append("selectedCourse", selectedCourse.title);
  formData.append("interestedCourses", interestedCourses.join(", ") || "None");

  submitEnrollmentButton.disabled = true;
  enrollMessage.classList.remove("form-error");
  enrollMessage.textContent = "Sending your request...";

  try {
    const response = await fetch(enrollmentEndpoint, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData
    });

    if (!response.ok) throw new Error(`Enrollment request failed (${response.status}).`);

    enrollMessage.textContent = "Thanks! Your free demo request has been sent.";
    enrollmentForm.reset();
  } catch (error) {
    enrollMessage.textContent = "We couldn't send your request. Please try again later.";
    enrollMessage.classList.add("form-error");
    submitEnrollmentButton.disabled = false;
  }
});

renderCourses();