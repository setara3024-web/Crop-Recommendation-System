function scoreCrops(N, P, K, pH, temp, rain, hum) {
  let crops = [
    { name: "Wheat", score: 0 },
    { name: "Rice", score: 0 },
    { name: "Maize", score: 0 },
    { name: "Jute", score: 0 },
    { name: "Groundnut", score: 0 }
  ];

  if (pH >= 6.5 && pH <= 7.5) crops[0].score++;
  if (N > 40) crops[0].score++;
  if (temp >= 20 && temp <= 30) crops[0].score++;

  if (rain > 1600) crops[1].score++;
  if (pH < 6.5) crops[1].score++;
  if (temp > 22 && temp < 32) crops[1].score++;

  if (K > 40) crops[2].score++;
  if (temp > 25) crops[2].score++;
  if (rain > 1000 && rain < 1500) crops[2].score++;

  if (hum > 70) crops[3].score++;
  if (rain > 1200) crops[3].score++;
  if (pH < 7) crops[3].score++;

  if (pH >= 6 && pH <= 7) crops[4].score++;
  if (temp >= 25 && temp <= 35) crops[4].score++;
  if (rain >= 500 && rain <= 1000) crops[4].score++;

  return crops;
}

let chart;

document.getElementById("cropForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const N = +document.getElementById("n").value;
  const P = +document.getElementById("p").value;
  const K = +document.getElementById("k").value;
  const pH = +document.getElementById("ph").value;
  const temp = +document.getElementById("temp").value;
  const rain = +document.getElementById("rain").value;
  const hum = +document.getElementById("hum").value;

  let crops = scoreCrops(N, P, K, pH, temp, rain, hum);

  const maxScore = Math.max(...crops.map(c => c.score), 1);
  crops.forEach(c => c.percent = Math.round((c.score / maxScore) * 100));

  crops.sort((a, b) => b.score - a.score);
  const top = crops.slice(0, 3);

  const out = document.getElementById("recommendations");
  out.innerHTML = top.map(c => `
    <div class="rec">
      <span>${c.name}</span>
      <span class="score">${c.percent}% match</span>
    </div>
  `).join("");

  document.getElementById("resultCard").style.display = "block";

  // Chart update
  const ctx = document.getElementById("cropChart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: crops.map(c => c.name),
      datasets: [{
        label: 'Suitability Score',
        data: crops.map(c => c.score),
        backgroundColor: '#2563eb'
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } }
    }
  });

  // Save inputs for PDF
  document.getElementById("pdfInputs").innerHTML = `
    <p>Nitrogen: ${N}</p>
    <p>Phosphorus: ${P}</p>
    <p>Potassium: ${K}</p>
    <p>Soil pH: ${pH}</p>
    <p>Temperature: ${temp}°C</p>
    <p>Rainfall: ${rain} mm/year</p>
    <p>Humidity: ${hum}%</p>
  `;

  // Save recommendations for PDF
  document.getElementById("pdfRecs").innerHTML = top.map(c => `
    <div>✅ ${c.name} — ${c.percent}% match</div>
  `).join("");

  // Save timestamp
  document.getElementById("pdfDate").innerText = new Date().toLocaleString();
});

document.getElementById("downloadBtn").addEventListener("click", function() {
  const chartCanvas = document.getElementById("cropChart");
  const chartImg = chartCanvas.toDataURL("image/png");
  document.getElementById("pdfChartDiv").innerHTML =
    `<img src="${chartImg}" style="max-width:100%;">`;

  const element = document.getElementById("pdfReport");

  // Temporarily make it visible
  element.style.visibility = "visible";
  element.style.position = "relative";
  element.style.zIndex = "1";

  setTimeout(() => {
    html2pdf().set({
      margin: 10,
      filename: 'Crop_Recommendation_Report.pdf',
      html2canvas: { 
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      },
      jsPDF: { orientation: "portrait", unit: "mm", format: "a4" }
    }).from(element).save().then(() => {
      // Hide again after saving
      element.style.visibility = "hidden";
      element.style.position = "absolute";
      element.style.zIndex = "-1";
    });
  }, 300);
});