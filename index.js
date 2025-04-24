// DOM Elements
const btnEl = document.getElementById("btn");
const birthdayEl = document.getElementById("birthday");
const nameEl = document.getElementById("name");
const resultEl = document.getElementById("result");
const greetingEl = document.getElementById("greeting");
const yearsEl = document.getElementById("years");
const monthsEl = document.getElementById("months");
const daysEl = document.getElementById("days");
// Zodiac elements removed
const nextBirthdayEl = document.getElementById("next-birthday");
const birthdayProgressEl = document.getElementById("birthday-progress");
const birthdayCountdownEl = document.getElementById("birthday-countdown");
const funFactsListEl = document.getElementById("fun-facts-list");
const resultsContainerEl = document.getElementById("results-container");
const shareBtnEl = document.getElementById("share-btn");
const printBtnEl = document.getElementById("print-btn");

// Calculate age and display all results
function calculateAge() {
  const birthdayValue = birthdayEl.value;
  const nameValue = nameEl.value;
  
  if (birthdayValue === "") {
    alert("Please enter your date of birth");
    return;
  }
  
  const birthdayDate = new Date(birthdayValue);
  const currentDate = new Date();
  
  // Validate date (must be in the past)
  if (birthdayDate > currentDate) {
    alert("Please enter a date in the past");
    return;
  }
  
  // Show results container
  resultsContainerEl.style.display = "block";
  
  // Scroll to results
  setTimeout(() => {
    resultsContainerEl.scrollIntoView({ behavior: 'smooth' });
  }, 100);
  
  // Calculate age details
  const ageDetails = getAgeDetails(birthdayDate, currentDate);
  
  // Update main result
  const years = ageDetails.years;
  resultEl.innerText = `${nameValue ? nameValue + ', you' : 'You'} are ${years} ${years !== 1 ? 'years' : 'year'} old`;
  
  // Update greeting
  updateGreeting(nameValue, years);
  
  // Update age breakdown
  yearsEl.innerText = `Years: ${years}`;
  monthsEl.innerText = `Months: ${ageDetails.months}`;
  daysEl.innerText = `Days: ${ageDetails.days}`;
  
  // Zodiac sign section removed
  
  // Update next birthday info
  const nextBirthdayInfo = getNextBirthday(birthdayDate);
  nextBirthdayEl.innerText = nextBirthdayInfo.date;
  birthdayProgressEl.style.width = `${nextBirthdayInfo.progressPercent}%`;
  birthdayCountdownEl.innerText = nextBirthdayInfo.countdown;
  
  // Update fun facts
  updateFunFacts(birthdayDate, ageDetails);
}

// Get detailed age breakdown
function getAgeDetails(birthdayDate, currentDate) {
  // Calculate years
  let years = currentDate.getFullYear() - birthdayDate.getFullYear();
  
  // Calculate months
  let months = currentDate.getMonth() - birthdayDate.getMonth();
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Calculate days
  let days = currentDate.getDate() - birthdayDate.getDate();
  if (days < 0) {
    // Get the last day of the previous month
    const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
    days += lastMonth.getDate();
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  // Calculate total days lived
  const totalDays = Math.floor((currentDate - birthdayDate) / (1000 * 60 * 60 * 24));
  
  return {
    years,
    months,
    days,
    totalDays
  };
}

// Zodiac sign function removed

// Calculate next birthday and days remaining
function getNextBirthday(birthdayDate) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  
  // Create date for this year's birthday
  const thisYearBirthday = new Date(currentYear, birthdayDate.getMonth(), birthdayDate.getDate());
  
  // Create date for next year's birthday
  const nextYearBirthday = new Date(currentYear + 1, birthdayDate.getMonth(), birthdayDate.getDate());
  
  // Determine which birthday to use (this year or next year)
  let nextBirthday;
  if (thisYearBirthday < currentDate) {
    nextBirthday = nextYearBirthday;
  } else {
    nextBirthday = thisYearBirthday;
  }
  
  // Calculate days until next birthday
  const daysUntilBirthday = Math.ceil((nextBirthday - currentDate) / (1000 * 60 * 60 * 24));
  
  // Calculate progress percentage
  const daysInYear = isLeapYear(currentDate.getFullYear()) ? 366 : 365;
  const progressPercent = 100 - ((daysUntilBirthday / daysInYear) * 100);
  
  // Format the next birthday date
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  const formattedDate = nextBirthday.toLocaleDateString('en-US', options);
  
  return {
    date: formattedDate,
    countdown: `${daysUntilBirthday} days remaining`,
    progressPercent: progressPercent.toFixed(1)
  };
}

