const app = require('./src/app');

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server running on https://localhost:${port}`);
	console.log(`Safe-Pal-USSD is listening on port ${port} . . .`);
});
