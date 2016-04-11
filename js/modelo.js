angular.module('app',['ngRoute','ngAnimate','angular-click-outside'])
.config(function($routeProvider){
	$routeProvider
		.when("/",{
			controller:"inventarioController",
			templateUrl: "vistas/home.html"
		}).when("/maquinaria/:maquinariaId",{
			controller:"maquinariaController",
			templateUrl: "vistas/maquinaria.html"
		}).when("/perfil",{
			controller:"perfilController",
			templateUrl: "vistas/perfil.html"
		}).when("/nueva",{
			controller:"nuevaController",
			templateUrl: "vistas/nueva-maquinaria.html"
		}).otherwise({redirectTo:'/'})
}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]).controller('modalController', ['$scope',function ($scope){
	

}]).controller('indexController', ['$scope','$http',function ($scope,$http){
	
	$scope.closeThis=function(){
		if($scope.claseM=="modal-open"){
			alert('Estoy abierto')
			
		}
	}
	
	$scope.mostrarModal=function($event){
		$scope.claseM = "modal-open";
		$scope.claseO= "overlay-open";
		$event.preventDefault()
	}
	$scope.ocultarModal=function($event){
		$scope.claseM="";
		$scope.claseO="";
		$event.preventDefault()
	}
	
	$scope.mostrarSideNav = function($event){
		if ($scope.clase === "fixed-esconder")
		  $scope.clase = "fixed-mostrar";
		else
		  $scope.clase = "fixed-esconder";
	  
	  $event.preventDefault()
	};
	 
	$scope.OcultarSideNav = function(){
		$scope.clase = "fixed-esconder";
	};
	$scope.titulo="Mttos";
	$scope.tituloapp=$scope.titulo;
	$scope.cambiarTitulo= function(nTitulo){
		$scope.tituloapp=$scope.titulo + " | " +  nTitulo;
	}
		$scope.datosmaq=$http.post('http://tekoapp.com/curso/rest/',"",{transformRequest: angular.identity,headers: {'Content-Type': undefined}
            }).success(function(response){
			$scope.inventario=response;
		});
		

}]).controller('inventarioController', ['$scope',function ($scope){
	$scope.OcultarSideNav();
	$scope.cambiarTitulo("Listados de Maquinaria")
}]).controller('nuevaController', ['$scope','$http','$rootScope',function ($scope,$http,$rootScope){
	$scope.OcultarSideNav();
	
   
	
	$scope.enviar=function(){
		var nombre= $scope.form.nombre;
		var modelo= $scope.form.modelo;
		var imagen= $scope.form.imagen;
		var fd = new FormData();
		fd.append('nombre', nombre);
		fd.append('modelo', modelo);
		fd.append('imagen', imagen);
		console.log(imagen)
		$http.post('http://tekoapp.com/curso/rest/POST',fd,{transformRequest: angular.identity,headers: {'Content-Type': undefined}
            }).success(function(response){
			$scope.form={}
			
		});
	}
	
	
	
}]).controller('maquinariaController', ['$scope','$routeParams',function ($scope,$routeParams){
	$scope.OcultarSideNav();
	$scope.cambiarTitulo("Detalle de Maquinaria")
	$scope.maquinariaId=$routeParams.maquinariaId;
}]).controller('perfilController', ['$scope','$routeParams',function ($scope,$routeParams){
	$scope.OcultarSideNav();
	$scope.cambiarTitulo("Perfil de Usuario");
}]);