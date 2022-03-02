import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

class ActorsInFilmTable extends React.Component {
  render() {
    const filmsActors = this.props.actors;

    console.log(filmsActors);
    return (
      <tr>
        <td>{filmsActors.firstName}</td>
        <td>{filmsActors.lastName}</td>
      </tr>
    );
  }
}

class FilmDetailsTable extends React.Component {
  render() {
    const filmDetails = this.props.film;

    const actorRows = [];

    filmDetails.actors.forEach((actor) => {
      actorRows.push(<ActorsInFilmTable actors={actor} />);
    });

    console.log(filmDetails);

    return (
      <div id="filmDetailsTableWrapper">
        <table id="filmTableBody">
          <colgroup span="2"></colgroup>
          <thead>
            <tr>
              <th colSpan="2" scope="colgroup">
                {filmDetails.title}
              </th>
            </tr>
            <tr id="filmDetailsRow">
              <td colSpan="2" scope="colgroup">
                {filmDetails.description}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr id="filmTableActorsHeader" colSpan="2" scope="colgroup">
              <td>Actors</td>
            </tr>
            {actorRows}
            <tr id="filmTableActorsHeader" colSpan="2" scope="colgroup">
              <td>Other Information</td>
            </tr>
            <tr>
              <td>Length</td>
              <td>{filmDetails.length}</td>
            </tr>
            <tr>
              <td>Age Rating</td>
              <td>{filmDetails.rating}</td>
            </tr>
            <tr>
              <td>Release Year</td>
              <td>{filmDetails.release_year}</td>
            </tr>
            <tr>
              <td>Special Features</td>
              <td>{filmDetails.specialFeatures}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

class FilmRow extends React.Component {
  render() {
    const film = this.props.film;

    return (
      <tr>
        <td>
          <button
            className="filmTableButton"
            onClick={() => this.props.onClick()}
          >
            {film.title}
          </button>
        </td>
        <td className="filmYear">{film.release_year}</td>
        <td className="filmRating">{film.rating}</td>
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
              key={film.filmId}
              onClick={() => this.props.onClick(film)}
            />
          );
        }
      });
    }
    return (
      <div id="filmsWrapper">
        <table id="filmsTable">
          <thead>
            <tr>
              <th colSpan="3">{categoryHeadText.toUpperCase()}</th>
            </tr>
          </thead>
          <tbody>{filmRows}</tbody>
        </table>
      </div>
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
          onClick={() => this.props.onClick(category)}
        />
      );
    });

    return (
      <div id="categorysWrapper">
        <table id="categorysTable">
          <thead>
            <tr>
              <th id="movieCategoriesHead">MOVIE CATEGORIES</th>
            </tr>
          </thead>
          <tbody>{categoryRows}</tbody>
        </table>
      </div>
    );
  }
}

class AddCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
    this.saveCategory = this.saveCategory.bind(this);
  }

  saveCategory = (e) => {
    e.preventDefault();
    let name = {
      name: this.state.name,
    };
    console.log("category => " + JSON.stringify(name));

    axios
      .post("http://52.91.66.39:8080/Home/AddCategory?name=" + this.state.name)
      .then((res) => {
        console.log(res);
      });
  };

  cancel() {
    this.props.history.push("/categorys");
  }

  changeCategoryHandler(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div className="addCategoryform">
        <form>
          <div className="form-group">
            <label>Please input a Category Name</label>
            <input
              placeholder="Category"
              description="category"
              className="form-control"
              value={this.state.category}
              onChange={this.changeCategoryHandler}
            />
          </div>
          <button className="btn btn-success" onClick={this.saveCategory}>
            Save
          </button>
          <button
            className="btn btn-danger"
            onClick={this.cancel.bind(this)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

class DeleteCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
    };
    this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
  }

  changeCategoryHandler(event) {
    this.setState({ name: event.target.value });
  }

  cancel() {
    this.props.history.push("/DeleteCategory");
  }

  deleteCategory = (e) => {
    e.preventDefault();

    this.props.allCategorys.forEach((category) => {
      if (category.name.toLowerCase() === this.state.name.toLowerCase()) {
        axios
          .delete(
            "http://52.91.66.39:8080/Home/DeleteCategory/" + category.categoryId
          )
          .then((res) => {
            console.log(res);
          });
      }
    });
  };

  render() {
    //const categorys = this.props.allCategorys;

    return (
      <div className="deleteCategoryform">
        <form>
          <div className="form-group">
            <label>Please input the Name of the Category to Delete</label>
            <input
              placeholder="Category"
              description="category"
              className="form-control"
              value={this.state.category}
              onChange={this.changeCategoryHandler}
            />
          </div>
          <button className="btn btn-success" onClick={this.deleteCategory}>
            Delete
          </button>
          <button
            className="btn btn-danger"
            onClick={this.cancel.bind(this)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

class UpdateCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      newName: "",
    };
    this.changeCategoryTargetHandler =
      this.changeCategoryTargetHandler.bind(this);
    this.changeCategoryNameHandler = this.changeCategoryNameHandler.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  }

  changeCategoryTargetHandler(event) {
    this.setState({ name: event.target.value });
  }

  changeCategoryNameHandler(event) {
    this.setState({ newName: event.target.value });
  }

  cancel() {
    this.props.history.push("/UpdateCategory");
  }

  updateCategory = (e) => {
    e.preventDefault();

    this.props.allCategorys.forEach((category) => {
      if (category.name.toLowerCase() === this.state.name.toLowerCase()) {
        axios
          .put(
            "http://52.91.66.39:8080/Home/UpdateCategory/" +
              category.categoryId +
              "?newCategoryName=" +
              this.state.newName
          )
          .then((res) => {
            console.log(res);
          });
      }
    });
  };

  render() {
    return (
      <div className="updateCategoryform">
        <form>
          <div className="form-group">
            <label>Please input the Name of the Category to Update</label>
            <input
              placeholder="Category"
              description="category"
              className="form-control"
              value={this.state.category}
              onChange={this.changeCategoryTargetHandler}
            />
            <label>Please input the new Name of the Category</label>
            <input
              placeholder="New Name"
              description="category"
              className="form-control"
              value={this.state.category}
              onChange={this.changeCategoryNameHandler}
            />
          </div>
          <button className="btn btn-success" onClick={this.updateCategory}>
            Save
          </button>
          <button
            className="btn btn-danger"
            onClick={this.cancel.bind(this)}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      </div>
    );
  }
}

