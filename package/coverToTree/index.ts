
function converToTree(data: Array<Record<string, any>>, rootId = 0, rowId = 'id', rowPid = 'pid', children = 'children') {
    if(Object.prototype.toString.call(data) !== '[object Array]')	{
       throw new Error('converToTree data is must be Array'); 
    }
    const result: Array<Record<string, any>> = [];
    const ItemMapById: Record<string, any> = {
        
    };
    for(let i = 0, j = data.length; i < j; i++) {
       const item = data[i];
       const id = item[rowId];
       const pid = item[rowPid];
       // 初始化id映射    
       if(!ItemMapById[id]) { ItemMapById[id] = { [children]: [] } };
       // 合并item   
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