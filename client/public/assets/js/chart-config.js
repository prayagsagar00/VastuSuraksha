window.structureChartConfig = {
    type: 'bar',
    data: {
        labels: ['Stress (MPa)', 'Water Level (m)', 'Traffic (veh/hr)'],
        datasets: [{
            label: 'Structural Parameters',
            data: [0, 0, 0],
            // Update chart colors for better visibility
backgroundColor: [
    'rgba(255, 99, 132, 0.8)',  // Stress - Red
    'rgba(54, 162, 235, 0.8)',   // Water - Blue
    'rgba(255, 159, 64, 0.8)'    // Traffic - Orange
  ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true }
        },
        scales: {
            y: { beginAtZero: true }
        }
    }
};