export const csv2JSON = (csv) => {

  var lines=csv.split("\n");

  var result = [];

  var headers=lines[0].split(";");

  for(var i=1;i<lines.length;i++){

	  var obj = {};
	  var currentline=lines[i].split(";");

	  for(var j=0;j<headers.length;j++){
		  obj[headers[j]] = currentline[j];
	  }

	  result.push(obj);

  }
  console.log(result);
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}