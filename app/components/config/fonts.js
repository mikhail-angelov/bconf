angular.module('bconfApp').config(function ($mdIconProvider) {
  $mdIconProvider
    .iconSet('social', 'styles/icons/social-icons.svg', 100)
    .iconSet('y', 'styles/icons/hollow-cut-social-share-icons/hollow-cut-facebook.svg', 100)
    .defaultIconSet('styles/icons/core-icons.svg', 24);
});
