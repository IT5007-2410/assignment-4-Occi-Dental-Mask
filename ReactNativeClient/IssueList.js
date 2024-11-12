import React, {useState} from 'react';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    Button,
    useColorScheme,
    View,
  } from 'react-native';

  const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

  function jsonDateReviver(key, value) {
    if (dateRegex.test(value)) return new Date(value);
    return value;
  }

  async function graphQLFetch(query, variables = {}) {
    try {
        /****** Q4: Start Coding here. State the correct IP/port******/
        const response = await fetch('http://10.0.2.2:3000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ query, variables })
        /****** Q4: Code Ends here******/
      });
        const body = await response.text();
          const result = JSON.parse(body, jsonDateReviver);

          if (result.errors) {
            const error = result.errors[0];
            if (error.extensions.code === 'BAD_USER_INPUT') {
              const details = error.extensions.exception?.errors?.join('\n ') || 'No additional details';
              alert(`${error.message}:\n ${details}`);
            } else {
              alert(`${error.extensions.code}: ${error.message}`);
            }
          }
          return result.data;
        } catch (e) {
          alert(`Error in sending data to server: ${e.message}`);
        }
  }

class IssueFilter extends React.Component {

    constructor(props) {
            super(props);
            this.state = {
                owner: '',
                status: '',
            };

            this.handleOwnerChange = this.handleOwnerChange.bind(this);
            this.handleStatusChange = this.handleStatusChange.bind(this);
            this.applyFilter = this.applyFilter.bind(this);
        }

    handleOwnerChange(owner) {
        this.setState({ owner });
    }

    handleStatusChange(status) {
        this.setState({ status });
    }

    applyFilter() {
        // Placeholder logic to apply the filter
        alert(`Filtering by Owner: ${this.state.owner}, Status: ${this.state.status}`);
    }
    render() {
      return (
        <>
        {/****** Q1: Start Coding here. ******/}
        <View>
            <Text>
              Placeholder for IssueFilter
            </Text>
        </View>
        {/****** Q1: Code ends here ******/}
        </>
      );
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791',flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  text: { textAlign: 'center' },
  dataWrapper: { marginTop: -1 },
  headerText: {
          textAlign: 'center',
          color: '#FFF',
          fontWeight: 'bold',
          fontSize: 16,
          paddingHorizontal: 8
  },
  row: { height: 40, backgroundColor: '#E7E6E1' ,  flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderColor: '#D3D3D3', paddingHorizontal: 8},
  cell: {
        textAlign: 'center',
        fontSize: 14,
        paddingVertical: 10,
        paddingHorizontal: 8,
        color: '#333'
    }
  });

const width= [40,80,80,80,80,80,200];

function IssueRow(props) {
    const issue = props.issue;

    {/****** Q2: Coding Starts here. Create a row of data in a variable******/}
   const rowData = [
        issue.id,
        issue.status,
        issue.owner,
        issue.created.toDateString(),
        issue.effort,
        issue.due ? issue.due.toDateString() : '',
        issue.title,
    ];    {/****** Q2: Coding Ends here.******/}

    return (
      <>
      {/****** Q2: Start Coding here. Add Logic to render a row  ******/}
       <View style={styles.row}>
               {rowData.map((cellData, index) => (
                   <Text key={index} style={[styles.cell, { width: width[index] }]}>
                       {cellData}
                   </Text>
               ))}
           </View>
      {/****** Q2: Coding Ends here. ******/}  
      </>
    );
  }
  
  
