// Each section only runs on the page that has its elements.

// ============================================================
// Home page: extra function -> recipe   (page has id="recipeToggle")
// ============================================================
if (document.getElementById("recipeToggle")) {
  const recipeToggle = document.getElementById("recipeToggle");
  const recipe = document.getElementById("recipe");

  recipeToggle.addEventListener("click", function () {
    recipe.hidden = !recipe.hidden;

    const isExpanded = !recipe.hidden;

    recipeToggle.textContent = isExpanded ? "Hide Recipe" : "View Recipe";
    recipeToggle.setAttribute("aria-expanded", isExpanded);
  });
}

// ============================================================
// Back to top button   (page has id="backToTop")
// ============================================================
if (document.getElementById("backToTop")) {
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 200) {
      backToTop.style.display = "block";
    } else {
      backToTop.style.display = "none";
    }
  });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
// ============================================================
// Footer clock   (page has id="footerClock")
// ============================================================
if (document.getElementById("footerClock")) {
  function updateClock() {
    const now = new Date();
    document.getElementById("footerClock").textContent = now.toLocaleTimeString();
  }

  updateClock();
  setInterval(updateClock, 1000);
}

// ============================================================
// Home page: extra function -> Contact Us form   (form inside id="contact")
// ============================================================
var contactSection = document.getElementById("contact");
var contactForm = null;
if (contactSection) {
  contactForm = contactSection.tagName === "FORM" ? contactSection : contactSection.querySelector("form");
}

if (contactForm) {
  var cName = contactForm.querySelector("input[type='text']");
  var cEmail = contactForm.querySelector("input[type='email']");
  var cMsg = contactForm.querySelector("textarea");

  contactForm.noValidate = true; // so OUR alert is shown instead of the browser's

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var problems = [];

    var nameValue = cName ? cName.value.trim() : "";
    var emailValue = cEmail ? cEmail.value.trim() : "";
    var msgValue = cMsg ? cMsg.value.trim() : "";

    // Name: not empty, letters and spaces only
    if (cName) {
      if (nameValue === "") {
        problems.push("- Name is empty.");
      } else if (!/^\p{L}+(\s+\p{L}+)*$/u.test(nameValue)) {
        problems.push("- Name must contain letters only (no numbers or symbols).");
      }
    }

    // Email: not empty and a valid email
    if (cEmail) {
      if (emailValue === "") {
        problems.push("- Email is empty.");
      } else if (!cEmail.checkValidity()) {
        problems.push("- Please enter a valid email (example: name@email.com).");
      }
    }

    // Message: not empty and at least 10 characters
    if (cMsg) {
      if (msgValue === "") {
        problems.push("- Message is empty.");
      } else if (msgValue.length < 10) {
        problems.push("- Message is too short (at least 10 characters).");
      }
    }

    // If something is wrong: show alert and stop
    if (problems.length > 0) {
      alert("Please fix the following:\n\n" + problems.join("\n"));
      return;
    }

    alert("Thank you, " + nameValue + "! Your message has been sent. We will get back to you soon.");
    contactForm.reset();
  });
}

