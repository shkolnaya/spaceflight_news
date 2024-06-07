# Project Name: Spaceflight News

## Overview

This project aims to create a Single Page Application (SPA) using Angular framework. The application will display a list of articles fetched from an open API, allowing users to filter articles by keywords and view the full details of each article.

## Prerequisites

Before running this project, make sure you have the following installed:

- Node.js
- Angular CLI

## Installation

1. Clone this repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install all dependencies.

## Usage

1. After installation, run `ng serve` to start the development server.
2. Open your browser and navigate to `http://localhost:4200` to view the application.

## Features

- Display article cards with titles and short descriptions.
- Clicking on a card navigates the user to the full article page.
- Filter articles by keyword.
- Priority on matching keywords: title > description.
- Utilizes CSS preprocessors and Material UI for styling.
- Includes examples of state management and RxJS usage.

## Figma Prototype

For the design and layout of the application, refer to the Figma low-fidelity prototype provided [here](link).

## API

The application fetches article data from an open API. As an example, it currently uses the Spaceflight News API, accessible at [https://spaceflightnewsapi.net/](https://spaceflightnewsapi.net/).

## State Management

This project demonstrates an example of state management within an Angular application. State management is achieved using Angular services and RxJS Observables.

## Contributors

- Angelina Shkolna - Developer