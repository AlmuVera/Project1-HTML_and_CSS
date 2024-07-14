document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const postId = parseInt(params.get('id'));

    fetch('../posts.json')
        .then(response => response.json())
        .then(data => {
            console.log(data, "Data fetched successfully");

            const post = data.find(p => p.id === postId);
            console.log(post, "Post found");

            if (post) {
                const postTitleElement = document.getElementById('post-title');
                const postImageElement = document.getElementById('post-image');
                const preparationTitleElement = document.getElementById('preparation-title');
                const preparationExplanationElement = document.getElementById('preparation-explanation');
                const ingredientsListElement = document.getElementById('post-ingredients');

                console.log(postTitleElement, "Post title element");
                console.log(postImageElement, "Post image element");
                console.log(preparationTitleElement, "Preparation title element");
                console.log(preparationExplanationElement, "Preparation explanation element");
                console.log(ingredientsListElement, "Ingredients list element");

                postTitleElement.textContent = post.title;
                postImageElement.src = `../${post.image}`;

                // Convertir saltos de línea en <br> para la explicación de la preparación
                const preparationExplanation = post.preparation.explanation.replace(/\n/g, '<br>');
                preparationExplanationElement.innerHTML = preparationExplanation;

                if (post.ingredients) {
                    post.ingredients.forEach(ingredient => {
                        const li = document.createElement('li');
                        li.textContent = ingredient;
                        ingredientsListElement.appendChild(li);
                    });
                } else {
                    console.warn('No ingredients found for this post');
                }

                if (post.preparation) {
                    preparationTitleElement.textContent = post.preparation.title;
                } else {
                    console.warn('No preparation details found for this post');
                }

                // Actualiza las URLs de los enlaces para compartir en redes sociales
                const postUrl = window.location.href;
                document.getElementById("twitter-share").href = "https://twitter.com/intent/tweet?url=" + encodeURIComponent(postUrl);
                document.getElementById("facebook-share").href = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(postUrl);
                document.getElementById("linkedin-share").href = "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(postUrl);
            } else {
                console.error('Post not found');
                document.getElementById('post-title').textContent = 'Post not found';
            }
        })
        .catch(error => console.error('Error fetching the post:', error));
});
