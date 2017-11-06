define(['angular'], function(angular) {
    
    var createFactory = function($q){
        //fake data for testing purposes
        var fakeData = {
            categories:[
                {
                    id: 1,
                    name: "PHP"
                },
                {
                    id: 2,
                    name: "Javascript"
                }
            ]
        };
        for(var i=3; i<=31; i++){
            fakeData.categories.push({id: i, name: "Dummy #" + i});
        }
        console.log(fakeData);

        //actual factory
        var f = {
            currentArray: [],
            perPage: 10,
            currentPage: 0,
            totalPages: 0,
            target: '',
            setTarget: function(t){
                f.target = t;
            },
            targets:{
                categories: 'categories',
                questions: 'questions',
                templates: 'templates',
                users: 'users'
            },
            load: function(dir){
                if(dir == null) {
                    start = 1;
                }
                if(dir == 'next'){
                    if(f.currentPage < f.totalPages)
                        start = ((f.currentPage) * f.perPage) + 1;
                    else
                        return {
                            items: f.currentArray,
                            currentPage: f.currentPage,
                            totalPages: f.totalPages
                        };
                }
                if(dir == 'prev'){
                    if(f.currentPage > 1)
                        start = ((f.currentPage-2) * f.perPage) + 1;
                    else
                        return {
                            items: f.currentArray,
                            currentPage: f.currentPage,
                            totalPages: f.totalPages
                        };
                }
                console.log("start is " + start);
                f.currentArray = fakeData.categories.slice(start-1, start-1+f.perPage); //start-1 because of the dummy data array
                f.currentPage = Math.floor(start / f.perPage) + 1;
                f.totalPages = Math.floor(fakeData.categories.length / f.perPage) + ((fakeData.categories.length % f.perPage) > 0 ? 1 : 0);
                return {
                    items: f.currentArray,
                    currentPage: f.currentPage,
                    totalPages: f.totalPages
                };
            }   
        };
        return f;
    };
    createFactory.$inject = ['$q'];

    return createFactory;
});