class PrmFullViewServiceContainerAfterController {
    constructor() { // prmSearchService, $mdDialog, $timeout, $window, $location, $mdMedia
        // console.info('>>> HELLO from PrmFullViewServiceContainerAfterController');
        this.sv = this.parentCtrl.service;
        // this.sv = prmSearchService;
    }

    color() {
        if (this.sv.scrollId == 'getit_link1_0') {
            return '#006600';
        }
        return '#ff0000';
    }

    $onChanges() {
        if (this.sv.scrollId == 'getit_link1_0') {
            // console.log('ex', this.parentCtrl.scope());
            console.log(this.parentCtrl);
            this.parentCtrl.loadAdditionalServices = false;
        }
    }

    $onInit() {
        //let itemData=sv.getItem();
        // console.info('>>> GOT itemdata', itemData);
    }
}

// 'prmSearchService','$mdDialog','$timeout','$window','$location','$mdMedia'
PrmFullViewServiceContainerAfterController.$inject = [];

export default {
    bindings: {parentCtrl: '<'},
    controller: PrmFullViewServiceContainerAfterController,
    template: `<div ng-show="true">


    <div ng-style="{'background': $ctrl.color()}"; style="color:white; padding: 10px;">
        {{ $ctrl.sv.scrollId}}
        {{ $ctrl.sv.serviceName}}
        {{ $ctrl.sv.title}}
        </div>
        <div ng-if="$ctrl.sv.scrollId == 'getit_link1_0'">
            <img src="http://ub-media.uio.no/arkiv/hansteen/files/Perthes-Besser290854s1-0.jpg"/>
        </div>
    </div>`,
};




//         var vm = this;
//         var sv=prmSearchService;
//         var itemData=sv.getItem();
//         vm.item=itemData.item;
//         vm.searchData=itemData.searchData;
//         vm.params=$location.search();
//         vm.zoomButtonFlag=false;
//         vm.viewAllComponetMetadataFlag=false;
//         vm.singleImageFlag=false;
//         vm.photo = {}; // single imae
//         vm.jp2 = false;
//         vm.imageTitle = '';
//         vm.auth = sv.getAuth();
//         vm.gridColumn='3'; // default print view size

//         vm.$onInit=function() {
//             vm.isLoggedIn=sv.getLogInID();
//            // get item data from service
//            itemData=sv.getItem();
//            vm.item=itemData.item;
//            if(vm.item.pnx.addata) {
//                vm.item.mis1Data=sv.getXMLdata(vm.item.pnx.addata.mis1[0]);
//            }
//            vm.searchData=itemData.searchData;
//            vm.searchData.sortby=vm.params.sortby;
//            vm.pageInfo=sv.getPage();

//            if(vm.item.mis1Data) {
//                if(Array.isArray(vm.item.mis1Data)===false) {
//                    vm.singleImageFlag=true;
//                    if (vm.item.mis1Data.image) {
//                        vm.photo=vm.item.mis1Data.image[0];
//                        vm.jp2=sv.findJP2(vm.photo); // check to see if the image is jp2 or not
//                    }
//                    if(vm.item.mis1Data.title) {
//                        vm.imageTitle = vm.item.mis1Data.title[0].textElement[0]._text;
//                    }
//                } else {
//                    vm.viewAllComponetMetadataFlag = true;
//                    vm.singleImageFlag = false;
//                    vm.zoomButtonFlag = true;
//                }
//            }

//            // show print view base on the screen size
//             if($mdMedia('xs')) {
//                vm.gridColumn='1';
//             } else if($mdMedia('sm')){
//                vm.gridColumn='2';
//             }

//         };

//         // view all component metadata
//         vm.viewAllComponentMetaData=function () {
//             var url='/primo-explore/viewallcomponentmetadata/'+vm.item.context+'/'+vm.item.pnx.control.recordid[0]+'?vid='+vm.params.vid;
//             url+='&tab='+vm.params.tab+'&search_scope='+vm.params.search_scope;
//             url+='&adaptor='+vm.item.adaptor;
//             $window.open(url,'_blank');

//         };


//         // show the pop up image
//         vm.gotoFullPhoto=function ($event, item, index) {
//             var filename='';
//             if(item.image) {
//                 var urlList=item.image[0]._attr.href._value;
//                 urlList = urlList.split('/');
//                 if(urlList.length >=3) {
//                     filename=urlList[3];
//                 }
//             } else if(item._attr.componentID) {
//                 filename = item._attr.componentID._value;
//             }
//             // go to full display page
//             var url='/primo-explore/viewcomponent/'+vm.item.context+'/'+vm.item.pnx.control.recordid[0]+'?vid='+vm.searchData.vid+'&imageId='+filename;
//             if(vm.item.adaptor) {
//                 url+='&adaptor='+vm.item.adaptor;
//             } else {
//                 url+='&adaptor='+(vm.searchData.adaptor?vm.searchData.adaptor:'');
//             }
//             $window.open(url,'_blank');
//         }

//     }]);


//     angular.module('viewCustom')
//     .component('prmFullViewServiceContainerAfter', {
//         bindings: {parentCtrl: '<'},
//         controller: 'prmFullViewServiceContainerAfterController',
//         template: `<div style="background:red; color:white; padding: 20px;">Heia</div>`,
//     });


// })();
