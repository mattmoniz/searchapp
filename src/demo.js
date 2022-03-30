import React from 'react';
import "./styles/styles.css";

class SolrConnectorDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      solrSearchUrl: "http://localhost:8983/solr/techproducts/select",
      query: "memory",
      filter: "",
      fetchFields: "",
      sort:"",
    }
  }

  onSubmit(event) {
    event.preventDefault();
    let searchParams = {
      solrSearchUrl: this.state.solrSearchUrl,
      query: this.state.query,
      filter: [this.state.filter],
      fetchFields: this.state.fetchFields.split(" "),
      offset: 0,
      limit: 10,
      sort: this.state.sort,
      facet: {
        manufacturer: {
          type: "terms",
          field: "manu_id_s",
          limit: 20
        },
        price_range_0_100: {
          query: "price:[400 TO 500]"
        }
      },
      // highlightParams: {
      //   "hl": "true",
      //   "hl.fl": "name manu",
      //   "hl.snippets": 1,
      //   "hl.fragsize": 500
      // }
    };
    this.props.doSearch(searchParams);
  }


  render() {
    return (
      <div className="app">
        <div className="header">Sample React Solr App</div>
        <div className="sidebar">
          <ul>
            {/* <li>{{this.searchParams.facet.price_range_0_100}}</li> */}
            {/* {/* <li>Item</li> */}
            {/* <fieldType name="text" class="solr.TextField" positionIncrementGap="100"> */}
            <li>Item</li>
            <li>Item</li>
          </ul>
        </div>
        <div className="content">
          <form className="inputForm" onSubmit={this.onSubmit.bind(this)}>
            <h4>searchParams:</h4>
            <p>
              solrSearchUrl:{" "}
              <input
                type="text"
                value={this.state.solrSearchUrl}
                onChange={(e) => {
                  this.setState({ solrSearchUrl: e.target.value });
                }}
              />
            </p>
            <p>
              query:{" "}
              <input
                type="text"
                value={this.state.query}
                onChange={(e) => {
                  this.setState({ query: e.target.value });
                }}
              />{" "}
              filter:{" "}
              <input
                type="text"
                value={this.state.filter}
                onChange={(e) => {
                  this.setState({ filter: e.target.value });
                }}
              />
            </p>
            <p>
              fetchFields:{" "}
              <input
                type="text"
                value={this.state.fetchFields}
                onChange={(e) => {
                  this.setState({ fetchFields: e.target.value });
                }}
              />
            </p>
            <p>
              Sort:{" "}
              <select
                name="sort"
                id="solr-sort"
                value={this.state.sort}
                onChange={(e) => {
                  this.setState({ sort: e.target.value });
                }}
              >
                <option value="price asc"> Price Ascending </option>
                <option value="price desc"> Price Descending</option>
              </select>
            </p>
            <p>
              <button type="submit">Search</button>
            </p>
          </form>
          <div className="jsonOutput">
            <pre>
              this.props.solrConnector: {"\n\n"}
              {JSON.stringify(this.props.solrConnector, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

export default SolrConnectorDemo;
