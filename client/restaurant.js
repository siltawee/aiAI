const restaurants = {
  "little-hideaway": {
    name: "Little Hideaway Cafe",
    detail: "⭐ 4.5 • เปิด 09:00 - 18:00",
    image: "https://source.unsplash.com/800x500/?cafe",
    map: "https://maps.google.com/maps?q=13.7563,100.5018&z=15&output=embed",
    menu: [
      { name: "Spaghetti", price: 120, img: "https://source.unsplash.com/200x200/?spaghetti" },
      { name: "Latte", price: 60, img: "https://source.unsplash.com/200x200/?latte" }
    ]
  },

  "thai-kitchen": {
    name: "ครัวไทยต้นตำรับ",
    detail: "⭐ 4.7 • อาหารไทยแท้",
    image: "https://source.unsplash.com/800x500/?thai-food",
    map: "https://maps.google.com/maps?q=13.7367,100.5231&z=15&output=embed",
    menu: [
      { name: "ผัดไทย", price: 70, img: "https://source.unsplash.com/200x200/?padthai" },
      { name: "ต้มยำกุ้ง", price: 120, img: "https://source.unsplash.com/200x200/?tomyum" }
    ]
  }
};

// อ่าน id จาก URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const restaurant = restaurants[id];

if (restaurant) {
  document.getElementById("mapFrame").src = restaurant.map;  
  document.getElementById("resName").innerText = restaurant.name;
  document.getElementById("resDetail").innerText = restaurant.detail;
  document.getElementById("resImage").src = restaurant.image;

  const menuList = document.getElementById("menuList");

  restaurant.menu.forEach(item => {
    menuList.innerHTML += `
      <div class="menu-card">
        <img src="${item.img}">
        <h4>${item.name}</h4>
        <p>฿ ${item.price}</p>
      </div>
    `;
  });
}

function goBack(){
  window.history.back();
}