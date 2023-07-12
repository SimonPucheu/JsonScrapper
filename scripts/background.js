function readPage() {
    const muscles = [
        "Chest",
        "Back",
        "Biceps",
        "Triceps",
        "ForearmFlexors",
        "Core",
        "Abs",
        "Obliques",
        "Lats",
        "Trapezius",
        "FrontDeltoid",
        "LateralDeltoid",
        "RearDeltoid",
        "RotatorCuff",
        "LowerBack",
        "Legs",
        "Quads",
        "Glutes",
        "Hamstrings",
        "Calves",
        "Adductors",
        "Abductors"
    ];
    var form = document.createElement('form');
    form.action = 'https://simonpucheu.000webhostapp.com/WorkOut/addExercise.php';
    form.method = 'post';
    form.style.display = 'none';
    var json = document.createElement('input');
    json.type = 'text';
    json.name = 'json';
    var lists = Array.from(document.querySelectorAll('ul')).filter(ul => {return !ul.hasAttributes();});
    var result = [[], []];
    for (var i = 0; i < 2; i++) lists[i].querySelectorAll('li a').forEach((elem) => result[i].push(muscles.indexOf(elem.innerHTML.replace(/ /g, ''))));
    json.value = JSON.stringify({"name": document.querySelector('h1').innerHTML.split(':')[0].substring(10), "muscles": {"primary": result[0], "secondary": result[1], "image": document.querySelectorAll('img.jetpack-lazy-image')[1].src.split('?')[0]}, "video": document.querySelectorAll('img.jetpack-lazy-image')[0].src.split('?')[0]});
    document.body.appendChild(form);
    form.appendChild(json);
    form.submit();
}

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: readPage
    });
});