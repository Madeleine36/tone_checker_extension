const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a, aside, blockquote')

var totalreq = []

for (let i=0; i < text.length; i++) {
    totalreq.push(String(text[i].innerHTML));

    // my new code here
    // this is where we'd edit an individual chunk of text
    if (text[i].innerHTML.includes ('Tom Brady')) {
        text[i].innerHTML = text[i].innerHTML.replace('Tom Brady', '6-time Super Bowl champion Tom Brady')
    } else if (text[i].innerHTML.includes ('Brady')) {
    text[i].innerHTML = text[i].innerHTML.replace('Brady', '6-time Super Bowl champion Tom Brady')
    }
}



fetch('http://localhost:8080/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain',
    },
    body: JSON.stringify(totalreq),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
        console.log('Response from server: ', data);
        listdata = JSON.parse(data)
        for (let i=0; i < text.length; i++) {
            text[i].innerHTML = listdata[i]
        }
      
    })
    .catch((error) => {
      console.error('hey this is your Error:', error);
    });