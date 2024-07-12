document.addEventListener('DOMContentLoaded', function() {
    fetch('/posts.json')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('posts-container');
            data.forEach(post => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img src="${post.image}" alt="${post.title}">
                    <div class="card-content">
                        <h2 class="card-title">${post.title}</h2>
                        <p class="card-date">${post.date}</p>
                        <a href="pages/post.html?id=${post.id}" class="card-links"><p>Read more</p></a>
                       
                    </div>
                `;
                card.addEventListener('click', () => {
                    window.location.href = `/pages/post.html?id=${post.id}`;
                });
                container.appendChild(card);
                console.log(data,"los datos estan aqui");
            });
        })
        .catch(error => console.error('Error fetching the posts:', error));
});

document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");
    
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const formData = new FormData(contactForm);
        
        console.log("Name:", formData.get("name"));
        console.log("Email:", formData.get("email"));
        console.log("Message:", formData.get("message"));
        
        alert("Your message has been sent!");
        
        contactForm.reset();
    });
});