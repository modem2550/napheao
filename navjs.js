window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-nav');
    if (window.scrollY > 50) { 
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
  
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
  
    tablinks = document.getElementsByClassName("tablinks");
  
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
  
    if (tabName === 'All') {
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "block";
        }
    } else {
        var selectedContent = document.getElementsByClassName(tabName);
        for (i = 0; i < selectedContent.length; i++) {
            selectedContent[i].style.display = "block";
        }
    }
  
    evt.currentTarget.className += " active";
  }

  window.onload = function() {
    openTab({ currentTarget: document.querySelector('.tablinks') }, 'All');
  };
