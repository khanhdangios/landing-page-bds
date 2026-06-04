const header = document.querySelector(".site-header");
const revealItems = document.querySelectorAll(".reveal");
const tabs = document.querySelectorAll(".product-tabs button");
const productDetail = document.querySelector("#product-detail");

const products = {
  villa: {
    kicker: "Dòng sản phẩm cao cấp",
    title: "Biệt thự dành cho không gian sống riêng tư, đẳng cấp",
    copy: "Phù hợp khách hàng tìm kiếm tài sản thấp tầng có giá trị sử dụng thực, không gian sống rộng và khả năng tích lũy dài hạn.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1300&q=85",
    alt: "Biệt thự cao cấp",
  },
  townhouse: {
    kicker: "Cân bằng an cư và đầu tư",
    title: "Liền kề phù hợp gia đình trẻ và nhu cầu tích lũy tài sản",
    copy: "Dòng sản phẩm có tính linh hoạt cao, phù hợp để ở, cho thuê hoặc nắm giữ dài hạn trong đại đô thị có tiện ích đồng bộ.",
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1300&q=85",
    alt: "Nhà liền kề hiện đại",
  },
  shophouse: {
    kicker: "Lợi thế thương mại",
    title: "Shophouse cho khai thác kinh doanh và dòng tiền",
    copy: "Sản phẩm dành cho nhà đầu tư quan tâm vị trí mặt tiền, khả năng kinh doanh dịch vụ và biên độ tăng giá theo cộng đồng cư dân.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1300&q=85",
    alt: "Mặt tiền thương mại hiện đại",
  },
};

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
);

revealItems.forEach((item) => observer.observe(item));

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    const product = products[tab.dataset.product];
    productDetail.innerHTML = `
      <div>
        <p class="product-kicker">${product.kicker}</p>
        <h3>${product.title}</h3>
        <p>${product.copy}</p>
        <a class="button primary" href="#lead-form">Nhận mặt bằng và quỹ hàng</a>
      </div>
      <img src="${product.image}" alt="${product.alt}" />
    `;
  });
});

document.querySelectorAll(".lead-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    const originalText = button.textContent;
    button.textContent = "Đã nhận thông tin";
    button.disabled = true;
    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
      form.reset();
    }, 1800);
  });
});
