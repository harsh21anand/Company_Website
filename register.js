document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent form default behavior

  const formData = new FormData(this);

  try {
      const response = await fetch('register.php', {
          method: 'POST',
          body: formData
      });

      const result = await response.json();
      console.log(result); // Log the result to check if the response is correct

      if (result.success) {
          alert('Account created successfully!');
          window.location.href = 'login.html'; // Redirect on success
      } else {
          alert('Error: ' + result.message);
      }
  } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong. Try again later.');
  }
});
