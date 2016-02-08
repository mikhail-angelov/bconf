export default function ($timeout) {
    return {
        restrict: 'A',
        scope: {
            hoverToggle: '='
        },
        link: function (scope, element) {
            element.on('mouseenter', function() {
                $timeout(()=> scope.hoverToggle = true)
            });
            element.on('mouseleave', function() {
                $timeout(()=>  scope.hoverToggle = false)
            });
        }
    };
}