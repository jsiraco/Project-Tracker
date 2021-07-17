let timeEl = $("time-display");
let projectDisplayEl = $("#project-display");
let projectModalEl = $("project-modal");
let projectFormEl = $("project-form");
let projectNameINputEl = $("#project-name-input");
let projectTypeUnputEl = $("#project-type-input");
let hourlyRateInputEl = $('#hourly-rate-input');
let dueDateInputEl = $('#due-date-input');


function displayTime() {
    let now = moment().format("MMM DD, YYYY hh:mm:ss");
    timeEl.text(now);
    console.log(now);
}

function printProjectData(name, type, hourlyRate, dueDate) {
    let projectRowEl = $("<tr>");

    let projectNameTdEl = $("<td>").addclass("p-2").text(name);

    let projectTypeTdEl = $('<td>').addClass('p-2').text(type);

    let rateTdEl = $('<td>').addClass('p-2').text(hourlyRate);

    let dueDateTdEl = $('<td>').addClass('p-2').text(dueDate);

    let daysToDate = moment(dueDate, 'MM/DD/YYYY').diff(moment(), 'days');
    let daysLeftTdEl = $('<td>').addClass('p-2').text(daysToDate);

    let totalEarnings = calculateTotalEarnings(hourlyRate, daysToDate);




    let deleteProjectBtn = $("<td").addclass("p-2 delete-project-btn text-center").text("X");
    let totalTdEl = $("<td>").addClass('p-2').text("$" + totalEarnings);

    projectRowEl.append(
        projectNameTdEl,
        projectTypeTdEl,
        rateTdEl,
        dueDateTdEl,
        daysLeftTdEl,
        totalTdEl,
        deleteProjectBtn
    );

    projectDisplayEl.append(projectRowEl);

    projectModalEl.modal("hide");
}

function calculateTotalEarnings(rate, days) {
    let dailyTotal = rate * 8;
    let total = dailyTotal * days;
    return total;
}

function handleDeleteProject(event) {
    console.log(event.target);
    let btnClicked = $(event.target);
    btnClicked.parent("tr").remove();
}

function handleProjectformSubmit(event) {
    event.preventDefault();

    let projectName = projectNameINputEl.val().trim();
    var projectType = projectTypeInputEl.val().trim();
    var hourlyRate = hourlyRateInputEl.val().trim();
    var dueDate = dueDateInputEl.val().trim();

    printProjectData(projectName, projectType, hourlyRate, dueDate);

    projectFormEl[0].reset();
}

projectFormEl.on("submit", handleProjectformSubmit);
projectDisplayEl.on("click", "delete-project-btn", handleDeleteProject);
dueDateInputEl.datepicker({minDate: 1})

setInterval(displayTime, 1000);