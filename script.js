var twitterUrl = "https://twitter.com/intent/tweet?text="
var quotesAPI = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

$('#getQuote').on('click', function(e) {
    e.preventDefault();
    $.get( {
      url: quotesAPI,
      success: function(data) {
        var post = data[0]; // The data is an array of posts. Grab the first one.
        $('#author-here').html("<h3>" + post.title + "</h3>");
        $('#quote-here').html("<h2>" + post.content + "</h2>");

        var theQuote = $("#quote-here").text();
        var theAuthor = $("#author-here").text();

        $("#postTwitter").on ("click", function(){
          window.open(twitterUrl + theQuote + " -" + theAuthor);
        });

        // If the Source is available, use it. Otherwise hide it.
        if (typeof post.custom_meta !== 'undefined' && typeof post.custom_meta.Source !== 'undefined') {
          $('#quote-source').html('Source: ' + post.custom_meta.Source);
        } else {
          $('#quote-source').text('');
        }
      },
      cache: false
    });
  });