function IssueTable(props) {


    {/****** Q2: Start Coding here. Add Logic to initalize table header  ******/}
    const tableHeaders = (
            <View style={styles.header}>
                <Text style={[styles.headerText, {width: width[0]} ]}>ID</Text>
                <Text style={[styles.headerText, { width: width[1] }]}>Status</Text>
                <Text style={[styles.headerText, { width: width[2] }]}>Owner</Text>
                <Text style={[styles.headerText, { width: width[3] }]}>Created</Text>
                <Text style={[styles.headerText, { width: width[4] }]}>Effort</Text>
                <Text style={[styles.headerText, { width: width[5] }]}>Due Date</Text>
                <Text style={[styles.headerText, { width: width[6] }]}>Title</Text>
            </View>
        );
    {/****** Q2: Coding Ends here. ******/}
    const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />);

    
  return (
      <View style={styles.container}>
          <ScrollView horizontal>
              <View>
                  {/* Q2: Start Coding here to render the table header/rows */}
                  {tableHeaders}
                  {issueRows}
                  {/* Q2: Coding Ends here */}
              </View>
          </ScrollView>
      </View>
    );
  }

  
  class IssueAdd extends React.Component {
    constructor() {
      super();
      this.state = {
            title: '',
            owner: '',
            effort: '',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      /****** Q3: Start Coding here. Create State to hold inputs******/
      this.handleTitleChange = this.handleTitleChange.bind(this);
      this.handleOwnerChange = this.handleOwnerChange.bind(this);
      this.handleEffortChange = this.handleEffortChange.bind(this);
      /****** Q3: Code Ends here. ******/
    }
  
    /****** Q3: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleTitleChange(text) {
              this.setState({ title: text });
    }

    handleOwnerChange(text) {
      this.setState({ owner: text });
    }

    handleEffortChange(text) {
      this.setState({ effort: text });
    }
    /****** Q3: Code Ends here. ******/
    
    handleSubmit() {
      /****** Q3: Start Coding here. Create an issue from state variables and call createIssue. Also, clear input field in front-end******/
      const { title, owner, effort } = this.state;
        const issue = {
         title,
         owner,
         effort: parseInt(effort, 10) || 0,
         due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10)
         };

       this.props.createIssue(issue);

       this.setState({ title: '', owner: '', effort: '' });
      /****** Q3: Code Ends here. ******/
    }
  
    render() {
      return (
          <View>
          {/****** Q3: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
           <Text>Title:</Text>
              <TextInput
                style={styles.input}
                value={this.state.title}
                onChangeText={this.handleTitleChange}
                placeholder="Enter issue title"
              />

              <Text>Owner:</Text>
              <TextInput
                style={styles.input}
                value={this.state.owner}
                onChangeText={this.handleOwnerChange}
                placeholder="Enter owner name"
              />

              <Text>Effort:</Text>
              <TextInput
                style={styles.input}
                value={this.state.effort}
                onChangeText={this.handleEffortChange}
                placeholder="Enter effort"
                keyboardType="numeric"
              />

              <Button title="Add Issue" onPress={this.handleSubmit} />
          {/****** Q3: Code Ends here. ******/}
          </View>
      );
    }
  }

class BlackList extends React.Component {
    constructor()
    {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleOwnerChange = this.handleOwnerChange.bind(this)
        /****** Q4: Start Coding here. Create State to hold inputs******/
        this.state = {owner: ''};
        /****** Q4: Code Ends here. ******/
    }
    /****** Q4: Start Coding here. Add functions to hold/set state input based on changes in TextInput******/
    handleOwnerChange(text) {
        this.setState({ owner: text });
    }
    /****** Q4: Code Ends here. ******/

    async handleSubmit() {
    /****** Q4: Start Coding here. Create an issue from state variables and issue a query. Also, clear input field in front-end******/
    const { owner } = this.state;
    const query = `
      mutation addToBlacklist($nameInput: String!) {
        addToBlacklist(nameInput: $nameInput)
      }
    `;

    const variables = { nameInput: owner };
    const data = await graphQLFetch(query, variables);
    if (data) {
      alert(`Added ${owner} to blacklist successfully.`);
      this.setState({ owner: '' });
    }
    /****** Q4: Code Ends here. ******/
    }

    render() {
    return (
        <View>
        {/****** Q4: Start Coding here. Create TextInput field, populate state variables. Create a submit button, and on submit, trigger handleSubmit.*******/}
         <Text>Owner:</Text>
            <TextInput
              style={styles.input}
              value={this.state.owner}
              onChangeText={this.handleOwnerChange}
              placeholder="Enter owner name to blacklist"
         />
         <Button title="Add to Blacklist" onPress={this.handleSubmit} />
        {/****** Q4: Code Ends here. ******/}
        </View>
    );
    }
}

export default class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    
    componentDidMount() {
    this.loadData();
    }

    async loadData() {
    const query = `query {
        issueList {
        id title status owner
        created effort due
        }
    }`;

    const data = await graphQLFetch(query);
    if (data) {
        this.setState({ issues: data.issueList });
    }
    }

    async createIssue(issue) {
    const query = `mutation issueAdd($issue: IssueInputs!) {
        issueAdd(issue: $issue) {
        id
        }
    }`;

    const data = await graphQLFetch(query, { issue });
    if (data) {
        this.loadData();
    }
    }
    
    
    render() {
    return (
    <>
    {/****** Q1: Start Coding here. ******/}
    <IssueFilter />
    {/****** Q1: Code ends here ******/}

    {/****** Q2: Start Coding here. ******/}
    <IssueTable issues={this.state.issues} />
    {/****** Q2: Code ends here ******/}

    
    {/****** Q3: Start Coding here. ******/}
    <IssueAdd createIssue={this.createIssue} />
    {/****** Q3: Code Ends here. ******/}

    {/****** Q4: Start Coding here. ******/}
    <BlackList/>
    {/****** Q4: Code Ends here. ******/}
    </>
      
    );
  }
}
