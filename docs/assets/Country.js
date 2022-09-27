const JsonAPi = "//inmagik.github.io/world-countries/countries/"
const API ='https://restcountries.com/v3.1/name/';
// first let's just display the country code according to the enetered country
async function fetchInfo(apiUrl,country){
    try{
        const code = await fetch(`${apiUrl}${country}`);
        const countryCode = await code.json();
        return countryCode;
    }catch{
        console.log("error occurred");
    }
}
async function getCountry(){
    map.data.forEach(function(feature) {
        // If you want, check here for some constraints.
        map.data.remove(feature);
    });
    const input = document.querySelector('input');
    const inputCountry = input.value;
    const countryInfo_fetch = await fetchInfo(API,inputCountry);
    const Infobox = document.getElementById("Infobox");
    Infobox.textContent = '';
    //name of the country
    const countryInfo = await countryInfo_fetch[0];
    const {name,currencies,capital,languages,flags,latlng,cca3} = await countryInfo;
    const commonName = await name.common;
    const commonNameComponent = document.createElement('p')
    commonNameComponent.textContent = commonName;
    //official of the country
    const officialName = await name.official;
    const officialName2 = await Object.values(name.nativeName)[0].official;
    const officialNameComponent = document.createElement('p')
    officialNameComponent.textContent =  officialName+'|'+officialName2;
    //currency
    const currency = await Object.entries(currencies);
    const abbreviation = await currency[0][0];
    console.log(abbreviation);
    const currencyName = await currency[0][1].name;
    console.log(currencyName);
    const moneyComponent = document.createElement('p');
    const currencySymbol = await currency[0][1].symbol;
    moneyComponent.textContent = `${abbreviation} | ${currencyName} | ${currencySymbol}`;
    //capital
    const capitalComponent = document.createElement('p')
    capitalComponent.textContent = capital;
    //language
    const language_entries = await Object.entries(languages);
    const languagediv = document.createElement('div');
    console.log(languages);
    for(let language of language_entries ){
        const textComponent = document.createElement('p')
        textComponent.textContent = `${language[0]}  |  ${language[1]}`;
        languagediv.append(textComponent);
    }
    // flag
    const imageContainer  = document.createElement('img');
    const flagElement = await flags.png;
    imageContainer.src =flagElement;
    imageContainer.alt = "flag";
    imageContainer.width = "100";
    Infobox.append(commonNameComponent,officialNameComponent,moneyComponent,capitalComponent,
        languagediv,imageContainer);
    //recenter map 
    var latlon = new google.maps.LatLng(latlng[0], latlng[1]);
    await map.setCenter(latlon);
    await map.setZoom(5);

    // hoping to get the geoJson
    const countryCode = await  cca3;
    const path = await `${JsonAPi}${countryCode}.geojson`;
    map.data.loadGeoJson(path);
    map.data.setStyle({
        fillColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        strokeWeight: 2,
        strokeColor:"transparent"
      });
}
