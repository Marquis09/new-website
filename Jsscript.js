document.addEventListener("DOMContentLoaded", () => {
    // DOM Element Selectors
    const binaryLayer = document.getElementById("binaryLayer");
    const typingText = document.getElementById("typing-text");
    const darkModeButton = document.getElementById("darkModeButton");

    // Windows 95 Specific Selectors
    const win95StartBtn = document.getElementById("win95StartBtn");
    const win95StartMenu = document.getElementById("win95StartMenu");
    const win95Clock = document.getElementById("win95-clock");

    /* ==========================================================================
       1. BINARY BACKGROUND (single layer, redrawn every 2.5s, fits any screen)
       ========================================================================== */
    function generateBinary() {
        if (!binaryLayer) return;

        // Measure the real character size so the grid always fills the screen
        const probe = document.createElement("span");
        probe.textContent = "0000000000";
        probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;";
        binaryLayer.appendChild(probe);
        const charWidth = probe.getBoundingClientRect().width / 10 || 8.4;
        const charHeight = parseFloat(getComputedStyle(binaryLayer).lineHeight) || 16.8;
        binaryLayer.removeChild(probe);

        // +1 so the last column and row are always covered (the layer clips the extra)
        const columns = Math.ceil(window.innerWidth / charWidth) + 1;
        const rows = Math.ceil(window.innerHeight / charHeight) + 1;

        let output = "";
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < columns; c++) {
                output += Math.random() > 0.5 ? "1" : "0";
            }
            output += "\n";
        }

        binaryLayer.textContent = output;
    }

    generateBinary();
    setInterval(generateBinary, 2500);

    let binaryResizeTimer;
    window.addEventListener("resize", () => {
        clearTimeout(binaryResizeTimer);
        binaryResizeTimer = setTimeout(generateBinary, 150);
    });

    /* ==========================================================================
       2. TYPING ENGINE
       ========================================================================== */
    const textToType = "Junior UX/UI Designer | Frontend Developer | Interaction Logic";
    let textIndex = 0;

    function type() {
        if (typingText && textIndex < textToType.length) {
            typingText.textContent += textToType.charAt(textIndex);
            textIndex++;
            setTimeout(type, 50);
        }
    }

    if (typingText) {
        typingText.textContent = "";
        type();
    }

    /* ==========================================================================
       3. THEME TOGGLE
       ========================================================================== */
    const savedTheme = localStorage.getItem("system-theme");
    const userPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

    if (savedTheme === "light" || (!savedTheme && userPrefersLight)) {
        document.documentElement.setAttribute("data-theme", "light");
        if (darkModeButton) darkModeButton.textContent = "Mode: Light";
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
        if (darkModeButton) darkModeButton.textContent = "Mode: Dark";
    }

    if (darkModeButton) {
        darkModeButton.addEventListener("click", (e) => {
            e.stopPropagation();
            const currentTheme = document.documentElement.getAttribute("data-theme");

            if (currentTheme === "dark") {
                document.documentElement.setAttribute("data-theme", "light");
                darkModeButton.textContent = "Mode: Light";
                localStorage.setItem("system-theme", "light");
            } else {
                document.documentElement.setAttribute("data-theme", "dark");
                darkModeButton.textContent = "Mode: Dark";
                localStorage.setItem("system-theme", "dark");
            }
        });
    }

    /* ==========================================================================
       4. WINDOW SYSTEM + ROUTING (FIXED)
       ========================================================================== */

    let globalZIndex = 100;

    // External routing table
    const windowRoutes = {
        "all-projects-win": "projects.html" // even though the window is gone, routing stays safe
    };

    function bringToFront(windowElement) {
        globalZIndex++;
        windowElement.style.zIndex = globalZIndex;
    }

    // ⭐ SAFE VERSION — prevents crashes when a window doesn't exist
    window.openWindow = function (windowId) {
        if (!windowId) return;

        windowId = windowId.trim();

        // External navigation
        if (windowRoutes[windowId]) {
            window.location.href = windowRoutes[windowId];
            return;
        }

        const win = document.getElementById(windowId);

        // ⭐ Prevent JS crash
        if (!win) {
            console.warn("Window not found:", windowId);
            return;
        }

        win.classList.remove("hidden-window");
        bringToFront(win);
    };

    window.closeWindow = function (windowId) {
        const win = document.getElementById(windowId);
        if (win) {
            win.classList.add("hidden-window");
            win.classList.remove("maximized");
        }
    };

    window.maximizeWindow = function (windowId) {
        const win = document.getElementById(windowId);
        if (win) {
            win.classList.toggle("maximized");
        }
    };

    document.querySelectorAll('.win95-window').forEach(win => {
        win.addEventListener('mousedown', () => bringToFront(win));
    });

    // Start menu links from other pages (e.g. index.html#about) open that window on arrival
    const hashWindows = {
        about: "about-win",
        projects: "projects-win",
        faith: "faith-win",
        contact: "contact-win"
    };
    const arrivalTarget = hashWindows[window.location.hash.replace("#", "")];
    if (arrivalTarget && document.getElementById(arrivalTarget)) {
        const workspace = document.getElementById("desktop-env");
        if (workspace) workspace.scrollIntoView();
        openWindow(arrivalTarget);
    }

    /* ==========================================================================
       5. START MENU (FIXED)
       ========================================================================== */

    if (win95StartBtn && win95StartMenu) {

        win95StartBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            win95StartMenu.classList.toggle("hidden");
            win95StartBtn.classList.toggle("pressed");
        });

        document.addEventListener("click", (e) => {
            if (!win95StartMenu.contains(e.target) && e.target !== win95StartBtn) {
                win95StartMenu.classList.add("hidden");
                win95StartBtn.classList.remove("pressed");
            }
        });

        win95StartMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", (e) => {

                const targetHref = link.getAttribute("href");

                if (targetHref && targetHref.startsWith("#")) {

                    const cleanId = targetHref.replace("#", "").trim();

                    const targetWindow = document.getElementById(cleanId);

                    if (targetWindow) {
                        e.preventDefault();
                        openWindow(cleanId);
                    } else {
                        console.warn("Start Menu window not found:", cleanId);
                    }
                }

                win95StartMenu.classList.add("hidden");
                win95StartBtn.classList.remove("pressed");
            });
        });
    }

    /* ==========================================================================
       5b. MOBILE START MENU DROPDOWNS (phones/tablets only, desktop untouched)
       ========================================================================== */

    if (win95StartBtn && win95StartMenu) {
        const isMobileView = () => window.matchMedia("(max-width: 768px)").matches;

        // Capture phase: runs before the inline onclick popups on the menu links
        win95StartMenu.addEventListener("click", (e) => {
            if (!isMobileView()) return;

            // Links inside a dropdown go straight to their page (no popup window)
            const subLink = e.target.closest(".win95-submenu a");
            if (subLink) {
                e.stopPropagation();
                win95StartMenu.classList.add("hidden");
                win95StartBtn.classList.remove("pressed");
                return;
            }

            // Tapping "Programs" or "Contact Me" expands / collapses its dropdown
            const parentLink = e.target.closest(".has-submenu > a");
            if (parentLink) {
                e.preventDefault();
                e.stopPropagation();
                const item = parentLink.parentElement;
                const isOpen = item.classList.toggle("open");
                parentLink.setAttribute("aria-expanded", String(isOpen));
            }
        }, true);

        // Start every menu opening with the dropdowns collapsed
        win95StartBtn.addEventListener("click", () => {
            win95StartMenu.querySelectorAll(".has-submenu.open").forEach(item => {
                item.classList.remove("open");
            });
        });
    }

    /* ==========================================================================
       6. CLOCK
       ========================================================================== */

    function updateWin95Clock() {
        if (!win95Clock) return;
        const now = new Date();
        win95Clock.textContent = now.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    setInterval(updateWin95Clock, 1000);
    updateWin95Clock();

    /* ==========================================================================
       6b. MINI WINDOW MINIMISE (NEW)
       ========================================================================== */

    document.querySelectorAll(".minimise-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const miniWin = btn.closest(".mini-window");
            if (!miniWin) return;
            const collapsed = miniWin.classList.toggle("collapsed");
            btn.setAttribute("aria-expanded", String(!collapsed));
        });
    });

    // Clicking the folder icon restores the window
    document.querySelectorAll(".mini-folder").forEach(folder => {
        folder.addEventListener("click", () => {
            const miniWin = folder.closest(".mini-window");
            if (!miniWin) return;
            miniWin.classList.remove("collapsed");
            const btn = miniWin.querySelector(".minimise-btn");
            if (btn) btn.setAttribute("aria-expanded", "true");
        });
    });

    /* ==========================================================================
       7. SMOOTH SCROLL
       ========================================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetID = this.getAttribute("href");

            if (targetID === "#" || !targetID.startsWith("#")) return;

            if (document.getElementById(targetID.replace("#", "") + "-win")) return;

            const targetElement = document.querySelector(targetID);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
});