window.addEventListener('load', function() {
    const loader = document.getElementById('loader');

//      //revisamos si ya cargo antes en esta sesion
//      if(sessionStorage.getItem('hasLoaded')) {
//          loader.style.display = 'none';
//          return;
//  }
    const fill = document.getElementById('progress-fill');

    fill.style.width = "100%";

    setTimeout(() => {
        loader.classList.add("loader-hidden");
        //guardamos en sessionStorage que ya cargo
        sessionStorage.setItem('hasLoaded', 'true');
}, 2000);

    loader.addEventListener("transitionend", function() {
        if(document.body.contains(loader)) {
            document.body.removeChild(loader);
        }
    });
});

// Animación de barras de habilidades
const skillsSection = document.querySelector('.skills');
const skillFills = document.querySelectorAll('.skill-fill');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillFills.forEach(fill => {
                const percentage = fill.getAttribute('data-percentage');
                const percentageSpan = fill.querySelector('.skill-percentage');
                fill.style.width = percentage + '%';
                let current = 0;
                const increment = percentage / 100;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= percentage) {
                        current = percentage;
                        clearInterval(timer);
                    }
                    percentageSpan.textContent = Math.floor(current) + '%';
                }, 20);
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (skillsSection) {
    observer.observe(skillsSection);
}

//Codigo para animar la terminal
const pythonSection = document.querySelector('.python');
const terminalLines = document.querySelectorAll('.terminal-body .line');

//ocultamos las lineas apenas cargue el script
terminalLines.forEach(line => {
    line.style.opacity = "0";
});

const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach (entry => {
        if(entry.isIntersecting) {
            terminalLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = "1";
                    line.style,transition = "opacity 0.8s ease";
                }, index * 600);
            });

            terminalObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (pythonSection) {
    terminalObserver.observe(pythonSection);
}

//mensaje en el formulario
const miFormulario = document.querySelector('form');

miFormulario.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evitamos que la página se recargue

    const formData = new FormData(miFormulario);

    // 1. Enviamos los datos a Formspree usando fetch
    const response = await fetch(miFormulario.action, {
        method: miFormulario.method,
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        // 2. Si el envío es exitoso, mostramos tu mensaje neón
        const nombre = formData.get('nombre_usuario');
        
        // Limpiamos el formulario
        miFormulario.reset();

        // Tu lógica de agradecimiento
        const mensajeExito = document.createElement('p');
        mensajeExito.textContent = `¡Gracias por enviar, ${nombre}!`;
        mensajeExito.style.color = '#00ffff';
        mensajeExito.style.textShadow = '0 0 10px #00ffff';
        mensajeExito.style.marginTop = '20px';
        
        miFormulario.appendChild(mensajeExito);
    } else {
        alert("Ups, hubo un error al enviar el formulario.");
    }
});

