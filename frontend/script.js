document.getElementById('signup-form').addEventListener('submit', function(event) {
  event.preventDefault();

  // Récupérer les données du formulaire
  const pseudo = document.getElementById('pseudo').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Envoyer la requête POST au backend pour l'inscription
  fetch('/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      pseudo: pseudo,
      email: email,
      password: password
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'User registered successfully') {
      // Afficher le lien personnalisé après l'inscription
      document.getElementById('link-container').innerHTML = `
        <h3>Registration successful!</h3>
        <p>Here's your personal link: <a href="https://jmh.com/u/${pseudo}">https://jmh.com/u/${pseudo}</a></p>
      `;
    } else {
      alert('Error: ' + data.error);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('There was an issue with your registration.');
  });
});