// ============================================================
// 3.3 About Us - Join Our Team form   (page has id="joinTeamForm")
// ============================================================
if (document.getElementById("joinTeamForm")) {
 document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("joinTeamForm");
  if (!form) return;
  const controls = form.elements;
  const nameField = controls["name"];
  const dobField = controls["dob"];
  const emailField = controls["email"];
  const photoField = controls["photo"];
  const skillsField = controls["skills"];
  const expertiseField = controls["expertise"];
  const educationField = controls["education"];

  function validateControls() {
    nameField.setCustomValidity("");
    dobField.setCustomValidity("");
    emailField.setCustomValidity("");
    photoField.setCustomValidity("");
    skillsField.setCustomValidity("");
    expertiseField.setCustomValidity("");
    educationField.setCustomValidity("");

    const nameVal = nameField.value.trim();
    const dobVal = dobField.value;
    const emailVal = emailField.value.trim();
    const skillsVal = skillsField.value.trim();
    const expertiseVal = expertiseField.value.trim();
    const educationVal = educationField.value.trim();
    //checking
    if (nameVal === "") {
      nameField.setCustomValidity("Name cannot be empty.");
    } else if (/^[0-9]/.test(nameVal)) {
      //cannot start with numbers
      nameField.setCustomValidity("Name cannot start with a number.");
    }

    if (dobVal === "") {
      dobField.setCustomValidity("Date of birth is required.");
    } else {
      //must be 2008 or earlier
      const birthYear = parseInt(dobVal.split("-")[0], 10);
      if (isNaN(birthYear) || birthYear > 2008) {
        dobField.setCustomValidity("Year of birth must be 2008 or earlier.");
      }
    }

    if (emailVal === "") {
      emailField.setCustomValidity("Email cannot be empty.");
    } else if (emailField.validity.typeMismatch) {
      emailField.setCustomValidity("Please enter a valid email address.");
    }

    if (photoField.files.length === 0) {
      photoField.setCustomValidity("Please select a photo.");
    } else {
      //photo accepts only images
      const file = photoField.files[0];
      const validExt = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i;
      const isImage =(file.type && file.type.startsWith("image/")) || validExt.test(file.name);
      if (!isImage) {
        photoField.setCustomValidity("Only image files are allowed.");
      }
    }

    if (skillsVal === "") {
      skillsField.setCustomValidity("Skills cannot be empty.");
    }

    if (expertiseVal === "") {
      expertiseField.setCustomValidity("Please select an area of expertise.");
    }

    if (educationVal === "") {
      educationField.setCustomValidity("Education cannot be empty.");
    }
    return form.reportValidity();
  }
  //clear custom errors while typing/changing fields
  for (let i = 0; i < controls.length; i++) {
    const el = controls[i];
    if (el.tagName === "BUTTON") continue;
    el.addEventListener("input", function () {
      el.setCustomValidity("");
    });
    el.addEventListener("change", function () {
      el.setCustomValidity("");
    });
  }
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!validateControls()) {
      return;
    }

    //Confirmation alert 
    alert("Thank you, " + nameField.value.trim() + "! Your application has been submitted.");
    form.reset();
  });
});
}

// ============================================================
// 3.4 Request to Join an Offering JS   (page has id="of")
// ============================================================
if (document.getElementById("of")) {

  var form = document.querySelector("form");
  var offering = document.getElementById("of");
  var nameInput = document.getElementById("fn");
  var emailInput = document.getElementById("em");
  var dateInput = document.getElementById("pd");
  var checkBox = document.querySelector(".check input");

  form.noValidate = true;  // turn off the browser's validation so OUR alert is shown instead

  //create the place where the new requests will be displayed
  var requestsBox = document.createElement("section");
  requestsBox.innerHTML = "<h2>Your New Requests</h2><ul id='newRequests'></ul>";
  requestsBox.style.display = "none";
  form.after(requestsBox);
  var requestsList = document.getElementById("newRequests");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var problems = [];

    // 1
    if (offering.value === "") {
      problems.push("- Please choose an offering.");
    }

    // 2
    var fullName = nameInput.value.trim();
    var nameOk = /^\p{L}+(\s+\p{L}+)+$/u.test(fullName);
    if (!nameOk) {
      problems.push("- Name must be a full name (first and last name) using letters only, with no numbers or characters such as ? ! @.");
    }

    // 3
    if (dateInput.value === "") {
      problems.push("- Please select a preferred date.");
    } else {
      var chosen = new Date(dateInput.value + "T00:00:00");
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen <= today) {
        problems.push("- Preferred date must be a future date.");
      }
    }

    //extra
    if (emailInput.value.trim() === "" || !emailInput.checkValidity()) {
      problems.push("- Please enter a valid email.");
    }
    if (!checkBox.checked) {
      problems.push("- Please tick the confirmation box.");
    }
    if (problems.length > 0) {
      alert("Please fix the following:\n\n" + problems.join("\n"));
      return;
    }

    //everything is valid
    var stay = confirm(
      "Your request has been sent successfully!\n\n" +
      "Press OK to stay on this page and add another request.\n" +
      "Press Cancel to return to the Member Dashboard."
    );

    if (stay) {
      var li = document.createElement("li");
      li.textContent = "Offering: " + offering.value + " | Name: " + fullName + " | Preferred Date: " + dateInput.value;
      requestsList.appendChild(li);
      requestsBox.style.display = "block";

      form.reset();
    } else {
      window.location.href = "member-dashboard.html";
    }
  });
}


