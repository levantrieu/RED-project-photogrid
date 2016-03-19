$(function () {
  var instaPhotos = '';
  var nextURL = '';
  var $photos = $('.photos');
  var $loader = $('.loader');
  var $loadMore = $('.load-more');
  var $error = $('.error-message');

  $('#search-button').on('click', function (event) {
    event.preventDefault();
    $loader.css('display', 'block');

    var hashtag = $('#hashtag').val();

    // animate photo grid scrolling
    $('.container').css('height', '8rem').addClass('header-scroll');

    // get photos from API
    $.ajax({
      dataType: 'jsonp',
      method: 'GET',
      url: 'https://api.instagram.com/v1/tags/' + hashtag + '/media/recent?count=12&client_id=71e21c4bf4294a8498860283067eb682',
    })

    .done(function (instaData) {
      nextURL = instaData.pagination.next_url;
      $.each(instaData.data, function (index, value) {
        instaPhotos += '<li><div class="instaItem"><a href="' + value.link + '" target="_blank"><img src=' + value.images.standard_resolution.url + '></a>' +
                       '<div class="user-info"><div class="profile-photo"><img src=' + value.user.profile_picture + '></div>' +
                       '<div class="user-social"><div class="social-inner"><p>' + value.user.username + '</p>' +
                       '<i class="fa comments-icon"></i>' + value.comments.count +
                       '<i class="fa heart-icon"></i>' + value.likes.count + '</div></div></div></div></li>';
                       console.log('instaData');
      });

      $photos.empty().append(instaPhotos);
      instaPhotos = '';
      $loadMore.css('display', 'block');

    })

    .fail(function (instaData) {
      $error.append('Oops, something went wrong. Please try again.');
    }).always(function () {
      $loader.hide();
    });
  });

  // Load more photos
  $('.load-more').on('click', function () {
    event.preventDefault();
    $loader.css('display', 'block');
    
    // get photos from API
    $.ajax({
      dataType: 'jsonp',
      method: 'GET',
      url: nextURL,
    })

    .done(function (instaData) {
      nextURL = instaData.pagination.next_url;
      $.each(instaData.data, function (index, value) {
        instaPhotos += '<li><div class="instaItem"><a href="' + value.link + '" target="_blank"><img src=' + value.images.standard_resolution.url + '></a>' +
                       '<div class="user-info"><div class="profile-photo"><img src=' + value.user.profile_picture + '></div>' +
                       '<div class="user-social"><div class="social-inner"><p>' + value.user.username + '</p>' +
                       '<i class="fa comments-icon"></i>' + value.comments.count +
                       '<i class="fa heart-icon"></i>' + value.likes.count + '</div></div></div></div></li>';
      });

      $photos.append(instaPhotos);
      instaPhotos = '';
    })

    .fail(function (instaData) {
      $error.append('Oops, something went wrong. Please try again.');
    }).always(function () {
      $loader.hide();
    });
  });
});
