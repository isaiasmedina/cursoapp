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
		}).otherwise({redirectTo:'/'})

}).controller('modalController', ['$scope',function ($scope){
	

}]).controller('indexController', ['$scope',function ($scope){
	
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
	$scope.inventario = [
		{id:1,nombre:"Maquina 1", modelo:"AAA-323232-56",imagen:"http://img.directindustry.com/images_di/photo-g/63803-2798197.jpg"},
		{id:2,nombre:"Maquina 2", modelo:"AAA-323232-98",imagen:"http://www.textileworld.com/Articles/2012/Septiembre_Octubre_de_2012/Pics/France.jpg"},
		{id:3,nombre:"Maquina 3", modelo:"AAA-323245-23",imagen:"http://img.directindustry.com/images_di/photo-g/63803-2798197.jpg"},
	];

}]).controller('inventarioController', ['$scope',function ($scope){
	$scope.OcultarSideNav();
	$scope.cambiarTitulo("Listados de Maquinaria")
}]).controller('maquinariaController', ['$scope','$routeParams',function ($scope,$routeParams){
	$scope.OcultarSideNav();
	$scope.cambiarTitulo("Detalle de Maquinaria")
	$scope.maquinariaId=$routeParams.maquinariaId;
}]).controller('perfilController', ['$scope','$routeParams',function ($scope,$routeParams){
	$scope.OcultarSideNav();
	$scope.cambiarTitulo("Perfil de Usuario");
}]);