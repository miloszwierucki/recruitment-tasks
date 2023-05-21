const data = [
  {
    title: "Day of the Dragon",
    author: "Richard A. Knaak",
    quantity: 10,
    unit_price: 9,
    total_value: null,
  },
  {
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    quantity: null,
    unit_price: 10,
    total_value: 40,
  },
  {
    title: "Homeland",
    author: "Robert A. Salvatore",
    quantity: 8,
    unit_price: null,
    total_value: 96,
  },
  {
    title: "Canticle",
    author: "Robert A. Salvatore",
    quantity: 13,
    unit_price: 23,
    total_value: null,
  },
  {
    title: "Gamedec. Granica rzeczywistości",
    author: "Marcin Przybyłek",
    quantity: null,
    unit_price: 25,
    total_value: 50,
  },
  {
    title: "The Night Has Come",
    author: "Stephen King",
    quantity: 30,
    unit_price: null,
    total_value: 900,
  },
  {
    title: "The Sphinx",
    author: "Graham Masterton",
    quantity: 3,
    unit_price: null,
    total_value: 300,
  },
  {
    title: "Charnel House",
    author: "Graham Masterton",
    quantity: null,
    unit_price: 20,
    total_value: 60,
  },
  {
    title: "The Devils of D-Day",
    author: "Graham Masterton",
    quantity: 10,
    unit_price: 16,
    total_value: null,
  },
];
const metadata = [
  {
    id: "title",
    type: "string",
    label: "Title",
  },
  {
    id: "author",
    type: "string",
    label: "Author",
  },
  {
    id: "quantity",
    type: "number",
    label: "Quantity",
  },
  {
    id: "unit_price",
    type: "number",
    label: "Unit price",
  },
  {
    id: "total_value",
    type: "number",
    label: "Total (Quantity * Unit price)",
  },
];

const additionalDataFromBooksDB = [
  {
    title: "Day of the Dragon",
    author: "Richard A. Knaak",
    genre: "fantasy",
    pages: 378,
    rating: 3.81,
  },
  {
    title: "A Wizard of Earthsea",
    author: "Ursula K. Le Guin",
    genre: "fantasy",
    pages: 183,
    rating: 4.01,
  },
  {
    title: "Homeland",
    author: "Robert A. Salvatore",
    genre: "fantasy",
    pages: 343,
    rating: 4.26,
  },
  {
    title: "Canticle",
    author: "Robert A. Salvatore",
    genre: "fantasy",
    pages: 320,
    rating: 4.03,
  },
  {
    title: "Gamedec. Granica rzeczywistości",
    author: "Marcin Przybyłek",
    genre: "cyberpunk",
    pages: 364,
    rating: 3.89,
  },
  {
    title: "The Night Has Come",
    author: "Stephen King",
    genre: "post apocalyptic",
    pages: 186,
    rating: 4.55,
  },
  {
    title: "The Sphinx",
    author: "Graham Masterton",
    genre: "horror",
    pages: 207,
    rating: 3.14,
  },
  {
    title: "Charnel House",
    author: "Graham Masterton",
    genre: "horror",
    pages: 123,
    rating: 3.61,
  },
  {
    title: "The Devils of D-Day",
    author: "Graham Masterton",
    genre: "horror",
    pages: 243,
    rating: "3.62",
  },
];
const additionalMetadataFromBooksDB = [
  {
    id: "title",
    type: "string",
    label: "Title",
  },
  {
    id: "author",
    type: "string",
    label: "Author",
  },
  {
    id: "genre",
    type: "string",
    label: "Genre",
  },
  {
    id: "pages",
    type: "number",
    label: "Pages",
  },
  {
    id: "rating",
    type: "number",
    label: "Rating",
  },
];

// Add new metadata for summary table
const summaryMetadata = [
  {
    id: "author",
    type: "string",
    label: "Author",
  },
  {
    id: "titles",
    type: "number",
    label: "Titles",
  },
  {
    id: "total_quantity",
    type: "number",
    label: "Total Quantity",
  },
  {
    id: "total_revenue",
    type: "number",
    label: "Total Revenue",
  },
  {
    id: "average_quantity",
    type: "number",
    label: "Average Quantity",
  },
  {
    id: "average_unit_price",
    type: "number",
    label: "Average Unit Price",
  },
];

const searchInputElement = document.body.querySelector("input.search-input");
const searchButtonElement = document.body.querySelector("button.search-go");
const searchResetElement = document.body.querySelector("button.search-reset");

const columnHideElement = document.body.querySelector("button.column-hide");
const columnShowElement = document.body.querySelector("button.column-show");
const columnResetElement = document.body.querySelector("button.column-reset");

