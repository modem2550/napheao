window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-nav');
    if (window.scrollY > 50) { 
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
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

    const unsetElement = document.querySelector('.unset');
    if (unsetElement) {
        unsetElement.style.display = "none";
    }
}

function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex'
}
function hideSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'none'
}

let counter = 0;
let total = 0;

function handleClick(value) {
    counter++;
    document.getElementById("counter").textContent = counter;

    total += value;
    document.getElementById("total").textContent = total;
}

function goPage1() {
    document.getElementById('page-1').style.display = 'flex';
    document.getElementById('page-2').style.display = 'none';
    document.getElementById('page-3').style.display = 'none';
}

function goPage2() {
    document.getElementById('page-1').style.display = 'none';
    document.getElementById('page-2').style.display = 'flex';
    document.getElementById('page-3').style.display = 'none';
}

function goPage3() {
    document.getElementById('page-1').style.display = 'none';
    document.getElementById('page-2').style.display = 'none';
    document.getElementById('page-3').style.display = 'flex';
}
