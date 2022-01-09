//Create the object of links
const links = [
	{
		label: 'Week 1',
		url: 'week1/storyeditor.html'
	},
	{
		label: 'Week 2',
		url: '#'
	},
	{
		label: 'Week 3',
		url: '#'
	},
	{
		label: 'Week 4',
		url: '#'
	},
	{
		label: 'Week 5',
		url: '#'
	},
	{
		label: 'Week 6',
		url: '#'
	},
	{
		label: 'Week 7',
		url: '#'
	},
	{
		label: 'Week 8',
		url: '#'
	},
	{
		label: 'Week 9',
		url: '#'
	},
	{
		label: 'Week 10',
		url: '#'
	},
	{
		label: 'Week 11',
		url: '#'
	},
	{
		label: 'Week 12',
		url: '#'
	},
	{
		label: 'Week 13',
		url: '#'
	},
	{
		label: 'Week 14',
		url: '#'
	}
];
//Get ol from HTML
const ol = document.getElementById("tableOfContents");
//Loop through object
for (const item of links) {
	//Create li for each week
    const li = document.createElement("li");
	//Create url for each week
    const a = document.createElement("a");
	//Set a's path to url provided from object of links
    a.setAttribute("href", item.url);
	//Show clickable link's text by referencing from object of links
    a.textContent = item.label;
	//Append elements
    li.appendChild(a);
    ol.appendChild(li);
}