// ============================================================
// 3.5 Offering Evaluation page JS   (page has id="po")
// ============================================================
if (document.getElementById("po")) {

  var form = document.querySelector("form");
  var offering = document.getElementById("po");
  var ratingBox = document.querySelector(".rate");
  var feedback = document.getElementById("fb");

  form.noValidate = true; //turn off the browser's own validation so we can highlight and alert ourselves

  //to highlight / un-highlight a field
  function markBad(element) {
    element.style.border = "2px solid red";
  }
  function clearMark(element) {
    element.style.border = "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var problems = [];

    clearMark(offering);
    clearMark(ratingBox);
    clearMark(feedback);

    // 1.
    if (offering.value === "") {
      problems.push("- Please select an offering to evaluate.");
      markBad(offering);
    }

    // 2.
    var chosenRating = document.querySelector("input[name='rating']:checked");
    if (chosenRating === null) {
      problems.push("- Please rate the offering.");
      markBad(ratingBox);
    }

    // 3.
    if (feedback.value.trim() === "") {
      problems.push("- Please write your feedback.");
      markBad(feedback);
    }

    //if something is missing
    if (problems.length > 0) {
      alert("Please fix the following:\n\n" + problems.join("\n"));
      return;
    }

    //form is valid: check the rating (4 or 5 stars = good rating)
    var stars = Number(chosenRating.value);
    if (stars >= 4) {
      alert("Thank you for your great rating! We're happy you enjoyed the offering.");
    } else {
      alert("We're sorry the offering did not meet your expectations. We will work to improve it.");
    }

    window.location.href = "member-dashboard.html";
  });
}


// ============================================================
// 3.6 Club manager dashboard JS   (page has table.pending)
// ============================================================
if (document.querySelector("table.pending")) {

  var offerings = JSON.parse(localStorage.getItem("offerings")) || [];
  var offeringsTable = document.querySelector("table.data");

  //Add one row for every saved offering
  for (var i = 0; i < offerings.length; i++) {
    var item = offerings[i];
    // Turn 2026-11-10 into "Nov 10, 2026" to match the other rows
    var niceDate = new Date(item.date + "T00:00:00").toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });

    var row = offeringsTable.insertRow(-1); // add at the end of the table
    row.insertCell(0).textContent = item.name;
    row.insertCell(1).textContent = item.instructor;
    row.insertCell(2).textContent = niceDate;
    row.insertCell(3).textContent = "$" + item.price;
  }
  var offeringsCount = document.querySelector(".stats strong");
  offeringsCount.textContent = offerings.length; //update the "Offerings" counter at the top

  // Pending Participation Requests: Accept/Reject buttons
  var pendingTable = document.querySelector("table.pending");
  var pendingCount = document.querySelectorAll(".stats strong")[3];
  var buttons = pendingTable.querySelectorAll("button");
  for (var j = 0; j < buttons.length; j++) {
    buttons[j].addEventListener("click", function () {
      var cell = this.parentElement;
      if (this.classList.contains("alt")) {
        cell.textContent = "Rejected";
      } else {
        cell.textContent = "Accepted";
      }
      pendingCount.textContent = Number(pendingCount.textContent) - 1;
    });
  }
}


