export function  ysdSearchReducers(state = [],action){
    switch(action.type){
        case "CGD_SEARCH":
            return state = action.goodsData; 
        default:
            return state;
    }
}
let count = 0;
export function manualGoodsReducers(state = [],action){
    switch(action.type){
        case "DELETE_TR":
            state.splice(action.index,1);
            return [].concat(state);
        case "ADD_TR":
            count++;
            let newData = {
                key: count,
            };
            return [].concat([...state, newData])
        case "EDIT_TR":
            state[action.index] = Object.assign({},state[action.index],action.obj);
            return [].concat(state);
        default:
            return state;
    }
}
export function selectGoodsReducers(state = [],action){
    switch(action.type){
        case "SELECT_GOODS":
            state = action.goodsData;
            return state;
        default:
            return state;
    }
}


/*
 
{
    goodsNo:'11111',
    goodsName:'康师傅水',
    goodsNorms:'100ml',
    goodsBrand:'康师傅',
    sku:[
        {
            skus:1,
            skusvalue:[
                1,2,3
            ]
        },
            {
            skus:2,
            skusvalue:[
                1,2
            ]
        }
    ],
    skudes:[
        {
            skudess:'口味',
            skudessValue:[
                '草莓','西瓜','菠萝'
            ]
        },
        {
            skudess:'包装',
            skudessValue:[
                '袋装','瓶装'
            ]
        }
    ]
}
 */