const markButtonElement = document.body.querySelector("button.function-mark");
const fillButtonElement = document.body.querySelector("button.function-fill");
const countButtonElement = document.body.querySelector("button.function-count");
const computeTotalsButtonElement = document.body.querySelector(
  "button.function-totals"
);
const resetFunctionButtonElement = document.body.querySelector(
  "button.function-reset"
);

// Add div - place for table
const placeForTableElement = document.body.querySelector("div.table-div");
const placeForSummaryTableElement = document.body.querySelector(
  "div.table-summary-div"
);

let additionalMetadata = [];
let fullData = data;

class Grid {
  constructor() {
    // Edit lines below ;)
    this.data = data.map((object) =>
      Object.assign(
        object,
        additionalDataFromBooksDB.find((e) => e.title === object.title)
      )
    );
    additionalMetadata = [
      ...metadata,
      ...additionalMetadataFromBooksDB.filter(
        (addObject) => !metadata.find((object) => object.id === addObject.id)
      ),
    ];
    this.metadata = additionalMetadata;

    // HINT: below map can be useful for view operations ;))
    this.dataViewRef = new Map();

    Object.freeze(this.data);
    Object.freeze(this.metadata);

    this.render();
    this.live();
  }

  render() {
    this.table = document.createElement("table");

    this.head = this.table.createTHead();
    this.body = this.table.createTBody();

    this.renderHead();
    this.renderBody();

    placeForTableElement.append(this.table);
  }

  renderHead() {
    const row = this.head.insertRow();

    for (const column of this.metadata) {
      const cell = row.insertCell();

      cell.innerText = column.label;
    }
  }

  renderBody() {
    for (const dataRow of this.data) {
      const row = this.body.insertRow();

      for (const column of this.metadata) {
        const cell = row.insertCell();

        cell.classList.add(column.type);
        cell.innerText = dataRow[column.id];
      }

      // connect data row reference with view row reference
      this.dataViewRef.set(dataRow, row);
    }
  }

  live() {
    searchButtonElement.addEventListener("click", this.onSearchGo.bind(this));
    searchInputElement.addEventListener(
      "input", // keydown -> input | keydown has delay
      this.onSearchChange.bind(this)
    );
    searchResetElement.addEventListener("click", this.onSearchReset.bind(this));

    columnHideElement.addEventListener(
      "click",
      this.onColumnHideClick.bind(this)
    );
    columnShowElement.addEventListener(
      "click",
      this.onColumnShowClick.bind(this)
    );
    columnResetElement.addEventListener("click", this.onColumnReset.bind(this));

    markButtonElement.addEventListener(
      "click",
      this.onMarkEmptyClick.bind(this)
    );
    fillButtonElement.addEventListener(
      "click",
      this.onFillTableClick.bind(this)
    );
    countButtonElement.addEventListener(
      "click",
      this.onCountEmptyClick.bind(this)
    );
    computeTotalsButtonElement.addEventListener(
      "click",
      this.onComputeTotalsClick.bind(this)
    );
    resetFunctionButtonElement.addEventListener(
      "click",
      this.onFunctionsResetClick.bind(this)
    );
  }

  onSearchGo(event) {
    this.table.remove();
    this.render();
  }

  onSearchChange(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = data.filter(
      (item) =>
        item.title.toLowerCase().includes(searchValue) ||
        item.author.toLowerCase().includes(searchValue)
    );

    this.data = filteredData;
  }

  onSearchReset(event) {
    searchInputElement.value = "";
    this.data = data;
    fullData = this.data;
    this.table.remove();
    this.render();
  }

  onColumnHideClick(event) {
    additionalMetadata.find((column) => column.hidden !== true).hidden = true;
    this.metadata = additionalMetadata.filter(
      (column) => column.hidden !== true
    );
    this.table.remove();
    this.render();
  }

  onColumnShowClick(event) {
    additionalMetadata.find((column) => column.hidden === true).hidden = false;
    this.metadata = additionalMetadata.filter(
      (column) => column.hidden !== true
    );
    this.table.remove();
    this.render();
  }

  onColumnReset(event) {
    additionalMetadata.forEach((column) => (column.hidden = false));
    this.metadata = additionalMetadata;
    this.table.remove();
    this.render();
  }

  onMarkEmptyClick(event) {
    for (const dataRow of this.data) {
      for (let i = 0; i < this.metadata.length; i++) {
        const cell = this.dataViewRef.get(dataRow).cells[i];
        cell.innerHTML === "" && (cell.style.border = "2px solid red");
      }
    }
  }

