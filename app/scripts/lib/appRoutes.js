define([], function() {
    return {
        defaultRoutePath: 'home',
        routes: {
            'home': {
                templateUrl: '/scripts/home/views/home.html',
                url: '/',
                module: 'home',
                controller: 'HomeViewController'
            },
            'home.list': {
                templateUrl: '/scripts/home/views/home.list.html',
                url: 'list',
                module: 'home',
                controller: 'HomeViewController'
            },
            'aboutme': {
                url: '/about/me',
                templateUrl: '/scripts/about/views/about.html',
                module: 'about',
                controller: 'AboutViewController'
            },
            'contact': {
                url: '/contact',
                templateUrl: 'scripts/contact/views/contact.html',
                module: 'contact',
                controller: 'ContactViewController'
            }
        }
    };
});

// TODO separate out into module specific routes ??
