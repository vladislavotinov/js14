var http = require('http');
var port = 3000;
var fs = require('fs');
const request = require('superagent');



var serv = http.createServer(function(req,res){
	if (req.url === '/')
	{
		res.write("Hello World! nn");
		res.end();
	} else if (req.url === '/about'){
		console.log(req.method);
		console.log(req.headers); 
		res.end();
	} else if (req.url === '/file'){
		fs.readFile('sd.html',function(err,data){ // вывод страницы с нода при запросе
			console.log("REP");
			res.write(data);
			res.end();
		})
	} else if (req.url === '/stop'){

		serv.close();
		res.end();
	}
	else if(req.url === '/privat'){
		console.log("\n\n");
		request
		  .get('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3')
		  .send({ query: 'goodUser', id: '20' }) /* тут вот некий объект, описывающий запрос согласно спецификации, которую вам должны предоставить разработчики вашего "JsonRpc" */ 
		  .set('X-API-Key', 'foobar') // Ну и заголовочки (авторизация там может или еще что)
		  .set('Accept', 'application/json')
		  .end(function(err, res) { // Тут ответ этого самого JsonRpc
		    console.log(res.body);
		  });
		  res.end();
	}

}).listen (port,function()
{
	console.log("go to localhost:3000");
});
