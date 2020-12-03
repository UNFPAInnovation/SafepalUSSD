/* this is a simple Object data base for the Data Coming in */
module.exports = {
	dataArray:[],
	checkSessionId: (nextMenu,req,dataArray)=>{
		for(let i=0;i<dataArray.length;i=i+1){
			if(dataArray[i].sessionID === req.body.session_id){
				dataArray[i].menu = nextMenu;
			}else{
				console.log('could not find User\'s SessionID');
			}
		}
	}

};