  onFillTableClick(event) {
    fullData = this.data.map((item) => {
      return Object.assign({}, item, {
        quantity:
          item.quantity === null
            ? item.total_value / item.unit_price
            : item.quantity,
        unit_price:
          item.unit_price === null
            ? item.total_value / item.quantity
            : item.unit_price,
        total_value:
          item.total_value === null
            ? item.quantity * item.unit_price
            : item.total_value,
      });
    });

    for (const dataRow of this.data) {
      for (let i = 0; i < this.metadata.length; i++) {
        const cell = this.dataViewRef.get(dataRow).cells[i];
        cell.innerHTML = fullData.find((e) => e.title === dataRow.title)[
          this.metadata[i].id
        ];
      }
    }
  }

  onCountEmptyClick(event) {
    let counter = 0;
    for (const dataRow of this.data) {
      for (let i = 2; i < this.metadata.length; i++) {
        const cell = this.dataViewRef.get(dataRow).cells[i];
        cell.innerHTML === "" && counter++;
      }
    }

    window.alert(`Found ${counter} empty cells.`);
  }

  onComputeTotalsClick(event) {
    let sum = 0;
    for (const dataRow of this.data) {
      const cell =
        this.dataViewRef.get(dataRow).cells[
          this.metadata.map((e) => e.id).indexOf("total_value")
        ];
      sum += Number(cell.innerHTML);
    }

    window.alert(`Sum of "Total (Quantity * Unit price)" equals ${sum}.`);
  }

  onFunctionsResetClick(event) {
    for (const dataRow of this.data) {
      for (let i = 0; i < this.metadata.length; i++) {
        const cell = this.dataViewRef.get(dataRow).cells[i];
        cell.style.border = "0px";
        cell.innerHTML = dataRow[this.metadata[i].id];
      }
    }

    fullData = this.data;
    this.data = data.map((object) =>
      Object.assign(
        object,
        additionalDataFromBooksDB.find((e) => e.title === object.title)
      )
    );
  }
}

// Add new summary table
class SummaryGrid {
  constructor() {
    this.updateSummaryTable = () => {
      const summaryData = fullData.reduce((acc, curr) => {
        const { author, quantity, unit_price } = curr;
        const { titles, total_quantity, total_revenue } = acc[author] || {
          titles: 0,
          total_quantity: 0,
          total_revenue: 0,
        };

        return {
          ...acc,
          [author]: {
            titles: titles + 1,
            unit_price: unit_price,
            total_quantity: total_quantity + quantity,
            total_revenue: total_revenue + quantity * unit_price,
          },
        };
      }, {});

      const summaryDataArray = Object.entries(summaryData).map(
        ([author, { titles, unit_price, total_quantity, total_revenue }]) => {
          return {
            author,
            titles,
            total_quantity,
            total_revenue,
            average_quantity: +parseFloat(total_quantity / titles).toFixed(2),
            average_unit_price:
              +parseFloat(total_revenue / total_quantity).toFixed(1) ||
              unit_price ||
              0,
          };
        }
      );

      return summaryDataArray;
    };

    this.data = this.updateSummaryTable();
    this.metadata = summaryMetadata;
    this.dataViewRef = new Map();

    Object.freeze(this.data);
    Object.freeze(this.metadata);

    this.live();
    this.render();
  }

  live() {
    searchResetElement.addEventListener("click", this.onSearchReset.bind(this));
    fillButtonElement.addEventListener(
      "click",
      this.onFillTableClick.bind(this)
    );
    resetFunctionButtonElement.addEventListener(
      "click",
      this.onFunctionsResetClick.bind(this)
    );
  }

  render() {
    this.table = document.createElement("table");

    this.head = this.table.createTHead();
    this.body = this.table.createTBody();

    this.renderHead();
    this.renderBody();

    placeForSummaryTableElement.append(this.table);
  }

  renderHead() {
    const row = this.head.insertRow();

    for (const column of this.metadata) {
      const cell = row.insertCell();

      cell.innerText = column.label;
    }
  }

  renderBody() {
    for (const dataRow of this.data) {
      const row = this.body.insertRow();

      for (const column of this.metadata) {
        const cell = row.insertCell();

        cell.classList.add(column.type);
        cell.innerText = dataRow[column.id];
      }

      this.dataViewRef.set(dataRow, row);
    }
  }

  onSearchReset(event) {
    this.data = this.updateSummaryTable();
    this.table.remove();
    this.render();
  }

  onFillTableClick(event) {
    this.data = this.updateSummaryTable();
    this.table.remove();
    this.render();
  }

  onFunctionsResetClick(event) {
    this.data = this.updateSummaryTable();
    this.table.remove();
    this.render();
  }
}

new Grid();
new SummaryGrid();
