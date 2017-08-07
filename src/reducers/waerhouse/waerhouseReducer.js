const initState = [{
  key: '1',
  no: '001',
  name:'1#仓库',
  site: '大学科技园',
  admin:'测试人1',
  state:false,
  id:1
},{
  key: '2',
  no: '002',
  name:'2#仓库',
  site: '大学科技园',
  admin:'测试人2',
  state:true,
  id:2
},{
  key: '3',
  no: '003',
  name:'3#仓库',
  site: '大学科技园',
  admin:'测试人3',
  state:false,
  id:3}]


export function waerhouseReducer(state = initState,action){
    switch(action.type){
        case "DELETE_ITEM":
            for(let i = 0; i < state.length; i++){
                if(action.id === state[i].id){
                    state.splice(i,1);
                }
            }
            return [].concat(state);
            // return JSON.parse(JSON.stringify(state));
        case "DEFAULT":
            
            return state = initState;
        default :
            return state;
    }
}