angular.module('checkboxDemo3', ['ngMaterial'])

    .controller('AppCtrl', function($scope,$http) {
        $scope.selected = [];
        $scope.shopNames = [];
        $scope.toPrintOnScreen = '';

        $scope.items = [
            {
                "id": 1,
                "prodName":"shoes",
                "shops": [
                    {
                        "id":1,
                        "shopName":"Kazar"
                    },
                    {
                        "id":2,
                        "shopName":"GoSport"
                    },
                    {
                        "id":3,
                        "shopName":"CCC"
                    }
                ]
            },
            {
                "id": 2,
                "prodName":"clothes",
                "shops": [
                    {
                        "id":1,
                        "shopName":"GoSport"
                    }
                ]
            },
            {
                "id": 3,
                "prodName":"perfumes",
                "shops": [
                    {
                        "id":1,
                        "shopName":"Hebe"
                    }
                ]
            }
        ];

        $scope.howMany = function (array){
            var summary = {};
            var item = '';
            for(var i=0;i<array.length;i++){
                item = array[i];
                if(summary[item]){
                    summary[item] += 1;
                }
                else{
                    summary[item] = 1;
                }
            }
            return summary;
        }

        $scope.compareNumbers = function(a,b){
            return b-a
        }

        $scope.itSortsArrayDescending = function(array){
            return array.sort($scope.compareNumbers);
        }

        $scope.getFirstElementOfArray = function (list){
            var arrayOfValuesOfHowManyShopsThereIsProduct = [];
            $scope.arrayBeenSorted = [];
            for(var i in list){
                arrayOfValuesOfHowManyShopsThereIsProduct.push(list[i]);
            }
            $scope.arrayBeenSorted = $scope.itSortsArrayDescending(arrayOfValuesOfHowManyShopsThereIsProduct);
            var valueOfFirstElement = $scope.arrayBeenSorted[0];
            return valueOfFirstElement
        }


        $scope.whichShopIsTheMostNumeros = function (totalSummary){
            var list = totalSummary;

            var keysSorted = Object.keys(list).sort(function(a,b){
                return list[b]-list[a]
            })
            return keysSorted[0];
        }

            $scope.toPrintOnScreenChecksHowManySelected = function(selected,totalSummary){
                $scope.shopNameToPrintArray = [];

                if(selected.length === 1){
                    $scope.shopNameToPrintArray = [];
                    $scope.shopNameToPrintArray = totalSummary;
                }else if(selected.length > 1){
                    $scope.shopNameToPrintArray = [];
                    if(selected.length === $scope.getFirstElementOfArray(totalSummary)){
                        $scope.shopNameToPrintArray = $scope.whichShopIsTheMostNumeros(totalSummary);
                    }
                }

                return $scope.shopNameToPrintArray
            }

        $scope.shopNameToPrint = function (){
            $scope.allShopNames = [];
            $scope.totalSummary = {};
            $scope.shopNameToPrintArrayFinally = [];

            $scope.selected.forEach(function (item){
                item.shops.forEach(function (shop){
                    $scope.allShopNames.push(shop.shopName);
                    $scope.totalSummary = $scope.howMany($scope.allShopNames);
                })
            })

            $scope.shopNameToPrintArrayFinally = $scope.toPrintOnScreenChecksHowManySelected($scope.selected,$scope.totalSummary);
            var normalizedData = $scope.normalizedDataToPrint($scope.shopNameToPrintArrayFinally);

            return normalizedData
        }

        $scope.normalizedDataToPrint = function (data){
            var array = [];
            if(typeof data !== "string"){
                for(var item in data){
                    array.push(item);
                }
            } else if(typeof data === "string"){
                array.push(data);
            }

            return array
        }

        $scope.toggle = function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
            $scope.toPrintOnScreen = $scope.shopNameToPrint();
        };

        $scope.exists = function (item, list) {
            return list.indexOf(item) > -1;
        };

        $scope.isIndeterminate = function() {
            return ($scope.selected.length !== 0 &&
            $scope.selected.length !== $scope.items.length);
        };

        $scope.isChecked = function() {
            return $scope.selected.length === $scope.items.length;
        };

        $scope.toggleAll = function() {
            if ($scope.selected.length === $scope.items.length) {
                $scope.selected = [];
            } else if ($scope.selected.length === 0 || $scope.selected.length > 0) {
                $scope.selected = $scope.items.slice(0);
            }
        };
    });
