import React from "react";
import ReactDOM from "react-dom";

class FilmRow extends React.Component {
  render() {
    const film = this.props.film;

    return (
      <tr>
        <td>{film.title}</td>
      </tr>
    );
  }
}

class FilmsTable extends React.Component {
  render() {
    const category = this.props.category;
    let categoryHeadText = "";
    const filmRows = [];

    if (category != null) {
      categoryHeadText = category.name;
      this.props.films.forEach((film) => {
        if (film.category[0].name == categoryHeadText) {
          filmRows.push(
            <FilmRow
              film={film}
              key={film.filmId + film.title}
              //onClick={(i) => this.props.onClick(category)}
            />
          );
        }
      });
    }
    return (
      <table id="FilmsTable">
        <thead>
          <tr>
            <th>{categoryHeadText}</th>
          </tr>
        </thead>
        <tbody>{filmRows}</tbody>
      </table>
    );
  }
}

class CategoryRow extends React.Component {
  render() {
    const category = this.props.category;

    return (
      <tr>
        <td>
          <button
            className="categoryTableRowButton"
            onClick={() => this.props.onClick()}
          >
            {category.name}
          </button>
        </td>
      </tr>
    );
  }
}

class CategorysTable extends React.Component {
  render() {
    const categoryRows = [];

    this.props.categorys.forEach((category) => {
      categoryRows.push(
        <CategoryRow
          category={category}
          key={category.categoryId + category.name}
          onClick={(i) => this.props.onClick(category)}
        />
      );
    });

    return (
      <table id="categorysTable">
        <thead>
          <tr>
            <th id="movieCategoriesHead">Movie Categories</th>
          </tr>
        </thead>
        <tbody>{categoryRows}</tbody>
      </table>
    );
  }
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    //this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.state = {
      categoryClicked: false,
      category: {},
      //for importing data from server
      categorysData: null,
    };
  }

  //getting the data from your server
  componentDidMount() {
    fetch("http://3.85.85.10:8080/Home/AllCategorys")
      .then((response) => response.json())
      .then((jsonData) => {
        const importCategorysData = jsonData.result;
        this.setState({
          categorysData: importCategorysData,
        });
      });
  }

  componentDidUpdate(categorysData) {
    console.log(categorysData);
  }

  handleCategoryClick(filmCategory) {
    this.setState({ categoryClicked: true });
    this.setState({ category: filmCategory });
  }

  render() {
    const categoryClicked = this.state.categoryClicked;
    let filmCategory;

    if (categoryClicked) {
      filmCategory = (
        <FilmsTable films={this.props.films} category={this.state.category} />
      );
    }

    return (
      <div>
        <h1 id="siteName">My Movies For Sale</h1>
        <p id="aboutInfo">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <CategorysTable
          categorys={this.props.categorys}
          onClick={(i) => this.handleCategoryClick(i)}
        />

        {filmCategory}
      </div>
    );
  }
}

const Categorys = [
  { name: "Action", categoryId: 1 },
  { name: "Animation", categoryId: 2 },
  { name: "Children", categoryId: 3 },
  { name: "Classics", categoryId: 4 },
  { name: "Comedy", categoryId: 5 },
  { name: "Documentary", categoryId: 6 },
  { name: "Drama", categoryId: 7 },
  { name: "Family", categoryId: 8 },
  { name: "Foreign", categoryId: 9 },
  { name: "Games", categoryId: 10 },
  { name: "Horror", categoryId: 11 },
  { name: "Music", categoryId: 12 },
  { name: "New", categoryId: 13 },
  { name: "Sci-Fi", categoryId: 14 },
  { name: "Sports", categoryId: 15 },
  { name: "Travel", categoryId: 16 },
  { name: "TestCategory", categoryId: 17 },
];

