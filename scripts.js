document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById("product-container");

    function displayProducts(products) {
        productContainer.innerHTML = "";
        products.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.className = "product";
            productDiv.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Prix: $${product.price}</p>
                <p>${product.description}</p>
            `;
            productContainer.appendChild(productDiv);
        });
    }

    fetch('prod.json')
        .then(response => response.json())
        .then(data => {
            let products = data.products;
            displayProducts(products);

            const form = document.getElementById("product-form");
            form.addEventListener("submit", (e) => {
                e.preventDefault();

                const newProduct = {
                    name: form.name.value,
                    price: parseFloat(form.price.value),
                    description: form.description.value,
                    image_url: form.image_url.value
                };

                products.push(newProduct);
                displayProducts(products);

                form.reset();
            });
        })
        .catch(error => console.error('Erreur de chargement du fichier JSON:', error));
});