// Check if a year is a leap year
function isLeapYear(year) {
  return ((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0);
}

// Update greeting based on name and age
function updateGreeting(name, age) {
  let greeting = '';
  
  if (name) {
    if (age < 13) {
      greeting = `Hello ${name}! You're still young with so much to explore!`;
    } else if (age < 20) {
      greeting = `Hey ${name}! You're in your teenage years - enjoy them!`;
    } else if (age < 30) {
      greeting = `Hi ${name}! Your twenties are a great time to set your path!`;
    } else if (age < 50) {
      greeting = `Hello ${name}! You're in your prime years!`;
    } else {
      greeting = `Greetings ${name}! Your wisdom and experience are valuable gifts!`;
    }
  } else {
    if (age < 13) {
      greeting = `You're still young with so much to explore!`;
    } else if (age < 20) {
      greeting = `You're in your teenage years - enjoy them!`;
    } else if (age < 30) {
      greeting = `Your twenties are a great time to set your path!`;
    } else if (age < 50) {
      greeting = `You're in your prime years!`;
    } else {
      greeting = `Your wisdom and experience are valuable gifts!`;
    }
  }
  
  greetingEl.innerText = greeting;
}

// Generate and display fun facts
function updateFunFacts(birthdayDate, ageDetails) {
  const facts = [];
  
  // Calculate days lived
  facts.push(`You've lived approximately ${ageDetails.totalDays.toLocaleString()} days so far.`);
  
  // Calculate approximate heartbeats
  const heartbeats = ageDetails.totalDays * 24 * 60 * 70; // 70 beats per minute average
  facts.push(`Your heart has beaten approximately ${heartbeats.toLocaleString()} times.`);
  
  // Calculate breaths taken
  const breaths = ageDetails.totalDays * 24 * 60 * 12; // 12 breaths per minute average
  facts.push(`You've taken approximately ${breaths.toLocaleString()} breaths.`);
  
  // Calculate sleep time
  const sleepHours = ageDetails.totalDays * 8; // 8 hours of sleep per day average
  facts.push(`You've slept approximately ${sleepHours.toLocaleString()} hours.`);
  
  // Day of the week born
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  facts.push(`You were born on a ${daysOfWeek[birthdayDate.getDay()]}.`);
  
  // Generate HTML for facts
  funFactsListEl.innerHTML = facts.map(fact => `<li>${fact}</li>`).join('');
}

// Share results
function shareResults() {
  // Create share text
  const birthdayValue = birthdayEl.value;
  const nameValue = nameEl.value || 'I';
  const birthdayDate = new Date(birthdayValue);
  const ageDetails = getAgeDetails(birthdayDate, new Date());
  
  const shareText = `${nameValue} ${nameValue === 'I' ? 'am' : 'is'} ${ageDetails.years} years, ${ageDetails.months} months, and ${ageDetails.days} days old! Check out this cool age calculator!`;
  
  // Check if Web Share API is available
  if (navigator.share) {
    navigator.share({
      title: 'My Age Details',
      text: shareText,
    })
    .catch(error => {
      console.log('Error sharing:', error);
      fallbackShare(shareText);
    });
  } else {
    fallbackShare(shareText);
  }
}

// Fallback share method
function fallbackShare(text) {
  // Create a temporary input element
  const input = document.createElement('textarea');
  input.value = text;
  document.body.appendChild(input);
  
  // Select and copy the text
  input.select();
  document.execCommand('copy');
  
  // Remove the temporary element
  document.body.removeChild(input);
  
  // Alert the user
  alert('Result copied to clipboard! You can now paste it anywhere to share.');
}

// Print results
function printResults() {
  window.print();
}

// Event Listeners
btnEl.addEventListener("click", calculateAge);
shareBtnEl.addEventListener("click", shareResults);
printBtnEl.addEventListener("click", printResults);

// Initialize with today's date as max date
birthdayEl.max = new Date().toISOString().split('T')[0];
