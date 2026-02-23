// book_source/plugins/frontmatter-validation-plugin/index.js

module.exports = function (context, options) {
  const requiredFields = [
    'title',
    'slug',
    'module_id',
    'chapter_id',
    'sidebar_position',
    'description',
    'difficulty',
    'prerequisites',
    'duration_minutes',
    'code_repo_url',
    'status'
  ];

  return {
    name: 'docusaurus-plugin-frontmatter-validation',
    async contentLoaded({content, actions}) {
      const {loadedVersions} = content;

      loadedVersions.forEach(version => {
        version.docs.forEach(doc => {
          const {frontmatter, id} = doc;
          const missingFields = requiredFields.filter(field => frontmatter[field] === undefined);

          if (missingFields.length > 0) {
            throw new Error(
              `Frontmatter validation failed for doc ${id}. Missing required fields: ${missingFields.join(', ')}`
            );
          }

          const validStatuses = ['published', 'placeholder'];
          if (frontmatter.status && !validStatuses.includes(frontmatter.status)) {
            throw new Error(
                `Frontmatter validation failed for doc ${id}. Invalid status: "${frontmatter.status}". Must be one of: ${validStatuses.join(', ')}`
            );
          }
        });
      });
    },
  };
};
