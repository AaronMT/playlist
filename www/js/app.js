
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
    // Receipt verification (https://github.com/mozilla/receiptverifier)
    require('receiptverifier');

    // Installation button
    require('./install-button');

    // Install the layouts
    require('layouts/layouts');

    // Write your app here.


    function formatDate(d) {
        return (d.getMonth()+1) + '/' +
            d.getDate() + '/' +
            d.getFullYear();
    }

    // Match a Youtube url pattern
    var YOUTUBE = /(youtube.com(?:\/#)?\/watch\?)|(youtu\.be\/[A-Z0-9-_]+)/i;

    function generateVideo(url) {
        var youtubeId;

        // If a url pattern is matched, return the iframe - otherwise, return the string
        if (url.match(YOUTUBE)) {
          url = url.split('/');

          // Find the Youtube video id
          if (url.indexOf('youtu.be') > -1) {
            youtubeId = url[url.length - 1];
          } else {
            youtubeId = url[url.length - 1].split('v=')[1].split('&')[0];
          }

          url = '<div class="video-wrapper"><iframe width="560" height="349" ' +
                'src="http://www.youtube.com/embed/' + youtubeId +
                '?wmode=transparent" frameborder="0" allowfullscreen></iframe></div>'
        }
        return (url);
    }

    // List view

    var list = $('.list').get(0);
    /*
    list.add({ title: 'Learn this template',
               desc: 'This is a list-detail template. Learn more ' +
                     'about it at its ' +
                     '<a href="https://github.com/mozilla/mortar-list-detail">project page!</a>',
               date: new Date() });
    list.add({ title: 'Make things',
               desc: 'Make this look like that',
               date: new Date(12, 9, 5) });*/
    for(var i=0; i<8; i++) {
        list.add({ title: 'Move stuff',
                   desc: 'Move this over there',
                   date: new Date(12, 10, 1) });
    }

    // Detail view

    var detail = $('.detail').get(0);
    detail.render = function(item) {
        $('.title', this).html(generateVideo.get('title'));
        $('.desc', this).html(item.get('desc'));
        $('.date', this).text(formatDate(item.get('date')));
    };

    // Edit view

    var edit = $('.edit').get(0);
    edit.render = function(item) {
        item = item || { id: '', get: function() { return ''; } };

        $('input[name=id]', this).val(item.id);
        $('input[name=title]', this).val(item.get('title'));
        $('input[name=desc]', this).val(item.get('desc'));
    };

    edit.getTitle = function() {
        var model = this.view.model;

        if(model) {
            return model.get('title');
        }
        else {
            return 'New';
        }
    };

    $('button.add', edit).click(function() {
        var el = $(edit);
        var title = el.find('input[name=title]');
        var desc = el.find('input[name=desc]');
        var model = edit.model;

        if(model) {
            model.set({ title: title.val(), desc: desc.val() });
        }
        else {
            list.add({ title: title.val(),
                       desc: desc.val(),
                       date: new Date() });
        }

        edit.close();
    });
});