export function setBreads(breads){
    return {
        type:'set_bread_success',
        payload:{
            breads:breads,
        }
    }
}