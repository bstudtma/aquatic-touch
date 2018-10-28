function localckeditor(enable) {
  CKEDITOR.disableAutoInline = true;
  for (name in CKEDITOR.instances) {
    CKEDITOR.instances[name].destroy("");
  }

  $("[contenteditable]").each(function (index) {
    $(this).attr("contenteditable", enable);
    if (!enable) return;
    var content_id = $(this).attr('id');

// extraPlugins: 'sourcedialog',
    CKEDITOR.inline(content_id, {

      allowedContent: true,
      on: {
        blur: function (event) {
          var data = event.editor.getData();
          console.log(data);

          var request = $.ajax({
            url: "/content",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({
              content: data,
              content_id: content_id
            }),
            dataType: "html"
          });
        }
      }
    });
  });
}