const Films = [
  {
    title: "ACADEMY DINOSAUR",
    description:
      "A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies",
    release_year: 2006,
    length: 86,
    rating: "PG",
    actors: [
      { lastName: "TRACY", actorId: 20, firstName: "LUCILLE" },
      { lastName: "TEMPLE", actorId: 53, firstName: "MENA" },
      { lastName: "PECK", actorId: 30, firstName: "SANDRA" },
      { lastName: "CAGE", actorId: 40, firstName: "JOHNNY" },
      { lastName: "KEITEL", actorId: 198, firstName: "MARY" },
      { lastName: "GABLE", actorId: 10, firstName: "CHRISTIAN" },
      { lastName: "DUKAKIS", actorId: 188, firstName: "ROCK" },
      { lastName: "NOLTE", actorId: 108, firstName: "WARREN" },
      { lastName: "KILMER", actorId: 162, firstName: "OPRAH" },
      { lastName: "GUINESS", actorId: 1, firstName: "PENELOPE" },
    ],
    category: [{ name: "Documentary", categoryId: 6 }],
    filmId: 1,
    languageId: 1,
    specialFeatures: "Deleted Scenes,Behind the Scenes",
  },
  {
    title: "ACE GOLDFINGER",
    description:
      "A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China",
    release_year: 2006,
    length: 48,
    rating: "G",
    actors: [
      { lastName: "GUINESS", actorId: 90, firstName: "SEAN" },
      { lastName: "FAWCETT", actorId: 19, firstName: "BOB" },
      { lastName: "ZELLWEGER", actorId: 85, firstName: "MINNIE" },
      { lastName: "DEPP", actorId: 160, firstName: "CHRIS" },
    ],
    category: [{ name: "Horror", categoryId: 11 }],
    filmId: 2,
    languageId: 1,
    specialFeatures: "Trailers,Deleted Scenes",
  },
  {
    title: "ADAPTATION HOLES",
    description:
      "A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon Factory",
    release_year: 2006,
    length: 50,
    rating: "NC-17",
    actors: [
      { lastName: "STREEP", actorId: 24, firstName: "CAMERON" },
      { lastName: "FAWCETT", actorId: 19, firstName: "BOB" },
      { lastName: "DENCH", actorId: 123, firstName: "JULIANNE" },
      { lastName: "JOHANSSON", actorId: 64, firstName: "RAY" },
      { lastName: "WAHLBERG", actorId: 2, firstName: "NICK" },
    ],
    category: [{ name: "Documentary", categoryId: 6 }],
    filmId: 3,
    languageId: 1,
    specialFeatures: "Trailers,Deleted Scenes",
  },
  {
    title: "AFFAIR PREJUDICE",
    description:
      "A Fanciful Documentary of a Frisbee And a Lumberjack who must Chase a Monkey in A Shark Tank",
    release_year: 2006,
    length: 117,
    rating: "G",
    actors: [
      { lastName: "DEGENERES", actorId: 41, firstName: "JODIE" },
      { lastName: "WINSLET", actorId: 147, firstName: "FAY" },
      { lastName: "PESCI", actorId: 88, firstName: "KENNETH" },
      { lastName: "KILMER", actorId: 162, firstName: "OPRAH" },
      { lastName: "DAMON", actorId: 81, firstName: "SCARLETT" },
    ],
    category: [{ name: "Horror", categoryId: 11 }],
    filmId: 4,
    languageId: 1,
    specialFeatures: "Commentaries,Behind the Scenes",
  },
  {
    title: "AFRICAN EGG",
    description:
      "A Fast-Paced Documentary of a Pastry Chef And a Dentist who must Pursue a Forensic Psychologist in The Gulf of Mexico",
    release_year: 2006,
    length: 130,
    rating: "G",
    actors: [
      { lastName: "PHOENIX", actorId: 51, firstName: "GARY" },
      { lastName: "TAUTOU", actorId: 59, firstName: "DUSTIN" },
      { lastName: "TEMPLE", actorId: 200, firstName: "THORA" },
      { lastName: "CARREY", actorId: 181, firstName: "MATTHEW" },
      { lastName: "LEIGH", actorId: 103, firstName: "MATTHEW" },
    ],
    category: [{ name: "Family", categoryId: 8 }],
    filmId: 5,
    languageId: 1,
    specialFeatures: "Deleted Scenes",
  },
  {
    title: "AGENT TRUMAN",
    description:
      "A Intrepid Panorama of a Robot And a Boy who must Escape a Sumo Wrestler in Ancient China",
    release_year: 2006,
    length: 169,
    rating: "PG",
    actors: [
      { lastName: "PALTROW", actorId: 21, firstName: "KIRSTEN" },
      { lastName: "WEST", actorId: 197, firstName: "REESE" },
      { lastName: "HOFFMAN", actorId: 169, firstName: "KENNETH" },
      { lastName: "NEESON", actorId: 62, firstName: "JAYNE" },
      { lastName: "WILLIAMS", actorId: 137, firstName: "MORGAN" },
      { lastName: "NOLTE", actorId: 108, firstName: "WARREN" },
      { lastName: "KILMER", actorId: 23, firstName: "SANDRA" },
    ],
    category: [{ name: "Foreign", categoryId: 9 }],
    filmId: 6,
    languageId: 1,
    specialFeatures: "Deleted Scenes",
  },
  {
    title: "AIRPLANE SIERRA",
    description:
      "A Touching Saga of a Hunter And a Butler who must Discover a Butler in A Jet Boat",
    release_year: 2006,
    length: 62,
    rating: "PG-13",
    actors: [
      { lastName: "BOLGER", actorId: 185, firstName: "MICHAEL" },
      { lastName: "PENN", actorId: 133, firstName: "RICHARD" },
      { lastName: "HOPPER", actorId: 170, firstName: "MENA" },
      { lastName: "MOSTEL", actorId: 99, firstName: "JIM" },
      { lastName: "KILMER", actorId: 162, firstName: "OPRAH" },
    ],
    category: [{ name: "Comedy", categoryId: 5 }],
    filmId: 7,
    languageId: 1,
    specialFeatures: "Trailers,Deleted Scenes",
  },
  {
    title: "AIRPORT POLLOCK",
    description:
      "A Epic Tale of a Moose And a Girl who must Confront a Monkey in Ancient India",
    release_year: 2006,
    length: 54,
    rating: "R",
    actors: [
      { lastName: "WILLIS", actorId: 96, firstName: "GENE" },
      { lastName: "DEE", actorId: 138, firstName: "LUCILLE" },
      { lastName: "DAVIS", actorId: 110, firstName: "SUSAN" },
      { lastName: "KILMER", actorId: 55, firstName: "FAY" },
    ],
    category: [{ name: "Horror", categoryId: 11 }],
    filmId: 8,
    languageId: 1,
    specialFeatures: "Trailers",
  },
  {
    title: "ALABAMA DEVIL",
    description:
      "A Thoughtful Panorama of a Database Administrator And a Mad Scientist who must Outgun a Mad Scientist in A Jet Boat",
    release_year: 2006,
    length: 114,
    rating: "PG-13",
    actors: [
      { lastName: "CRAWFORD", actorId: 26, firstName: "RIP" },
      { lastName: "ALLEN", actorId: 194, firstName: "MERYL" },
      { lastName: "TEMPLE", actorId: 53, firstName: "MENA" },
      { lastName: "WINSLET", actorId: 68, firstName: "RIP" },
      { lastName: "HACKMAN", actorId: 175, firstName: "WILLIAM" },
      { lastName: "MARX", actorId: 22, firstName: "ELVIS" },
      { lastName: "GABLE", actorId: 10, firstName: "CHRISTIAN" },
      { lastName: "NOLTE", actorId: 108, firstName: "WARREN" },
      { lastName: "KEITEL", actorId: 130, firstName: "GRETA" },
    ],
    category: [{ name: "Horror", categoryId: 11 }],
    filmId: 9,
    languageId: 1,
    specialFeatures: "Trailers,Deleted Scenes",
  },
];

ReactDOM.render(
  <MainPage categorys={Categorys} films={Films} />,
  document.getElementById("root")
);
