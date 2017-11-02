define([], function() {
    return {
        defaultRoutePath: 'home',
        routes: {
            'home': {
                templateUrl: '/scripts/sections/home/views/home.html',
                url: '/',
                module: 'home',
                controller: 'HomeViewController'
            },
            'home.list': {
                templateUrl: '/scripts/sections/home/views/home.list.html',
                url: 'list',
                module: 'home',
                controller: 'HomeViewController'
            },
            'home.list.added': {
                templateUrl: '/scripts/sections/home/views/home.list.added.html',
                url: '/added',
                module: 'home',
                controller: 'HomeViewController'
            }
        }
    };
});

// TODO separate out into module specific routes ??
