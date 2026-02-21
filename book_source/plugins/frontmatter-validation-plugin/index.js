// book_source/plugins/frontmatter-validation-plugin/index.js

module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin-frontmatter-validation',
    async loadContent() {
      // This plugin will primarily be used for validation during the build process,
      // which happens when Docusaurus processes markdown files.
      // The actual validation logic will be implemented as part of T014.
    },
  };
};
