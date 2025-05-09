// script.js

// Chart data and configuration
const chartConfig = [
    {
        id: 'comparison',
        title: 'Pet Ownership Comparison (2019 vs 2021)',
        src: 'chart_comparison.svg',
        alt: 'Bar chart comparing pet ownership percentages between 2019 and 2021 for different animal types',
        description: 'Fig 1. Pet ownership comparison between 2019 and 2021. This chart shows the percentage of households owning each type of pet in Australia across both years.'
    },
    {
        id: 'distribution',
        title: 'Pet Ownership Distribution (2021)',
        src: 'chart_distribution.svg',
        alt: 'Pie chart showing the distribution of pet types owned in Australian households in 2021',
        description: 'Fig 2. Distribution of pet types in Australian households (2021). This pie chart displays the relative popularity of different pet types.'
    },
    {
        id: 'change',
        title: 'Change in Pet Ownership (2019-2021)',
        src: 'chart_change.svg',
        alt: 'Bar chart showing the percentage change in pet ownership between 2019 and 2021',
        description: 'Fig 3. Percentage change in pet ownership from 2019 to 2021. This chart highlights which pet types saw increases or decreases in ownership during the pandemic period.'
    }
];

// Initialize the current chart
let currentChartIndex = 0;

// Function to update the visualization
function updateVisualization(index) {
    // Get the chart configuration
    const chart = chartConfig[index];

    // Update the image source and alt text
    const chartImage = document.getElementById('chartImage');
    chartImage.src = chart.src;
    chartImage.alt = chart.alt;

    // Update the figcaption
    const figCaption = document.getElementById('chartCaption');
    figCaption.innerHTML = chart.description;

    // Update the active button class
    const buttons = document.querySelectorAll('.chart-button');
    buttons.forEach((button, i) => {
        if (i === index) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Update current index
    currentChartIndex = index;
}

// Function to initialize the visualization controls
function initializeVisualization() {
    // Create the button container
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'button-container';

    // Create buttons for each chart
    chartConfig.forEach((chart, index) => {
        const button = document.createElement('button');
        button.textContent = chart.title;
        button.className = 'chart-button';
        if (index === 0) button.classList.add('active');

        // Add click event listener
        button.addEventListener('click', () => {
            updateVisualization(index);
        });

        buttonContainer.appendChild(button);
    });

    // Find where to insert the button container (before the figure)
    const figure = document.querySelector('figure');
    figure.parentNode.insertBefore(buttonContainer, figure);

    // Update the image and figcaption IDs
    const chartImage = document.querySelector('figure img');
    chartImage.id = 'chartImage';

    const figCaption = document.querySelector('figcaption');
    figCaption.id = 'chartCaption';

    // Initial visualization update
    updateVisualization(0);
}

// Run initialization when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeVisualization);