/* This Module contains the USSD menus */
const { dataObject } = require('../db');

const menuOptions = {
	menuZero   : (req, res) => {
		const input = req.body.request_string;
		if (input === '*6120#') {
            dataObject.menu = 1;
			res.status(200).json({
				response_string : `We are here for you, talk to us about sexual violence \n 1. Report an incidence`
			});
		} else {
			res.status(403).json({ response_string: 'Something Went Wrong' });
		}
	},
	menuOne   : (req, res) => {
		const input = req.body.request_string;
		if (input === '1') {
            dataObject.menu = 2;
			res.status(200).json({ response_string: 'Did the incident happen to you? \n 1. No \n 2. Yes' });
		} else {
			res.status(403).json({ response_string: 'Invalid Input' });
		}
	},
	menuTwo : (req, res) => {
        const input = req.body.request_string;
        if(input === '1'){
            dataObject.menu = 3;
            res.status(200).json({ response_string: 'How are you related to him/her? \n 1. Relative \n 2. Friend \n 3. School Mate \n 4. Other' });
        }else if(input === '2'){
            dataObject.menu = 4;
            res.status(200).json({ response_string: 'What\'s your Gender? \n 1. Male \n 2. Female' });
        }else{
            res.status(403).json({ response_string: 'Invalid Input' });
        }
    },
    menuThree: (req,res)=>{
        const input = req.body.request_string;
        if(input==='1'||input==='2'||input ==='3'||input==='4'){
            dataObject.menu = 4;
            res.status(200).json({ response_string: 'What\'s your Gender? \n 1. Male \n 2. Female' });
        }else{
            res.status(403).json({ response_string: 'Invalid Input' });
        }
    },
    menuFour: (req,res)=>{
        const input = req.body.request_string;
        if(input==='1'||input==='2'){
            dataObject.menu = 5;
            res.status(200).json({ response_string: 'Does the victim have any disability? \n 1. No \n 2. Yes' });
        }else{
            res.status(403).json({ response_string: 'Invalid Input' });
        }
    },
    menuFive: (req,res)=>{
        const input = req.body.request_string;
        if(input==='1'||input==='2'){
            dataObject.menu = 6;
            res.status(200).json({ response_string: 'What happened to you? \n 1. Bad Touches \n 2. I was Raped \n 3. I was Defiled \n 4.Someone tried to raped me \n 5.Other' });
        }else{
            res.status(403).json({ response_string: 'Invalid Input' });
        }
    },
    menuSix:(req,res)=>{
        const input = req.body.request_string;
        if(input==='1'||input==='2'||input==='3'||input==='4'||input==='5'){
            dataObject.menu = 7
            res.status(200).json({ response_string: 'Enter Your Age' });
        }else{
            res.status(403).json({ response_string: 'Invalid Input' });
        }
    },
    menuSeven:(req,res)=>{
        const input = req.body.request_string;
        if(input.length>0){
            dataObject.menu = 8
            res.status(200).json({ response_string: 'Enter Location where it happened' });
        }else{
            res.status(403).json({ response_string: 'Invalid Input' });
        }
    },
    menuEight:(req,res)=>{
        const input = req.body.request_string;
        if(input.length>0){
            const safepalNum = Math.floor(Math.random()*90000); 
				res.status(200).json({ response_string: `Your SafePal Number is: ${safepalNum}...SafePal will contact you soon`});
        }else{
            res.status(403).json({ response_string: 'Invalid Input' });
        }
    }
};

module.exports = menuOptions;