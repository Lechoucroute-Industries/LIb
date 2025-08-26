// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}

// Navigation scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 11, 0.95)';
        } else {
            navbar.style.background = 'rgba(10, 10, 11, 0.8)';
        }
    }
});

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Syntax tab switching
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const syntaxPanes = document.querySelectorAll('.syntax-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.dataset.tab;
            
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            syntaxPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const targetPane = document.getElementById(targetTab);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });

    // Initialize mobile menu
    const toggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            toggle.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add scroll indicator for hero
    const hero = document.getElementById('hero');
    if (hero) {
        const heroIndicator = document.createElement('div');
        heroIndicator.className = 'scroll-indicator';
        heroIndicator.innerHTML = '↓';
        heroIndicator.onclick = () => scrollToSection('features');
        hero.appendChild(heroIndicator);
    }

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    if (typeof IntersectionObserver !== 'undefined') {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        sections.forEach(section => observer.observe(section));
    }
});

// Code execution (simulated)
function runCode() {
    const code = document.getElementById('code-editor');
    const outputDisplay = document.getElementById('output-display');
    
    if (!code || !outputDisplay) return;
    
    // Clear previous output
    outputDisplay.innerHTML = '';
    
    // Show loading
    const loadingEl = document.createElement('div');
    loadingEl.className = 'output-loading';
    loadingEl.textContent = 'Compiling and running...';
    outputDisplay.appendChild(loadingEl);
    
    // Simulate compilation
    setTimeout(() => {
        outputDisplay.innerHTML = '';
        
        // Basic simulation of output based on code content
        if (code.value.includes('create app')) {
            const serverInfo = document.createElement('div');
            serverInfo.innerHTML = `
                <div class="output-success">✓ Server started successfully</div>
                <div class="output-info">
                    <strong>Server running on:</strong> http://localhost:8080<br>
                    <strong>Routes configured:</strong><br>
                    • GET / - Hello world endpoint<br>
                    • Health check: <span class="output-green">✓ Running</span>
                </div>
            `;
            outputDisplay.appendChild(serverInfo);
            
            // Add AJAX call to test endpoint
            const testButton = document.createElement('button');
            testButton.className = 'test-button';
            testButton.textContent = 'Test GET /';
            testButton.onclick = () => {
                const testResult = document.createElement('div');
                testResult.className = 'output-result';
                testResult.innerHTML = `
                    <strong>Response:</strong><br>
                    {
                      "greeting": "Hello from LIb!",
                      "timestamp": "${new Date().toISOString()}"
                    }
                `;
                outputDisplay.appendChild(testResult);
            };
            outputDisplay.appendChild(testButton);
        } else {
            const info = document.createElement('div');
            info.className = 'output-info';
            info.textContent = 'Code compiled successfully (0.015ms)';
            outputDisplay.appendChild(info);
        }
        
        // Add syntax highlighting to output
        const allPres = outputDisplay.querySelectorAll('pre');
        allPres.forEach(pre => {
            pre.className = 'syntax-highlighted';
        });
    }, 800);
}

function clearOutput() {
    const outputDisplay = document.getElementById('output-display');
    if (outputDisplay) {
        outputDisplay.innerHTML = `
            <div class="output-placeholder">
                Click "Run Code" to see output
            </div>
        `;
    }
}