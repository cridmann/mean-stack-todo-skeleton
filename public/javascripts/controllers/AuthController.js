function AuthController($scope, $http) {
    $scope.todos = [];
    $scope.newTodo = {
        done: false,
        due: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
        description: ''
    };

    $scope.loginErrorMessage = null;

    $scope.user = {
        email: 'test',
        password: ''
    }

    $scope.login = function () {
        // validate input (prob server side)
        console.log('logging in');
        $http.post('/login.json', { email: $scope.user.email,
            password: $scope.user.password}).success(function (response) {
                if (response.error) {
                    console.log('login failure');
                    $scope.loginErrorMessage = response.error;
                }
                else {
                    console.log('login success');
                    window.location = response.redirect;
                }
            });
    };

    $scope.logout = function () {
        console.log('logging out');
        $http.get('./logout').success(function (response) {
            //console.log('success');
            window.location = response.redirect;
        })
    }
}


