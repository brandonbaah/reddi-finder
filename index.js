import reddit from "./reddit-api"

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");

searchForm.addEventListener('submit', e => {
    // Get the search term
    const searchTerm = searchInput.value;
    // Get sort
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;

    // Grab the limit
    const searchLimit = document.getElementById('limit').value;

    // Check the searchInput
    if(searchTerm === ""){

      showMessage('Please add a search term', 'alert-danger')
    }

    // Clear the input
    searchInput.value = '';

    //Search reddit
    reddit.search(searchTerm, searchLimit, sortBy)
      .then(results => {
        let output = '<div class="card-columns">';
        results.forEach(post => {
          output +=
          `<div class="card">
  <img class="card-img-top" src="..." alt="Card image cap">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`;
        });
        output += '</div>';
        document.getElementById('results').innerHTML = output;
      });


    e.preventDefault();
});


// Show showMessage
function showMessage(message, className){
  // Create div

  const div = document.createElement('div');
  // Add classes
  div.className = `alert ${className}`;

  // Add text

  div.appendChild(document.createTextNode(message));
  // Get the parent

  const searchContainer = document.getElementById('search-container');
  // Get search

  const search = document.getElementById('search');
  // Insert it before
  searchContainer.insertBefore(div, search);

  // Timeout alert
  setTimeout(() => document.querySelector('.alert').remove(), 3000);
}
