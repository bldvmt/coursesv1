document.addEventListener('DOMContentLoaded', function() {
    fetch('content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Nastavení titulku stránky
            document.getElementById('site-title').textContent = data.siteTitle;
            document.title = data.siteTitle; // Prohlížečový titulek

            // Hlavička
            document.getElementById('logo-text').textContent = data.header.logoText;
            const navLinksContainer = document.getElementById('nav-links');
            data.header.navLinks.forEach(link => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = link.text;
                a.href = link.href;
                li.appendChild(a);
                navLinksContainer.appendChild(li);
            });

            // Hero sekce
            document.getElementById('hero-title').textContent = data.hero.title;
            document.getElementById('hero-subtitle').textContent = data.hero.subtitle;
            document.getElementById('hero-cta-button').textContent = data.hero.ctaButtonText;

            // O kurzu
            document.getElementById('about-title').textContent = data.about.title;
            document.getElementById('about-description').textContent = data.about.description;

            // Pro koho je kurz určen
            document.getElementById('target-audience-title').textContent = data.targetAudience.title;
            const targetAudiencePointsContainer = document.getElementById('target-audience-points');
            data.targetAudience.points.forEach(point => {
                const li = document.createElement('li');
                li.textContent = point;
                targetAudiencePointsContainer.appendChild(li);
            });

            // Obsah kurzu
            document.getElementById('course-content-title').textContent = data.courseContent.title;
            const courseModulesContainer = document.getElementById('course-modules');
            data.courseContent.modules.forEach(module => {
                const card = document.createElement('div');
                card.classList.add('module-card');
                const title = document.createElement('h4');
                title.textContent = module.name;
                const details = document.createElement('p');
                details.textContent = module.details;
                card.appendChild(title);
                card.appendChild(details);
                courseModulesContainer.appendChild(card);
            });

            // Lektor
            document.getElementById('instructor-title').textContent = data.instructor.title;
            document.getElementById('instructor-name').textContent = data.instructor.name;
            document.getElementById('instructor-bio').textContent = data.instructor.bio;

            // Přihláška
            document.getElementById('enrollment-title').textContent = data.enrollment.title;
            document.getElementById('enrollment-price').textContent = data.enrollment.price;
            document.getElementById('enrollment-cta-button').textContent = data.enrollment.ctaButtonText;
            // Můžete sem přidat odkaz na přihlašovací formulář nebo email
            document.getElementById('enrollment-cta-button').href = `mailto:${data.footer.contactEmail}?subject=Přihláška na ${data.siteTitle}`;


            // Patička
            document.getElementById('footer-copyright').textContent = data.footer.copyrightText;
            const contactEmailLink = document.getElementById('footer-contact-email');
            contactEmailLink.textContent = data.footer.contactEmail;
            contactEmailLink.href = 'mailto:' + data.footer.contactEmail;

        })
        .catch(error => {
            console.error('Chyba při načítání nebo zpracování content.json:', error);
            // Můžete zde zobrazit uživateli chybovou hlášku na stránce
            document.body.innerHTML = `<div style="text-align:center; padding: 50px; font-size: 1.2em;">
                                        <h1>Chyba</h1>
                                        <p>Nepodařilo se načíst obsah stránky. Zkuste to prosím později.</p>
                                        <p><em>Detail chyby: ${error.message}</em></p>
                                      </div>`;
        });
});