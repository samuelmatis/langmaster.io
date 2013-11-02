words.Templates = words.Templates || {};

/**
 * Fetch templates from folder
 *
 * @param {string} path
 * @param {callback} callback
 */
words.Templates.fetch = function(path) {
  var result = null;
  var scriptUrl = "scripts/templates/" + path + '.js';

  $.ajax({
    url: scriptUrl,
    type: 'get',
    dataType: 'html',
    async: false,
    success: function(data) {
      result = data;
    }
  });

  return result;
}
