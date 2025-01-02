// vue.config.js
module.exports = {
  // Ensure it looks for components in the correct folder
  pages: {
    index: {
      entry: 'src/main.js', // Your entry point file
      template: 'public/index.html', // Your HTML template
      filename: 'index.html',
    },
  },
};
