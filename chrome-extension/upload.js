$(document).ready(function(){
    $('#submit-file').on("click",function(e){
		e.preventDefault();
		$('#files').parse({
			config: {
				delimiter: "auto",
				complete: displayHTMLTable,
			},
			before: function(file, inputElem)
			{
				//do something
			},
			error: function(err, file)
			{
				alert('error!');
			},
			complete: function()
			{
				
			}
		});
    });
	
	function afterAFewSeconds(seconds) {
		return new Promise(resolve => {
			setTimeout(() => {
			resolve(seconds);
			}, seconds * 1000);
		});
	}

	async function displayHTMLTable(results){
		let table = "<table class='table'>";
		let data = results.data;
		 
		for(let i = 0; i<data.length; i++){
			table += "<tr>";
			let row = data[i];
			let cells = row.join(",").split(",");

			let tag1 = "<td>";
			let tag2 = "</td>";

			if(i===0){
				tag1 = "<th>";
				tag2 = "</th>"
			} 
			 
			for(j=0;j<cells.length;j++){
				table += tag1;
				if (cells[j].startsWith('http')){
					table += "<a href='" + cells[j] +"'>" + cells[j] +"</a>";
				} else {
					table += cells[j];
				}

				let quantity = cells[0];

				if (i !== 0 && j === 1) {
					for(let k = 0; k < quantity; k++){
						console.log(cells[j]);
						await afterAFewSeconds(3);
						window.open(cells[j]);
					}
				}
				table += tag2;
			}
			table += "</tr>";
		}
		table += "</table>";
		$("#parsed_csv_list").html(table);
		alert('completed!');
	}
});