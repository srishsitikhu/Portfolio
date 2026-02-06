// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize variables
    const header = document.getElementById("header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelectorAll(".nav-links a");
    const themeToggle = document.getElementById("theme-toggle");
    const backToTop = document.getElementById("back-to-top");
    const skillsFilter = document.querySelectorAll(
        ".skills-filter .filter-btn",
    );
    const skillCards = document.querySelectorAll(".skill-card");
    const projectFilter = document.querySelectorAll(
        ".project-filter .filter-btn",
    );
    const projectCards = document.querySelectorAll(".project-card");
    let isMenuOpen = false;

    // ==========================================
    // CUSTOM CURSOR ANIMATION
    // ==========================================

    const cursor = document.createElement("div");
    cursor.className = "cursor";
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement("div");
    cursorFollower.className = "cursor-follower";
    document.body.appendChild(cursorFollower);

    let mouseX = 0,
        mouseY = 0;
    let cursorX = 0,
        cursorY = 0;
    let followerX = 0,
        followerY = 0;

    // Update cursor position
    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Cursor follows mouse directly
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        cursor.style.left = cursorX + "px";
        cursor.style.top = cursorY + "px";

        // Follower has more delay
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + "px";
        cursorFollower.style.top = followerY + "px";

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const interactiveElements = document.querySelectorAll(
        "a, button, .btn, .filter-btn, .project-card, .skill-card, input, textarea",
    );

    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
            cursor.classList.add("hover");
            cursorFollower.classList.add("hover");
        });

        el.addEventListener("mouseleave", () => {
            cursor.classList.remove("hover");
            cursorFollower.classList.remove("hover");
        });
    });

    // Cursor click effect
    document.addEventListener("mousedown", () => {
        cursor.classList.add("click");
    });

    document.addEventListener("mouseup", () => {
        cursor.classList.remove("click");
    });

    // Hide cursor when leaving window
    document.addEventListener("mouseleave", () => {
        cursor.style.opacity = "0";
        cursorFollower.style.opacity = "0";
    });

    document.addEventListener("mouseenter", () => {
        cursor.style.opacity = "1";
        cursorFollower.style.opacity = "0.6";
    });

    // ==========================================
    // CURSOR PARTICLE BURST EFFECT
    // ==========================================

    // Fire color gradient - from white/yellow core to red/orange edges
    const fireColors = [
        { color: "#fff7ed", weight: 1 }, // white-hot core
        { color: "#fef3c7", weight: 2 }, // pale yellow
        { color: "#fde047", weight: 3 }, // bright yellow
        { color: "#facc15", weight: 4 }, // gold
        { color: "#fb923c", weight: 5 }, // orange
        { color: "#f97316", weight: 5 }, // deep orange
        { color: "#ea580c", weight: 4 }, // burnt orange
        { color: "#dc2626", weight: 3 }, // red
        { color: "#b91c1c", weight: 2 }, // dark red
        { color: "#7f1d1d", weight: 1 }, // ember
    ];

    // Build weighted color array for natural fire distribution
    const particleColors = [];
    fireColors.forEach(({ color, weight }) => {
        for (let i = 0; i < weight; i++) {
            particleColors.push(color);
        }
    });

    let lastParticleTime = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    const particleThrottle = 30; // ms between particles
    const maxParticles = 50;
    let particleCount = 0;

    function createParticle(x, y, isClick = false) {
        if (particleCount >= maxParticles) return;

        const particle = document.createElement("div");
        particle.className = isClick
            ? "cursor-particle fire-burst"
            : "cursor-particle fire-trail";

        // Fire particles - varied sizes for depth
        const size = isClick ? Math.random() * 14 + 8 : Math.random() * 10 + 4;
        particle.style.width = size + "px";
        particle.style.height = size + "px";

        // Random color from fire palette
        const color =
            particleColors[Math.floor(Math.random() * particleColors.length)];
        particle.style.background = `radial-gradient(circle, ${color} 0%, transparent 70%)`;
        particle.style.boxShadow = `0 0 ${size}px ${color}, 0 0 ${size * 2}px ${color}80, 0 0 ${size * 3}px ${color}40`;

        // Position with slight random offset for flame width
        const offsetX = (Math.random() - 0.5) * 10;
        particle.style.left = x + offsetX + "px";
        particle.style.top = y + "px";

        // Set random rise distance and sway for flame effect
        const riseDistance = Math.random() * 60 + 40;
        const swayAmount = (Math.random() - 0.5) * 30;
        particle.style.setProperty("--rise", `-${riseDistance}px`);
        particle.style.setProperty("--sway", `${swayAmount}px`);

        // For click burst, create explosion effect
        if (isClick) {
            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * 80 + 40;
            particle.style.setProperty(
                "--tx",
                `${Math.cos(angle) * distance}px`,
            );
            particle.style.setProperty(
                "--ty",
                `${Math.sin(angle) * distance - 30}px`, // bias upward
            );
        }

        document.body.appendChild(particle);
        particleCount++;

        // Remove particle after animation
        setTimeout(
            () => {
                particle.remove();
                particleCount--;
            },
            isClick ? 800 : 1000,
        );
    }

    // Create ember/spark particles
    function createEmber(x, y) {
        if (particleCount >= maxParticles) return;

        const ember = document.createElement("div");
        ember.className = "cursor-particle ember";

        const size = Math.random() * 4 + 2;
        ember.style.width = size + "px";
        ember.style.height = size + "px";

        // Ember colors - bright yellow/orange
        const emberColors = ["#fde047", "#facc15", "#fb923c"];
        const color =
            emberColors[Math.floor(Math.random() * emberColors.length)];
        ember.style.background = color;
        ember.style.boxShadow = `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`;

        // Random offset and float direction
        const offsetX = (Math.random() - 0.5) * 20;
        ember.style.left = x + offsetX + "px";
        ember.style.top = y + "px";

        const floatX = (Math.random() - 0.5) * 60;
        const floatY = -(Math.random() * 100 + 50);
        ember.style.setProperty("--float-x", `${floatX}px`);
        ember.style.setProperty("--float-y", `${floatY}px`);

        document.body.appendChild(ember);
        particleCount++;

        setTimeout(() => {
            ember.remove();
            particleCount--;
        }, 1200);
    }

    // Create particles on mouse move
    document.addEventListener("mousemove", (e) => {
        const now = Date.now();
        const dx = e.clientX - lastMouseX;
        const dy = e.clientY - lastMouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only create particles when moving fast enough
        if (now - lastParticleTime > particleThrottle && distance > 3) {
            // Create multiple fire particles for fuller flame
            createParticle(e.clientX, e.clientY);

            // Sometimes add an ember spark
            if (Math.random() > 0.7) {
                createEmber(e.clientX, e.clientY);
            }

            lastParticleTime = now;
        }

        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
    });

    // Create burst on click
    document.addEventListener("click", (e) => {
        const burstCount = 8;
        for (let i = 0; i < burstCount; i++) {
            setTimeout(() => {
                createParticle(e.clientX, e.clientY, true);
            }, i * 30);
        }
    });

    // ==========================================
    // SCROLL PROGRESS BAR
    // ==========================================

    const scrollProgress = document.createElement("div");
    scrollProgress.className = "scroll-progress";
    document.body.appendChild(scrollProgress);

    // ==========================================
    // SECTION INDICATORS
    // ==========================================

    const sections = document.querySelectorAll("section");
    const sectionIndicators = document.createElement("div");
    sectionIndicators.className = "section-indicators";

    sections.forEach((section, index) => {
        const indicator = document.createElement("div");
        indicator.className = "section-indicator";
        indicator.dataset.section = section.id;
        indicator.addEventListener("click", () => {
            section.scrollIntoView({ behavior: "smooth" });
        });
        sectionIndicators.appendChild(indicator);
    });

    document.body.appendChild(sectionIndicators);

    // ==========================================
    // SMOOTH SCROLL HIJACKING
    // ==========================================

    let currentSectionIndex = 0;
    let isScrolling = false;
    const scrollDelay = 1000; // Delay between scroll events

    // Update scroll progress and section indicators
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;

        scrollProgress.style.transform = `scaleX(${scrollPercent})`;

        // Update section indicators
        let currentSection = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (
                scrollTop >= sectionTop &&
                scrollTop < sectionTop + sectionHeight
            ) {
                currentSection = section.id;
            }
        });

        document.querySelectorAll(".section-indicator").forEach((indicator) => {
            indicator.classList.remove("active");
            if (indicator.dataset.section === currentSection) {
                indicator.classList.add("active");
            }
        });
    }

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initial update
    updateScrollProgress();

    // ==========================================
    // THEME HANDLING (Dark mode is default)
    // ==========================================

    // Only switch to light mode if explicitly saved
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-mode");
    }

    // Header scroll effect
    window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
            if (window.scrollY > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        } else {
            header.classList.remove("scrolled");
            backToTop.classList.remove("visible");
        }
    });

    // Mobile menu toggle
    menuToggle.addEventListener("click", function () {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            // Create mobile menu if it doesn't exist
            if (!document.querySelector(".mobile-menu")) {
                const mobileMenu = document.createElement("div");
                mobileMenu.className = "mobile-menu";

                // Clone nav links
                const navLinksList = document
                    .querySelector(".nav-links")
                    .cloneNode(true);
                mobileMenu.appendChild(navLinksList);

                document.body.appendChild(mobileMenu);

                // Add event listeners to new links
                mobileMenu.querySelectorAll("a").forEach((link) => {
                    link.addEventListener("click", closeMobileMenu);
                });
            }

            document.querySelector(".mobile-menu").classList.add("active");
            document.body.classList.add("menu-open");

            // Transform hamburger to X
            const spans = menuToggle.querySelectorAll("span");
            spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            spans[1].style.opacity = "0";
            spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
        } else {
            closeMobileMenu();
        }
    });

    // Close mobile menu function
    function closeMobileMenu() {
        isMenuOpen = false;
        document.querySelector(".mobile-menu").classList.remove("active");
        document.body.classList.remove("menu-open");

        // Revert X back to hamburger
        const spans = menuToggle.querySelectorAll("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
    }

    // Theme toggle
    themeToggle.addEventListener("click", function () {
        document.body.classList.toggle("light-mode");

        // Save preference to localStorage
        if (document.body.classList.contains("light-mode")) {
            localStorage.setItem("theme", "light");
        } else {
            localStorage.setItem("theme", "dark");
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition =
                    targetElement.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });

                // If mobile menu is open, close it
                if (isMenuOpen) {
                    closeMobileMenu();
                }

                // Update active nav link
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });
                this.classList.add("active");
            }
        });
    });

    // Update active nav link on scroll
    window.addEventListener("scroll", function () {
        let current = "";
        const sections = document.querySelectorAll("section");

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - header.offsetHeight - 100;
            const sectionHeight = section.offsetHeight;

            if (
                window.pageYOffset >= sectionTop &&
                window.pageYOffset < sectionTop + sectionHeight
            ) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // Skills filter
    skillsFilter.forEach((button) => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            skillsFilter.forEach((btn) => btn.classList.remove("active"));

            // Add active class to clicked button
            this.classList.add("active");

            const filter = this.getAttribute("data-filter");

            // Show/hide skill cards based on filter
            skillCards.forEach((card) => {
                if (
                    filter === "all" ||
                    card.getAttribute("data-category") === filter
                ) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Projects filter
    projectFilter.forEach((button) => {
        button.addEventListener("click", function () {
            // Remove active class from all buttons
            projectFilter.forEach((btn) => btn.classList.remove("active"));

            // Add active class to clicked button
            this.classList.add("active");

            const filter = this.getAttribute("data-filter");

            // Show/hide project cards based on filter
            projectCards.forEach((card) => {
                if (
                    filter === "all" ||
                    card.getAttribute("data-category") === filter
                ) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // Animation on scroll
    function initAOS() {
        const elements = document.querySelectorAll("[data-aos]");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("aos-animate");
                    } else {
                        entry.target.classList.remove("aos-animate");
                    }
                });
            },
            {
                threshold: 0.1,
            },
        );

        elements.forEach((element) => {
            observer.observe(element);
        });
    }

    // Initialize AOS
    initAOS();

    // Initialize skill progress bars animation
    function animateSkillBars() {
        const skillElements = document.querySelectorAll(".skill-card");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const progressBar =
                            entry.target.querySelector(".progress");
                        const percentage =
                            entry.target.querySelector(
                                ".skill-level",
                            ).textContent;
                        progressBar.style.width = percentage;
                    }
                });
            },
            {
                threshold: 0.1,
            },
        );

        skillElements.forEach((element) => {
            observer.observe(element);
        });
    }

    // Initialize skill bars animation
    animateSkillBars();

    // CV Download functionality - Updated to use actual PDF
    const downloadButtons = document.querySelectorAll(
        "#download-cv, #download-cv-main, #modal-download-cv",
    );

    downloadButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            e.preventDefault();

            // Method 1: Direct PDF file download (recommended)
            downloadPDFFile();

            // Show success message
            showNotification("CV download started!", "success");
        });
    });

    // Method 1: Download actual PDF file
    function downloadPDFFile() {
        const link = document.createElement("a");
        link.href = "./assets/SrishCV.pdf"; // Path to your PDF file
        link.download = "SrishCV.pdf";
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Method 2: Alternative - Open PDF in new tab
    function openPDFInNewTab() {
        window.open("./assets/SrishCV.pdf", "_blank");
    }

    // Method 3: Embed PDF in modal for preview
    function showPDFPreview() {
        const modal = document.getElementById("cv-modal");
        const modalBody = modal.querySelector(".modal-body");

        // Clear existing content
        modalBody.innerHTML = `
      <div class="pdf-container">
        <embed src="./assets/SrishCV.pdf" type="application/pdf" width="100%" height="500px">
        <p style="text-align: center; margin-top: 1rem; color: var(--text-secondary);">
          If the PDF doesn't display, <a href="./assets/SrishCV.pdf" target="_blank" style="color: var(--primary-color);">click here to open it in a new tab</a>.
        </p>
      </div>
    `;

        modal.style.display = "block";
    }

    // Update the view CV button to show PDF preview
    const viewCVButton = document.getElementById("view-cv");
    viewCVButton.addEventListener("click", (e) => {
        e.preventDefault();
        showPDFPreview();
    });

    // CV Modal functionality
    const cvModal = document.getElementById("cv-modal");
    const closeModal = document.getElementById("close-modal");

    closeModal.addEventListener("click", () => {
        cvModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === cvModal) {
            cvModal.style.display = "none";
        }
    });

    // Notification system with modern styling
    function showNotification(message, type = "info") {
        const notification = document.createElement("div");
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
          position: fixed;
          top: 100px;
          right: 20px;
          padding: 1rem 2rem;
          border-radius: 12px;
          color: white;
          font-weight: 500;
          z-index: 2000;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
      `;

        if (type === "success") {
            notification.style.background =
                "linear-gradient(135deg, #10b981, #059669)";
        } else if (type === "error") {
            notification.style.background =
                "linear-gradient(135deg, #ef4444, #dc2626)";
        } else {
            notification.style.background =
                "linear-gradient(135deg, #8b5cf6, #7c3aed)";
        }

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.opacity = "1";
            notification.style.transform = "translateX(0)";
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = "0";
            notification.style.transform = "translateX(100%)";
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // ==========================================
    // PARALLAX EFFECTS
    // ==========================================

    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;

        // Parallax on hero section
        const hero = document.querySelector(".hero");
        if (hero) {
            hero.style.setProperty("--scroll", scrolled * 0.3 + "px");
        }
    });

    // ==========================================
    // MAGNETIC BUTTON EFFECT
    // ==========================================

    const magneticButtons = document.querySelectorAll(".btn.primary");

    magneticButtons.forEach((btn) => {
        btn.addEventListener("mousemove", (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener("mouseleave", () => {
            btn.style.transform = "translate(0, 0)";
        });
    });

    // ==========================================
    // TYPEWRITER EFFECT FOR HERO
    // ==========================================

    const heroPosition = document.querySelector(".hero h1 .position");
    if (heroPosition) {
        const text = heroPosition.textContent;
        heroPosition.textContent = "";
        heroPosition.style.borderRight = "2px solid var(--primary-color)";

        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                heroPosition.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    heroPosition.style.borderRight = heroPosition.style
                        .borderRight
                        ? ""
                        : "2px solid var(--primary-color)";
                }, 500);
            }
        }

        // Start typewriter after page loads
        setTimeout(typeWriter, 500);
    }

    // ==========================================
    // SMOOTH REVEAL ON SCROLL
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".skill-card, .project-card, .contact-item, .info-item",
    );

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateY(0)";
                    }, index * 100);
                }
            });
        },
        { threshold: 0.1 },
    );

    revealElements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        revealObserver.observe(el);
    });

    console.log(
        "🎨 Modern Portfolio loaded with custom cursor and scroll effects!",
    );
});
