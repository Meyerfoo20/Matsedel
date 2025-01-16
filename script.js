    // Lista med rätter
    const dishes = [
        { id: 1, title: "Spaghetti Bolognese", img: "Bilder/bolognese.jpg", time: "Snabb" },
        { id: 2, title: "Kycklinggryta", img: "Bilder/kycklinggryta.jpg", time: "Medel" },
        { id: 3, title: "Mac 'n' cheese", img: "Bilder/mac-n-cheese.jpg", time: "Medel" },
        { id: 4, title: "Vegetarisk Lasagne", img: "Bilder/vego-lasagne.jpg", time: "Medel" },
        { id: 5, title: "Taco", img: "Bilder/taco.jpg", time: "Snabb" },
        { id: 6, title: "Gulaschsoppa", img: "Bilder/gulasch.jpg", time: "Snabb" },
        { id: 7, title: "Tacopaj", img: "Bilder/tacopaj.jpg", time: "Lång" },
        { id: 8, title: "Ugnspannkaka", img: "Bilder/ugnspannkaka.jpg", time: "Medel" },
        { id: 9, title: "Korvstroganoff", img: "Bilder/korvgryta.jpg", time: "Snabb" },
        { id: 10, title: "ChiliKyckling Pasta", img: "Bilder/chilikyckling.jpg", time: "Medel" },
        { id: 11, title: "Lasagne", img: "Bilder/lasagne.jpg", time: "Medel" },
        { id: 12, title: "Butter Chicken [Indisk]", img: "Bilder/butter-chicken.jpg", time: "Medel" },
        { id: 13, title: "Reuben Sandwich", img: "Bilder/reuben-sandwich.jpg", time: "Medel" },
        { id: 14, title: "Chili con carne", img: "Bilder/chili-con-carne.jpg", time: "Snabb" },
        { id: 15, title: "Ugnstekt Falukorv", img: "Bilder/falukorv-i-ugn.jpg", time: "Medel" },
        { id: 16, title: "Pannbiff", img: "Bilder/pannbiff.jpg", time: "Medel" },
      ];
  
      // Funktion för att hämta specifika rätter baserat på ID
      function getDishesById(ids) {
        return dishes.filter(dish => ids.includes(dish.id));
      }
  
      // Lägg till rätter i veckans matsedel
      function renderWeeklyMenu() {
        const weeklyMenu = document.getElementById("weekly-menu");
        const selectedIds = [8, 3, 12, 6]; // Bestäm vilka rätter som ska visas (ID:n)
        const selectedDishes = getDishesById(selectedIds);
  
        selectedDishes.forEach(dish => {
          const dishElement = document.createElement("div");
          dishElement.className = "menu-item";
          dishElement.innerHTML = `
            <a href="https://www.arla.se/recept/?search=${dish.title}/"><img src="${dish.img}" alt="${dish.title}"></a>
            <h2>${dish.title}</h2>
            <p><i class="fas fa-clock"></i> ${dish.time}</p>
          `;
          weeklyMenu.appendChild(dishElement);
        });
      }
  
      // Kör funktionen vid sidladdning
      renderWeeklyMenu();

// Rendera alla recept 3 och 3
function renderAllRecipes() {
    const recipeContainer = document.getElementById("all-recipes");
    recipeContainer.innerHTML = ""; // Rensa tidigare innehåll
  
    // Dela upp rätterna i grupper om 3
    const chunkedDishes = chunkArray(dishes, 4);
  
    chunkedDishes.forEach(group => {
      const rowElement = document.createElement("div");
      rowElement.className = "menu-row"; // Rad för tre recept
      group.forEach(dish => {
        const dishElement = document.createElement("div");
        dishElement.className = "menu-item";
        dishElement.innerHTML = `
          <img src="${dish.img}" alt="${dish.title}">
          <h2>${dish.title}</h2>
          <p><i class="fas fa-clock"></i> ${dish.time}</p>
        `;
        rowElement.appendChild(dishElement);
      });
      recipeContainer.appendChild(rowElement);
    });
  }
  
  // Filtrera och rendera recepten 3 och 3
  function filterRecipes() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const filteredDishes = dishes.filter(dish => dish.title.toLowerCase().includes(searchInput));
  
    const recipeContainer = document.getElementById("all-recipes");
    recipeContainer.innerHTML = ""; // Rensa tidigare innehåll
  
    // Dela upp de filtrerade rätterna i grupper om 3
    const chunkedDishes = chunkArray(filteredDishes, 3);
  
    chunkedDishes.forEach(group => {
      const rowElement = document.createElement("div");
      rowElement.className = "menu-row"; // Rad för tre recept
      group.forEach(dish => {
        const dishElement = document.createElement("div");
        dishElement.className = "menu-item";
        dishElement.innerHTML = `
          <img src="${dish.img}" alt="${dish.title}">
          <h2>${dish.title}</h2>
          <p><i class="fas fa-clock"></i> ${dish.time}</p>
        `;
        rowElement.appendChild(dishElement);
      });
      recipeContainer.appendChild(rowElement);
    });
  }
  
  // Funktion för att dela upp array i mindre grupper
  function chunkArray(array, chunkSize) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
  
  // Kör funktionerna vid sidladdning
  renderAllRecipes();
  
// Initiera EmailJS med din Public API Key
emailjs.init("M8hlcCoiJItfe70PT");

function submitDishRequest() {
  const dishRequestInput = document.getElementById("dish-request-input"); // Hämta input-fältet
  const requestedDish = dishRequestInput.value.trim(); // Rensa eventuella mellanslag

  if (requestedDish) {
    // Skicka e-post via EmailJS
    emailjs.send("service_mlkg1qt", "template_39npol2", {
      dish_request: requestedDish, // Variabel som matchar din template
    })
    .then(response => {
      alert(`Tack för din önskan! Maträtten "${requestedDish}" har skickats.`);
      console.log("E-post skickades:", response.status, response.text);
    })
    .catch(error => {
      console.error("Ett fel uppstod vid e-postsändning:", error);
      alert("Kunde inte skicka önskan. Kontrollera inställningarna och försök igen.");
    });

    dishRequestInput.value = ""; // Töm input-fältet efter skickad önskan
  } else {
    alert("Vänligen skriv in en maträtt innan du skickar!");
  }
}
