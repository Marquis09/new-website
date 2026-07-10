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
       1. BINARY BACKGROUND
       ========================================================================== */
    function generateBinary() {
    if (!binaryLayer) return;

    const charWidth = 8.4;
    const charHeight = 16.8;

    const columns = Math.ceil(window.innerWidth / charWidth);
    const rows = Math.ceil(window.innerHeight / charHeight);

    const totalCharacters = columns * rows;

    let output = "";
    for (let i = 0; i < totalCharacters; i++) {
        output += Math.random() > 0.5 ? "1" : "0";

        if ((i + 1) % columns === 0) {
            output += "\n";
        }
    }

    binaryLayer.textContent = output;
}


    generateBinary();
    setInterval(generateBinary, 2500);
    window.addEventListener("resize", generateBinary);
    

    /* ==========================================================================
       2. TYPING ENGINE
       ========================================================================== */
    const textToType = "Junior UX/UI Designer | Frontend Systems | Interaction Logic";
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