class AdminOptions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addCategoryClicked: false,
      updateCategoryClicked: false,
      deleteCategoryClicked: false,
    };
  }

  handleAddCategoryClick() {
    this.setState({ addCategoryClicked: !this.state.addCategoryClicked });
    this.setState({ updateCategoryClicked: false });
    this.setState({ deleteCategoryClicked: false });
  }

  handleUpdateCategoryClick() {
    this.setState({ updateCategoryClicked: !this.state.updateCategoryClicked });
    this.setState({ addCategoryClicked: false });
    this.setState({ deleteCategoryClicked: false });
  }

  handleDeleteCategoryClick() {
    this.setState({ deleteCategoryClicked: !this.state.deleteCategoryClicked });
    this.setState({ updateCategoryClicked: false });
    this.setState({ addCategoryClicked: false });
  }

  render() {
    const categorys = this.props.categorys;
    const addCategoryClicked = this.state.addCategoryClicked;
    const updateCategoryClicked = this.state.updateCategoryClicked;
    const deleteCategoryClicked = this.state.deleteCategoryClicked;
    let categoryAdd;
    let categoryUpdate;
    let categoryDelete;

    if (addCategoryClicked) {
      categoryAdd = <AddCategory />;
    }

    if (updateCategoryClicked) {
      categoryUpdate = <UpdateCategory allCategorys={categorys} />;
    }

    if (deleteCategoryClicked) {
      categoryDelete = <DeleteCategory allCategorys={categorys} />;
    }

    return (
      <div>
        <ul>
          <button
            id="footerButton"
            onClick={(i) => this.handleAddCategoryClick()}
          >
            Add Category
          </button>
        </ul>
        <ul>
          <button
            id="footerButton"
            onClick={(i) => this.handleUpdateCategoryClick()}
          >
            Update Category
          </button>
        </ul>
        <ul>
          <button
            id="footerButton"
            onClick={(i) => this.handleDeleteCategoryClick()}
          >
            Delete Category
          </button>
        </ul>
        <div>
          {categoryAdd}
          {categoryUpdate}
          {categoryDelete}
        </div>
      </div>
    );
  }
}

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryClicked: false,
      category: {},
      filmClicked: false,
      film: {},
      adminOptionsClicked: false,
      //for importing data from server
      categoryDataFromServer: [],
      filmDataFromServer: [],
    };
  }

  componentDidMount() {
    axios.get("http://52.91.66.39:8080/Home/AllCategorys").then((response) => {
      this.setState({ categoryDataFromServer: response.data });
    });

    axios.get("http://52.91.66.39:8080/Home/AllFilms").then((response) => {
      this.setState({ filmDataFromServer: response.data });
    });
  }

  componentDidUpdate() {
    //console.log(this.state.filmDataFromServer);
  }

  handleCategoryClick(filmCategoryData) {
    this.setState({ categoryClicked: true });
    this.setState({ category: filmCategoryData });
  }

  handleFilmClick(filmData) {
    this.setState({ filmClicked: true });
    this.setState({ film: filmData });
  }

  handleAdminOptionsClick(i) {
    this.setState({ adminOptionsClicked: !this.state.adminOptionsClicked });
  }

  render() {
    const categoryClicked = this.state.categoryClicked;
    const filmClicked = this.state.filmClicked;
    const adminClicked = this.state.adminOptionsClicked;
    let filmCategory;
    let filmDetails;
    let adminOptions;

    if (categoryClicked) {
      filmCategory = (
        <FilmsTable
          films={this.state.filmDataFromServer}
          category={this.state.category}
          onClick={(filmData) => this.handleFilmClick(filmData)}
        />
      );
    }

    if (filmClicked) {
      filmDetails = <FilmDetailsTable film={this.state.film} />;
    }

    if (adminClicked) {
      adminOptions = (
        <AdminOptions categorys={this.state.categoryDataFromServer} />
      );
    }

    if (this.state.categoryDataFromServer.length !== 0) {
      return (
        <div id="siteWrapper">
          <h1 id="siteName">My Favorite Movies</h1>
          <p id="aboutInfo">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>

          <CategorysTable
            categorys={this.state.categoryDataFromServer}
            onClick={(filmCategoryData) =>
              this.handleCategoryClick(filmCategoryData)
            }
          />

          {filmCategory}

          {filmDetails}
          <div id="footer">
            <footer>
              <button
                id="footerButton"
                onClick={(i) => this.handleAdminOptionsClick(i)}
              >
                Admin
              </button>
              <div id="addCategory"></div>
              {adminOptions}
            </footer>
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1>Pending...</h1>
      </div>
    );
  }
}

ReactDOM.render(<MainPage />, document.getElementById("root"));