// ============================================================
// 3.7 Add a new Offering JS   (page has id="on")
// ============================================================
if (document.getElementById("on")) {

  var form = document.querySelector("form");
  var nameInput = document.getElementById("on");
  var descInput = document.getElementById("od");
  var priceInput = document.getElementById("op");
  var dateInput = document.getElementById("odt");
  var instructorInput = document.getElementById("oin");
  var timeInput = document.getElementById("otm");
  var imageInput = document.getElementById("oi");

  form.noValidate = true;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var problems = [];

    var offeringName = nameInput.value.trim();
    var description = descInput.value.trim();
    var price = priceInput.value.trim();
    var instructor = instructorInput.value.trim();

    // Offering name not empty and must start with a letter
    if (offeringName === "") {
      problems.push("- Offering Name is empty.");
    } else if (!/^\p{L}/u.test(offeringName)) {
      problems.push("- Offering Name must start with a letter, not a number or symbol.");
    }
    // Description not empty
    if (description === "") {
      problems.push("- Description is empty.");
    }
    //price: not empty must be a number >0
    if (price === "") {
      problems.push("- Price is empty or is not a number.");
    } else if (isNaN(price) || Number(price) < 0) {
      problems.push("- Price must be a number (0 or more).");
    }
    // Date: not empty and future date
    if (dateInput.value === "") {
      problems.push("- Date is empty.");
    } else {
      var chosen = new Date(dateInput.value + "T00:00:00");
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      if (chosen <= today) {
        problems.push("- Date must be a future date.");
      }
    }
    // Instructor name: not empty letters and spaces only
    if (instructor === "") {
      problems.push("- Instructor Name is empty.");
    } else if (!/^\p{L}+(\s+\p{L}+)*$/u.test(instructor)) {
      problems.push("- Instructor Name must contain letters only (no numbers or symbols).");
    }
    //time: not empty
    if (timeInput.value === "") {
      problems.push("- Time is empty.");
    }
    // Image
    if (imageInput.files.length === 0) {
      problems.push("- Offering Image is missing.");
    }

    if (problems.length > 0) { //if something is wrong show alert and stop
      alert("Please fix the following:\n\n" + problems.join("\n"));
      return;
    }

    // Form is valid then get the old offerings from local storage
    var offerings = JSON.parse(localStorage.getItem("offerings")) || [];

    var newOffering = {
      name: offeringName,
      description: description,
      price: Number(price),
      date: dateInput.value,
      instructor: instructor,
      time: timeInput.value,
      image: imageInput.files[0].name //we only keep the file name
    };
    offerings.push(newOffering);
    localStorage.setItem("offerings", JSON.stringify(offerings));

    alert('The offering "' + offeringName + '" has been added successfully!');

    form.reset(); // clear the form
  });
}


