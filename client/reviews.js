const reviewList = document.getElementById("reviewList");
const topRestaurants = document.getElementById("topRestaurants");

// โหลดรีวิว
window.onload = () => {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.forEach(showReview);
  showTopRestaurants(reviews);
};

function addReview() {
  const name = document.getElementById("name").value;
  const rating = parseInt(document.getElementById("rating").value);
  const comment = document.getElementById("comment").value;
  const restaurant = document.getElementById("restaurant").value;

  if (!name || !comment) {
    alert("กรุณากรอกข้อมูลให้ครบ");
    return;
  }

  const review = { name, rating, comment, restaurant };

  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  showReview(review);
  showTopRestaurants(reviews);

  document.getElementById("comment").value = "";
}

// แสดงรีวิว
function showReview(review) {
  const stars = "⭐".repeat(review.rating);

  reviewList.innerHTML += `
    <div class="review-card">
      <h4>${review.restaurant}</h4>
      <strong>${review.name}</strong>
      <div class="stars">${stars}</div>
      <p>${review.comment}</p>
    </div>
  `;
}

// คำนวณร้านดาวสูงสุด
function showTopRestaurants(reviews) {
  const ratingData = {};

  reviews.forEach(r => {
    if (!ratingData[r.restaurant]) {
      ratingData[r.restaurant] = { total: 0, count: 0 };
    }
    ratingData[r.restaurant].total += r.rating;
    ratingData[r.restaurant].count++;
  });

  const averages = Object.keys(ratingData).map(name => {
    return {
      name,
      avg: (ratingData[name].total / ratingData[name].count).toFixed(1)
    };
  });

  averages.sort((a, b) => b.avg - a.avg);

  topRestaurants.innerHTML = "";

  averages.forEach(r => {
    topRestaurants.innerHTML += `
      <div class="review-card">
        <h3>${r.name}</h3>
        <div class="stars">⭐ ${r.avg}</div>
      </div>
    `;
  });
}