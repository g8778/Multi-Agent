// Application Data
const jobData = {
  title: "Senior Python Developer",
  company: "TechCorp Solutions",
  requirements: [
    "5+ years Python development experience",
    "Django framework expertise",
    "AWS cloud services knowledge",
    "RESTful API development",
    "Team leadership experience",
    "Bachelor's degree in Computer Science",
  ],
  location: "San Francisco, CA / Remote",
  type: "Full-time",
}

const candidatesData = [
  {
    id: 1,
    name: "Sarah Johnson",
    experience: "8 years",
    skills: ["Python", "Django", "AWS", "PostgreSQL", "Docker", "Team Lead"],
    education: "MS Computer Science",
    score: 95,
  },
  {
    id: 2,
    name: "Mike Chen",
    experience: "6 years",
    skills: ["Python", "Flask", "AWS", "React", "MongoDB"],
    education: "BS Software Engineering",
    score: 92,
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    experience: "5 years",
    skills: ["Python", "Django", "Machine Learning", "PostgreSQL"],
    education: "BS Computer Science",
    score: 89,
  },
  {
    id: 4,
    name: "David Kumar",
    experience: "4 years",
    skills: ["Python", "FastAPI", "Docker", "Kubernetes"],
    education: "MS Data Science",
    score: 85,
  },
  {
    id: 5,
    name: "Emma Wilson",
    experience: "7 years",
    skills: ["Python", "Django", "AWS", "DevOps", "Terraform"],
    education: "BS Computer Engineering",
    score: 88,
  },
]

const agentsData = [
  {
    name: "Job Analyzer",
    icon: "fas fa-briefcase",
    status: "idle",
    color: "#2196F3",
    description: "Analyzes job requirements",
  },
  {
    name: "Resume Scanner",
    icon: "fas fa-users",
    status: "idle",
    color: "#4CAF50",
    description: "Scans and profiles resumes",
  },
  {
    name: "Skill Matcher",
    icon: "fas fa-chart-line",
    status: "idle",
    color: "#9C27B0",
    description: "Matches skills to requirements",
  },
  {
    name: "Candidate Ranker",
    icon: "fas fa-star",
    status: "idle",
    color: "#FF9800",
    description: "Ranks and shortlists candidates",
  },
  {
    name: "Interview Scheduler",
    icon: "fas fa-envelope",
    status: "idle",
    color: "#F44336",
    description: "Sends interview invitations",
  },
  {
    name: "Quality Monitor",
    icon: "fas fa-check-circle",
    status: "idle",
    color: "#607D8B",
    description: "Monitors process quality",
  },
]

const processingSteps = [
  { title: "Analyzing Job Requirements", duration: 2000, agentIndex: 0 },
  { title: "Scanning Resume Database", duration: 3000, agentIndex: 1 },
  { title: "Matching Skills & Experience", duration: 2500, agentIndex: 2 },
  { title: "Ranking Top Candidates", duration: 1500, agentIndex: 3 },
  { title: "Scheduling Interviews", duration: 2000, agentIndex: 4 },
  { title: "Final Quality Check", duration: 1000, agentIndex: 5 },
]

// Application State
let currentStep = 0
let isProcessing = false
let showResults = false
let agents = [...agentsData]

// DOM Elements
const startDemoBtn = document.getElementById("startDemo")
const resetDemoBtn = document.getElementById("resetDemo")
const runAgainBtn = document.getElementById("runAgain")
const agentsGrid = document.getElementById("agentsGrid")
const timelineCard = document.getElementById("timelineCard")
const timelineContainer = document.getElementById("timelineContainer")
const progressFill = document.getElementById("progressFill")
const progressText = document.getElementById("progressText")
const resultsSection = document.getElementById("resultsSection")
const candidatesList = document.getElementById("candidatesList")
const demoControls = document.getElementById("demoControls")
const loadingOverlay = document.getElementById("loadingOverlay")
const notification = document.getElementById("notification")

// Initialize Application
function initializeApp() {
  renderAgents()
  renderTimeline()
  renderCandidates()
  setupEventListeners()
}

