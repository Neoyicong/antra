document.addEventListener("DOMContentLoaded", function() {
    const itemsPerPageSelect = document.getElementById('itemsPerPage');
    const paginationContainer = document.getElementById('pagination');
    const currentRangeSection = document.getElementById('currentRange');
    const allPagesContainer = document.getElementById('allPagesContainer');
  
    // Initialize items per page and total items
    let itemsPerPage = 5; // Default items per page set to 5
    const totalItems = 200;
  
    // Generate options for "Items per page" dropdown
    for (let i = 1; i <= 200; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      itemsPerPageSelect.appendChild(option);
    }
  
    // Set default value of items per page to 5
    itemsPerPageSelect.value = '5';
  
    // Event listener for changes in items per page
    itemsPerPageSelect.addEventListener('change', function() {
      itemsPerPage = parseInt(this.value);
      renderPagination(1);
      renderAllPages(); // Update all pages section
    });
  
    // Function to render pagination buttons and update current range
    function renderPagination(currentPage) {
      paginationContainer.innerHTML = '';
  
      const totalPages = Math.ceil(totalItems / itemsPerPage);
  
      const maxVisibleButtons = 7;
  
      let startPage = 1;
      let endPage = totalPages;
  
      if (totalPages > maxVisibleButtons) {
        const halfButtons = Math.floor(maxVisibleButtons / 2);
  
        if (currentPage > halfButtons + 1) {
          paginationContainer.innerHTML += '<button disabled>1</button>';
          if (currentPage > halfButtons + 2) {
            paginationContainer.innerHTML += '<button disabled>...</button>';
          }
          startPage = currentPage - halfButtons;
        }
  
        if (totalPages - currentPage > halfButtons) {
          endPage = currentPage + halfButtons;
        }
      }
  
      for (let i = startPage; i <= endPage; i++) {
        addButton(i);
      }
  
      if (endPage < totalPages) {
        if (endPage + 1 < totalPages) {
          paginationContainer.innerHTML += '<button disabled>...</button>';
        }
        paginationContainer.innerHTML += `<button disabled>${totalPages}</button>`;
      }
  
      // Function to add pagination button and update current range
      function addButton(page) {
        const button = document.createElement('button');
        button.textContent = page;
        button.addEventListener('click', () => {
          renderPagination(page);
          updateRange(page); // Update range when button is clicked
        });
        if (page === currentPage) {
          button.classList.add('active');
        }
        paginationContainer.appendChild(button);
      }
  
      // Update range for the initial page load
      updateRange(currentPage);
    }
  
    // Function to update current range display
    function updateRange(page) {
      const startItem = (page - 1) * itemsPerPage + 1;
      const endItem = Math.min(page * itemsPerPage, totalItems);
      currentRangeSection.textContent = `${startItem}-${endItem} of ${totalItems}`;
    }
  
    // Function to render all page buttons without pagination
    function renderAllPages() {
      allPagesContainer.innerHTML = '';
  
      const totalPages = Math.ceil(totalItems / itemsPerPage);
  
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        button.addEventListener('click', () => renderPagination(i));
        allPagesContainer.appendChild(button);
      }
    }
  
    // Initially render pagination with the first page selected
    renderPagination(1);
  
    // Initially render all page buttons
    renderAllPages();
  });
  