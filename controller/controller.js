app.controller('testController', function($scope, $http) {

    $scope.skillList = [];
    $scope.showAdd = false;
    $scope.addSkills = {
        "id": "",
        "name": "",
        "status": null
    }

    $http.get('/api/skills').then(function(res) {
        $scope.skillList = res.data;
    });

    $scope.addSkill = function() {

        $scope.addSkills.id = $scope.skillList.length + 1;
        $scope.skillList.push($scope.addSkills);
        $http.post('/api/skills', $scope.addSkills)
            .then(function(res) {
                alert('Skill added successfully!');
            });
        $scope.addSkills = {}
    }

    $scope.changeSkill = function(obj) {
        var a = $scope.skillList.indexOf(obj);
        $scope.skillList[a] = {
            "id": obj.id,
            "name": obj.name,
            "status": obj.status
        }
        $http.put('/api/skills/' + obj.id + '/update', {
                "skill": obj
            })
            .then(function(res) {
                alert('Skill updated Successfully');
            });
        $scope.openEdit = false;
    }

    $scope.changeStatus = function(status, obj) {
        $http.put('/api/skills/' + obj.id + '/update', {
                "skill": obj
            })
            .then(function(res) {
                alert('This skill is ' + (obj.status == true ? 'Approved' : 'Rejected'));
            });
    }

})