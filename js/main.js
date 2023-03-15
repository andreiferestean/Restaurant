(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })

        // on click of submit button function will get executed
        $("#contactForm").submit(function (event) {
            var formData = {
              name: $("#name").val(),
              email: $("#email").val(),
              subject: $("#subject").val(),
              message: $("#message").val(),
            };
        
            $.ajax({
              type: "POST",
              url: "process.php",
              data: formData,
              dataType: "json",
              encode: true,
            }).done(function (data) {
              if (!data.success) {
                // name data validationa
                if (data.errors.name && !$("#name").parent().children(".help-block").length) {
                    $("#name").parent().addClass("has-error");
                    $("#name").parent().append(
                        '<div class="help-block">' + data.errors.name + "</div>"
                    );
                }

                if (!data.errors.name && $("#name").parent().children(".help-block").length) {
                    $("#name").parent().removeClass("has-error");
                    $("#name").parent().children(".help-block").remove();
                }
                
                // email data validationa
                if (data.errors.email && !$("#email").parent().children(".help-block").length) {
                    $("#email").parent().addClass("has-error");
                    $("#email").parent().append(
                        '<div class="help-block">' + data.errors.email + "</div>"
                    );
                }
                
                if (!data.errors.email && $("#email").parent().children(".help-block").length) {
                    $("#email").parent().removeClass("has-error");
                    $("#email").parent().children(".help-block").remove();
                }

                // email data validationa
                if (!data.errors.email && $("#email").parent().children(".help-block").length) {
                    $("#email").parent().removeClass("has-error");
                    $("#email").parent().children(".help-block").remove();
                }
        
                if (data.errors.subject && !$("#subject").parent().children(".help-block").length) {
                    $("#subject").parent().addClass("has-error");
                    $("#subject").parent().append(
                        '<div class="help-block">' + data.errors.subject + "</div>"
                    );
                }
                
                if (!data.errors.subject && $("#subject").parent().children(".help-block").length) {
                    $("#subject").parent().removeClass("has-error");
                    $("#subject").parent().children(".help-block").remove();
                }

                // message data validationa
                if (data.errors.message && !$("#message").parent().children(".help-block").length) {
                    $("#message").parent().addClass("has-error");
                    $("#message").parent().append(
                        '<div class="help-block">' + data.errors.message + "</div>"
                    );
                }
                
                if (!data.errors.message && $("#message").parent().children(".help-block").length) {
                    $("#message").parent().removeClass("has-error");
                    $("#message").parent().children(".help-block").remove();
                }
              } else {
                $("#contactForm").html(
                    '<div class="alert alert-success">' + data.message + "</div>"
                );
              }
            });
        
            event.preventDefault();
          });
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);

