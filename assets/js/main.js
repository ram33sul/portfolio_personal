/**
* Template Name: iPortfolio - v3.9.1
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()
var count=0;

function validate(event){
  validate_fname();
  fname_required();
  validate_email();
  email_required();
  validate_number()
  number_required();
  validate_cpassword();
  validate_password();
  cpassword_required();
  password_required();
  validate_gender();
  if(count==6){
      event.preventDefault();
      $.ajax({
          url:"https://script.google.com/macros/s/AKfycbylM_JFbZHmTJOGX00DofmlWH2TNJ0d_oOjz8nGuNYxfJk6dAWSk8EeZPKwVrwiczae/exec",
          data:$("#form_ram").serialize(),
          method:"post",
          success:function (response){
              alert("Form submitted successfully")
              window.location.reload()
              //window.location.href="https://google.com"
          },
          error:function (err){
              alert("Something Error")
          }
      })
}
else{
event.preventDefault();
}
}

var fname;
var lname;
var email;
var number;
var password;
var cpassword;
function validate_space_front(input){
  if(/^\s/.test(input.value)){
    input.value = '';
  }
}

function validate_space_middle(event){
  var k = event ? event.which : window.event.keyCode;
  if(k!=32&&k<65){
    return false;
  }
  else if(k>122){
    return false;
  }
  else if(k>90&&k<97){
    return false;
  }
  if(fname.lastIndexOf(" ")==fname.length-1){
    if (k == 32) {return false;}
  }


}
    
function validate_space(event){
  var k = event ? event.which : window.event.keyCode;
  if (k == 32) {return false;}

}


function validate_fname() {
  count=0;
  fname = document.form_ram.fname.value;
  if(fname.length==0){
    document.getElementById("label_fname").innerHTML='';
  }
  else{
  if(fname.length<4){
    document.getElementById("label_fname").style.color='red';
    document.getElementById("label_fname").innerHTML='Must have atleast 4 letters';
  }
  else {
    if(fname.length>12){
      document.getElementById("label_fname").style.color='red';
      document.getElementById("label_fname").innerHTML='Must have atmost 12 letters';
    }
    else {
      document.getElementById("label_fname").innerHTML='&#10003;';
      document.getElementById("label_fname").style.color='#76BA18';
      count++;
    }
  }
}
}


function fname_required() {
  if(fname.length==0){
    document.getElementById("label_fname").style.color='red';
    document.getElementById("label_fname").innerHTML='Required';
  }
}

function validate_email() {
  email = document.form_ram.email.value;
  var email_check = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(email.length==0){
        document.getElementById("label_email").innerHTML='';
  }
  else{
    if (email_check.test(email)==true){
      if(email.length<6){
        document.getElementById("label_email").style.color='red';
        document.getElementById("label_email").innerHTML='Must have atleast 6 letters';
      }
      else{
        if(email.length>100){
          document.getElementById("label_email").style.color='red';
          document.getElementById("label_email").innerHTML='Must have atmost 100 letters';
        }
        else {
          document.getElementById("label_email").innerHTML='&#10003;';
          document.getElementById("label_email").style.color='#76BA18';
          count++;
        }
      }
    }
    else {
      document.getElementById("label_email").style.color='red';
      document.getElementById("label_email").innerHTML='E-mail is not valid';
    }
  }
}

function email_required(){
  if(email.length==0){
    document.getElementById("label_email").style.color='red';
    document.getElementById("label_email").innerHTML='Required';
}
}
function validate_number2(event){
  var k = event ? event.which : window.event.keyCode;
  if (k<48 || k>57) {return false;}

}

function validate_number() {
  number = document.form_ram.number.value;
  if(number.length==0){
    document.getElementById("label_number").innerHTML='';
  }
  else{
    if (number.length!=10){
      document.getElementById("label_number").style.color='red';
      document.getElementById("label_number").innerHTML='Enter a 10 digit number';
    }
    else {
      document.getElementById("label_number").innerHTML='&#10003;';
      document.getElementById("label_number").style.color='#76BA18';
      count++;
    }
  }  
}

function number_required(){
  if(number.length==0){
    document.getElementById("label_number").style.color='red';
    document.getElementById("label_number").innerHTML='Required';
  }
}
password=0;
function validate_password() {
  password = document.form_ram.password.value;
  var password1 = /[a-z]/g.test(password);
  var password2 = /[A-Z]/g.test(password);
  var password3 = /\d/.test(password);
  if(password.length==0){
    document.getElementById("label_password").innerHTML='';
  }  
  else {
    if(password.length<6){
      document.getElementById("label_password").style.color='red';
      document.getElementById("label_password").innerHTML='Must have atleast 6 characters';
    }
    else {
      if(password.length>20){
        document.getElementById("label_password").style.color='red';
        document.getElementById("label_password").innerHTML='Must have atlmost 20 characters';
      }
      else{
        if(password1==false){
          document.getElementById("label_password").style.color='red';
          document.getElementById("label_password").innerHTML='Must contain a small letter';
        }
        else{
          if(password2==false){
            document.getElementById("label_password").style.color='red';
            document.getElementById("label_password").innerHTML='Must contain a capital letter';
          }
          else{
            if(password3==false){
              document.getElementById("label_password").style.color='red';
              document.getElementById("label_password").innerHTML='Must contain a number';
            }
            else{
              document.getElementById("label_password").innerHTML='&#10003;';
              document.getElementById("label_password").style.color='#76BA18';
              count++;
            }
          }
        }
      }
    }
  }
}

function password_required(){
  if(password.length==0){
    document.getElementById("label_password").style.color='red';
    document.getElementById("label_password").innerHTML='Required';
  } 
}

function validate_cpassword_2(){
  if(password==0){
    document.getElementById("label_password").style.color='red';
    document.getElementById("label_password").innerHTML='First enter a password here';
  }
}
function validate_cpassword(){
  cpassword = document.form_ram.cpassword.value;
  if(password!=0){
    if(cpassword!=password){
      document.getElementById("label_cpassword").style.color='red';
      document.getElementById("label_cpassword").innerHTML='Passwords does not match!';
    }
    else{
      document.getElementById("label_cpassword").innerHTML='&#10003;';
      document.getElementById("label_cpassword").style.color='#76BA18';
      count++;
    }
  }
}

function cpassword_required(){
  if(cpassword.length==0&&password.length!=0){
      document.getElementById("label_cpassword").innerHTML='Required';
      document.getElementById("label_cpassword").style.color='red';
  }
}
function validate_gender(){
  var gender = document.form_ram.gender.value;
  if(gender.length<=0){
    document.getElementById("label_gender").style.color='red';
    document.getElementById("label_gender").innerHTML='Select a gender';
  }
  else{
    document.getElementById("label_gender").innerHTML='&#10003;';
    document.getElementById("label_gender").style.color='#76BA18';
    count++;
  }
}

 
