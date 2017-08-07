export function ysdSearchAction(on) {
    let goodsData = [];
    if(on !== undefined || on !== null){
        goodsData = getGoodsList(on);
    }
    return {
        type:"CGD_SEARCH",
        goodsData:goodsData
    }
}

export function deleteTrAction(index){
    return {    
        type:"DELETE_TR",
        index:index
    }
}
export function addTrAction(){
    return{
        type:"ADD_TR"
    }
}
export function editTrAction(index,obj){
    return{
        type:"EDIT_TR",
        index:index,
        obj:obj
    }
}

export function selectGoodsAction(arr=[]){
    let data = getGoodsData();
    return{
        type:"SELECT_GOODS",
        goodsData:{
            initData:data,
            selectDate:arr
        }
    }
}

//手动入库获取商品数据
function getGoodsData(){
    /*** 
        fetch(PATH + '',{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            mode: 'no-cors',
            body: ''
        }).then( (response) => response.json() ).then( (data) => {
            // if(data.code) ... 
        }).catch( (error) => {
            console.error(error);
        }).done();
    ***/
    let data = [
            {
                goodsNo:'123456789',
                goodsName:'冰红茶',
                goodsNorms:'300ml',
                unit:'箱',
                skudes:'草莓味-蓝色-袋装',
                goodsId:'01'
            },{
                goodsNo:'987654321',
                goodsName:'绿茶',
                goodsNorms:'300ml',
                unit:'箱',
                skudes:'草莓味-蓝色-袋装',
                goodsId:'02'
            }, {
                goodsNo:'654654',
                goodsName:'冰红茶123',
                goodsNorms:'300ml',
                unit:'箱',
                skudes:'草莓味-蓝色-袋装',
                goodsId:'03'
            },
            {
                goodsNo:'456456',
                goodsName:'绿茶23423',
                goodsNorms:'300ml',
                unit:'箱',
                skudes:'草莓味-蓝色-袋装',
                goodsId:'04'
            },
        ]
    return data;
}

//根据验收单号获取商品数据
function getGoodsList(on){
    console.log('验收单号::::::::::::::' + on)
     /*** 
        fetch(PATH + '',{
            method: "POST",
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/x-www-form-urlencoded"
            },
            mode: 'no-cors',
            body: ''
        }).then( (response) => response.json() ).then( (data) => {
            // if(data.code) ... 
        }).catch( (error) => {
            console.error(error);
        }).done();
    ***/


    let sku = '01-02-03'
    let skudes = '草莓味-蓝色-袋装'
    let data = [
         {
            goods:{
                key:'1',    
                goodsName:'冰红茶1',
                guige:'100ml',
                sku:sku,
                skudes:skudes,
                goodsId:2,
                code:'3213123',
                unit:'箱',
            },
            shelf:[
                {
                    value:'1#货架',
                    label:'1#货架',
                    children:[
                        {
                            value:'1#货位',
                            label:'1#货位',
                        }
                    ]
                },
                {
                    value:'2#货架',
                    label:'2#货架',
                    children:[
                        {
                            value:'2#货位',
                            label:'2#货位',
                        }
                    ]
                }
            ]

        },
        {
            goods:{
                key:'2',    
                goodsName:'冰红茶2',
                guige:'100ml',
                sku:sku,
                skudes:skudes,
                goodsId:2,
                code:'3213123',
                unit:'箱',
            },
            shelf:[
                {
                    value:'111#货架',
                    label:'111#货架',
                    children:[
                        {
                            value:'1#货位',
                            label:'1#货位',
                        }
                    ]
                },
                {
                    value:'2222#货架',
                    label:'2222#货架',
                    children:[
                        {
                            value:'2#货位',
                            label:'2#货位',
                        }
                    ]
                }
            ]

        }
    ]
    return data;
}