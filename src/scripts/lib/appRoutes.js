define([], function() {
    return {
        defaultRoutePath: 'login',
        routes: {
            'login' : {
                templateUrl: '/scripts/sections/login/views/login.html',
                url: '/',
                module: 'login',
                controller: 'LoginController'
            },
            'app.categories': {
                templateUrl: '/scripts/sections/categories/views/categories.html',
                url: '/categories',
                module: 'categories',
                controller: 'CategoriesController'
            },
            'app.categories.category': {
                templateUrl: '/scripts/sections/categories/views/category.html',
                url: '/categories/:categoryId',
                module: 'categories',
                controller: 'CategoryController'
            },            
            'app.categories.category.question': {
                templateUrl: '/scripts/sections/categories/views/question.html',
                url: '/categories/:categoryId/:questionId',
                module: 'categories',
                controller: 'QuestionController'
            }
        }
    };
});