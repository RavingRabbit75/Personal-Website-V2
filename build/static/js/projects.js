$('.block-button').click(function(evt) {
	evt.preventDefault();
	console.log(evt.target.dataset.imageidx, evt.target.dataset.prjname);
	url="/api/projects";
	data={"imageidx":evt.target.dataset.imageidx, "prjname":evt.target.dataset.prjname};
	$.get({
	  url: url,
	  data: data,
	  success: processData,
	  dataType: "json"
	});

	function processData(data) {
		console.log(data);
	}
});