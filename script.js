document.addEventListener("DOMContentLoaded", () => {

    // 1. DYNAMIC PRODUCT LISTING
    const products = [
        {
            name: "Straight Wigs",
            category: "straight",
            description: "Explore sleek and elegant straight wig styles."
        },
        {
            name: "Curly Wigs",
            category: "curly",
            description: "Discover beautiful curls with volume and texture."
        },
        {
            name: "Body Wave Wigs",
            category: "body-wave",
            description: "Explore soft waves for a versatile look."
        },
        {
            name: "Hair Care",
            category: "care",
            description: "Tips for maintaining and caring for your wigs."
        }
    ];

    const productGrid = document.getElementById("productGrid");
    const searchInput = document.getElementById("productSearch");
    const categoryFilter = document.getElementById("categoryFilter");

    function displayProducts() {
        if (!productGrid) return;

        const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
        const selectedCategory = categoryFilter ? categoryFilter.value : "all";

        const filteredProducts = products.filter(product => {
            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm);

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });

        productGrid.innerHTML = "";

        if (filteredProducts.length === 0) {
            productGrid.innerHTML = "<p>No matching products found.</p>";
            return;
        }

        filteredProducts.forEach(product => {
            const card = document.createElement("article");
            card.className = "product-card";

            const heading = document.createElement("h3");
            heading.textContent = product.name;

            const description = document.createElement("p");
            description.textContent = product.description;

            const link = document.createElement("a");
            link.href = "enquiry.html";
            link.className = "button";
            link.textContent = "Make an Enquiry";

            card.append(heading, description, link);
            productGrid.appendChild(card);
        });
    }

    if (productGrid) {
        displayProducts();

        if (searchInput) {
            searchInput.addEventListener("input", displayProducts);
        }

        if (categoryFilter) {
            categoryFilter.addEventListener("change", displayProducts);
        }
    }

    // 2. FAQ ACCORDION
    document.querySelectorAll(".accordion-button").forEach(button => {
        button.addEventListener("click", () => {
            const answer = button.nextElementSibling;
            const isOpen = button.getAttribute("aria-expanded") === "true";

            button.setAttribute("aria-expanded", String(!isOpen));

            if (answer) {
                answer.hidden = isOpen;
            }
        });
    });

    // 3. IMAGE GALLERY LIGHTBOX
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    document.querySelectorAll("[data-lightbox]").forEach(image => {
        image.addEventListener("click", () => {
            if (!lightbox || !lightboxImage) return;

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightbox.hidden = false;
        });
    });

    if (closeLightbox && lightbox) {
        closeLightbox.addEventListener("click", () => {
            lightbox.hidden = true;
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) {
                lightbox.hidden = true;
            }
        });
    }

    // 4. AJAX FORM SUBMISSION
    document.querySelectorAll("[data-ajax-form]").forEach(form => {
        form.addEventListener("submit", async event => {
            event.preventDefault();

            const messageBox = form.querySelector(".form-message");
            const submitButton = form.querySelector("button[type='submit']");

            if (!form.checkValidity()) {
                form.reportValidity();

                if (messageBox) {
                    messageBox.textContent =
                        "Please correct the highlighted fields.";
                    messageBox.className = "form-message error";
                }
                return;
            }

            if (messageBox) {
                messageBox.textContent = "Sending your message...";
                messageBox.className = "form-message";
            }

            if (submitButton) submitButton.disabled = true;

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Submission failed.");
                }

                if (messageBox) {
                    messageBox.textContent =
                        "Thank you! Your message has been submitted successfully.";
                    messageBox.className = "form-message success";
                }

                form.reset();

            } catch (error) {
                if (messageBox) {
                    messageBox.textContent =
                        "Sorry, your message could not be sent. Please try again.";
                    messageBox.className = "form-message error";
                }
            } finally {
                if (submitButton) submitButton.disabled = false;
            }
        });
    });

    // 5. LEAFLET DELIVERY COVERAGE MAP
const mapElement = document.getElementById("deliveryMap");

if (mapElement) {
    if (typeof L === "undefined") {
        console.error("Leaflet library has not loaded.");
    } else {
        const map = L.map("deliveryMap").setView([-29, 24], 5);
        
        setTimeout(function() {
            map.invalidateSize();
        }, 500);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap contributors"
        }).addTo(map);

        const provinces = [
            ["Western Cape", -33.9249, 18.4241],
            ["Eastern Cape", -32.2968, 26.4194],
            ["Northern Cape", -28.7282, 24.7499],
            ["Free State", -28.4541, 26.7968],
            ["KwaZulu-Natal", -29.8587, 31.0218],
            ["Gauteng", -26.2041, 28.0473],
            ["Mpumalanga", -25.4658, 30.9853],
            ["Limpopo", -23.4013, 29.4179],
            ["North West", -25.8652, 25.6444]
        ];

        provinces.forEach(province => {
            L.marker([province[1], province[2]])
                .addTo(map)
                .bindPopup("<strong>" + province[0] +
                    "</strong><br>Delivery coverage area");
        });

        setTimeout(() => map.invalidateSize(), 300);
    }
}

    // 6. SMOOTH SCROLLING
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const target = document.querySelector(link.getAttribute("href"));

            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

});
// Glamoured Image Gallery Lightbox
document.querySelectorAll("[data-lightbox]").forEach(image => {
    image.addEventListener("click", function () {
        const lightbox = document.getElementById("lightbox");
        const lightboxImage = document.getElementById("lightboxImage");

        lightboxImage.src = this.src;
        lightbox.style.display = "flex";
    });
});

document.getElementById("closeLightbox").addEventListener("click", function () {
    document.getElementById("lightbox").style.display = "none";
});

document.getElementById("lightbox").addEventListener("click", function (event) {
    if (event.target === this) {
        this.style.display = "none";
    }
});
// Glamoured Enquiry Form Submission
const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {
    enquiryForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const feedback = document.getElementById("enquiryFeedback");

        if (!enquiryForm.reportValidity()) {
            return;
        }

        feedback.textContent = "Sending your enquiry...";

        const formData = new FormData(enquiryForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(enquiryForm.action, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                feedback.textContent = "Thank you! Your enquiry has been sent.";
                enquiryForm.reset();
            } else {
                feedback.textContent = "Unable to send. Please try again.";
            }
        } catch (error) {
            feedback.textContent = "Connection error. Please try again.";
        }
    });
}