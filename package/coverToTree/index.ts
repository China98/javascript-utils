
function converToTree(data: Record<string, any>, rootId = 0, rowId = 'id', rowPid = 'pid', children = 'children') {
    if(Object.prototype.toString.call(data) !== '[object Array]')	{
       throw new Error('converToTree data is must be Array') 
    }
    const result = [];
    const ItemMapById: Record<string, any> = {
        
    };
    for(let i = 0, j = data.length; i < j; i++) {
       const item = data[i];
       const id = item[rowId];
       const pid = item[rowPid];
       if(!ItemMapById[id]) { ItemMapById[id] = { [children]: [] } };
       ItemMapById[id] = { ...item, [children]: ItemMapById[id][children] }
       if(pid === rootId) {
          result.push(ItemMapById[id]); 
       } else {
          if(!ItemMapById[pid]) {
            ItemMapById[pid] = { [children]: [] };
            result.push(ItemMapById[id]);
          };
          ItemMapById[pid][children].push(ItemMapById[id]); 
       }	
    }
    return result;			
  }