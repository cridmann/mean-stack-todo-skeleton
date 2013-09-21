function RegisterController($scope, $http) {
    $scope.user = {
        email: '',
        password: ''
    }

    $scope.register = function (form) {         //TODO: convert form validator to service or directive
        // validate input (prob server side)
        console.log('registering');
        $http.post('/register.json', { email: $scope.user.email,
            password: $scope.user.password}).success(function (response) {
                console.log(response);
                // Remove all error markers
                for (key in form) {
                    if (form[key].$error) {
                        form[key].$error.mongoose = null;
                    }
                }

                if (response.error) {
                    console.log('register failure');
                    // We got some errors, put them into angular
                    for (key in response.error.errors) {
                        console.log('form: ' + form);

                        form[key].$error.mongoose = response.error.errors[key].type;
                    }
                }
                else if (response.redirect) {
                    console.log('register success');
                    window.location = response.redirect;
                }
            });
    };
}


