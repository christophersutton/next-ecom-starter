export const makeSlug = (product_name) => {
    return product_name.replace(/\s+/g, '-').toLowerCase();
}

export const slugToName = (slug) => {
    return toTitleCase(slug.replace(/-/g, ' '));
}

const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }