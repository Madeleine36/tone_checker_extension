
async function main() {

  const docTexts = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a, aside, blockquote')
  var totalreq = []

  level = 0
  await chrome.storage.local.get(['toneLevel']).then((res) => {
      level = res.toneLevel;
  });
  if (typeof level == "undefined") level = 0;
  console.log("this is level: " + level);

  console.log(docTexts)

  for (var i = 0; i < docTexts.length; i++) totalreq.push(String(docTexts[i].innerHTML));

  console.log(totalreq)

  // fetch
  var response = await fetch(`http://localhost:8080/translate/${level}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(totalreq),
    });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  data = await response.text();
  listdata = JSON.parse(data);

  for (var i = 0; i < docTexts.length; i++) docTexts[i].innerHTML = listdata[i];
}

main();