// ============================================================
// 3.8 Manage Activity Leaders and Instructors JS   (page has id="instructorList")
// ============================================================
if (document.getElementById("instructorList")) {

  //all instructors and activity leaders are stored in an array of objects
  var people = [
    { name: "Sarah Ahmed",      role: "Cooking Instructor", expertise: "Italian Cuisine",   photo: "images/avatar-sarah-ahmed.svg",      profile: "instructor-profile.html" },
    { name: "Omar Ali",         role: "Cooking Instructor", expertise: "Asian Cuisine",     photo: "images/avatar-omar-ali.svg",         profile: "Instructor-profile(2).html" },
    { name: "Lina Hassan",      role: "Cooking Instructor", expertise: "Pizza and Pasta",   photo: "images/avatar-lina-hassan.svg",      profile: "Instructor-profile(3).html" },
    { name: "Maha Alharbi",     role: "Cooking Instructor", expertise: "Baking and Pastry", photo: "images/avatar-maha-alharbi.svg",     profile: "Instructor-profile(4).html" },
    { name: "Khalid Saad",      role: "Cooking Instructor", expertise: "Healthy Cooking",   photo: "images/avatar-khalid-saad.svg",      profile: "Instructor-profile(5).html" },
    { name: "Reem Alotaibi",    role: "Cooking Instructor", expertise: "Desserts",          photo: "images/avatar-reem-alotaibi.svg",    profile: "Instructor-profile(6).html" },
    { name: "Noura Alqahtani",  role: "Cooking Instructor", expertise: "Arabic Cuisine",    photo: "images/avatar-noura-alqahtani.svg",  profile: "Instructor-profile(7).html" },
    { name: "Faisal Almutairi", role: "Cooking Instructor", expertise: "Grilling and BBQ",  photo: "images/avatar-faisal-almutairi.svg", profile: "Instructor-profile(8).html" },
    { name: "Dana Khalil",      role: "Cooking Instructor", expertise: "Vegan Cooking",     photo: "images/avatar-dana-khalil.svg",      profile: "Instructor-profile(9).html" }
  ];

  var list = document.getElementById("instructorList");
  var deleteForm = document.getElementById("deleteForm");
  var addForm = document.getElementById("addForm");

  function showPeople() {
    list.innerHTML = "";
    for (var i = 0; i < people.length; i++) {
      var p = people[i];
      var card = document.createElement("div");
      card.className = "person small";

      var img = document.createElement("img");
      img.src = p.photo;
      img.alt = "Photo of " + p.name;

      var info = document.createElement("div");
      info.className = "pt";
      info.innerHTML = "<strong></strong><span></span><span></span>";
      info.children[0].textContent = p.name;
      info.children[1].textContent = p.role;
      info.children[2].textContent = p.expertise;

      var acts = document.createElement("div");
      acts.className = "acts";
      if (p.profile) {   //new people have no profile page -> not required)
        var link = document.createElement("a");
        link.className = "btn small";
        link.href = p.profile;
        link.textContent = "View Profile";
        acts.appendChild(link);
      } else {
        acts.appendChild(document.createElement("span"));
      }
      var label = document.createElement("label");
      var box = document.createElement("input");
      box.type = "checkbox";
      box.name = "remove";
      box.value = i; 
      label.appendChild(box);
      label.appendChild(document.createTextNode(" Select"));
      acts.appendChild(label);

      card.appendChild(img);
      card.appendChild(info);
      card.appendChild(acts);
      list.appendChild(card);
    }
    if (people.length === 0) {
      list.innerHTML = "<p>There are no instructors or activity leaders.</p>";
    }
  }
  showPeople();

  //DELETE
  deleteForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var checked = list.querySelectorAll("input[name='remove']:checked");

    if (checked.length === 0) {
      alert("Please select at least one activity leader or instructor to delete.");
      return;
    }

    var ok = confirm("Are you sure you want to delete " + checked.length + " selected person(s)?");
    if (!ok) {
      return;
    }
    //keep only the people who were NOT checked
    var toDelete = [];
    for (var i = 0; i < checked.length; i++) {
      toDelete.push(Number(checked[i].value));
    }
    people = people.filter(function (person, index) {
      return toDelete.indexOf(index) === -1;
    });
    showPeople();
  });

  //ADD
  addForm.noValidate = true; //we show our own alert instead of the browser messages

  addForm.addEventListener("submit", function (event) {
    event.preventDefault();
    var problems = [];

    var name = document.getElementById("an").value.trim();
    var dob = document.getElementById("ad").value;
    var skills = document.getElementById("as").value.trim();
    var emailInput = document.getElementById("ae");
    var expertise = document.getElementById("ax").value;
    var photo = document.getElementById("ap").files[0];
	var education = document.getElementById("aed").value.trim();

    //empty fields
    if (name === "") problems.push("- Name is empty.");
    if (dob === "") problems.push("- Date of Birth is empty.");
    if (skills === "") problems.push("- Skills is empty.");
    if (emailInput.value.trim() === "") problems.push("- Email is empty.");
    if (expertise === "") problems.push("- Please select an area of expertise.");
	if (education === "") problems.push("- Education is empty.");
	if (!photo) problems.push("- Profile Picture is empty.");

    if (name !== "" && !/^\p{L}+(\s+\p{L}+)+$/u.test(name)) {
      problems.push("- Name must be a full name with letters only (no numbers or symbols).");
    }
    if (dob !== "" && new Date(dob + "T00:00:00") >= new Date("2008-12-31T00:00:00")) {
      problems.push("- Date of Birth must be earlier than 2008-12-31.");
    }
    if (emailInput.value.trim() !== "" && !emailInput.checkValidity()) {
      problems.push("- Email is not valid (example: name@email.com).");
    }
    if (photo && !photo.type.startsWith("image/")) {
      problems.push("- Profile Picture must be an image file.");
    }

    if (problems.length > 0) {
      alert("Please fix the following:\n\n" + problems.join("\n"));
      return;
    }
    //valid
    people.push({
      name: name,
      role: "Cooking Instructor",
      expertise: expertise,
      photo: photo ? URL.createObjectURL(photo) : "images/flavora-logo.jpg",
      profile: "" //no profile page needed for new people
    });
    showPeople();

    alert(name + " has been added successfully!");
    addForm.reset();
  });
}


