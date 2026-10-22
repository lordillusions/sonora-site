// Sonora website: mobile menu and screenshot lightbox. No tracking, no external requests.
(function ()
{
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("nav");
    if (toggle && nav)
    {
        toggle.addEventListener("click", function ()
        {
            var open = nav.classList.toggle("open");
            toggle.setAttribute("aria-expanded", open ? "true" : "false");
        });
        document.addEventListener("keydown", function (e)
        {
            if (e.key === "Escape" && nav.classList.contains("open"))
            {
                nav.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.focus();
            }
        });
    }

    var box = document.createElement("div");
    box.className = "lightbox";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Screenshot, enlarged. Press Escape to close.");
    box.tabIndex = -1;
    var big = document.createElement("img");
    big.alt = "";
    box.appendChild(big);
    document.body.appendChild(box);

    var opener = null;
    function close()
    {
        if (!box.classList.contains("open")) return;
        box.classList.remove("open");
        big.removeAttribute("src");
        if (opener) opener.focus();
    }
    function open(img)
    {
        if (window.innerWidth < 640) return; // phones already show the image full width
        opener = img;
        big.src = img.currentSrc || img.src;
        big.alt = img.alt;
        box.classList.add("open");
        box.focus();
    }
    box.addEventListener("click", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });

    document.querySelectorAll(".shot img").forEach(function (img)
    {
        // Screenshots can be enlarged with the mouse or the keyboard.
        img.tabIndex = 0;
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", "Enlarge screenshot: " + img.alt);
        img.addEventListener("click", function () { open(img); });
        img.addEventListener("keydown", function (e)
        {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(img); }
        });
    });

    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
})();