// Setup Event Listeners
function setupEventListeners() {
  startDemoBtn.addEventListener("click", startDemo)
  resetDemoBtn.addEventListener("click", resetDemo)
  runAgainBtn.addEventListener("click", startDemo)
}

// Render Agents Grid
function renderAgents() {
  agentsGrid.innerHTML = agents
    .map(
      (agent) => `
        <div class="agent-item" data-agent="${agent.name}">
            <div class="agent-icon" style="background-color: ${agent.color}">
                <i class="${agent.icon}"></i>
            </div>
            <div class="agent-info">
                <div class="agent-name">${agent.name}</div>
                <div class="agent-description">${agent.description}</div>
            </div>
            <div class="agent-status ${agent.status}"></div>
        </div>
    `,
    )
    .join("")
}

// Render Timeline
function renderTimeline() {
  timelineContainer.innerHTML = processingSteps
    .map(
      (step, index) => `
        <div class="timeline-step pending" data-step="${index}">
            <div class="step-number pending">${index + 1}</div>
            <div class="step-info">
                <div class="step-title">${step.title}</div>
                <div class="step-status">Waiting to start</div>
            </div>
            <div class="step-spinner" style="display: none;">
                <i class="fas fa-spinner"></i>
            </div>
        </div>
    `,
    )
    .join("")
}

// Render Candidates
function renderCandidates() {
  candidatesList.innerHTML = candidatesData
    .map(
      (candidate, index) => `
        <div class="candidate-item" style="animation-delay: ${index * 0.1}s">
            <div class="candidate-header">
                <div class="candidate-rank">#${index + 1}</div>
                <div class="candidate-info">
                    <div class="candidate-name">${candidate.name}</div>
                    <div class="candidate-details">${candidate.experience} • ${candidate.education}</div>
                </div>
                <div class="candidate-score ${getScoreClass(candidate.score)}">
                    ${candidate.score}% Match
                </div>
            </div>
            <div class="candidate-skills">
                ${candidate.skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join("")}
            </div>
            <div class="candidate-footer">
                <div class="candidate-feedback">${getCandidateFeedback(candidate.score)}</div>
                <button class="interview-button">
                    <i class="fas fa-envelope"></i>
                    Interview Sent
                </button>
            </div>
        </div>
    `,
    )
    .join("")
}

// Helper Functions
function getScoreClass(score) {
  if (score >= 90) return "score-excellent"
  if (score >= 80) return "score-good"
  return "score-fair"
}

function getCandidateFeedback(score) {
  if (score >= 90) return "🎯 Perfect match for requirements"
  if (score >= 85) return "✅ Strong candidate, minor gaps"
  return "⚠️ Good fit, some missing skills"
}

// Start Demo Function
function startDemo() {
  if (isProcessing) return

  isProcessing = true
  showResults = false
  currentStep = 0

  // Update UI
  startDemoBtn.disabled = true
  startDemoBtn.innerHTML =
    '<span class="button-content"><i class="fas fa-spinner fa-spin"></i><span class="button-text">Processing...</span></span>'

  // Reset agents
  agents = agents.map((agent) => ({ ...agent, status: "idle" }))
  renderAgents()

  // Show timeline
  timelineCard.style.display = "block"
  timelineCard.scrollIntoView({ behavior: "smooth", block: "center" })

  // Hide results and controls
  resultsSection.style.display = "none"
  demoControls.style.display = "none"

  // Reset timeline
  renderTimeline()
  updateProgress(0)

  // Process each step
  let totalDuration = 0
  processingSteps.forEach((step, index) => {
    setTimeout(() => {
      processStep(index)
    }, totalDuration)
    totalDuration += step.duration
  })

  // Complete demo
  setTimeout(() => {
    completeDemo()
  }, totalDuration)
}

// Process Individual Step
function processStep(stepIndex) {
  currentStep = stepIndex
  const step = processingSteps[stepIndex]

  // Update timeline
  updateTimelineStep(stepIndex, "current")

  // Update agent status
  agents = agents.map((agent, index) => ({
    ...agent,
    status: index === step.agentIndex ? "processing" : index < step.agentIndex ? "completed" : "idle",
  }))
  renderAgents()

  // Update progress
  const progress = ((stepIndex + 1) / processingSteps.length) * 100
  updateProgress(progress)

  // Mark previous steps as completed
  for (let i = 0; i < stepIndex; i++) {
    updateTimelineStep(i, "completed")
  }
}

