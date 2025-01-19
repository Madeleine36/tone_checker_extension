const selectFrom = ['H1', 'H2', 'H3', 'H4', 'H5', 'P', 'LI'];


async function main() {

  var elementsWithText = [];
  let elements = document.body.querySelectorAll('*');
  elements.forEach(element => {
    if (element.nodeType === 3) {
      console.log(element);
    }
    // console.log(`looking at: ${element.innerHTML}`);
    // console.log(`tag: ${element.tagName} type: ${typeof element.tagName}`);
    if (typeof element.innerText !== "undefined" &&
        element.innerText.trim() !== '' && 
        element !== document.body && 
        selectFrom.includes(element.tagName)) {

        elementsWithText.push([element, element.innerHTML.trim()]);
    }
  });

  console.log(elementsWithText);

  var level = 0
  await chrome.storage.local.get(['toneLevel']).then((res) => {
      level = res.toneLevel;
  });
  if (typeof level == "undefined") level = 0;
  console.log("this is level: " + level);
  if (level == '0') return;

  var totalreq = [];
  for (var i = 0; i < elementsWithText.length; i++) totalreq.push(elementsWithText[i][1]);
  
  var response = await fetch(`http://localhost:8080/translate/${level}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain',
      },
      body: JSON.stringify(totalreq),
    });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  data = await response.text();
  console.log(typeof data);

  listdata = JSON.parse(data);

  console.log(listdata);

  for (var i = 0; i < elementsWithText.length; i++) elementsWithText[i][0].innerHTML = listdata[i];
}

main();