class DataInput {
    constructor() {
        this.form = document.getElementById('structuralForm');
        this.chart = null;
        this.initialize();
    }

    initialize() {
        this.setupValidation();
        this.setupChart();
        this.setupEventListeners();
    }

    setupValidation() {
        this.form.addEventListener('submit', (e) => {
            if (!this.form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.form.classList.add('was-validated');
        }, false);
    }

    setupChart() {
        const ctx = document.getElementById('structureChart').getContext('2d');
        this.chart = new Chart(ctx, window.structureChartConfig);
    }

    setupEventListeners() {
        document.getElementById('fetchData').addEventListener('click', async () => {
            try {
                const response = await fetch('/api/sensor-data');
                const data = await response.json();
                this.updateChart(data);
                this.enableAnalysis();
            } catch (error) {
                this.showError('Failed to fetch live data');
            }
        });

        this.form.addEventListener('input', () => {
            if (this.form.checkValidity()) {
                this.enableAnalysis();
            }
        });
    }

    updateChart(data) {
        this.chart.data.datasets[0].data = [
            data.stress, 
            data.waterLevel, 
            data.trafficDensity
        ];
        this.chart.update();
    }

    enableAnalysis() {
        document.getElementById('analyzeBtn').disabled = false;
    }

    showError(message) {
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.querySelector('.card-body').prepend(alert);
    }
}

// Add input range validation
const validateInput = (value, min, max) => {
    return value >= min && value <= max;
  };
  
  // Usage in form validation:
  if (!validateInput(stressValue, 20, 100)) {
    showError('Stress levels must be between 20-100 MPa');
  }

new DataInput();