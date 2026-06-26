export const initialStore=()=>{
  return{
    tags: [],
    foros:[]
  }
}

export default function storeReducer(store, action = {}) {
  switch(action.type){
    case 'all_tags':
    return {
        ...store,
        tags: action.payload
    };

    case 'all_foros':
      return{
        ...store,
        foros: action.payload
      }; 
    
    default:
			throw Error('Unknown action.');
  }    
}
