// dataset: iris
d3.csv('./data/indata.csv').then(
	function(data) {
    
    var tooltip_network = d3.select("body")
        .append("div")
        .attr("class", "tooltip_network")
        .attr("id", "tooltip_network")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("width","180px")
        .style("height","22px")
        .style("padding","2px")
        .style("font","21px sans-serif")
        .style("color","#ffffff")
        .style("border","0px")
        .style("border-radius","8px")
        .style("background", "#000000")
        .style("visibility", "hidden");
        
	
	const IDtable = document.querySelector('#data-table');//the container of table
	//const IDradviz = document.querySelector('#radviz');//the container of radviz
	const titles = d3.keys(data[0]);//titles in the data table
	const colorAccessor = function(d){ return d['class']; };//dimension used for coloring
	const dimensions = ['<2C (LG1)', 'G1', 'S', 'G2M', '>4C (GG2M)'];//dimensions used for RadViz.
	const dimensionAnchor = Array.apply(null, 
		{length: dimensions.length}).map(Number.call, Number).map(x=>x*2*Math.PI/(dimensions.length)); // intial DA configration;
	
	//console.log('index.js:titles', titles);
	//console.log('index.js:colorAccessor', colorAccessor);
	//console.log('index.js:dimensions', dimensions);
	//console.log('index.js:dimensionAnchor', dimensionAnchor);
    function RVtable(div) {
        div.each(function() {
            const headers = table.append('thead').attr('class', 'table-header').append('tr').selectAll('th').data(titles);
            headers.exit().remove();
            headers.enter().append('th')
                .text(d=>d)
                .merge(headers);
            const rows = table.append('tbody').selectAll('tr').data(data);
            rows.exit().remove();



            const cells = rows.enter().append('tr')
                .on('mouseover', function(d,i) { 
                    //let tempa = d3.select(DOMRadViz).selectAll('.circle-data');
                    //tempa.nodes().forEach((element) => { 
                    //    if (element.getAttribute('id') == i) {
                    //        d3.select(element).raise().transition().attr('r', radiusDT*2).attr('stroke-width', 3);
                    //    }
                    //});
                
                    //tooltip_network.text(d.Geneid);
                    //tooltip_network.append('div').text('pippo');
                    //tooltip_network.append("img")
                    //        .attr("src","all_figures/"+d.Geneid+'.png')
                    //        .attr("x", 0)
                    //        .attr("y", 0)
                    //        .attr("width","400px")
                    //        .attr("height","200px");
                    //tooltip_network.style("visibility", "visible");

                    $('#image_place img').remove();
                    $('#image_place').prepend('<img class="img-responsive" style="padding-top: 5px" id="theImg" src="all_figures/'+d.Geneid+'.png" />')
                
                })
                .on("mousemove", function(){return tooltip_network.style("top", (event.pageY-
                    -40)+"px").style("left",(event.pageX-200)+"px");})
                .on('mouseout', function(d, i) {
                    //let tempa = d3.select(DOMRadViz).selectAll('.circle-data');
                    //tempa.nodes().forEach((element) => {
                    //    if (element.getAttribute('id') == i) {
                    //        d3.select(element).transition().attr('r', radiusDT).attr('stroke-width', 0.5);
                    //    }
                    //});	
                    tooltip_network.style("visibility", "hidden");				
                });


            cells.merge(rows);
            
            const cell = cells.selectAll('td').data(function(d){
                return titles.map(function(k){
                    return {'value': d[k], 'name': k};
                });
            });
            cell.exit().remove();
            cell.enter().append('td').text(d=>d.value)
                .merge(cell);
        });
    } // end of RVTable function	
	// call the plot function
    const table = d3.select(IDtable).append('table').attr('id', 'final_table').attr('class','table table-hover');
    const RVTable = d3.select(IDtable).data([RVtable]);
    RVTable.each(render);

    function render(method) {
        d3.select(this).call(method);	
    }	
    
    $('#final_table').DataTable();



}); 
