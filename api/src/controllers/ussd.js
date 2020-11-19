const {dataObject} = require('../db');
const menuOptions = require('./menus')


module.exports = {
	sessionCheck: (req,res,next)=>{
		const {menu} = dataObject; 
		// let sessionID = req.body.session_id;
		const newSession = req.body.new;
		if(newSession){
			dataObject.menu = 0;
			req.menu = menu;
			console.log(`Added menu ...${menu}`);
			console.log('Gone to the next middleWare. . .')
			next();
		}else{
			req.menu = menu;
			console.log(`Added menu ...${menu}`);
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
