// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Welcome message with user's name
  function updateWelcomeMessage() {
    const welcomeElement = document.getElementById("welcomeMessage")
    if (welcomeElement) {
      // Get user's name from localStorage or prompt
      let userName = localStorage.getItem("userName")

      if (!userName) {
        userName = prompt("Please enter your name:")
        if (userName) {
          localStorage.setItem("userName", userName)
        } else {
          userName = "Guest"
        }
      }

      welcomeElement.textContent = `Hi ${userName}, Welcome To Website`
    }
  }

  // Call the welcome message function
  updateWelcomeMessage()

  // Handle form submission with validation
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const name = formData.get("name")
      const subject = formData.get("subject")
      const gender = formData.get("gender")
      const message = formData.get("message")

      // Validation
      let isValid = true
      let errorMessage = ""

      if (!name || name.trim().length < 2) {
        isValid = false
        errorMessage += "Name must be at least 2 characters long.\n"
      }

      if (!subject) {
        isValid = false
        errorMessage += "Please select a subject.\n"
      }

      if (!gender) {
        isValid = false
        errorMessage += "Please select your gender.\n"
      }

      if (!message || message.trim().length < 10) {
        isValid = false
        errorMessage += "Message must be at least 10 characters long.\n"
      }

      if (!isValid) {
        alert("Please fix the following errors:\n" + errorMessage)
        return
      }

      // Show success message with form values
      const successMessage = `Thank you, ${name}!\n\nYour message has been sent successfully.\n\nDetails:\nSubject: ${subject}\nGender: ${gender}\nMessage: ${message.substring(0, 50)}${message.length > 50 ? "..." : ""}`

      alert(successMessage)

      // Reset form
      contactForm.reset()
    })
  }

  // Handle navigation links
  const navLinks = document.querySelectorAll(".nav-link")

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Don't prevent default for actual page navigation
      if (this.getAttribute("href").startsWith("#")) {
        e.preventDefault()

        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
          })
        }
      }

      // Update active state for current page
      const currentPage = window.location.pathname.split("/").pop() || "index.html"
      const linkHref = this.getAttribute("href").split("/").pop()

      if (linkHref === currentPage) {
        navLinks.forEach((l) => l.classList.remove("active"))
        this.classList.add("active")
      }
    })
  })

  // Handle discover button
  const discoverBtn = document.querySelector(".discover-btn")

  if (discoverBtn) {
    discoverBtn.addEventListener("click", () => {
      const facilitationSection = document.querySelector(".facilitation")
      if (facilitationSection) {
        facilitationSection.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  }

  // Form field validation feedback
  const formInputs = document.querySelectorAll("input, select, textarea")

  formInputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.value.trim()) {
        this.style.borderColor = "#ff6b6b"
      } else {
        this.style.borderColor = "#ddd"
      }
    })

    input.addEventListener("input", function () {
      if (this.style.borderColor === "rgb(255, 107, 107)") {
        this.style.borderColor = "#ddd"
      }
    })
  })

  // Set active navigation based on current page
  function setActiveNavigation() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html"

    navLinks.forEach((link) => {
      const linkHref = link.getAttribute("href").split("/").pop()
      if (linkHref === currentPage) {
        link.classList.add("active")
      } else {
        link.classList.remove("active")
      }
    })
  }

  // Call on page load
  setActiveNavigation()
})
