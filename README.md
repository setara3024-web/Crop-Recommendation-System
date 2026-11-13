# Crop Recommendation System

A responsive web application that recommends suitable crops based on soil and environmental conditions.

## Features

- Enter soil nutrient values (Nitrogen, Phosphorus, Potassium).
- Enter soil pH, temperature, rainfall, and humidity.
- Get the top 3 crop recommendations.
- View crop suitability scores in a bar chart.
- Download a PDF report of the recommendations.
- Responsive user interface.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Chart.js
- html2pdf.js

## Supported Crops

- Wheat
- Rice
- Maize
- Jute
- Groundnut

## How to Run

1. Download or clone this repository.
2. Open the project folder.
3. Open `index.html` in a web browser.
4. Enter the required soil and environmental information.
5. Click "Recommend Crops".

An internet connection is required to load Chart.js and html2pdf.js from their CDNs.

## Recommendation Method

The application uses a rule-based scoring system to calculate crop suitability and display the top three recommendations.

## Limitations

This version uses predefined rules rather than a trained machine learning model. Phosphorus and Potassium values are collected but are not currently included in the scoring calculations.

## Author

Setara Khatun
