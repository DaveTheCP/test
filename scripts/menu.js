document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu-items");
  const filterSelect = document.getElementById("menu-filter");

  fetch("menu.json")
    .then((response) => response.json())
    .then((data) => {
      function renderMenu(filteredCategory) {
        menuContainer.innerHTML = "";

        const filteredItems = filteredCategory === "all"
          ? data
          : data.filter(item => item.category === filteredCategory);

        filteredItems.forEach((item) => {
          const menuItem = document.createElement("div");
          menuItem.classList.add("menu-item");

          menuItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p><strong>${item.price}</strong></p>
          `;

          menuContainer.appendChild(menuItem);
        });
      }

      filterSelect.addEventListener("change", (e) => {
        renderMenu(e.target.value);
      });

      renderMenu("all");
    })
    .catch((error) => {
      console.error("Error loading menu:", error);
    });
});
