// projects-loader.js
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

function loadProjects() {
    try {
        const projects = [
            {
                title: "Property Listing Website",
                description: "An property listing website with different levels of access, each access level has different functionalities.",
                image: "images/projects/property-listing.jpg",
                url: "https://knuth.griffith.ie/~s3092883/Scripts/Assignment/WanderWaves/index.php",
                github: "https://github.com/joshanjohn/WanderWaves.git"
            },
            {
                title: "Go Game",
                description: "An ancient board game, using pythons PyQT6 module. It's a muliplayer game, were two players show their skillfull play",
                image: "images/projects/go-game.jpeg",
                url: "#", // Invalid URL example
                github: "https://github.com/mertfgunes/GoGame.git" // Empty URL example
            },

            {
                title: "XBOT",
                description: "XBOT is a GUI chatbot application developed in Java Swing framework, primary objective of XBOT is to suggest recommended clothing based on the location provided by the user.",
                image: "images/projects/xbot.png",
                url: "#", // Invalid URL example
                github: "https://github.com/joshanjohn/XBOT.git" // Empty URL example
            },
            {
                title: "Tip Me",
                description: "A fully functional tip calculator mobile application with an appealing UI, developed in the Flutter framework. It's a personal side project, which demonstrates various code logic using Dart language.",
                image: "images/projects/tipme.png",
                url: "#", // Invalid URL example
                github: "https://github.com/joshanjohn/flutter-UI.git" // Empty URL example
            },
        ];

        const container = document.getElementById('project-container');
        container.innerHTML = '';

        projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'project-card animate-on-scroll';

            let buttonsHTML = '';

            // Check for valid project URL
            if (project.url && isValidURL(project.url)) {
                buttonsHTML += `
                    <a href="${project.url}" class="btn btn-primary">
                        <i class="material-icons">view</i> 
                    </a>
                `;
            }

            // Check for valid GitHub URL
            if (project.github && isValidURL(project.github)) {
                buttonsHTML += `
                    <a href="${project.github}" class="btn btn-github" target="_blank" rel="noopener">
                        <i class="material-icons"></i>
                        GitHub
                    </a>
                `;
            }

            card.innerHTML = `
                <img src="${project.image}" alt="${project.title}">
                <h2>${project.title}</h2>
                <p>${project.description}</p>
                ${buttonsHTML ? `<div class="project-buttons">${buttonsHTML}</div>` : ''}
            `;

            container.appendChild(card);
            projectObserver.observe(card);
        });

    } catch (error) {
        console.error('Error:', error);
        container.innerHTML = `<p class="error-message">⚠️ Error loading projects. Please try again later.</p>`;
    }
}

document.addEventListener('DOMContentLoaded', loadProjects);