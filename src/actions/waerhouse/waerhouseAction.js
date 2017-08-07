export function deleteItemAction(id){
    return {
        type:"DELETE_ITEM",
        id:id
    }
}
export function defaultAction(id){
    return {
        type:"DEFAULT",
    }
}