// Update Timeline Step
function updateTimelineStep(stepIndex, status) {
  const stepElement = document.querySelector(`[data-step="${stepIndex}"]`)
  const numberElement = stepElement.querySelector(".step-number")
  const statusElement = stepElement.querySelector(".step-status")
  const spinnerElement = stepElement.querySelector(".step-spinner")

  // Remove all status classes
  stepElement.className = "timeline-step " + status
  numberElement.className = "step-number " + status

  // Update content based on status
  if (status === "current") {
    statusElement.textContent = "Working on this now..."
    spinnerElement.style.display = "block"
    numberElement.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`
  } else if (status === "completed") {
    statusElement.textContent = "✓ Done"
    spinnerElement.style.display = "none"
    numberElement.innerHTML = `<i class="fas fa-check"></i>`
  } else {
    statusElement.textContent = "Waiting to start"
    spinnerElement.style.display = "none"
    numberElement.textContent = stepIndex + 1
  }
}

// Update Progress Bar
function updateProgress(percentage) {
  progressFill.style.width = percentage + "%"
  progressText.textContent = Math.round(percentage) + "% Complete"
}

// Complete Demo
function completeDemo() {
  isProcessing = false
  showResults = true

  // Update final step
  updateTimelineStep(processingSteps.length - 1, "completed")

  // Complete all agents
  agents = agents.map((agent) => ({ ...agent, status: "completed" }))
  renderAgents()

  // Update progress to 100%
  updateProgress(100)

  // Reset start button
  startDemoBtn.disabled = false
  startDemoBtn.innerHTML =
    '<span class="button-content"><i class="fas fa-play"></i><span class="button-text">Start Demo</span></span>'

  // Show results with delay for effect
  setTimeout(() => {
    resultsSection.style.display = "block"
    demoControls.style.display = "block"

    // Animate statistics
    animateStatistics()

    // Show notification
    showNotification()

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: "smooth", block: "start" })
  }, 500)
}

// Animate Statistics
function animateStatistics() {
  const statNumbers = document.querySelectorAll(".stat-number")

  statNumbers.forEach((stat) => {
    const target = Number.parseInt(stat.getAttribute("data-target"))
    const increment = target / 50
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        current = target
        clearInterval(timer)
      }

      if (stat.textContent.includes("Minutes")) {
        stat.textContent = Math.floor(current) + ":45"
      } else {
        stat.textContent = Math.floor(current) + (target === 92 ? "%" : "")
      }
    }, 40)
  })
}

// Show Notification
function showNotification() {
  notification.classList.add("show")
  setTimeout(() => {
    notification.classList.remove("show")
  }, 3000)
}

// Reset Demo
function resetDemo() {
  isProcessing = false
  showResults = false
  currentStep = 0

  // Reset agents
  agents = agents.map((agent) => ({ ...agent, status: "idle" }))
  renderAgents()

  // Reset UI
  startDemoBtn.disabled = false
  startDemoBtn.innerHTML =
    '<span class="button-content"><i class="fas fa-play"></i><span class="button-text">Start Demo</span></span>'

  // Hide sections
  timelineCard.style.display = "none"
  resultsSection.style.display = "none"
  demoControls.style.display = "none"

  // Reset timeline
  renderTimeline()
  updateProgress(0)

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" })
}

// Add some interactive effects
document.addEventListener("DOMContentLoaded", () => {
  // Add hover effects to cards
  const cards = document.querySelectorAll(".card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add click effect to buttons
  const buttons = document.querySelectorAll("button")
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span")
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = x + "px"
      ripple.style.top = y + "px"
      ripple.classList.add("ripple-effect")

      this.appendChild(ripple)

      setTimeout(() => {
        ripple.remove()
      }, 600)
    })
  })
})

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Initialize the application
initializeApp()
