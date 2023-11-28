const subjects = [
  {
    name: "Calculus",
    results: {
      3: [
        { topic: "Trigonometry", credits: 4, grade: "E", type: "internal" },
        {
          topic: "Integration",
          credits: 6,
          grade: undefined,
          type: "external",
        },
        {
          topic: "Integration",
          credits: 6,
          grade: undefined,
          type: "external",
        },
        {
          topic: "Complex Num",
          credits: 5,
          grade: undefined,
          type: "external",
        },
      ],
      2: [123],
      1: [],
    },
  },
  {
    name: "Physics",
    results: {
      3: [
        { topic: "Investigation", credits: 4, grade: "A", type: "internal" },
        { topic: "Mechanics", credits: 6, grade: undefined, type: "external" },
        {
          topic: "Electricity",
          credits: 6,
          grade: undefined,
          type: "external",
        },
        { topic: "Waves", credits: 4, grade: undefined, type: "external" },
      ],
      2: [],
      1: [],
    },
  },
  {
    name: "Computer Science",
    results: {
      3: [
        { topic: "Design", credits: 3, grade: "M", type: "internal" },
        { topic: "Website", credits: 4, grade: "E", type: "internal" },
        { topic: "Python", credits: 6, grade: "E", type: "internal" },
        { topic: "Database", credits: 4, grade: undefined, type: "external" },
        { topic: "External", credits: 3, grade: undefined, type: "external" },
      ],
      2: [],
      1: [],
    },
  },
  {
    name: "Accounting",
    results: {
      3: [
        { topic: "Partnerships", credits: 4, grade: "E", type: "internal" },
        { topic: "Job cost", credits: 4, grade: "E", type: "internal" },
        { topic: "Sanford", credits: 5, grade: "E", type: "internal" },
        {
          topic: "Numbers Ext",
          credits: 6,
          grade: undefined,
          type: "external",
        },
        {
          topic: "Writing Ext",
          credits: 4,
          grade: undefined,
          type: "external",
        },
      ],
      2: [],
      1: [],
    },
  },
  {
    name: "History",
    results: {
      3: [
        { topic: "Perspectives", credits: 4, grade: "M", type: "internal" },
        { topic: "NZ event", credits: 4, grade: "M", type: "internal" },
        { topic: "Causes", credits: 6, grade: undefined, type: "external" },
        { topic: "Analyse", credits: 4, grade: undefined, type: "external" },
      ],
      2: [],
      1: [],
    },
  },
];

// Gathering total credits
let totals = { e: 0, m: 0, a: 0, na: 0 };
for (let a of subjects) {
  for (let b = 3; b >= 1; b--) {
    for (let c = 0; c < a.results[b].length; c++) {
      if (a.results[b][c].grade === "E") {
        totals.e += a.results[b][c].credits;
      } else if (a.results[b][c].grade === "M") {
        totals.m += a.results[b][c].credits;
      } else if (a.results[b][c].grade === "A") {
        totals.a += a.results[b][c].credits;
      } else if (a.results[b][c].grade === "NA") {
        totals.na += a.results[b][c].credits;
      }
    }
  }
}

let levels = { 3: [], 2: [], 1: [] };
for (let i of subjects) {
  levels[3] += i.results[3];
  levels[2] += i.results[2];
  levels[1] += i.results[1];
}

const displayResults = () => {
  for (let n = 3; n > 0; n--) {
    if (levels[n].length > 0) {
      document.querySelector(".results").innerHTML += `<h2>Level ${n}</h2>`;
      for (let i of subjects) {
        if (i.results[n].length != 0) {
          document.querySelector(
            ".results"
          ).innerHTML += `<div class="subject level-${n}-subject-${subjects.indexOf(
            i
          )}"><h2>${i.name}</h2></div>`;
          document.querySelector(
            `.level-${n}-subject-${subjects.indexOf(i)}`
          ).innerHTML += `<a><i class="edit-${subjects.indexOf(
            i
          )} fa fa-edit"></i></a>`;
          document.querySelector(
            `.level-${n}-subject-${subjects.indexOf(i)}`
          ).innerHTML += `<input class='bg-colour-picker' type='text' data-coloris>`;
          document.querySelector(
            `.level-${n}-subject-${subjects.indexOf(i)}`
          ).innerHTML += `<input class='fg-colour-picker' type='text' data-coloris>`;
          document.querySelector(
            `.level-${n}-subject-${subjects.indexOf(i)}`
          ).innerHTML += `
      <table class="table-${subjects.indexOf(i)}-level-${n}" style="width:100%">
      <tr>
        <th>Topic</th>
        <th>Credits</th> 
        <th>Grade</th>
      </tr>
    </table>`;
          for (let q = 0; q < i.results[n].length; q++) {
            if (i.results[n][q].grade === undefined) {
              i.results[n][q].grade = "N/A";
            }
            document.querySelector(
              `.table-${subjects.indexOf(i)}-level-${n}`
            ).innerHTML += `
        <tr>
        <td>${i.results[n][q].topic} <span class="type">${i.results[n][q].type}</span></td>
        <td>${i.results[n][q].credits}</td>
        <td>${i.results[n][q].grade}</td>
        </tr>`;
          }
        }
      }
    }
  }
};
displayResults();

const results = document.querySelector(".results");
results.addEventListener("click", (event) => {
  if (event.target.tagName === "I") {
    const button = event.target;
    const container = button.parentNode;
    const subject = container.parentNode;
    const bgColourPick = subject.querySelector(".bg-colour-picker");
    const fgColourPick = subject.querySelector(".fg-colour-picker");

    bgColourPick.addEventListener("click", (event) => {
      Coloris({
        format: "rgb",
        theme: "small",
        onChange: (colour) => {
          subject.style.backgroundColor = colour;
        },
      });
    });
    fgColourPick.addEventListener("click", (event) => {
      Coloris({
        format: "rgb",
        theme: "small",
        onChange: (colour) => {
          subject.style.color = colour;
        },
      });
    });

    let bgColourPickers = document.querySelectorAll(".bg-colour-picker");
    bgColourPickers.forEach((element) => {
      element.style.display = "none";
    });
    let fgColourPickers = document.querySelectorAll(".fg-colour-picker");
    fgColourPickers.forEach((element) => {
      element.style.display = "none";
    });
    fgColourPick.style.display = "inline";
    bgColourPick.style.display = "inline";
  }
});

// Clearing colour picker when un clicked
window.addEventListener("click", (event) => {
  if (event.target.tagName !== "I" && event.target.tagName !== "INPUT") {
    let bgColourPickers = document.querySelectorAll(".bg-colour-picker");
    bgColourPickers.forEach((element) => {
      element.style.display = "none";
    });
    let fgColourPickers = document.querySelectorAll(".fg-colour-picker");
    fgColourPickers.forEach((element) => {
      element.style.display = "none";
    });
  }
});

// Pie chart
new Chart(document.getElementById("pie-chart"), {
  type: "pie",
  data: {
    labels: ["Excellence", "Merit", "Achieved", "Not Achieved"],
    datasets: [
      {
        backgroundColor: ["green", "orange", "yellow", "red"],
        data: [totals.e, totals.m, totals.a, totals.na],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Grade Pie Chart",
    },
    responsive: true,
  },
});
