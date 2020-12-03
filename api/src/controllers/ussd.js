const {dataArray} = require('../db');
const menuOptions = require('./menus')


module.exports = {
	sessionCheck: (req,res,next)=>{
		const newSession = req.body.new;
		// check whether the session is new or not
		if(newSession === true){
			const date = new Date();
			// Capture the reporters Data
			const userData = {
				sessionID:req.body.session_id,
				menu:0,
				time:req.body.tstamp,
				phoneNumber:req.body.phone_number,
				report_source: 'SafePal-USSD',
				reportDate: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
			}
			// Add the data to the dataArray
			dataArray.push(userData);
			req.menu = 0;
			console.log(`Added menu ...${dataArray} , ${newSession}`);
			console.log('Gone to the next middleWare. . .')
			next();
		}else{
			// look for the User Id from the dataArray
			for(let i=0;i<dataArray.length;i++){
				if(dataArray[i].sessionID === req.body.session_id){
					req.menu = dataArray[i].menu;
				}else{
					console.log('could not find User\'s SessionID');
				}
			}
			console.log(`Added menu ...${req.menu} , ${newSession}`);
			console.log('Gone to the next middleWare. . .')
			next();
		}

	},
	ussd:(req,res)=>{
		const menuNum = req.menu;
		switch(menuNum){
			case 1:
				menuOptions.menuOne(req,res);
				break;
			case 2:
				menuOptions.menuTwo(req,res);
				break;
			case 3:
				menuOptions.menuThree(req,res);
				break;
			case 4:
				menuOptions.menuFour(req,res);
				break;
			case 5:
				menuOptions.menuFive(req,res);
				break;
			case 6:
				menuOptions.menuSix(req,res);
				break;
			case 7:
				menuOptions.menuSeven(req,res);
				break;
			case 8:
				menuOptions.menuEight(req,res);
				break;
			default:
				menuOptions.menuZero(req,res);
				break;
		}

	}
};
