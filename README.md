<div align="center" style="padding: 20px 0">

<img src="github/img/Banner - SPACED.svg" width="100%">

</div>

<div align="center">

![Status](https://img.shields.io/badge/status-in%20production-blue)
![Version](https://img.shields.io/badge/version-2.0.0-blue)
![Language](https://img.shields.io/github/languages/top/glauedson/SPACED)

</div>

This project was not created as a college assignment. It started as a personal idea after I discovered NASA's free APIs and became interested in exploring the astronomical data they provide. From there, I decided to turn that curiosity into an interactive web experience focused on space and astronomy.

> [!NOTE]
> NASA's APIs are free to use, but you need to register on the [NASA API portal](https://api.nasa.gov/) with your email address to obtain an API key.

## <img src="spaced/src/assets/img/Logo 1x1.svg" width="23"> Table of Contents

* [Project Overview](#project-overview)
* [Screenshots](#screenshots)
* [Technologies](#technologies)
* [APIs](#api)
* [Architecture](#architecture)
* [License](#license)
* [Contact](#contact)

## <img src="spaced/src/assets/img/Logo 1x1.svg" width="23" id=project-overview > Project Overview

SPACED is an ongoing project designed to bring astronomical information into an interactive and accessible web experience.

The project combines different space-related APIs to provide information about astronomical events, images, lunar data, the International Space Station, and other space-related content.

As new features and integrations are developed, this section will be updated to reflect the project's current capabilities.

## <img src="spaced/src/assets/img/Logo 1x1.svg" width="23" id=screenshots > Screenshots

<img src="github/scream shots/home-desktop.png" width="100%">

## <img src="spaced/src/assets/img/Logo 1x1.svg" width="23" id=technologies > Technologies

### Frontend

[![My Skills](https://skillicons.dev/icons?i=react,ts,tailwind,vite)](https://skillicons.dev)

* React
* TypeScript
* Tailwind CSS
* Vite

## <img src="spaced/src/assets/img/Logo 1x1.svg" width="23" id=api > APIs

### 1. APOD — Astronomy Picture of the Day

**Description**

APOD is an API developed by NASA that provides a different astronomical image or video every day, along with information and a description about the featured content.

**Endpoint**

```http
GET /apod
```

**API Request**

```http
GET https://api.nasa.gov/planetary/apod
```

**Example Response**

```json
{
  "date": "2025-02-12",
  "explanation": "What can a space rock tell us about life on Earth? NASA's OSIRIS-REx spacecraft made a careful approach to the near-Earth asteroid 101955 Bennu in October of 2020 to collect surface samples. In September 2023, the robotic spaceship returned these samples to Earth.",
  "media_type": "video",
  "service_version": "v1",
  "title": "Asteroid Bennu Holds the Building Blocks of Life",
  "url": "https://www.youtube.com/embed/ukCSRYcjSQw?rel=0"
}
```

### 2. Moon — CycleCalcs

**Description**

The Moon API is provided by CycleCalcs and provides astronomical data about the Moon, including its current phase, illumination, cycle day, and upcoming lunar phases.

**Endpoint**
```http
GET /moon
```

**API Request**
```http
GET https://www.cyclecalcs.com/v2/moon
```

**Example Response**

```Json
{
  "endpoint": "/v2/moon",
  "data": {
    "phase": {
      "name": "Waning Gibbous",
      "illumination_percent": 95.2,
      "day_of_cycle": 18
    },
    "summary": "The Moon is a waning gibbous, 95.2 percent lit, 17.4 days into its cycle. It sets at 06:14 and rises at 20:36 UTC.",
    "next_phases": [
      {
        "name": "Last Quarter",
        "instant": "2026-08-06T02:21:58.672Z",
        "days_until": 5.28
      }
    ]
  },
  "meta": {
    "api_version": "2"
  }
}
```

## <img src="spaced/src/assets/img/Logo 1x1.svg" width="23" id=architecture > Architecture

The project follows a modular and component-based architecture, organizing the application by responsibility to keep the codebase maintainable, scalable, and easy to navigate.

📂 Project Structure

```
spaced/
│
├── public/
│   ├── og/                 # Open Graph assets used for social sharing
│   ├── robots.txt          # Search engine crawling rules
│   └── sitemap.xml         # Website sitemap for search engines
│
├── src/
│   │
│   ├── api/                # External API integrations
│   │   ├── APOD/           # NASA Astronomy Picture of the Day API
│   │   └── cycleCals/      # Lunar cycle and moon data API
│   │
│   ├── assets/             # Static application assets
│   │   ├── font/           # Custom fonts
│   │   ├── img/            # Images, logos and illustrations
│   │   ├── style/          # Global and shared styles
│   │   └── index.ts        # Centralized asset exports
│   │
│   ├── components/         # Reusable UI components
│   │   ├── layout/         # Application layout components
│   │   │   ├── footer/
│   │   │   ├── header/
│   │   │   ├── navbar/
│   │   │   └── section/
│   │   │
│   │   └── ui/             # Reusable interface components
│   │
│   ├── pages/              # Application pages and page-specific logic
│   │
│   ├── routes/             # Application routing configuration
│   │
│   └── utils/              # Shared utility functions and helpers
│
└── ...
```

🧱 Architecture Overview

**API Layer (``api/``)**

>Contains the integrations with external APIs used throughout the application. Each API is organized into its own module, keeping data fetching and API-related logic separated from the UI

**Components (``components/``)**

>Contains reusable React components organized by their purpose. Layout components such as the Header, Navbar, Footer, and Section are separated from smaller, reusable UI components.

**Pages (``pages/``)**

>Contains the application's individual pages. Each page composes reusable components and connects the required data and functionality to build the user-facing experience.

**Routes (``routes/``)**

>Responsible for defining and organizing the application's navigation and page routes, keeping routing logic separate from the page implementations.

**Assets (``assets/``)**

>Centralizes visual resources used throughout the application, including images, custom fonts, styles, and other static assets.

**Utils (``utils/``)**

>Contains shared helper functions and utilities used across different parts of the application, avoiding duplicated logic and keeping components focused on their primary responsibilities.

**Public (``public/``)**

>Stores files that need to be served directly by the web server, including Open Graph assets and SEO-related files such as robots.txt and sitemap.xml.

<div id=license>

## 📄 License
</div>
This project currently does not have a defined open-source license.

Feel free to explore the code and use it for learning or experimentation. If you intend to redistribute or use the project commercially, please contact me first.

<div id=contact>

## 📩 Contact
</div>

If you have any questions, suggestions, or feedback about the project, feel free to reach out.

* **Name:** Glauedson Carlos Rodrigues
* **Email:** [gluedson.dev@gmail.com](mailto:gluedson.dev@gmail.com)
* **GitHub:** [@Glauedson](https://github.com/Glauedson)
