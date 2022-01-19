import axios from "axios";
import React from "react";
import { v4 as uuidv4 } from 'uuid';

const baseURL = "https://api.sampleapis.com/";
const randomImgURL = "https://coffee.alexflipnote.dev/random.json";

export default function App() {
  // const [post, setPost] = React.useState(null);
  const [coffeeArray, setCoffeeArray] = React.useState([]);
  const [beerArray, setBeerArray] = React.useState([]);

  // drinksArray will be the desired model
  const [drinksArray, setDrinksArray] = React.useState([]);

  const coffeeURL = "coffee/hot";
  const beerURL = "beers/ale";

  const beerDescMap = {
    "Ale": "Ale is a general category of beer: You'll find sub-categories like brown ales or pale ales. This is the oldest style of beer, which dates back to antiquity. What distinguishes an ale - and also makes this category of beer accessible for home brewers - is a warm-temperature fermentation for a relatively short period of time. In the brewing process, brewers introduce top-fermenting yeasts which, as the name suggests, ferment on the top of the brew. The fermentation process turns what would otherwise be a barley and malt tea into a boozy beverage.",
    "Porter": "A type of ale, porter beers are known for their dark black color and roasted malt aroma and notes. Porters may be fruity or dry in flavor, which is determined by the variety of roasted malt used in the brewing process.",
    "Stout": "Like porters, stouts are dark, roasted ales. Stouts taste less sweet than porters and often feature a bitter coffee taste, which comes from unmalted roasted barley that is added to the wort. They are characterized by a thick, creamy head. Ireland's Guinness may be one of the world's best-known stouts.",
    "Brown Ale": "Brown ales range in color from amber to brown, with chocolate, caramel, citrus, or nut notes. Brown ales are a bit of a mixed bag, since the different malts used and the country of origin can greatly affect the flavor and scent of this underrated beer style.",
    "Pale Ale": "An English style of ale, pale ales and known for their copper color and fruity scent. Don't let the name fool you: these beers are strong enough to pair well with spicy foods.\nRelated to the pale is the APA, or American Pale Ale, which is somewhat of a hybrid between the traditional English pale ale and the IPA style. American pale ales are hoppier and usually feature American two row malt.",
    "IPA": "Originally, India Pale Ale or IPA was a British pale ale brewed with extra hops. High levels of this bittering agent made the beer stable enough to survive the long boat trip to India without spoiling. The extra dose of hops gives IPA beers their bitter taste. Depending on the style of hops used, IPAs may have fruit-forward citrus flavors or taste of resin and pine.\nAmerican brewers have taken the IPA style and run with it, introducing unusual flavors and ingredients to satisfy U.S. beer drinkers' love for the brew style."
  }


  const removeEmpty = () => {

  }

  // PRINT OUTPUT
  console.log("drinksArray:", drinksArray)

  React.useEffect(() => {
    // Cross-Origin Request Blocked
    // axios.get('https://coffee.alexflipnote.dev/random.json').then(response => {
    //   console.log(response.data);
    // });

    axios.get((baseURL + coffeeURL)).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let coffeeObj = {
          name: '',
          price: '',
          rating: '',
          description: '',
          image: '',
          id: ''
        }

        // drinksArray - key: 'name'
        let coffeeTitle = response.data[i].title;
        coffeeObj.name = coffeeTitle

        // drinksArray - key: 'price'
        let coffeePrice = (Math.random() * (20.00 - 8.00 + 1) + 8.00).toFixed(2)
        coffeeObj.price = '$' + coffeePrice

        // drinksArray - key: 'rating'
        let coffeeRating = (Math.random() * (5 - 1 + 1) + 1).toFixed(3)
        coffeeObj.rating = coffeeRating

        // drinksArray - key: 'description'
        let coffeeDesc = response.data[i].description
        coffeeObj.description = coffeeDesc

        // drinksArray - key: 'image'


        // drinksArray - key: 'id'
        coffeeObj.id = uuidv4();

        setDrinksArray(drinksArray => [...drinksArray, coffeeObj])
      }
    });

    axios.get((baseURL + beerURL)).then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        let beerObj = {
          name: '',
          price: '',
          rating: '',
          description: '',
          id: ''
        }

        // drinksArray - key: 'name'
        let beerName = response.data[i].name;
        beerObj.name = beerName

        // drinksArray - key: 'price'
        let beerPrice = response.data[i].price;
        beerObj.price = beerPrice

        // drinksArray - key: 'rating'
        let beerRating = response.data[i].rating.average;
        beerObj.rating = beerRating.toFixed(3);

        // drinksArray - key: 'description'
        let beerDesc
        for (let key in beerDescMap) {
          beerDesc = ''
          // console.log("KEY:", key, ", VALUE:", beerDescMap[key])
          if (beerName.includes("IPA") || beerName.includes("India")) {
            // console.log("IPA:", beerName)
            beerDesc = beerDescMap["IPA"]
          }
          else if (beerName.includes("Ale")) {
            // Ales
            if (beerName.includes("Brown Ale")) {
              // console.log("brownAle:", beerName)
              beerDesc = beerDescMap["Brown Ale"]
            } else if (beerName.includes("Pale Ale")) {
              // console.log("paleAle:", beerName)
              beerDesc = beerDescMap["Pale Ale"]
            } else if (beerName.includes("Ale")) {
              // console.log("Ale:", beerName)
              beerDesc = beerDescMap["Ale"]
            } else {
              // console.log("Porter/Stout:", beerName)
              beerDesc = beerDescMap[key]
              // beerObj.description = beerDesc
            }
          }
          // not in beerDescMap
          else {
            // console.log("Others:", beerName)
            beerDesc = ""
          }
        }
        beerObj.description = beerDesc

        // drinksArray - key: 'id'
        beerObj.id = uuidv4();

        // console.log('beerObj:', beerObj)

        setDrinksArray(drinksArray => [...drinksArray, beerObj])
      }
    });



    // FOR TESTING
    // let testObj = { name: 'Cappa' }
    // let testObj2 = { name: 'Cappa2' }
    // setDrinksArray(drinksArray => [...drinksArray, testObj])
    // setDrinksArray(drinksArray => [...drinksArray, testObj2])

  }, []);



  return (
    <div>
      {/* <h1>{post.title}</h1>
      <p>{post.body}</p> */}
    </div>
  );
}