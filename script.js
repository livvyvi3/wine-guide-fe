let http = new XMLHttpRequest();
http.open("get", "data.json", true);
http.send();
http.onload = function () {
  if (this.readyState == 4 && this.status == 200) {
    let products = JSON.parse(this.responseText);
    let output = "";
    const openModalButtons = document.querySelectorAll('[data-modal-target]')
    const closeModalButtons = document.querySelectorAll('[data-close-button]')
    const overlay = document.getElementById('overlay')

    for (let item of products) {
      openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
          const modal = document.querySelector(button.dataset.modalTarget)
          openModal(modal)
        })
      })
      
      overlay.addEventListener('click', () => {
        const modals = document.querySelectorAll('.modal.active')
        modals.forEach(modal => {
          closeModal(modal)
        })
      })
      
      closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
          const modal = button.closest('.modal')
          closeModal(modal)
        })
      })
      
      const openModal= (modal) => {
        if (modal == null) return
        modal.classList.add('active')
        overlay.classList.add('active')
      }
      
      const closeModal = (modal) =>{
        if (modal == null) return
        modal.classList.remove('active')
        overlay.classList.remove('active')
      }
      output += `
      
            <div class="product">
               <img src="${item.image}" alt="${item.title}">
               <p class="title">${item.title}</p>
               <p class="description">${item.description}</p>
               <p class="price">
                  <span>R</span>
                  <span>${item.price}</span>                  
               </p>
               <button data-modal-target="#modal" class="cart">Add to cart <i class="bx bx-cart-alt"></i></button>
               
            
            </div>
            
         `;
    }
    
    document.querySelector(".products").innerHTML = output;
    
  }
};
