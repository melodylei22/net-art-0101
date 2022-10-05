let info;

let default_url =
  "https://api.themoviedb.org/3/discover/movie?api_key=daa0a41d7cac300f6b1210855890e618&sort_by=popularity.desc&page=1&with_keywords=158718&region=";
let region = "none";
let url;
let bg;
let sel;
let vh=window.innerHeight;
let vw=window.innerWidth;

function resizeListener() {
  vh = window.innerHeight;
  vw = window.innerWidth;
}

window.addEventListener("resize", resizeListener);

function setup() {

  createCanvas(vw, vh);

  //create dropdown menu
  sel = createSelect();
  sel.position(100, 230);
  sel.option("Australia");
  sel.option("Brazil");
  sel.option("Canada");
  sel.option("China");
  sel.option("Iran");
  sel.option("Indonesia");
  sel.option("Japan");
  sel.option("Korea");
  sel.option("Malaysia");
  sel.option("Russia");
  sel.option("Saudi Arabia");
  sel.option("Taiwan");
  sel.option("United States of America");
  sel.option("United Kingdom");
  sel.option("Select a country");

  sel.selected("Select a country");
  sel.changed(selectRegion);
  
  sel.style("color",color(120, 80, 156))
  sel.style("border",'0px')
  sel.style("font-size", "80")
}

function gotData(data) {
  info = data;
}

function draw() {
  if (region == "none") {
    clear();
 
    textFont("gothic", 32);
    fill(120, 80, 156);

    text(
      "So, how many LGBTQ+ films have been released in this country?",
      100,
      75,
      400
    );
  } else if (region === "SA") {
    clear();

  } else {
    clear();

    drawCir();
    // console.log(info.results[1].id);
  }
}

function drawCir() {
  randomSeed(4);
  if (info) {
    for (i = 0; i < info.total_results; i++) {
      fill(color(random(255), random(255), random(255),220));
      noStroke();
      let x = random(vw);
      let y = random(vh);
      ellipse(x, y, 10, 10);
    }
  }
}

function selectRegion() {
  let country = sel.value();
  if (country == "Korea") {
    region = "KR";
  } else if (country == "United States of America") {
    region = "US";
  } else if (country == "Australia") {
    region = "AU";
  } else if (country == "Brazil") {
    region = "BR";
  } else if (country == "Canada") {
    region = "CA";
  } else if (country == "China") {
    region = "CN";
  } else if (country == "Iran") {
    region = "IR";
  } else if (country == "Indonesia") {
    region = "ID";
  } else if (country == "Japan") {
    region = "JP";
  } else if (country == "Malaysia") {
    region = "MY";
  } else if (country == "Russia") {
    region = "RU";
  } else if (country == "Saudi Arabia") {
    region = "SA";
  } else if (country == "Taiwan") {
    region = "TW";
  } else if (country == "United Kingdom") {
    region = "GB";
  } else {
    region = "none";
  }

  url = default_url + region;
  loadJSON(url, gotData);
}
