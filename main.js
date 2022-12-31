let host = ["localhost", "YOUR_OPENSTACK_IP"];

window.addEventListener('load', () => { 

    document.getElementById("submit").onclick = save;

});

function save(){
    
	
	let name = document.getElementById("word").value;

	let newWord = { word: name}
	
	fetch(`http://localhost:3000/`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newWord)
    })
    // fetch() returns a promise. When we have received a response from the server,
    // the promise's `then()` handler is called with the response.
    .then((response) => {
        // Our handler throws an error if the request did not succeed.
        if (!response.ok) {
			document.getElementById("word").value = '';
			
			alert("ERROR")
        } else {
			location.href=`http://${host[0]}:3000/`;
		}
    })
    // Catch any errors that might happen, and display a message.
    .catch((error) => console.log(err));

}